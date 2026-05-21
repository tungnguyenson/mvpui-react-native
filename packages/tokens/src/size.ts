/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 *
 * Sizing tokens — touch targets, control heights, control padding, icon
 * pixel sizes. Used by components that need runtime numbers (Reanimated
 * animations, StyleSheet, inline measurement) where Tailwind utility classes
 * cannot express the value.
 *
 * Ramp derives from `docs/tokens-rn-adjustments.md` §3a — mobile-tuned
 * (one Tailwind step above the web defaults).
 */

export const touchTarget = {
  /** Apple HIG floor. Use only inside dense containers (Toolbar, ListItem). */
  min: 44,
  /** Default for primary CTA, forms, and stand-alone controls. */
  comfort: 48,
  /** Hero CTA, onboarding. */
  prominent: 56,
  /** Marketing landing, modal primary. */
  hero: 64,
} as const

export type TouchTargetKey = keyof typeof touchTarget

export const controlHeight = {
  sm: 40,
  md: 48,
  lg: 56,
  xl: 64,
} as const

export type ControlSize = keyof typeof controlHeight

export const controlPaddingX = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
} as const

/** Lucide icon pixel size per control size. */
export const iconSize = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
} as const

export type IconSizeKey = keyof typeof iconSize
