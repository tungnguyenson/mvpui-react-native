/**
 * Built from Untitled UI Figma reference (PRO license) +
 * Apple HIG UIStepper conventions.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { controlHeight, iconSize as tokenIconSize } from "@mvp-ui-rn/tokens"
import { cva, type VariantProps } from "class-variance-authority"
import { Minus, Plus } from "lucide-react-native"
import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type ComponentRef,
} from "react"
import { Pressable, Text, View, useColorScheme, type ViewProps } from "react-native"

import { tokens } from "@mvp-ui-rn/tokens"
import { cn } from "../lib/cn"

/* ==========================================================================
   Stepper — `-` value `+` numeric picker, iOS-native pattern.

   No web equivalent — web uses `<input type="number">` with up/down arrows
   that are useless on touch. Stepper is the canonical mobile alternative
   for small integer ranges (qty pickers, font-size choosers, settings).

   API:
   - Controlled: `value` + `onChange`.
   - `min` / `max` clamp. `step` defaults 1.
   - Hold-to-repeat: 500ms initial delay then 100ms repeat interval per
     iOS UIStepper convention. Cancelled on press-release, disable, blur,
     or when the value hits the clamp.
   - VoiceOver: `accessibilityRole="adjustable"` + `accessibilityValue`
     + `accessibilityIncrement` / `accessibilityDecrement` callbacks.

   Sizes:
   - `sm` — 40pt tall, 80pt button squares (used inside dense rows).
   - `md` — 48pt tall, 96pt button squares (default).

   The center label is a stable-width digit-tabular `<Text>` so the
   surrounding row doesn't reflow as the value changes width.
   ========================================================================== */

const stepperContainerVariants = cva(
  ["flex-row items-stretch rounded-lg border border-border bg-bg overflow-hidden"],
  {
    variants: {
      size: {
        sm: "",
        md: "",
      },
      disabled: {
        true: "opacity-50",
        false: "",
      },
    },
    defaultVariants: { size: "md", disabled: false },
  },
)

const stepperButtonVariants = cva(
  ["items-center justify-center active:bg-bg-tertiary"],
  {
    variants: {
      size: {
        sm: "w-10",
        md: "w-12",
      },
    },
    defaultVariants: { size: "md" },
  },
)

const stepperValueVariants = cva(
  [
    "items-center justify-center border-x border-border px-3",
    "font-semibold text-fg",
  ],
  {
    variants: {
      size: {
        sm: "min-w-[44px]",
        md: "min-w-[56px]",
      },
    },
    defaultVariants: { size: "md" },
  },
)

const valueTextVariants = cva(["text-fg font-semibold"], {
  variants: {
    size: {
      sm: "text-md",
      md: "text-lg",
    },
  },
  defaultVariants: { size: "md" },
})

type StepperSize = NonNullable<VariantProps<typeof stepperContainerVariants>["size"]>

export interface StepperProps extends Omit<ViewProps, "children" | "style"> {
  /** Current value (controlled). */
  value: number
  /** Fires with the clamped next value on `+` or `-`. */
  onChange: (next: number) => void
  /** Minimum value (inclusive). @default 0 */
  min?: number
  /** Maximum value (inclusive). @default Number.MAX_SAFE_INTEGER */
  max?: number
  /** Step applied to each `+`/`-` press. @default 1 */
  step?: number
  /** Size variant. @default "md" */
  size?: StepperSize
  /** Block interaction + dims opacity. */
  disabled?: boolean
  /** Custom formatter for the center label. @default `String(value)` */
  format?: (value: number) => string
  /** Optional a11y label override. @default "Stepper" */
  accessibilityLabel?: string
}

const REPEAT_INITIAL_DELAY = 500
const REPEAT_INTERVAL = 100

