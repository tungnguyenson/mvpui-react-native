/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/checkbox/checkbox.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import * as CheckboxPrim from "@rn-primitives/checkbox"
import { cva, type VariantProps } from "class-variance-authority"
import {
  forwardRef,
  type ComponentRef,
  type ReactNode,
} from "react"
import {
  Pressable,
  Text,
  View,
  type AccessibilityState,
} from "react-native"
import { Path, Svg } from "react-native-svg"

import { cn } from "../lib/cn"

/* ==========================================================================
   Checkbox — RN port of mvp-ui (web) Checkbox.

   RN deltas vs. web:
   - Web `ring-1 ring-border ring-inset` (1px inset outline) → RN
     `border border-border` (visually equivalent; RN has no ring utility).
   - Web SVG check/dash inside a `<div>` → RN `react-native-svg` Path of
     the same coordinates. Fill is a hard "#ffffff" — matches the
     `--color-primary-fg` token in both modes (white on brand).
   - Web is two-state (checked / unchecked); RN ships **tristate**
     (`true | false | "indeterminate"`) on first land — primitive only
     knows boolean, so tristate is layered at the wrapper level. Clicking
     indeterminate transitions to `true` (mirrors react-aria + browser
     native checkbox behavior).
   - Size ramp bumped from web: web sm=16 / md=20 → RN sm=20 / md=24 for
     touch comfort. Bare-box `hitSlop` extends tappable area to ≥ 44pt
     HIG floor.
   - No focus-visible ring (RN has no focus-visible primitive; touch is
     the dominant input).
   ========================================================================== */

/** Resolves --color-primary-fg in both modes (white on brand). */
const PRIMARY_FG = "#ffffff"

export type CheckboxState = boolean | "indeterminate"
export type CheckboxSize = "sm" | "md"

const boxVariants = cva("items-center justify-center border bg-bg", {
  variants: {
    size: {
      sm: "size-6 rounded",
      md: "size-7 rounded-md",
    },
    isSelected: {
      true: "border-transparent bg-primary",
      false: "border-border",
    },
    isInvalid: { true: "", false: "" },
    isDisabled: { true: "", false: "" },
  },
  compoundVariants: [
    // Error border only surfaces when unchecked — the filled state already
    // dominates the visual and carries its own brand color.
    { isSelected: false, isInvalid: true, className: "border-border-error" },
    // Unchecked + disabled gets a muted tertiary fill so the affordance
    // reads as "present but inactive" rather than an empty rectangle.
    { isSelected: false, isDisabled: true, className: "bg-bg-tertiary" },
  ],
  defaultVariants: {
    size: "md",
    isSelected: false,
    isInvalid: false,
    isDisabled: false,
  },
})

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

// `min-h-11` (44pt) enforces the iOS HIG touch-target floor on the whole
// row even when the row is "box + short label" (which without min-height
// would resolve to ~20–24pt = text line-height).
const rowVariants = cva("flex-row items-start min-h-14 py-2", {
  variants: {
    size: { sm: "gap-2", md: "gap-3" },
    isDisabled: { true: "opacity-50", false: "" },
  },
  defaultVariants: { size: "md", isDisabled: false },
})

const GLYPH_SIZE: Record<CheckboxSize, number> = {
  sm: 12,
  md: 14,
}

