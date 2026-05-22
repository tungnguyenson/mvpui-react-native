/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and react-native-reusables.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { useEffect } from "react"
import { type ViewStyle } from "react-native"
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"

import { cn } from "../lib/cn"

/* ==========================================================================
   Skeleton — RN-only loading placeholder with Reanimated opacity shimmer.

   Shapes:
   - `rect`   — bounded rectangle. `width` / `height` / `rounded`.
   - `circle` — square + `rounded-full`. `size` controls both axes.
   - `text`   — line-of-text placeholder. Height locks to ~text-md line
     height (24px); `width` defaults to `"100%"`.

   The shimmer animates `opacity` between 0.45 and 1 with a cubic ease
   over 1200ms, repeating reverse. Single `<Animated.View>` — no
   masked-gradient overlay, no LinearGradient dep.
   ========================================================================== */

const PULSE_DURATION_MS = 1200
const PULSE_MIN_OPACITY = 0.45
const PULSE_MAX_OPACITY = 1

const TEXT_LINE_HEIGHT = 24

export type SkeletonShape = "rect" | "circle" | "text"

export interface SkeletonProps {
  shape?: SkeletonShape
  /** Width in pixels or percentage string. Ignored for `circle`. */
  width?: number | string
  /** Height in pixels. Ignored for `circle` and `text`. */
  height?: number
  /** Diameter for `circle` only. */
  size?: number
  /** Border radius in pixels. Ignored for `circle` and `text`. */
  rounded?: number
  className?: string
}

export function Skeleton({
  shape = "rect",
  width,
  height,
  size,
  rounded = 6,
  className,
}: SkeletonProps) {
  const opacity = useSharedValue(PULSE_MAX_OPACITY)

  useEffect(() => {
    opacity.value = PULSE_MAX_OPACITY
    opacity.value = withRepeat(
      withTiming(PULSE_MIN_OPACITY, {
        duration: PULSE_DURATION_MS,
        easing: Easing.inOut(Easing.cubic),
      }),
      -1,
      true,
    )
    return () => {
      cancelAnimation(opacity)
    }
  }, [opacity])

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }))

  const dims: ViewStyle = (() => {
    if (shape === "circle") {
      const s = size ?? 40
      return { width: s, height: s, borderRadius: s / 2 }
    }
    if (shape === "text") {
      return {
        width: (width ?? "100%") as ViewStyle["width"],
        height: TEXT_LINE_HEIGHT,
        borderRadius: TEXT_LINE_HEIGHT / 2,
      }
    }
    return {
      width: (width ?? "100%") as ViewStyle["width"],
      height: height ?? 16,
      borderRadius: rounded,
    }
  })()

  return (
    <Animated.View
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      className={cn("bg-bg-tertiary", className)}
      style={[dims, animatedStyle]}
    />
  )
}
