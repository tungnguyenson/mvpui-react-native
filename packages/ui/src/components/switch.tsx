/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/toggle/toggle.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { tokens } from "@mvp-ui-rn/tokens"
import * as SwitchPrim from "@rn-primitives/switch"
import { cva } from "class-variance-authority"
import {
  forwardRef,
  type ComponentRef,
  type ReactNode,
} from "react"
import { Text, View, useColorScheme } from "react-native"
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated"

import { cn } from "../lib/cn"

/* ==========================================================================
   Switch — RN port of mvp-ui (web) Toggle.

   RN deltas vs. web:
   - Web `ring` outline on the track → RN flat track with explicit
     `backgroundColor` interpolated by Reanimated. Avoids the unsupported
     `ring-*` utility and gives a buttery smooth color crossfade.
   - Web `slim` variant (bordered track) deferred — iOS-native pill is
     the dominant mobile pattern, slim is rarely used outside dashboards.
     Track open-follow-ups for re-add.
   - Web focus-visible outline dropped (RN has no focus-visible primitive,
     touch is the dominant input). Disabled state still surfaces via 50%
     opacity.
   - Thumb position + track color animate together over 200ms via
     `useDerivedValue(withTiming(...))` so a controlled `checked` change
     glides instead of snapping.
   - Sizes bumped from web: web sm=20×36 / md=24×44 → RN sm=24×44 /
     md=28×52 to align with iOS UISwitch dimensions + ≥ 44pt touch on
     the bare-pill press target.
   - Tap-anywhere-on-row behaviour: when `label` / `hint` exist the
     primitive Root spans the whole row; bare-pill renders Root sized to
     the pill itself.
   ========================================================================== */

/** Resolves --color-primary-fg in both modes (white). */
const THUMB_FG = "#ffffff"

export type SwitchSize = "sm" | "md"

interface SizeSpec {
  trackHeight: number
  trackWidth: number
  thumbSize: number
  inset: number
}

const SIZE_MAP: Record<SwitchSize, SizeSpec> = {
  sm: { trackHeight: 28, trackWidth: 52, thumbSize: 24, inset: 2 },
  md: { trackHeight: 32, trackWidth: 60, thumbSize: 28, inset: 2 },
}

const labelTextVariants = cva("font-medium text-fg-secondary", {
  variants: {
    size: { sm: "text-sm", md: "text-md" },
  },
  defaultVariants: { size: "md" },
})

const hintTextVariants = cva("text-fg-tertiary", {
  variants: {
    size: { sm: "text-sm", md: "text-md" },
  },
  defaultVariants: { size: "md" },
})

const rowVariants = cva("flex-row items-start", {
  variants: {
    size: { sm: "gap-2", md: "gap-3" },
    isDisabled: { true: "opacity-50", false: "" },
  },
  defaultVariants: { size: "md", isDisabled: false },
})

export interface SwitchBaseProps {
  checked?: boolean
  size?: SwitchSize
  isDisabled?: boolean
  className?: string
}

/**
 * Visual-only pill (no Pressable, no a11y role). Inside `Switch` it's
 * driven by the surrounding Pressable. Pulled out so other components
 * (e.g. ListItem `trailing`) can render a static-state pill cheaply.
 */
export const SwitchBase = forwardRef<View, SwitchBaseProps>(
  ({ checked = false, size = "md", className }, ref) => {
    const scheme = useColorScheme()
    const isDark = scheme === "dark"
    const spec = SIZE_MAP[size]
    const translate = spec.trackWidth - spec.thumbSize - spec.inset * 2

    // bg-bg-tertiary off-state — gray-50 light / gray-800 dark.
    const trackOff = isDark ? tokens.color.gray["800"] : tokens.color.gray["50"]
    // --color-primary on-state — brand-600 both modes.
    const trackOn = tokens.color.brand["600"]

    // Boolean → 0/1 progress with a 200ms timing crossfade.
    const progress = useDerivedValue(
      () => withTiming(checked ? 1 : 0, { duration: 200 }),
      [checked],
    )

    const trackStyle = useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [trackOff, trackOn],
      ),
    }))

    const thumbStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: progress.value * translate }],
    }))

    return (
      <Animated.View
        ref={ref}
        style={[
          {
            height: spec.trackHeight,
            width: spec.trackWidth,
            borderRadius: spec.trackHeight / 2,
            padding: spec.inset,
          },
          trackStyle,
        ]}
        className={className}
      >
        <Animated.View
          style={[
            {
              height: spec.thumbSize,
              width: spec.thumbSize,
              borderRadius: spec.thumbSize / 2,
              backgroundColor: THUMB_FG,
            },
            thumbStyle,
          ]}
        />
      </Animated.View>
    )
  },
)

SwitchBase.displayName = "SwitchBase"

export interface SwitchProps
  extends Omit<
    SwitchPrim.RootProps,
    "checked" | "onCheckedChange" | "children"
  > {
  checked?: boolean
  onCheckedChange?: (next: boolean) => void
  size?: SwitchSize
  /** Primary label text. Tapping anywhere on the row toggles. */
  label?: ReactNode
  /** Helper text below the label. */
  hint?: ReactNode
  containerClassName?: string
  className?: string
}

export const Switch = forwardRef<
  ComponentRef<typeof SwitchPrim.Root>,
  SwitchProps
>(
  (
    {
      checked = false,
      onCheckedChange,
      size = "md",
      disabled = false,
      label,
      hint,
      containerClassName,
      className,
      hitSlop,
      ...props
    },
    ref,
  ) => {
    const hasText = Boolean(label || hint)

    return (
      <SwitchPrim.Root
        ref={ref}
        checked={checked}
        onCheckedChange={(next) => {
          onCheckedChange?.(next)
        }}
        disabled={disabled}
        hitSlop={hitSlop ?? { top: 10, bottom: 10, left: 10, right: 10 }}
        className={cn(
          hasText
            ? rowVariants({ size, isDisabled: disabled })
            : disabled
              ? "opacity-50"
              : "",
          containerClassName,
        )}
        {...props}
      >
        <SwitchBase
          checked={checked}
          size={size}
          isDisabled={disabled}
          className={cn(hasText ? "mt-0.5" : undefined, className)}
        />
        {hasText ? (
          <View className="flex-1">
            {label ? (
              <Text className={cn(labelTextVariants({ size }))}>{label}</Text>
            ) : null}
            {hint ? (
              <Text className={cn(hintTextVariants({ size }))}>{hint}</Text>
            ) : null}
          </View>
        ) : null}
      </SwitchPrim.Root>
    )
  },
)

Switch.displayName = "Switch"
