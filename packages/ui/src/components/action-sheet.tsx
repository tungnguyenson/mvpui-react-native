/**
 * Built from Untitled UI Figma reference (PRO license) + iOS HIG
 * UIAlertController action-sheet conventions.
 *
 * Custom design-system implementation on React Native's built-in
 * `Modal` — NOT @gorhom/bottom-sheet, NOT @expo/react-native-action-sheet.
 *
 * Rationale (see component-status.md batch7 notes):
 * - `@expo/react-native-action-sheet` defers to OS chrome and breaks
 *   design-system consistency (different look iOS vs Android, can't
 *   theme to brand tokens fully, can't carry rich per-option metadata).
 * - `@gorhom/bottom-sheet` BottomSheetModal failed to render visually
 *   when mounted at app-root level — `present()` returned cleanly but
 *   the sheet never painted. Symptom isolated via Maestro probe +
 *   on-screen debug overlay.
 * - `Modal` is a native RN primitive, uses platform modal infra, no
 *   portal pre-requisites, no measurement quirks, and supports
 *   transparent + slide-up out of the box.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { pickShadow, tokens } from "@mvp-ui-rn/tokens"
import {
  useCallback,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react"
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  Text,
  View,
  useColorScheme,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { renderIcon, type IconProp } from "../lib/render-icon"

/* ==========================================================================
   ActionSheet — design-system-controlled action sheet.

   Layout (iOS Mail / Files / Photos pattern):
     - Backdrop = full-screen scrim (rgba black 0.5). Tap closes.
     - Bottom-anchored stack of two rounded panels:
       1. Main options panel (title + message + option rows).
       2. Optional "cancel" panel separated by 8pt gap.

   Imperative singleton API (matches the Toast pattern):

       const i = await actionSheet.present({
         title: "Photo",
         message: "Choose a source",
         options: [
           { label: "Take photo", icon: Camera },
           { label: "Choose from library", icon: ImageIcon },
           { label: "Delete", icon: Trash2, style: "destructive" },
           { label: "Cancel", style: "cancel" },
         ],
       })

   Resolves with the tapped option's index OR `null` on backdrop /
   cancel dismiss / hardware back.

   Requires `<ActionSheetHost />` mounted once at app root.
   ========================================================================== */

export type ActionSheetOptionStyle = "default" | "destructive" | "cancel"

export interface ActionSheetOption {
  /** Row label. */
  label: string
  /** Optional secondary line below the label. */
  description?: string
  /** Optional leading icon (lucide component or pre-rendered node). */
  icon?: IconProp
  /** `"destructive"` paints red. `"cancel"` is grouped in a separate panel. */
  style?: ActionSheetOptionStyle
  /** Block tap + dim opacity. */
  disabled?: boolean
  /** Fires when this option is tapped (before the promise resolves). */
  onPress?: () => void
}

export interface ActionSheetPresentOptions {
  /** Bold header above the options panel. */
  title?: string
  /** Smaller subtitle under the title. */
  message?: string
  /** Options rendered top → bottom. `style: "cancel"` is moved to its own panel. */
  options: ActionSheetOption[]
}

/* -------------------------------------------------------------------------- */
/*  Store — module-level singleton subscribed via useSyncExternalStore         */
/* -------------------------------------------------------------------------- */

interface ActionSheetState {
  open: boolean
  payload: ActionSheetPresentOptions | null
  resolve: ((index: number | null) => void) | null
}

let state: ActionSheetState = { open: false, payload: null, resolve: null }
const listeners = new Set<() => void>()

const emit = () => {
  for (const l of listeners) l()
}

