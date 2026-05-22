/**
 * Built from Untitled UI Figma reference (PRO license) + iOS Mail
 * swipe-to-action conventions.
 *
 * Implementation on `ReanimatedSwipeable` from
 * `react-native-gesture-handler`. Requires a `<GestureHandlerRootView>`
 * ancestor (mounted at app root for BottomSheet — see
 * `apps/showcase/src/app/_layout.tsx`).
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { tokens } from "@mvp-ui-rn/tokens"
import ReanimatedSwipeable, {
  type SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable"
import { forwardRef, useImperativeHandle, useRef, type ReactNode, type Ref } from "react"
import { Pressable, Text, View, useColorScheme } from "react-native"

import { cn } from "../lib/cn"
import { renderIcon, type IconProp } from "../lib/render-icon"

/* ==========================================================================
   SwipeableRow — left/right swipe reveals action buttons.

   Mobile-native interaction without a web analog. Common uses:
     - Mail-style "Archive" / "Trash" / "Pin" on a list row.
     - Delete swipe on a settings item.
     - Quick-actions on chat messages.

   API (data-driven — keeps action styling design-system controlled):

       <SwipeableRow
         rightActions={[
           { key: "pin", label: "Pin", icon: Pin, onPress: handlePin },
           { key: "delete", label: "Delete", color: "destructive", icon: Trash2, onPress: handleDelete },
         ]}
         onSwipeOpen={(side) => console.log(side)}
       >
         <ListItem title="Olivia Rhye" ... />
       </SwipeableRow>

   Convention:
     - Destructive action goes RIGHT-most (iOS Mail pattern).
     - Each action is a fixed-width column (default 80pt).
     - Tapping an action fires its `onPress` and auto-closes the row.
     - Touch target is at least 44pt tall — the row height drives the
       action height.
   ========================================================================== */

export type SwipeableActionColor = "primary" | "destructive" | "neutral"

export interface SwipeableAction {
  /** Stable key for the action button. */
  key: string
  /** Label rendered under the icon. */
  label: string
  /** Optional icon component or pre-rendered node. */
  icon?: IconProp
  /** Visual tone. @default "primary" */
  color?: SwipeableActionColor
  /** Pixel width of the action column. @default 80 */
  width?: number
  /** Handler. Row auto-closes after this fires. */
  onPress: () => void
}

export interface SwipeableRowRef {
  /** Animate to closed state. */
  close: () => void
  /** Open the left action panel. */
  openLeft: () => void
  /** Open the right action panel. */
  openRight: () => void
  /** Reset to closed without animation. */
  reset: () => void
}

export interface SwipeableRowProps {
  /** Actions revealed on left-to-right swipe (leading edge). */
  leftActions?: SwipeableAction[]
  /** Actions revealed on right-to-left swipe (trailing edge). */
  rightActions?: SwipeableAction[]
  /** Fires when a side fully opens. */
  onSwipeOpen?: (direction: "left" | "right") => void
  /** Block the gesture without removing the actions. */
  enabled?: boolean
  /** Friction applied to the gesture. @default 2 */
  friction?: number
  /** Row content. */
  children?: ReactNode
  /** Class forwarded to the children-container view. */
  className?: string
}

const DEFAULT_ACTION_WIDTH = 80

const COLOR_LIGHT: Record<SwipeableActionColor, { bg: string; fg: string }> = {
  primary: {
    bg: tokens.color.brand["600"],
    fg: "#ffffff",
  },
  destructive: {
    bg: tokens.color.error["600"],
    fg: "#ffffff",
  },
  neutral: {
    bg: tokens.color.gray["200"],
    fg: tokens.color.gray["800"],
  },
}

const COLOR_DARK: Record<SwipeableActionColor, { bg: string; fg: string }> = {
  primary: {
    bg: tokens.color.brand["600"],
    fg: "#ffffff",
  },
  destructive: {
    bg: tokens.color.error["600"],
    fg: "#ffffff",
  },
  neutral: {
    bg: tokens.color.gray["700"],
    fg: tokens.color.gray["100"],
  },
}

