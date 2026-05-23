/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and sonner.
 *
 * Copyright (c) 2026 TungMVP
* Licensed under MIT
 */

import { pickShadow, tokens } from "@mvp-ui-rn/tokens"
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react-native"
import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import { Pressable, Text, View, useColorScheme } from "react-native"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { cn } from "../lib/cn"

/* ==========================================================================
   Toast — ephemeral feedback bar, fire-and-forget imperative API.

   Mounted once via `<Toaster />` in app root. Anywhere in the tree can call
   `toast.success("Saved")` / `toast.error("Failed")` / etc.

   Mobile delta vs web sonner:
   - Position is `"top"` or `"bottom"` (safe-area aware) — web's 4-corner
     stack collapses to a vertical center axis on phones.
   - No rich-text descriptions / action buttons in v1 — title + variant
     icon + optional dismiss. Sonner-style `action` lands in a follow-up
     when SettingsRow + composite UX matures.
   - Reanimated slide-in/out instead of CSS animations.
   ========================================================================== */

export type ToastVariant = "info" | "success" | "warning" | "error"
export type ToastPosition = "top" | "bottom"

export interface ToastOptions {
  description?: string
  /** Auto-dismiss delay in ms. @default 4000. Pass `Infinity` to require manual dismiss. */
  duration?: number
  /** Show close button. @default true */
  dismissible?: boolean
}

interface ToastRecord extends ToastOptions {
  id: number
  title: string
  variant: ToastVariant
}

/* -------------------------------------------------------------------------- */
/*  Store — module-level singleton, subscribed via useSyncExternalStore        */
/* -------------------------------------------------------------------------- */

let nextId = 1
let toasts: ToastRecord[] = []
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

const getSnapshot = () => toasts

const push = (
  title: string,
  variant: ToastVariant,
  options: ToastOptions = {},
): number => {
  const id = nextId++
  toasts = [...toasts, { id, title, variant, ...options }]
  emit()
  return id
}

const dismissById = (id: number) => {
  toasts = toasts.filter((t) => t.id !== id)
  emit()
}

const dismissAll = () => {
  toasts = []
  emit()
}

/* -------------------------------------------------------------------------- */
/*  Public imperative API                                                      */
/* -------------------------------------------------------------------------- */

interface ToastApi {
  (title: string, options?: ToastOptions): number
  info: (title: string, options?: ToastOptions) => number
  success: (title: string, options?: ToastOptions) => number
  warning: (title: string, options?: ToastOptions) => number
  error: (title: string, options?: ToastOptions) => number
  dismiss: (id?: number) => void
}

const baseToast = (title: string, options?: ToastOptions) =>
  push(title, "info", options)

export const toast: ToastApi = Object.assign(baseToast, {
  info: (title: string, options?: ToastOptions) =>
    push(title, "info", options),
  success: (title: string, options?: ToastOptions) =>
    push(title, "success", options),
  warning: (title: string, options?: ToastOptions) =>
    push(title, "warning", options),
  error: (title: string, options?: ToastOptions) =>
    push(title, "error", options),
  dismiss: (id?: number) => {
    if (id === undefined) dismissAll()
    else dismissById(id)
  },
})

/* -------------------------------------------------------------------------- */
/*  Variant maps                                                               */
/* -------------------------------------------------------------------------- */

const ICONS: Record<ToastVariant, typeof CheckCircle2> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
}

interface TintPair {
  light: string
  dark: string
}

const getIconTints = (): Record<ToastVariant, TintPair> => ({
  info: { light: tokens.color.brand["600"], dark: tokens.color.brand["400"] },
  success: {
    light: tokens.color.success["600"],
    dark: tokens.color.success["500"],
  },
  warning: {
    light: tokens.color.warning["600"],
    dark: tokens.color.warning["500"],
  },
  error: {
    light: tokens.color.error["600"],
    dark: tokens.color.error["500"],
  },
})

