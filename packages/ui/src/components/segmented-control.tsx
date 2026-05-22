/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and react-native-reusables.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { useState } from "react"
import { Pressable, Text, View, type LayoutChangeEvent } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated"

import { cn } from "../lib/cn"

/* ==========================================================================
   SegmentedControl — RN-only. iOS-style pill picker for filter / mode
   switching. Distinct from `Tabs` (content navigation).

   Animated sliding indicator: the selected pill background lives in a
   single `Animated.View` that translates via Reanimated when the value
   changes. Segments overlay the indicator and only carry labels.

   Always controlled — caller owns `value` + `onChange` so the
   selection survives the parent's render cycles.
   ========================================================================== */

const CONTROL_HEIGHT = 40
const TRACK_PADDING = 4
const PILL_HEIGHT = CONTROL_HEIGHT - TRACK_PADDING * 2

export interface SegmentedControlOption<TValue extends string> {
  value: TValue
  label: string
}

export interface SegmentedControlProps<TValue extends string> {
  /** Visible options. Order determines the pill positions. */
  options: ReadonlyArray<SegmentedControlOption<TValue>>
  /** Currently-selected value. */
  value: TValue
  /** Fires when the user taps a different segment. */
  onChange: (value: TValue) => void
  className?: string
  /** Accessibility label for the whole tablist. */
  accessibilityLabel?: string
}

export function SegmentedControl<TValue extends string>({
  options,
  value,
  onChange,
  className,
  accessibilityLabel,
}: SegmentedControlProps<TValue>) {
  const [trackWidth, setTrackWidth] = useState(0)
  const translateX = useSharedValue(0)
  const segmentWidth =
    trackWidth > 0 ? (trackWidth - TRACK_PADDING * 2) / options.length : 0
  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  )

  // Snap the indicator to the current selection whenever layout changes
  // (initial mount + width changes) so the first paint lines up without
  // animating from x=0.
  if (segmentWidth > 0) {
    const target = selectedIndex * segmentWidth
    if (translateX.value === 0 && target !== 0 && Number.isFinite(target)) {
      translateX.value = target
    }
  }

  const handleSelect = (next: TValue, nextIndex: number) => {
    if (next === value) return
    translateX.value = withTiming(nextIndex * segmentWidth, {
      duration: 220,
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    })
    onChange(next)
  }

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  return (
    <View
      accessibilityRole="tablist"
      accessibilityLabel={accessibilityLabel}
      className={cn(
        "flex-row items-center rounded-lg bg-bg-tertiary",
        className,
      )}
      style={{ height: CONTROL_HEIGHT, padding: TRACK_PADDING }}
      onLayout={(e: LayoutChangeEvent) => setTrackWidth(e.nativeEvent.layout.width)}
    >
      {/* Sliding pill — sits behind the labels at z-0 */}
      {segmentWidth > 0 ? (
        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: "absolute",
              top: TRACK_PADDING,
              left: TRACK_PADDING,
              width: segmentWidth,
              height: PILL_HEIGHT,
              borderRadius: 6,
            },
            indicatorStyle,
          ]}
          className="bg-bg shadow-sm"
        />
      ) : null}

      {options.map((option, index) => {
        const isSelected = option.value === value
        return (
          <Pressable
            key={option.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={option.label}
            onPress={() => handleSelect(option.value, index)}
            className="flex-1 items-center justify-center"
            style={{ height: PILL_HEIGHT }}
          >
            <Text
              className={cn(
                "text-sm",
                isSelected ? "font-semibold text-fg" : "font-medium text-fg-tertiary",
              )}
            >
              {option.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}