interface ActionPanelProps {
  side: "left" | "right"
  actions: SwipeableAction[]
  methods: SwipeableMethods
  isDark: boolean
}

const ActionPanel = ({ side, actions, methods, isDark }: ActionPanelProps) => {
  const tints = isDark ? COLOR_DARK : COLOR_LIGHT
  // Right-side panel ordered LTR (leftmost = least-destructive) so the
  // user can read left → right while the panel slides in from the trailing
  // edge. Left-side panel keeps natural order.
  const ordered = actions

  return (
    <View
      className={cn(
        "flex-row",
        side === "left" ? "justify-start" : "justify-end",
      )}
    >
      {ordered.map((action) => {
        const tone = tints[action.color ?? "primary"]
        const width = action.width ?? DEFAULT_ACTION_WIDTH
        return (
          <Pressable
            key={action.key}
            accessibilityRole="button"
            accessibilityLabel={action.label}
            onPress={() => {
              action.onPress()
              methods.close()
            }}
            style={({ pressed }) => ({
              width,
              backgroundColor: tone.bg,
              opacity: pressed ? 0.8 : 1,
            })}
            className="items-center justify-center px-2 py-3"
          >
            {action.icon
              ? renderIcon(action.icon, "leading", {
                  color: tone.fg,
                  size: 22,
                })
              : null}
            <Text
              className="mt-1 text-sm font-semibold"
              numberOfLines={1}
              style={{ color: tone.fg }}
            >
              {action.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

export const SwipeableRow = forwardRef<SwipeableRowRef, SwipeableRowProps>(
  (
    {
      leftActions,
      rightActions,
      onSwipeOpen,
      enabled = true,
      friction = 2,
      children,
      className,
    },
    ref,
  ) => {
    const innerRef = useRef<SwipeableMethods>(null)
    const scheme = useColorScheme()
    const isDark = scheme === "dark"

    useImperativeHandle(ref, () => ({
      close: () => innerRef.current?.close(),
      openLeft: () => innerRef.current?.openLeft(),
      openRight: () => innerRef.current?.openRight(),
      reset: () => innerRef.current?.reset(),
    }))

    return (
      <ReanimatedSwipeable
        ref={innerRef as Ref<SwipeableMethods>}
        enabled={enabled}
        friction={friction}
        // Threshold = half the panel's width by default; lower it slightly
        // so a fast flick latches open without requiring a full 50% drag.
        leftThreshold={
          leftActions
            ? (sumWidth(leftActions) || DEFAULT_ACTION_WIDTH) / 2
            : undefined
        }
        rightThreshold={
          rightActions
            ? (sumWidth(rightActions) || DEFAULT_ACTION_WIDTH) / 2
            : undefined
        }
        overshootLeft={false}
        overshootRight={false}
        renderLeftActions={
          leftActions && leftActions.length > 0
            ? (_progress, _translation, methods) => (
                <ActionPanel
                  side="left"
                  actions={leftActions}
                  methods={methods}
                  isDark={isDark}
                />
              )
            : undefined
        }
        renderRightActions={
          rightActions && rightActions.length > 0
            ? (_progress, _translation, methods) => (
                <ActionPanel
                  side="right"
                  actions={rightActions}
                  methods={methods}
                  isDark={isDark}
                />
              )
            : undefined
        }
        onSwipeableOpen={(direction) => onSwipeOpen?.(direction)}
        childrenContainerStyle={{ backgroundColor: isDark ? tokens.color.gray["900"] : tokens.color.white }}
      >
        <View className={cn("flex-1", className)}>{children}</View>
      </ReanimatedSwipeable>
    )
  },
)

SwipeableRow.displayName = "SwipeableRow"

function sumWidth(actions: SwipeableAction[]): number {
  let total = 0
  for (const action of actions) {
    total += action.width ?? DEFAULT_ACTION_WIDTH
  }
  return total
}