export const Stepper = forwardRef<ComponentRef<typeof View>, StepperProps>(
  (
    {
      value,
      onChange,
      min = 0,
      max = Number.MAX_SAFE_INTEGER,
      step = 1,
      size = "md",
      disabled = false,
      format,
      accessibilityLabel = "Stepper",
      className,
      ...props
    },
    ref,
  ) => {
    const scheme = useColorScheme()
    const iconColor =
      scheme === "dark" ? tokens.color.gray["300"] : tokens.color.gray["700"]
    const px = size === "sm" ? tokenIconSize.sm : tokenIconSize.md
    const height = controlHeight[size]

    // Track current value + bounds in refs so the repeat timer always reads
    // the latest values (setTimeout/setInterval close over the initial render).
    const valueRef = useRef(value)
    const minRef = useRef(min)
    const maxRef = useRef(max)
    const stepRef = useRef(step)
    const onChangeRef = useRef(onChange)
    useEffect(() => {
      valueRef.current = value
      minRef.current = min
      maxRef.current = max
      stepRef.current = step
      onChangeRef.current = onChange
    }, [value, min, max, step, onChange])

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const clearTimers = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }, [])

    useEffect(() => clearTimers, [clearTimers])

    const applyDelta = useCallback((direction: 1 | -1) => {
      const next = valueRef.current + direction * stepRef.current
      const clamped = Math.min(maxRef.current, Math.max(minRef.current, next))
      if (clamped === valueRef.current) {
        // Hit clamp — stop the repeat early so the timer doesn't tick
        // pointlessly while the finger is still pressed.
        clearTimers()
        return
      }
      onChangeRef.current(clamped)
    }, [clearTimers])

    const handlePressIn = useCallback(
      (direction: 1 | -1) => {
        if (disabled) return
        applyDelta(direction)
        timeoutRef.current = setTimeout(() => {
          intervalRef.current = setInterval(() => {
            applyDelta(direction)
          }, REPEAT_INTERVAL)
        }, REPEAT_INITIAL_DELAY)
      },
      [applyDelta, disabled],
    )

    const atMin = value <= min
    const atMax = value >= max
    const label = format ? format(value) : String(value)

    return (
      <View
        ref={ref}
        accessibilityRole="adjustable"
        accessibilityLabel={accessibilityLabel}
        accessibilityValue={{ min, max, now: value, text: label }}
        accessibilityState={{ disabled }}
        onAccessibilityAction={(e) => {
          if (disabled) return
          if (e.nativeEvent.actionName === "increment") applyDelta(1)
          if (e.nativeEvent.actionName === "decrement") applyDelta(-1)
        }}
        accessibilityActions={[
          { name: "increment" },
          { name: "decrement" },
        ]}
        className={cn(stepperContainerVariants({ size, disabled }), className)}
        style={{ height }}
        {...props}
      >
        <Pressable
          accessibilityLabel="Decrement"
          disabled={disabled || atMin}
          onPressIn={() => handlePressIn(-1)}
          onPressOut={clearTimers}
          className={cn(stepperButtonVariants({ size }))}
          style={({ pressed }) => ({
            opacity: atMin ? 0.4 : pressed ? 0.6 : 1,
          })}
        >
          <Minus size={px} color={iconColor} />
        </Pressable>

        <View className={cn(stepperValueVariants({ size }))}>
          <Text
            className={cn(valueTextVariants({ size }))}
            style={{ fontVariant: ["tabular-nums"] }}
            numberOfLines={1}
          >
            {label}
          </Text>
        </View>

        <Pressable
          accessibilityLabel="Increment"
          disabled={disabled || atMax}
          onPressIn={() => handlePressIn(1)}
          onPressOut={clearTimers}
          className={cn(stepperButtonVariants({ size }))}
          style={({ pressed }) => ({
            opacity: atMax ? 0.4 : pressed ? 0.6 : 1,
          })}
        >
          <Plus size={px} color={iconColor} />
        </Pressable>
      </View>
    )
  },
)

Stepper.displayName = "Stepper"

export type { StepperSize }
