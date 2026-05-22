/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/progress/progress-bar.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { duration as motionDuration, easing as motionEasing } from "@mvp-ui-rn/tokens"
import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, useEffect, type ComponentRef } from "react"
import { Text, View, type ViewProps } from "react-native"
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

import { cn } from "../lib/cn"

/* ==========================================================================
   ProgressBar — RN port of mvp-ui (web) ProgressBar (linear).

   Determinate horizontal progress. Track + animated fill. Width
   percentage transitions via Reanimated `withTiming` so consumers can
   feed a live `value` and the bar eases between updates rather than
   snapping.

   RN deltas:
   - Web `transition: width 300ms` → Reanimated `withTiming`. Same easing
     intent: motion token `easing.standard`.
   - Web stripe / shimmer variants dropped from v1 (decorative; defer).
   - Web indeterminate mode dropped from v1 (different motion logic; use
     `<Spinner>` for indeterminate "thinking" UX).
   - `accessibilityRole="progressbar"` + `accessibilityValue` announces
     percentage to TalkBack / VoiceOver.
   ========================================================================== */

const trackVariants = cva("w-full overflow-hidden rounded-full bg-bg-tertiary", {
  variants: {
    size: {
      sm: "h-1.5",
      md: "h-2",
      lg: "h-2.5",
    },
  },
  defaultVariants: { size: "md" },
})

const fillVariants = cva("h-full rounded-full", {
  variants: {
    color: {
      primary: "bg-primary",
      success: "bg-success",
      warning: "bg-warning",
      error: "bg-error",
    },
  },
  defaultVariants: { color: "primary" },
})

export type ProgressBarSize = NonNullable<
  VariantProps<typeof trackVariants>["size"]
>
export type ProgressBarColor = NonNullable<
  VariantProps<typeof fillVariants>["color"]
>

export interface ProgressBarProps
  extends Omit<ViewProps, "accessibilityRole" | "accessibilityValue"> {
  /** Current value (0–100). Clamped at boundaries. */
  value: number
  /** @default "md" */
  size?: ProgressBarSize
  /** @default "primary" */
  color?: ProgressBarColor
  /** Optional caption text above the track (left aligned). */
  label?: string
  /** Render `${value}%` on the right of the caption row. */
  showValue?: boolean
  /** Override the animation duration (ms). @default motion `slow` (300ms). */
  animationDurationMs?: number
}

const clamp = (n: number) => (n < 0 ? 0 : n > 100 ? 100 : n)

export const ProgressBar = forwardRef<ComponentRef<typeof View>, ProgressBarProps>(
  (
    {
      value,
      size = "md",
      color = "primary",
      label,
      showValue = false,
      animationDurationMs = motionDuration.slow,
      className,
      ...props
    },
    ref,
  ) => {
    const target = clamp(value)
    const sv = useSharedValue(target)

    useEffect(() => {
      sv.value = withTiming(target, {
        duration: animationDurationMs,
        easing: Easing.bezier(...motionEasing.standard),
      })
    }, [sv, target, animationDurationMs])

    const animatedStyle = useAnimatedStyle(() => ({
      width: `${sv.value}%`,
    }))

    const hasCaption = label !== undefined || showValue
    const valueLabel = `${Math.round(target)}%`

    return (
      <View ref={ref} className={cn("w-full", className)} {...props}>
        {hasCaption ? (
          <View className="mb-2 flex-row items-center justify-between">
            <Text className="text-sm font-medium text-fg-secondary">
              {label ?? ""}
            </Text>
            {showValue ? (
              <Text className="text-sm font-medium text-fg-secondary">
                {valueLabel}
              </Text>
            ) : null}
          </View>
        ) : null}

        <View
          className={cn(trackVariants({ size }))}
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: 100, now: Math.round(target) }}
        >
          <Animated.View
            style={animatedStyle}
            className={cn(fillVariants({ color }))}
          />
        </View>
      </View>
    )
  },
)

ProgressBar.displayName = "ProgressBar"
