/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and react-native-reusables.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import * as Haptics from "expo-haptics"
import { useMemo } from "react"

/* ==========================================================================
   haptics + useHaptics — Token-friendly wrapper over `expo-haptics`.

   Two surfaces:
   - Imperative singleton `haptics.*` for any-context use (event handlers,
     store actions, sagas). No preference gating.
   - Hook `useHaptics()` returning the same shape, with a future hook for
     opt-out (Settings → Reduce Motion / per-app toggle). v1 mirrors
     imperative; preference gating is the planned follow-up.

   Semantic mapping (web → RN feedback type):
   - selection  → `Haptics.selectionAsync()` — list scrub, toggle, segment.
   - impact.*   → `Haptics.impactAsync(style)` — UI element collision.
   - notify.*   → `Haptics.notificationAsync(type)` — success/warn/error.
   ========================================================================== */

export type HapticImpactStyle = "light" | "medium" | "heavy" | "soft" | "rigid"
export type HapticNotifyType = "success" | "warning" | "error"

const impactMap: Record<HapticImpactStyle, Haptics.ImpactFeedbackStyle> = {
  light: Haptics.ImpactFeedbackStyle.Light,
  medium: Haptics.ImpactFeedbackStyle.Medium,
  heavy: Haptics.ImpactFeedbackStyle.Heavy,
  soft: Haptics.ImpactFeedbackStyle.Soft,
  rigid: Haptics.ImpactFeedbackStyle.Rigid,
}

const notifyMap: Record<HapticNotifyType, Haptics.NotificationFeedbackType> = {
  success: Haptics.NotificationFeedbackType.Success,
  warning: Haptics.NotificationFeedbackType.Warning,
  error: Haptics.NotificationFeedbackType.Error,
}

export interface HapticsApi {
  selection: () => void
  impact: (style?: HapticImpactStyle) => void
  notify: (type?: HapticNotifyType) => void
}

const fire = (p: Promise<void>) => {
  // expo-haptics rejects on unsupported devices; swallow silently. The
  // consumer never awaits these for UI flow correctness.
  p.catch(() => {})
}

const selection: HapticsApi["selection"] = () => fire(Haptics.selectionAsync())

const impact: HapticsApi["impact"] = (style = "medium") =>
  fire(Haptics.impactAsync(impactMap[style]))

const notify: HapticsApi["notify"] = (type = "success") =>
  fire(Haptics.notificationAsync(notifyMap[type]))

/**
 * Imperative singleton. Call from anywhere.
 *
 *     import { haptics } from "@mvp-ui-rn/ui"
 *     haptics.selection()
 *     haptics.impact("light")
 *     haptics.notify("success")
 */
export const haptics: HapticsApi = {
  selection,
  impact,
  notify,
}

/**
 * Hook variant — returns the same shape. Future iterations may gate calls
 * on a user preference (Settings → Reduce Motion); v1 is identity.
 *
 *     const h = useHaptics()
 *     h.selection()
 */
export function useHaptics(): HapticsApi {
  return useMemo(
    () => ({
      selection,
      impact,
      notify,
    }),
    [],
  )
}