const VARIANT_BORDER: Record<ToastVariant, string> = {
  info: "border-info-border",
  success: "border-success-border",
  warning: "border-warning-border",
  error: "border-error-border",
}

/* -------------------------------------------------------------------------- */
/*  ToastItem — single toast renderer with auto-dismiss timer                  */
/* -------------------------------------------------------------------------- */

interface ToastItemProps {
  toast: ToastRecord
  isDark: boolean
  onDismiss: (id: number) => void
}

const DEFAULT_DURATION = 4000

const ToastItem = ({ toast: t, isDark, onDismiss }: ToastItemProps) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const duration = t.duration ?? DEFAULT_DURATION
  const Icon = ICONS[t.variant]
  const tint = isDark ? getIconTints()[t.variant].dark : getIconTints()[t.variant].light
  const dismissTint = isDark
    ? tokens.color.gray["400"]
    : tokens.color.gray["500"]
  const shadow = pickShadow("lg", isDark ? "dark" : "light")
  const dismissible = t.dismissible ?? true

  useEffect(() => {
    if (!Number.isFinite(duration)) return
    timerRef.current = setTimeout(() => onDismiss(t.id), duration)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [duration, t.id, onDismiss])

  return (
    <Animated.View
      entering={FadeIn.duration(150)}
      exiting={FadeOut.duration(120)}
      style={shadow}
      className={cn(
        "flex-row items-start gap-3 rounded-xl border bg-bg px-4 py-3",
        VARIANT_BORDER[t.variant],
      )}
    >
      <View className="pt-0.5">
        <Icon size={20} color={tint} />
      </View>
      <View className="flex-1 gap-0.5">
        <Text className="text-fg text-md font-semibold">{t.title}</Text>
        {t.description ? (
          <Text className="text-fg-secondary text-sm">{t.description}</Text>
        ) : null}
      </View>
      {dismissible ? (
        <Pressable
          accessibilityLabel="Dismiss"
          onPress={() => onDismiss(t.id)}
          hitSlop={10}
          className="w-11 h-11 -my-2 items-center justify-center"
        >
          <X size={18} color={dismissTint} />
        </Pressable>
      ) : null}
    </Animated.View>
  )
}

/* -------------------------------------------------------------------------- */
/*  Toaster — mounts the stack. Render once in app root.                       */
/* -------------------------------------------------------------------------- */

export interface ToasterProps {
  /**
   * @default "bottom". `"top"` would collide with the native iOS
   * `UINavigationBar` rendered by expo-router (lives outside the JS view
   * tree, so any z-index on the toast is irrelevant). Use `"top"` only on
   * screens with `headerShown: false`.
   */
  position?: ToastPosition
  /** Cap on simultaneously visible toasts. Older fall off. @default 3 */
  maxVisible?: number
  /** Class forwarded to the stack container. */
  className?: string
}

const Z_INDEX_TOASTER = 60

export const Toaster = ({
  position = "bottom",
  maxVisible = 3,
  className,
}: ToasterProps) => {
  const queue = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const scheme = useColorScheme()
  const insets = useSafeAreaInsets()
  const visible = queue.slice(-maxVisible)

  if (visible.length === 0) return null

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: position === "top" ? insets.top + 8 : undefined,
        bottom: position === "bottom" ? insets.bottom + 8 : undefined,
        zIndex: Z_INDEX_TOASTER,
        elevation: Z_INDEX_TOASTER,
      }}
      className={cn("px-4 gap-2", className)}
    >
      {(position === "top" ? visible : visible.slice().reverse()).map((t) => (
        <ToastItem
          key={t.id}
          toast={t}
          isDark={scheme === "dark"}
          onDismiss={dismissById}
        />
      ))}
    </View>
  )
}

Toaster.displayName = "Toaster"

/* -------------------------------------------------------------------------- */
/*  Re-export helpers                                                          */
/* -------------------------------------------------------------------------- */

export type ToastRendererProps = ToastItemProps

export interface ToastHelpers {
  render: ReactNode
}
