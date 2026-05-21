/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 *
 * Motion tokens — durations + cubic-bezier easings.
 *
 * Web CSS `transition-duration` maps to runtime ms values used by
 * Reanimated `withTiming({ duration, easing })`. Easings are exported in
 * cubic-bezier coefficient form for direct use with Reanimated's
 * `Easing.bezier(...)` factory.
 *
 * Pair durations + easings via intent:
 *   - micro UI feedback (button press) → fast + standard
 *   - state changes / drawer slide → normal + emphasized
 *   - large layout transitions → slow + emphasized
 */

export const duration = {
  /** 150ms — micro feedback, hover-equivalent state flips. */
  fast: 150,
  /** 200ms — default for most state changes. */
  normal: 200,
  /** 300ms — large surface transitions, route changes. */
  slow: 300,
  /** 500ms — onboarding pages, hero animations. */
  slowest: 500,
} as const

export type DurationKey = keyof typeof duration

/**
 * Cubic-bezier coefficients suitable for Reanimated's `Easing.bezier(...)`:
 * `Easing.bezier(...easing.emphasized).factory()`.
 */
export const easing = {
  /** Material 3 "standard" — linear-out, ease-in. Default for most cases. */
  standard: [0.2, 0, 0, 1] as const,
  /** Material 3 "emphasized" — overshoot near end. Use for layout reveals. */
  emphasized: [0.16, 1, 0.3, 1] as const,
  /** Linear — for spinners and continuous indeterminate motion. */
  linear: [0, 0, 1, 1] as const,
} as const

export type EasingKey = keyof typeof easing