const subscribe = (cb: () => void) => {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

const getSnapshot = () => state

const present = (
  options: ActionSheetPresentOptions,
): Promise<number | null> =>
  new Promise((resolve) => {
    if (state.resolve) state.resolve(null)
    state = { open: true, payload: options, resolve }
    emit()
  })

const close = (index: number | null) => {
  if (!state.open && !state.resolve) return
  const r = state.resolve
  state = { open: false, payload: null, resolve: null }
  emit()
  r?.(index)
}

/**
 * Imperative singleton API. Call anywhere; requires `<ActionSheetHost />`
 * mounted once at app root.
 *
 *     const i = await actionSheet.present({ ... })
 *     actionSheet.dismiss()
 */
export const actionSheet = {
  present,
  dismiss: () => close(null),
}

/* -------------------------------------------------------------------------- */
/*  Option row                                                                 */
/* -------------------------------------------------------------------------- */

interface OptionRowProps {
  option: ActionSheetOption
  onSelect: () => void
  isDark: boolean
}

const OptionRow = ({ option, onSelect, isDark }: OptionRowProps) => {
  const isDestructive = option.style === "destructive"
  const labelColor = isDestructive
    ? isDark
      ? tokens.color.error["500"]
      : tokens.color.error["600"]
    : isDark
      ? tokens.color.gray["100"]
      : tokens.color.gray["900"]
  const iconColor = labelColor
  const descriptionColor = isDark
    ? tokens.color.gray["400"]
    : tokens.color.gray["500"]

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={option.label}
      accessibilityState={{ disabled: option.disabled }}
      disabled={option.disabled}
      onPress={onSelect}
      style={({ pressed }) => ({
        opacity: option.disabled ? 0.4 : pressed ? 0.6 : 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 20,
        paddingVertical: 12,
        minHeight: 56,
      })}
    >
      {option.icon
        ? renderIcon(option.icon, "leading", {
            color: iconColor,
            size: 22,
          })
        : null}
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{
            color: labelColor,
            fontSize: 16,
            lineHeight: 22,
            fontWeight: "500",
          }}
          numberOfLines={1}
        >
          {option.label}
        </Text>
        {option.description ? (
          <Text
            style={{
              color: descriptionColor,
              fontSize: 13,
              lineHeight: 18,
            }}
            numberOfLines={2}
          >
            {option.description}
          </Text>
        ) : null}
      </View>
    </Pressable>
  )
}

const HairlineDivider = ({ isDark }: { isDark: boolean }) => (
  <View
    style={{
      height: 1,
      backgroundColor: isDark
        ? tokens.color.gray["800"]
        : tokens.color.gray["200"],
    }}
  />
)

/* -------------------------------------------------------------------------- */
/*  Host — single Modal that renders any pending sheet                         */
/* -------------------------------------------------------------------------- */

export interface ActionSheetHostProps {
  // Reserved for future per-mount overrides — none in v1.
}

