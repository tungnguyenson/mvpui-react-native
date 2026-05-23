/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and react-native-reusables.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { duration as motionDuration, easing as motionEasing, tokens } from "@mvp-ui-rn/tokens"
import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, useEffect, type ComponentRef } from "react"
import { StyleSheet, Text, View, useColorScheme, type ViewProps } from "react-native"
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import Svg, { Circle } from "react-native-svg"

import { cn } from "../lib/cn"

/* ==========================================================================
   CircularProgress — determinate circular progress ring.

   react-native-svg `<Circle>` with animated `strokeDashoffset` via
   Reanimated worklet (`useAnimatedProps`). Track ring (full, muted) behind
   a fill ring (animated arc, brand-colored). Arc starts at 12 o'clock via
   `rotation={-90}`.

   API mirrors ProgressBar (same `value`, `color`, `showValue`,
   `animationDurationMs`) with the addition of `size` (raw px) and
   `thickness` (stroke width).

   RN deltas vs. web:
   - No web equivalent. Built fresh for RN.
   - react-native-svg does not accept Tailwind className — colors resolved
     via JS token map + useColorScheme().
   - `strokeDashoffset` animation lives on the Reanimated worklet thread.
   ========================================================================== */

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const colorVariants = cva("", {
  variants: {
    color: {
      primary: "",
      success: "",
      warning: "",
      error: "",
    },
  },
  defaultVariants: { color: "primary" },
})

export type CircularProgressColor = NonNullable<
  VariantProps<typeof colorVariants>["color"]
>

const getFillColorLight = (): Record<CircularProgressColor, string> => ({
  primary: tokens.color.brand["600"],
  success: tokens.color.success["600"],
  warning: tokens.color.warning["600"],
  error: tokens.color.error["600"],
})

const getFillColorDark = (): Record<CircularProgressColor, string> => ({
  primary: tokens.color.brand["400"],
  success: tokens.color.success["500"],
  warning: tokens.color.warning["500"],
  error: tokens.color.error["500"],
})

// bg-bg-tertiary equivalent: gray-100 light / gray-800 dark
const TRACK_LIGHT = tokens.color.gray["100"]
const TRACK_DARK = tokens.color.gray["800"]

const clamp = (n: number) => (n < 0 ? 0 : n > 100 ? 100 : n)

export interface CircularProgressProps
  extends Omit<ViewProps, "accessibilityRole" | "accessibilityValue"> {
  /** Current value (0–100). Clamped at boundaries. */
  value: number
  /** Diameter of the ring in px. @default 48 */
  size?: number
  /** Stroke width in px. @default 4 */
  thickness?: number
  /** @default "primary" */
  color?: CircularProgressColor
  /** Center label text. Overrides `showValue` when both are set. */
  label?: string
  /** Render `${value}%` in the center. */
  showValue?: boolean
  /** Override the animation duration (ms). @default motion `slow` (300ms). */
  animationDurationMs?: number
}

export const CircularProgress = forwardRef<
  ComponentRef<typeof View>,
  CircularProgressProps
>(
  (
    {
      value,
      size = 48,
      thickness = 4,
      color = "primary",
      label,
      showValue = false,
      animationDurationMs = motionDuration.slow,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const scheme = useColorScheme()
    const isDark = scheme === "dark"

    const target = clamp(value)
    const r = (size - thickness) / 2
    const cx = size / 2
    const cy = size / 2
    const circumference = 2 * Math.PI * r

    const sv = useSharedValue(circumference) // full offset = empty ring on mount

    useEffect(() => {
      sv.value = withTiming(circumference * (1 - target / 100), {
        duration: animationDurationMs,
        easing: Easing.bezier(...motionEasing.standard),
      })
    }, [sv, circumference, target, animationDurationMs])

    const animatedProps = useAnimatedProps(() => ({
      strokeDashoffset: sv.value,
    }))

    const fillColor = (isDark ? getFillColorDark() : getFillColorLight())[color]
    const trackColor = isDark ? TRACK_DARK : TRACK_LIGHT
    const centerText = label ?? (showValue ? `${Math.round(target)}%` : null)

    return (
      <View
        ref={ref}
        style={[{ width: size, height: size }, style]}
        className={cn(className)}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: Math.round(target) }}
        {...props}
      >
        <Svg width={size} height={size}>
          {/* Track (full circle, muted) */}
          <Circle
            cx={cx}
            cy={cy}
            r={r}
            stroke={trackColor}
            strokeWidth={thickness}
            fill="none"
          />
          {/* Fill (animated arc, starts at 12 o'clock) */}
          <AnimatedCircle
            cx={cx}
            cy={cy}
            r={r}
            stroke={fillColor}
            strokeWidth={thickness}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            rotation={-90}
            origin={`${cx},${cy}`}
            animatedProps={animatedProps}
          />
        </Svg>

        {centerText ? (
          <View
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
            className="items-center justify-center"
          >
            <Text className="text-xs font-semibold text-fg">{centerText}</Text>
          </View>
        ) : null}
      </View>
    )
  },
)
CircularProgress.displayName = "CircularProgress"
