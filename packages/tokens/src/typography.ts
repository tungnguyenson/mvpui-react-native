/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 *
 * Typography ramp — fontSize + lineHeight pairs.
 *
 * `global.css` declares `--text-*` (font-size only) so NativeWind generates
 * `text-{name}` utilities. RN does NOT auto-derive lineHeight, so this TS
 * module pairs each step with the matching line-height. Consumers that
 * compose Text inline (Reanimated, StyleSheet, computed heights) should
 * read from here; consumers using utility classes should also apply the
 * matching `leading-*` utility (see `global.css`).
 *
 * Ramp mirrors Untitled UI web type scale: body ~1.5x, display ~1.25x.
 */

export const textSize = {
  xs: { fontSize: 14, lineHeight: 20 },
  sm: { fontSize: 16, lineHeight: 24 },
  md: { fontSize: 18, lineHeight: 28 },
  lg: { fontSize: 20, lineHeight: 30 },
  xl: { fontSize: 24, lineHeight: 32 },
  "2xl": { fontSize: 30, lineHeight: 38 },
  "3xl": { fontSize: 36, lineHeight: 44 },
  "4xl": { fontSize: 48, lineHeight: 60 },
  "5xl": { fontSize: 60, lineHeight: 72 },
} as const

export type TextSizeKey = keyof typeof textSize

export const fontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const

export type FontWeightKey = keyof typeof fontWeight