function CheckGlyph({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path
        d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
        stroke={PRIMARY_FG}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

function DashGlyph({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path
        d="M2.91675 7H11.0834"
        stroke={PRIMARY_FG}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export interface CheckboxBaseProps
  extends VariantProps<typeof boxVariants> {
  /** Tristate value. `"indeterminate"` renders a dash glyph. */
  checked?: CheckboxState
  size?: CheckboxSize
  /** Red border when unchecked. Ignored when selected. */
  isInvalid?: boolean
  /** Visual-only disabled (use on `Checkbox`'s `disabled` to also block taps). */
  isDisabled?: boolean
  className?: string
}

/**
 * Visual-only checkbox cell (no Pressable, no a11y role). Use inside
 * larger pressable containers (e.g. Select item indicator, custom list
 * rows) where the parent owns the tap handler.
 */
export const CheckboxBase = forwardRef<View, CheckboxBaseProps>(
  (
    {
      checked = false,
      size = "md",
      isInvalid = false,
      isDisabled = false,
      className,
    },
    ref,
  ) => {
    const isIndeterminate = checked === "indeterminate"
    const isChecked = checked === true
    const isSelected = isChecked || isIndeterminate

    return (
      <View
        ref={ref}
        className={cn(
          boxVariants({
            size,
            isSelected,
            isInvalid,
            isDisabled,
          }),
          className,
        )}
      >
        {isIndeterminate ? (
          <DashGlyph size={GLYPH_SIZE[size]} />
        ) : isChecked ? (
          <CheckGlyph size={GLYPH_SIZE[size]} />
        ) : null}
      </View>
    )
  },
)

CheckboxBase.displayName = "CheckboxBase"

export interface CheckboxProps
  extends Omit<
    CheckboxPrim.RootProps,
    "checked" | "onCheckedChange" | "children"
  > {
  /** Tristate value. `"indeterminate"` renders a dash. */
  checked?: CheckboxState
  /** Fires with the *next* state after a tap. Click indeterminate → `true`. */
  onCheckedChange?: (next: CheckboxState) => void
  size?: CheckboxSize
  /** Red border when unchecked. Pair with `HintText` for an error message. */
  isInvalid?: boolean
  /** Primary label text. Tapping anywhere on the row toggles. */
  label?: ReactNode
  /** Helper text below the label. */
  hint?: ReactNode
  /** Class for the outer row wrapper. */
  containerClassName?: string
  /** Class forwarded to the box. */
  className?: string
}

export const Checkbox = forwardRef<
  ComponentRef<typeof Pressable>,
  CheckboxProps
>(
  (
    {
      checked = false,
      onCheckedChange,
      size = "md",
      disabled = false,
      isInvalid = false,
      label,
      hint,
      containerClassName,
      className,
      hitSlop,
      accessibilityState,
      ...props
    },
    ref,
  ) => {
    const isIndeterminate = checked === "indeterminate"
    const isChecked = checked === true
    const isSelected = isChecked || isIndeterminate

    const handlePrimChange = (_next: boolean) => {
      if (isIndeterminate) {
        // Browser + react-aria fallback: click on indeterminate resolves to
        // checked, regardless of the previous boolean state.
        onCheckedChange?.(true)
        return
      }
      onCheckedChange?.(!isChecked)
    }

    // Primitive sets accessibilityState before spreading `...props`, so our
    // explicit override here wins and screen readers announce `mixed` for
    // the indeterminate case.
    const mergedA11yState: AccessibilityState = {
      ...accessibilityState,
      disabled,
      checked: isIndeterminate ? "mixed" : isChecked,
    }

    const box = (
      <CheckboxBase
        checked={checked}
        size={size}
        isInvalid={isInvalid}
        isDisabled={disabled}
        className={cn(label || hint ? "mt-0.5" : undefined, className)}
      />
    )

    return (
      <CheckboxPrim.Root
        ref={ref}
        checked={isSelected}
        onCheckedChange={handlePrimChange}
        disabled={disabled}
        accessibilityState={mergedA11yState}
        hitSlop={hitSlop ?? { top: 14, bottom: 14, left: 14, right: 14 }}
        className={cn(
          rowVariants({ size, isDisabled: disabled }),
          containerClassName,
        )}
        {...props}
      >
        {box}
        {label || hint ? (
          <View className="flex-1">
            {label ? (
              <Text className={cn(labelTextVariants({ size }))}>{label}</Text>
            ) : null}
            {hint ? (
              <Text className={cn(hintTextVariants({ size }))}>{hint}</Text>
            ) : null}
          </View>
        ) : null}
      </CheckboxPrim.Root>
    )
  },
)

Checkbox.displayName = "Checkbox"