export const ActionSheetHost = (_props: ActionSheetHostProps = {}) => {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const scheme = useColorScheme()
  const isDark = scheme === "dark"
  const insets = useSafeAreaInsets()

  const scrimOpacity = useRef(new Animated.Value(0)).current
  const slideY = useRef(new Animated.Value(40)).current

  const { mainOptions, cancelOption, cancelIndex } = useMemo(() => {
    const payload = snapshot.payload
    if (!payload) {
      return { mainOptions: [], cancelOption: null, cancelIndex: -1 }
    }
    const cIdx = payload.options.findIndex((o) => o.style === "cancel")
    return {
      mainOptions: payload.options.filter((o) => o.style !== "cancel"),
      cancelOption: cIdx >= 0 ? payload.options[cIdx] : null,
      cancelIndex: cIdx,
    }
  }, [snapshot.payload])

  const indexMap = useMemo<number[]>(() => {
    const payload = snapshot.payload
    if (!payload) return []
    return payload.options
      .map((o, i) => (o.style === "cancel" ? -1 : i))
      .filter((i) => i >= 0)
  }, [snapshot.payload])

  const handleSelect = useCallback(
    (resolvedIndex: number) => {
      const opt = snapshot.payload?.options[resolvedIndex]
      opt?.onPress?.()
      close(resolvedIndex)
    },
    [snapshot.payload],
  )

  const handleCancel = useCallback(() => {
    if (cancelOption && cancelIndex >= 0) {
      cancelOption.onPress?.()
      close(cancelIndex)
    } else {
      close(null)
    }
  }, [cancelOption, cancelIndex])

  // Drive the scrim fade + content slide when the store flips.
  if (snapshot.open) {
    Animated.parallel([
      Animated.timing(scrimOpacity, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideY, {
        toValue: 0,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start()
  } else {
    scrimOpacity.setValue(0)
    slideY.setValue(40)
  }

  const surfaceBg = isDark ? tokens.color.gray["900"] : tokens.color.white
  const titleColor = isDark ? tokens.color.gray["100"] : tokens.color.gray["900"]
  const messageColor = isDark
    ? tokens.color.gray["400"]
    : tokens.color.gray["500"]
  const shadow = pickShadow("xl", isDark ? "dark" : "light")
  const groupRadius = 14

  return (
    <Modal
      visible={snapshot.open}
      transparent
      animationType="none"
      onRequestClose={() => close(null)}
      statusBarTranslucent
    >
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Animated.View
          style={{
            ...ABSOLUTE_FILL,
            backgroundColor: "rgba(0,0,0,0.5)",
            opacity: scrimOpacity,
          }}
        >
          <Pressable
            style={{ flex: 1 }}
            onPress={() => close(null)}
            accessibilityLabel="Dismiss action sheet"
          />
        </Animated.View>

        <Animated.View
          style={{
            paddingHorizontal: 12,
            paddingBottom: insets.bottom + 8,
            transform: [{ translateY: slideY }],
          }}
        >
          {/* Main options panel */}
          <View
            style={{
              backgroundColor: surfaceBg,
              borderRadius: groupRadius,
              overflow: "hidden",
              ...shadow,
            }}
          >
            {(snapshot.payload?.title || snapshot.payload?.message) ? (
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingTop: 16,
                  paddingBottom: 12,
                  gap: 4,
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: isDark
                    ? tokens.color.gray["800"]
                    : tokens.color.gray["200"],
                }}
              >
                {snapshot.payload.title ? (
                  <Text
                    style={{
                      color: titleColor,
                      fontSize: 16,
                      lineHeight: 22,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                    numberOfLines={2}
                  >
                    {snapshot.payload.title}
                  </Text>
                ) : null}
                {snapshot.payload.message ? (
                  <Text
                    style={{
                      color: messageColor,
                      fontSize: 13,
                      lineHeight: 18,
                      textAlign: "center",
                    }}
                    numberOfLines={4}
                  >
                    {snapshot.payload.message}
                  </Text>
                ) : null}
              </View>
            ) : null}
            {mainOptions.map((opt, idx) => {
              const originalIndex = indexMap[idx] ?? idx
              return (
                <View key={`${opt.label}-${idx}`}>
                  {idx > 0 ? <HairlineDivider isDark={isDark} /> : null}
                  <OptionRow
                    option={opt}
                    onSelect={() => handleSelect(originalIndex)}
                    isDark={isDark}
                  />
                </View>
              )
            })}
          </View>

          {/* Cancel panel — separated, iOS-style */}
          {cancelOption ? (
            <View
              style={{
                marginTop: 8,
                backgroundColor: surfaceBg,
                borderRadius: groupRadius,
                overflow: "hidden",
                ...shadow,
              }}
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={cancelOption.label}
                onPress={handleCancel}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.6 : 1,
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 56,
                  paddingVertical: 12,
                })}
              >
                <Text
                  style={{
                    color: titleColor,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                  numberOfLines={1}
                >
                  {cancelOption.label}
                </Text>
              </Pressable>
            </View>
          ) : null}
        </Animated.View>
      </View>
    </Modal>
  )
}

ActionSheetHost.displayName = "ActionSheetHost"

const ABSOLUTE_FILL = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}

/* -------------------------------------------------------------------------- */
/*  Hook form — for consumers who prefer `const { present } = useActionSheet()` */
/* -------------------------------------------------------------------------- */

export interface ActionSheetApi {
  present: typeof present
}

export function useActionSheet(): ActionSheetApi {
  return { present }
}
