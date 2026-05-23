/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/slider/slider.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Slider as RNSlider } from "@miblanchard/react-native-slider"
import { tokens } from "@mvp-ui-rn/tokens"
import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef } from "react"
import { useColorScheme, View, type ViewStyle } from "react-native"

import { cn } from "../lib/cn"

/* ==========================================================================
   Slider — RN port of mvp-ui (web) Slider.

   RN deltas vs. web:
   - Web `react-aria-components` Slider → RN `@miblanchard/react-native-slider`
     (pure JS, supports single + range thumb out of the box).
   - Native chrome on iOS UISlider has built-in thumb shadow. miblanchard
     renders a JS thumb — we own the visual. Thumb: 24px circle, white bg,
     1px brand border, shadow via tokens. Matches Untitled UI's web design.
   - Tracks: rounded 4px height. Active = `--color-primary` (brand-600 both
     modes). Inactive = `bg-bg-tertiary` (gray-50 light / gray-800 dark)
     resolved via `useColorScheme`.
   - Range mode: pass `value: [number, number]`. Two thumbs render
     automatically; `onChange` fires with the new pair.
   - `onSlidingComplete` separate from `onChange` for expensive commit work
     (debounced API calls etc.).
   ========================================================================== */

export type SliderSize = "sm" | "md"

const containerVariants = cva("w-full", {
  variants: {
    size: {
      sm: "h-10 justify-center",
      md: "h-12 justify-center",
    },
  },
  defaultVariants: { size: "md" },
})

const TRACK_HEIGHT = 4
const THUMB_SIZE = 24

const trackStyle: ViewStyle = {
  height: TRACK_HEIGHT,
  borderRadius: TRACK_HEIGHT / 2,
}

const thumbStyleBase: ViewStyle = {
  width: THUMB_SIZE,
  height: THUMB_SIZE,
  borderRadius: THUMB_SIZE / 2,
  backgroundColor: "#ffffff",
  borderWidth: 2,
  borderColor: tokens.color.brand[600],
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.15,
  shadowRadius: 3,
  elevation: 3,
}

export type SliderValue = number | [number, number]

export interface SliderProps extends VariantProps<typeof containerVariants> {
  value: SliderValue
  /** Fires continuously as the user drags. */
  onChange?: (value: SliderValue) => void
  /** Fires once when the user lifts (good for debounced commits). */
  onSlidingComplete?: (value: SliderValue) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  size?: SliderSize
  className?: string
}

function pairToValue(value: SliderValue, next: number[]): SliderValue {
  if (Array.isArray(value)) {
    return [next[0] ?? value[0], next[1] ?? value[1]]
  }
  return next[0] ?? (value as number)
}

export const Slider = forwardRef<View, SliderProps>(
  (
    {
      value,
      onChange,
      onSlidingComplete,
      min = 0,
      max = 100,
      step,
      disabled = false,
      size = "md",
      className,
    },
    ref,
  ) => {
    const scheme = useColorScheme()
    const isDark = scheme === "dark"

    const minTrackTint = tokens.color.brand[600]
    const maxTrackTint = isDark
      ? tokens.color.gray[700]
      : tokens.color.gray[200]
    const disabledMinTrackTint = isDark
      ? tokens.color.gray[700]
      : tokens.color.gray[300]

    return (
      <View
        ref={ref}
        className={cn(containerVariants({ size }), className)}
      >
        <RNSlider
          value={value}
          minimumValue={min}
          maximumValue={max}
          step={step}
          disabled={disabled}
          animationType="timing"
          minimumTrackTintColor={
            disabled ? disabledMinTrackTint : minTrackTint
          }
          maximumTrackTintColor={maxTrackTint}
          trackStyle={trackStyle}
          minimumTrackStyle={trackStyle}
          maximumTrackStyle={trackStyle}
          thumbStyle={thumbStyleBase}
          onValueChange={(values) => onChange?.(pairToValue(value, values))}
          onSlidingComplete={(values) =>
            onSlidingComplete?.(pairToValue(value, values))
          }
        />
      </View>
    )
  },
)

Slider.displayName = "Slider"
