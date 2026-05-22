/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/select/select.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { iconSize as tokenIconSize, pickShadow, tokens } from "@mvp-ui-rn/tokens"
import * as SelectPrim from "@rn-primitives/select"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, ChevronDown } from "lucide-react-native"
import {
  forwardRef,
  type ComponentRef,
  type ReactNode,
  useId,
} from "react"
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native"

import { cn } from "../lib/cn"
import { renderIcon, type IconProp } from "../lib/render-icon"
import { HintText } from "./hint-text"
import { Label } from "./label"

/* ==========================================================================
   Select — RN port of mvp-ui (web) Select.

   RN deltas vs. web:
   - Web `react-aria-components` Select → RN `@rn-primitives/select` which
     follows the Radix-style compound API (Root, Trigger, Portal, Overlay,
     Content, Item, ItemText, ItemIndicator). The primitive measures the
     trigger and positions Content relative to it via the portal — no
     manual layout math required.
   - Web's `items` prop + render-prop children dropped for v1 — consumers
     map their data array to `SelectItem` children directly. Simpler API,
     easier to read in JSX.
   - Web supports `combobox` (typeahead inside the popover); RN port is
     plain Select. Combobox lands as its own component.
   - Web supports `selectionIndicator="checkbox"`; v1 RN ships checkmark
     only (right-aligned). Checkbox-style multi-select lands with the
     dedicated `MultiSelect`.
   - Web `avatarUrl` / `supportingText` per-item dropped for v1 — `icon`
     slot only. Pair an `Avatar` element via the slot if needed.
   - Sheet variant (bottom-sheet wheel / ActionSheet rows for long lists)
     deferred until BottomSheet primitive ships. Non-breaking addition
     when it lands.
   - Trigger looks like `Input` box. Focus ring → border-color swap on
     `open` only (RN has no `focus-within`).
   - Animations: primitive's Content positions itself; we don't animate
     entry/exit (RN's LayoutAnimation route here gets fragile under
     keyboard interactions). Add `react-native-reanimated` entering /
     exiting animations later if needed.
   ========================================================================== */

export type SelectSize = "sm" | "md" | "lg"
export type SelectOption = { value: string; label: string } | undefined

const triggerVariants = cva(
  "flex-row items-center rounded-lg border bg-bg",
  {
    variants: {
      size: {
        sm: "h-11 gap-2 px-3",
        md: "h-12 gap-2 px-3",
        lg: "h-14 gap-2.5 px-3.5",
      },
      state: {
        default: "border-border",
        error: "border-border-error",
      },
      isOpen: { true: "", false: "" },
      isDisabled: { true: "opacity-50 bg-bg-secondary", false: "" },
    },
    compoundVariants: [
      { state: "default", isOpen: true, className: "border-border-brand" },
    ],
    defaultVariants: {
      size: "md",
      state: "default",
      isOpen: false,
      isDisabled: false,
    },
  },
)

const triggerTextVariants = cva("flex-1 truncate", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
    },
    hasValue: {
      true: "text-fg",
      false: "text-fg-tertiary",
    },
  },
  defaultVariants: { size: "md", hasValue: false },
})

const itemVariants = cva(
  "flex-row items-center gap-2 rounded-md px-2 py-2 active:bg-bg-secondary",
  {
    variants: {
      size: {
        sm: "px-2 py-1.5",
        md: "px-2 py-2",
        lg: "px-2.5 py-2.5",
      },
      isDisabled: { true: "opacity-50", false: "" },
    },
    defaultVariants: { size: "md", isDisabled: false },
  },
)

const itemTextVariants = cva("flex-1 font-medium text-fg", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
    },
  },
  defaultVariants: { size: "md" },
})

const ICON_PX: Record<SelectSize, number> = {
  sm: tokenIconSize.sm,
  md: tokenIconSize.md,
  lg: tokenIconSize.lg,
}

const iconTintLight = tokens.color.gray["500"]
const iconTintDark = tokens.color.gray["400"]
const brandTintLight = tokens.color.brand["600"]
const brandTintDark = tokens.color.brand["400"]

/* -------------------------------------------------------------------------- */
/*  SelectItem                                                                 */
/* -------------------------------------------------------------------------- */

export interface SelectItemProps
  extends Omit<SelectPrim.ItemProps, "children"> {
  value: string
  label: string
  /** Optional leading icon (lucide component or pre-rendered element). */
  icon?: IconProp
  /** Override per-item visual size. Inherits Select's `size` by default. */
  size?: SelectSize
  className?: string
}

export const SelectItem = forwardRef<
  ComponentRef<typeof Pressable>,
  SelectItemProps
