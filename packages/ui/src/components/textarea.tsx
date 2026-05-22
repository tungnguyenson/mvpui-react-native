/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/textarea/textarea.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { tokens } from "@mvp-ui-rn/tokens"
import { cva, type VariantProps } from "class-variance-authority"
import {
  forwardRef,
  type ComponentRef,
  type ReactNode,
  useId,
  useState,
} from "react"
import {
  TextInput,
  type TextInputProps,
  View,
  useColorScheme,
} from "react-native"

import { cn } from "../lib/cn"
import { HintText } from "./hint-text"
import { Label } from "./label"

/* ==========================================================================
   Textarea + TextareaBase — RN port of mvp-ui (web) TextArea.

   `TextareaBase` is the standalone field; `Textarea` composes Label +
   TextareaBase + HintText (mirrors `Input`/`InputBase`).

   RN deltas vs. web:
   - Web `react-aria` TextField + TextArea handles focus + invalid + label
     wiring; RN ports tracks focus via `onFocus`/`onBlur` and pairs the
     label via `nativeID` + `accessibilityLabelledBy`.
   - Web custom `::-webkit-resizer` SVG handle dropped — RN's multiline
     TextInput grows with content automatically; no user-resizable corner.
   - Web `ring-2 ring-border-brand` focus ring → RN border-color swap
     only (no compositor-cost shadow, matches Input behavior).
   - Size ramp: sm padding mirrors Input sm; md/lg follow Input. Vertical
     padding stays consistent; `rows` controls *minimum* visible height
     by computing `lineHeight × rows + paddingY × 2`.
   - `placeholderTextColor` resolved as raw hex via JS tokens — RN does
     not honor className on placeholder.
   - `textAlignVertical="top"` baked in so Android places the caret at
     the first line (default centers vertically when content < height).
   ========================================================================== */

const textareaFieldVariants = cva(
  "w-full rounded-lg border bg-bg text-fg",
  {
    variants: {
      size: {
        sm: "px-3 py-3 text-sm",
        md: "px-3.5 py-3 text-md",
        lg: "px-3.5 py-3.5 text-lg",
      },
      state: {
        default: "border-border",
        error: "border-border-error",
        success: "border-border-success",
      },
      isFocused: { true: "", false: "" },
      isDisabled: { true: "opacity-50 bg-bg-secondary", false: "" },
      isReadOnly: { true: "bg-bg-secondary", false: "" },
    },
    compoundVariants: [
      // Focus tints border-brand only on default state. Error/success
      // already louder than brand — preserve their loudness through focus.
      { state: "default", isFocused: true, className: "border-border-brand" },
    ],
    defaultVariants: {
      size: "md",
      state: "default",
      isFocused: false,
      isDisabled: false,
      isReadOnly: false,
    },
  },
)

type TextareaSize = NonNullable<
  VariantProps<typeof textareaFieldVariants>["size"]
>

/** Line-height per size, matches `--leading-*` token resolution. */
const LEADING: Record<TextareaSize, number> = {
  sm: 20,
  md: 24,
  lg: 28,
}

/** Vertical padding in pixels per size — mirrors the cva `py-*` values. */
const PADDING_Y: Record<TextareaSize, number> = {
  sm: 12,
  md: 12,
  lg: 14,
}

const placeholderTintLight = tokens.color.gray["500"]
const placeholderTintDark = tokens.color.gray["400"]

export interface TextareaBaseProps
  extends Omit<TextInputProps, "style" | "multiline" | "children"> {
  size?: TextareaSize
  /** Red border + error state. */
  isInvalid?: boolean
  /** Green border + success state. Ignored when `isInvalid`. */
  isSuccess?: boolean
  /** Minimum visible rows. Content beyond expands the field. @default 4 */
  rows?: number
  /** Mark the field read-only (muted bg, blocks editing). */
  readOnly?: boolean
  /** Mark the field disabled (50% opacity, blocks editing). */
  disabled?: boolean
  className?: string
}

export const TextareaBase = forwardRef<
  ComponentRef<typeof TextInput>,
  TextareaBaseProps
>(
  (
    {
      size = "md",
      isInvalid = false,
      isSuccess = false,
      rows = 4,
      readOnly = false,
      disabled = false,
      placeholder,
      placeholderTextColor,
      editable,
      onFocus,
      onBlur,
      className,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const scheme = useColorScheme()
    const isDark = scheme === "dark"

    const state = isInvalid ? "error" : isSuccess ? "success" : "default"
    const isEditable = !disabled && !readOnly && (editable ?? true)
    const minHeight = LEADING[size] * rows + PADDING_Y[size] * 2
    const resolvedPlaceholderColor =
      placeholderTextColor ?? (isDark ? placeholderTintDark : placeholderTintLight)

    return (
      <TextInput
        ref={ref}
        multiline
        textAlignVertical="top"
        editable={isEditable}
        placeholder={placeholder}
        placeholderTextColor={resolvedPlaceholderColor}
        aria-invalid={isInvalid || undefined}
        onFocus={(e) => {
          setIsFocused(true)
          onFocus?.(e)
        }}
        onBlur={(e) => {
          setIsFocused(false)
          onBlur?.(e)
        }}
        style={{ minHeight }}
        className={cn(
          textareaFieldVariants({
            size,
            state,
            isFocused,
            isDisabled: disabled,
            isReadOnly: readOnly && !disabled,
          }),
          className,
        )}
        {...props}
      />
    )
  },
)

TextareaBase.displayName = "TextareaBase"

export interface TextareaProps extends TextareaBaseProps {
  /** Label text rendered above the field. */
  label?: string
  /** Helper / error text rendered below the field. */
  hint?: ReactNode
  /** Mark the field required (label `*`, screen-reader hint). */
  isRequired?: boolean
  /** Hide the required `*` indicator even when required. */
  hideRequiredIndicator?: boolean
  /** Class name for the outer wrapper (label + field + hint). */
  containerClassName?: string
}

export const Textarea = forwardRef<
  ComponentRef<typeof TextInput>,
  TextareaProps
>(
  (
    {
      label,
      hint,
      isRequired = false,
      hideRequiredIndicator = false,
      isInvalid,
      containerClassName,
      nativeID,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const fieldId = nativeID ?? generatedId
    const labelId = label ? `${fieldId}-label` : undefined

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

        <TextareaBase
          ref={ref}
          nativeID={fieldId}
          isInvalid={isInvalid}
          accessibilityLabelledBy={labelId}
          {...props}
        />

        {hint ? <HintText isInvalid={isInvalid}>{hint}</HintText> : null}
      </View>
    )
  },
)

Textarea.displayName = "Textarea"

export type TextareaSizeKey = TextareaSize
