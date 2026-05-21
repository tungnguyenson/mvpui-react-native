/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 *
 * Elevation shadows for React Native.
 *
 * Web Tailwind `shadow-{sm,md,lg,xl}` map to CSS `box-shadow`. RN needs
 * iOS-specific shadow props + Android `elevation`. NativeWind v5 does not
 * synthesize these from the web shadow utility — components have to opt in
 * via `style={shadow.md}`.
 *
 * Dark-mode shadow tint: black at low opacity vanishes on dark surfaces.
 * `shadowDark` keeps the same offset/radius but darker and more opaque so
 * the elevation still reads. Pick the right map via `useColorScheme()`.
 */

import { Platform } from "react-native"

export interface ShadowStyle {
  shadowColor: string
  shadowOffset: { width: number; height: number }
  shadowOpacity: number
  shadowRadius: number
  /** Android-only; ignored on iOS. */
  elevation: number
}

export const shadow = {
  none: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: "#0a0a0a",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 1,
    elevation: 1,
  },
  sm: {
    shadowColor: "#0a0a0a",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#0a0a0a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: "#0a0a0a",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  xl: {
    shadowColor: "#0a0a0a",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.12,
    shadowRadius: 40,
    elevation: 16,
  },
} as const satisfies Record<string, ShadowStyle>

export const shadowDark = {
  none: shadow.none,
  xs: { ...shadow.xs, shadowColor: "#000000", shadowOpacity: 0.3 },
  sm: { ...shadow.sm, shadowColor: "#000000", shadowOpacity: 0.35 },
  md: { ...shadow.md, shadowColor: "#000000", shadowOpacity: 0.4 },
  lg: { ...shadow.lg, shadowColor: "#000000", shadowOpacity: 0.45 },
  xl: { ...shadow.xl, shadowColor: "#000000", shadowOpacity: 0.5 },
} as const satisfies Record<string, ShadowStyle>

export type ShadowKey = keyof typeof shadow

/**
 * Pick a shadow object for the current platform + appearance.
 * Strips iOS-only keys on Android (RN tolerates them but explicit is clearer).
 */
export function pickShadow(key: ShadowKey, mode: "light" | "dark" = "light"): ShadowStyle {
  const source = mode === "dark" ? shadowDark : shadow
  const s = source[key]
  if (Platform.OS === "android") {
    return {
      shadowColor: s.shadowColor,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: s.elevation,
    }
  }
  return s
}