>(
  (
    {
      value,
      label,
      icon,
      disabled = false,
      size = "md",
      className,
      ...props
    },
    ref,
  ) => {
    const scheme = useColorScheme()
    const isDark = scheme === "dark"
    const iconTint = isDark ? iconTintDark : iconTintLight
    const brandTint = isDark ? brandTintDark : brandTintLight
    const iconPx = ICON_PX[size]

    return (
      <SelectPrim.Item
        ref={ref}
        value={value}
        label={label}
        disabled={disabled}
        className={cn(itemVariants({ size, isDisabled: disabled }), className)}
        {...props}
      >
        {icon
          ? renderIcon(icon, "leading", { color: iconTint, size: iconPx })
          : null}
        <SelectPrim.ItemText className={cn(itemTextVariants({ size }))} />
        <SelectPrim.ItemIndicator>
          <Check color={brandTint} size={iconPx} />
        </SelectPrim.ItemIndicator>
      </SelectPrim.Item>
    )
  },
)

SelectItem.displayName = "SelectItem"

/* -------------------------------------------------------------------------- */
/*  Select                                                                     */
/* -------------------------------------------------------------------------- */

interface TriggerInnerProps {
  placeholder: string
  size: SelectSize
  state: NonNullable<VariantProps<typeof triggerVariants>["state"]>
  disabled: boolean
  className?: string
}

const SelectTrigger = forwardRef<
  SelectPrim.TriggerRef,
  TriggerInnerProps & { id?: string; labelId?: string }
>(
  ({ placeholder, size, state, disabled, id, labelId, className }, ref) => {
    const scheme = useColorScheme()
    const isDark = scheme === "dark"
    const iconTint = isDark ? iconTintDark : iconTintLight
    const iconPx = ICON_PX[size]
    const { value, open } = SelectPrim.useRootContext()
    const hasValue = value !== undefined

    return (
      <SelectPrim.Trigger
        ref={ref}
        nativeID={id}
        accessibilityLabelledBy={labelId}
        className={cn(
          triggerVariants({
            size,
            state,
            isOpen: open,
            isDisabled: disabled,
          }),
          className,
        )}
      >
        <Text className={cn(triggerTextVariants({ size, hasValue }))}>
          {value?.label ?? placeholder}
        </Text>
        <ChevronDown color={iconTint} size={iconPx} />
      </SelectPrim.Trigger>
    )
  },
)

SelectTrigger.displayName = "SelectTrigger"

export interface SelectProps
  extends Omit<
    SelectPrim.RootProps,
    "value" | "defaultValue" | "onValueChange" | "children" | "disabled"
  > {
  value?: SelectOption
  defaultValue?: SelectOption
  onValueChange?: (next: SelectOption) => void
  /** Field label rendered above the trigger. */
  label?: string
  /** Helper / error text below the trigger. */
  hint?: ReactNode
  /** Trigger placeholder when nothing is selected. @default "Select" */
  placeholder?: string
  /** @default "md" */
  size?: SelectSize
  /** Red border. Pair with `HintText` for an error message. */
  isInvalid?: boolean
  /** Mark required (label `*`, screen-reader hint). */
  isRequired?: boolean
  hideRequiredIndicator?: boolean
  disabled?: boolean
  /** Class for the outer wrapper (label + trigger + hint). */
  containerClassName?: string
  /** Class forwarded to the trigger. */
  triggerClassName?: string
  /** Class forwarded to the popover content. */
  contentClassName?: string
  /** `SelectItem` children. */
  children: ReactNode
}

export const Select = forwardRef<
  SelectPrim.TriggerRef,
  SelectProps
>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      label,
      hint,
      placeholder = "Select",
      size = "md",
      isInvalid = false,
      isRequired = false,
      hideRequiredIndicator = false,
      disabled = false,
      containerClassName,
      triggerClassName,
      contentClassName,
      nativeID,
      children,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const fieldId = nativeID ?? generatedId
    const labelId = label ? `${fieldId}-label` : undefined
    const state = isInvalid ? "error" : "default"
    const scheme = useColorScheme()

    return (
      <View className={cn("w-full gap-1.5", containerClassName)}>
        {label ? (
          <Label
            nativeID={labelId}
            isRequired={!hideRequiredIndicator && isRequired}
            isInvalid={isInvalid}
          >
            {label}
          </Label>
        ) : null}

        <SelectPrim.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
          {...props}
        >
          <SelectTrigger
            ref={ref}
            id={fieldId}
            labelId={labelId}
            placeholder={placeholder}
            size={size}
            state={state}
            disabled={disabled}
            className={triggerClassName}
          />

          <SelectPrim.Portal>
            <SelectPrim.Overlay style={StyleSheet.absoluteFill} />
            <SelectPrim.Content
              sideOffset={4}
              style={pickShadow("lg", scheme === "dark" ? "dark" : "light")}
              className={cn(
                "rounded-lg border border-border-secondary bg-bg py-1",
                contentClassName,
              )}
            >
              <View className="p-1">{children}</View>
            </SelectPrim.Content>
          </SelectPrim.Portal>
        </SelectPrim.Root>

        {hint ? <HintText isInvalid={isInvalid}>{hint}</HintText> : null}
      </View>
    )
  },
)

Select.displayName = "Select"
