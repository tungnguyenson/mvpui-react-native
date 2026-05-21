/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * Path: components/buttons/button.tsx Spinner SVG
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { iconSize as tokenIconSize, tokens } from "@mvp-ui-rn/tokens"
import { useEffect } from "react"
import { useColorScheme } from "react-native"
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

   Two-circle pattern: a dim full ring at 30% opacity behind a bright
   dashed arc that rotates continuously. RN's `ActivityIndicator` ships an
   iOS-native "asterisk" style that diverges from the web look, so we
   render an SVG and drive rotation with Reanimated.

   Standalone API accepts token-keyed `size` ("sm" | "md" | "lg" | number)
   and semantic `tint` ("fg" | "fg-secondary" | …) that auto-flips
   light/dark via `useColorScheme`. Raw `color` prop (RN color string)
   still overrides — used by `Button` to share its per-variant tint map.
   ========================================================================== */

type SpinnerSizeKey = "sm" | "md" | "lg"

const SPINNER_PX_SIZE: Record<SpinnerSizeKey, number> = {
  sm: tokenIconSize.sm,
  md: tokenIconSize.md,
  lg: tokenIconSize.lg,
}

/**
 * Semantic tint -> light/dark hex maps. Mirrors token resolution in
 * `packages/tokens/src/global.css` for the same alias keys.
 *
 * Lucide and react-native-svg both accept raw color strings only — they
 * do not resolve CSS variables — so we cannot route className. Keep the
 * map in sync with `--color-*` aliases.
 */
type SpinnerTint =
  | "fg"
  | "fg-secondary"
  | "fg-tertiary"
  | "fg-brand"
  | "fg-error"
  | "primary-fg"

const tintLight: Record<SpinnerTint, string> = {
  fg: tokens.color.gray["900"],
  "fg-secondary": tokens.color.gray["700"],
  "fg-tertiary": tokens.color.gray["500"],
  "fg-brand": tokens.color.brand["600"],
  "fg-error": tokens.color.error["600"],
  "primary-fg": "#ffffff", // dark-ok: white on brand fill, light + dark
}

const tintDark: Record<SpinnerTint, string> = {
  fg: tokens.color.gray["25"],
  "fg-secondary": tokens.color.gray["300"],
  "fg-tertiary": tokens.color.gray["400"],
  "fg-brand": tokens.color.brand["400"],
  "fg-error": tokens.color.error["500"],
  "primary-fg": "#ffffff", // dark-ok
}

export interface SpinnerProps {
  /**
   * Token-keyed size (`sm` / `md` / `lg`) or a raw pixel number when the
   * surrounding context dictates a non-standard glyph dimension.
   * @default "md"
   */
  size?: SpinnerSizeKey | number
  /**
   * Raw color (RN color string). Overrides `tint` when set. Used by
   * `Button` to share its per-variant tint map verbatim.
   */
  color?: string
  /**
   * Semantic tint — flips light/dark via `useColorScheme()`. Ignored when
   * `color` is set.
   * @default "fg"
   */
  tint?: SpinnerTint
  /** Full rotation period (ms). Default matches web (~750ms). */
  durationMs?: number
}

export function Spinner({
  size = "md",
  color,
  tint = "fg",
  durationMs = 750,
}: SpinnerProps) {
  const scheme = useColorScheme()
  const isDark = scheme === "dark"
  const resolvedSize = typeof size === "number" ? size : SPINNER_PX_SIZE[size]
  const resolvedColor =
    color ?? (isDark ? tintDark[tint] : tintLight[tint])

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
    width: resolvedSize,
    height: resolvedSize,
  }))

  return (
    <Animated.View
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      style={animatedStyle}
    >
      <Svg width={resolvedSize} height={resolvedSize} viewBox="0 0 20 20" fill="none">
        <Circle
          cx={10}
          cy={10}
          r={8}
          stroke={resolvedColor}
          strokeOpacity={0.3}
          strokeWidth={2}
          fill="none"
        />
        <Circle
          cx={10}
          cy={10}
          r={8}
          stroke={resolvedColor}
          strokeWidth={2}
          strokeDasharray="12.5 50"
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    </Animated.View>
  )
}

export type SpinnerSize = SpinnerSizeKey
export type SpinnerTintKey = SpinnerTint
