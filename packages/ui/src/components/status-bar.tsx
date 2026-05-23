/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and react-native-reusables.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { StatusBar as ExpoStatusBar } from "expo-status-bar"
import { useColorScheme } from "react-native"

/* ==========================================================================
   StatusBar — per-screen status-bar content color controller.

   Thin wrapper around `expo-status-bar` with auto scheme resolution that
   matches SafeArea's `statusBar` prop. Mount on screens that don't use
   <SafeArea> (e.g. full-bleed image headers, transparent screens).

   SafeArea already renders <StatusBar> when `statusBar != false` — do NOT
   mount both on the same screen or the style will conflict.
   ========================================================================== */

export type StatusBarStyle = "auto" | "light" | "dark" | "inverted"

export interface StatusBarProps {
  /**
   * Status bar content color.
   * - `"auto"` (default): follows `useColorScheme` — dark scheme → light
   *   content; light scheme → dark content.
   * - `"inverted"`: opposite of `"auto"`.
   * - `"light"` / `"dark"`: explicit override.
   */
  style?: StatusBarStyle
  /** Hide the status bar entirely. @default false */
  hidden?: boolean
  /** Animate style transitions. @default true */
  animated?: boolean
}

export function StatusBar({
  style = "auto",
  hidden = false,
  animated = true,
}: StatusBarProps) {
  const scheme = useColorScheme()

  const resolved: "light" | "dark" =
    style === "light"
      ? "light"
      : style === "dark"
        ? "dark"
        : style === "inverted"
          ? scheme === "dark"
            ? "dark"
            : "light"
          : // "auto"
            scheme === "dark"
            ? "light"
            : "dark"

  return <ExpoStatusBar style={resolved} hidden={hidden} animated={animated} />
}
