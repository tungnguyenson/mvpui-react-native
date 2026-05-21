/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * Path: components/buttons/button.tsx Spinner SVG
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { useEffect } from "react"
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"
import Svg, { Circle } from "react-native-svg"

/* ==========================================================================
   Spinner — RN port of the inline SVG spinner inside mvp-ui (web) Button.

   Mirrors the two-circle pattern: a dim full ring at 30% opacity behind a
   bright dashed arc that rotates continuously. The RN ActivityIndicator
   ships an iOS-native "asterisk" style that diverges from the web look, so
   we render an SVG and drive rotation with Reanimated.
   ========================================================================== */

export interface SpinnerProps {
  /** Pixel width/height. Matches the surrounding label glyph size. */
  size?: number
  /**
   * Stroke color (RN color string). Caller resolves from tokens — the
   * spinner does not inherit from a parent `<Text>` color.
   */
  color: string
  /** Full rotation period (ms). Default matches web (~750ms). */
  durationMs?: number
}

export function Spinner({ size = 16, color, durationMs = 750 }: SpinnerProps) {
  const rotation = useSharedValue(0)

  useEffect(() => {
    rotation.value = 0
    rotation.value = withRepeat(
      withTiming(360, { duration: durationMs, easing: Easing.linear }),
      -1,
      false,
    )
    return () => {
      cancelAnimation(rotation)
    }
  }, [rotation, durationMs])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
    width: size,
    height: size,
  }))

  return (
    <Animated.View style={animatedStyle}>
      <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <Circle
          cx={10}
          cy={10}
          r={8}
          stroke={color}
          strokeOpacity={0.3}
          strokeWidth={2}
          fill="none"
        />
        <Circle
          cx={10}
          cy={10}
          r={8}
          stroke={color}
          strokeWidth={2}
          strokeDasharray="12.5 50"
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    </Animated.View>
  )
}
