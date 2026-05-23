/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 *
 * Sizing tokens — touch targets, control heights, control padding, icon
 * pixel sizes. Used by components that need runtime numbers (Reanimated
 * animations, StyleSheet, inline measurement) where Tailwind utility classes
 * cannot express the value.
 *
 * Ramp derives from `docs/tokens-rn-adjustments.md` §3a — mobile-tuned,
 * shifted +1 Tailwind step above the prior RN defaults.
 */

export const touchTarget = {
  /** Apple HIG floor. Use only inside dense containers (Toolbar, ListItem). */
  min: 44,
  /** Default for primary CTA, forms, and stand-alone controls. */
  comfort: 56,
  /** Hero CTA, onboarding. */
  prominent: 64,
  /** Marketing landing, modal primary. */
  hero: 72,
} as const

export type TouchTargetKey = keyof typeof touchTarget

export const controlHeight = {
  sm: 44,
  md: 56,
  lg: 64,
  xl: 72,
} as const

export type ControlSize = keyof typeof controlHeight

export const controlPaddingX = {
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
} as const

/** Lucide icon pixel size per control size. */
export const iconSize = {
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
} as const

export type IconSizeKey = keyof typeof iconSize
