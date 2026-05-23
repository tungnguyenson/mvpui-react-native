/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/radio-buttons/radio-buttons.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import * as RadioGroupPrim from "@rn-primitives/radio-group"
import { cva, type VariantProps } from "class-variance-authority"
import {
  createContext,
  forwardRef,
  useContext,
  type ComponentRef,
  type ReactNode,
} from "react"
import { Pressable, Text, View } from "react-native"

import { cn } from "../lib/cn"

/* ==========================================================================
   RadioGroup — RN port of mvp-ui (web) RadioGroup.

   RN deltas vs. web:
   - Web `react-aria-components` RadioGroup → RN `@rn-primitives/radio-group`
     (Root + Item; Indicator skipped — we own visual state).
   - Controlled only: `value` + `onValueChange` are required. Selection state
     drives both primitive (accessibility) and our own context (circle tint).
   - Full-row Pressable pattern mirroring Checkbox. Tap anywhere on the row
     selects the option. Bare-circle taps get `hitSlop: 10pt` for ≥ 44pt.
   - Sizes sm (16px circle, text-sm) / md (20px circle, text-md). Mirrors
     Checkbox's sm/md ramp.
   - Compound: `<RadioGroup>` (Root) + `<RadioGroupItem>` (Item +
     label/hint). `<RadioGroupBase>` exposes the visual-only cell for
     embedding inside other Pressables.
   ========================================================================== */

export type RadioGroupSize = "sm" | "md"

const circleVariants = cva(
  "items-center justify-center rounded-full border bg-bg",
  {
    variants: {
      size: {
        sm: "size-5",
        md: "size-6",
      },
      isSelected: {
        true: "border-primary",
        false: "border-border",
      },
      isInvalid: { true: "", false: "" },
      isDisabled: { true: "", false: "" },
    },
    compoundVariants: [
      { isSelected: false, isInvalid: true, className: "border-border-error" },
      { isSelected: false, isDisabled: true, className: "bg-bg-tertiary" },
    ],
    defaultVariants: {
      size: "md",
      isSelected: false,
      isInvalid: false,
      isDisabled: false,
    },
  },
)

const dotVariants = cva("rounded-full bg-primary", {
  variants: {
    size: {
      sm: "size-2.5",
      md: "size-3",
    },
  },
  defaultVariants: { size: "md" },
})

const labelTextVariants = cva("font-medium text-fg-secondary", {
  variants: { size: { sm: "text-sm", md: "text-md" } },
  defaultVariants: { size: "md" },
})

const hintTextVariants = cva("text-fg-tertiary", {
  variants: { size: { sm: "text-sm", md: "text-md" } },
  defaultVariants: { size: "md" },
})

// `min-h-11` (44pt) enforces the iOS HIG touch-target floor on the whole
// row even when the row is "circle + short label" (which without min-height
// would resolve to ~20–24pt = text line-height).
const rowVariants = cva("flex-row items-start min-h-14 py-2", {
  variants: {
    size: { sm: "gap-2", md: "gap-3" },
    isDisabled: { true: "opacity-50", false: "" },
  },
  defaultVariants: { size: "md", isDisabled: false },
})

/* -------------------------------------------------------------------------- */
/*  RadioGroupBase — visual-only cell                                          */
/* -------------------------------------------------------------------------- */

export interface RadioGroupBaseProps
  extends VariantProps<typeof circleVariants> {
  size?: RadioGroupSize
  isSelected?: boolean
  isInvalid?: boolean
  isDisabled?: boolean
  className?: string
}

export const RadioGroupBase = forwardRef<View, RadioGroupBaseProps>(
  (
    {
      size = "md",
      isSelected = false,
      isInvalid = false,
      isDisabled = false,
      className,
    },
    ref,
  ) => (
    <View
      ref={ref}
      className={cn(
        circleVariants({ size, isSelected, isInvalid, isDisabled }),
        className,
      )}
    >
      {isSelected ? <View className={cn(dotVariants({ size }))} /> : null}
    </View>
  ),
)

RadioGroupBase.displayName = "RadioGroupBase"

/* -------------------------------------------------------------------------- */
/*  Group context — owns selected value + size for child rows                  */
/* -------------------------------------------------------------------------- */

interface InternalGroupContextValue {
  size: RadioGroupSize
  value: string | undefined
  disabled: boolean
}

const GroupContext = createContext<InternalGroupContextValue>({
  size: "md",
  value: undefined,
  disabled: false,
})

/* -------------------------------------------------------------------------- */
/*  RadioGroup — controlled Root                                               */
/* -------------------------------------------------------------------------- */

export interface RadioGroupProps
  extends Omit<RadioGroupPrim.RootProps, "value" | "onValueChange" | "children"> {
  value: string | undefined
  onValueChange: (value: string) => void
  size?: RadioGroupSize
  children?: ReactNode
  className?: string
}

export const RadioGroup = forwardRef<View, RadioGroupProps>(
  (
    {
      value,
      onValueChange,
      size = "md",
      disabled = false,
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <GroupContext.Provider value={{ size, value, disabled }}>
      <RadioGroupPrim.Root
        ref={ref}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        className={cn("flex-col gap-2", className)}
        {...props}
      >
        {children}
      </RadioGroupPrim.Root>
    </GroupContext.Provider>
  ),
)

RadioGroup.displayName = "RadioGroup"

/* -------------------------------------------------------------------------- */
/*  RadioGroupItem — full-row Pressable                                        */
/* -------------------------------------------------------------------------- */

export interface RadioGroupItemProps
  extends Omit<RadioGroupPrim.ItemProps, "value" | "children"> {
  value: string
  /** Primary label. Tap anywhere on the row selects this option. */
  label?: ReactNode
  /** Helper text below the label. */
  hint?: ReactNode
  /** Override group size for this row only. */
  size?: RadioGroupSize
  /** Red border on this item when unselected. */
  isInvalid?: boolean
  /** Class forwarded to the row Pressable. */
  containerClassName?: string
  /** Class forwarded to the radio circle. */
  className?: string
}

export const RadioGroupItem = forwardRef<
  ComponentRef<typeof Pressable>,
  RadioGroupItemProps
>(
  (
    {
      value,
      label,
      hint,
      size: sizeProp,
      isInvalid = false,
      disabled: disabledProp = false,
      containerClassName,
      className,
      hitSlop,
      ...props
    },
    ref,
  ) => {
    const group = useContext(GroupContext)
    const size = sizeProp ?? group.size
    const isSelected = group.value === value
    const isDisabled = disabledProp || group.disabled

    return (
      <RadioGroupPrim.Item
        ref={ref}
        value={value}
        disabled={disabledProp}
        hitSlop={hitSlop ?? { top: 14, bottom: 14, left: 14, right: 14 }}
        className={cn(
          rowVariants({ size, isDisabled }),
          containerClassName,
        )}
        {...props}
      >
        <RadioGroupBase
          size={size}
          isSelected={isSelected}
          isInvalid={isInvalid}
          isDisabled={isDisabled}
          className={cn(label || hint ? "mt-0.5" : undefined, className)}
        />
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
      </RadioGroupPrim.Item>
    )
  },
)

RadioGroupItem.displayName = "RadioGroupItem"
