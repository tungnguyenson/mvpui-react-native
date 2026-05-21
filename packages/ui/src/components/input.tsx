/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/input/input.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { iconSize as tokenIconSize, tokens } from "@mvp-ui-rn/tokens"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, Eye, EyeOff } from "lucide-react-native"
import {
  forwardRef,
  type ComponentRef,
  type ReactNode,
  useId,
  useState,
} from "react"
import {
  Pressable,
  TextInput,
  Text,
  View,
  useColorScheme,
  type TextInputProps,
} from "react-native"

import { cn } from "../lib/cn"
import { renderIcon, type IconProp } from "../lib/render-icon"
import { HintText } from "./hint-text"
import { Label } from "./label"

/* ==========================================================================
   Input + InputBase — RN port of mvp-ui (web) Input.

   `InputBase` is the standalone field box; `Input` composes Label +
   InputBase + HintText.

   RN deltas vs. web:
   - Web `focus-within` ring → RN tracks focus via `onFocus`/`onBlur` and
     swaps border color. No box-shadow ring (RN compositor cost + visual
     noise on mobile). Border switch carries the affordance.
   - Web `shadow-xs` on the field dropped — web uses CSS box-shadow which
     RN approximates poorly; mobile inputs traditionally have no shadow.
   - Web `shortcut` (kbd hint) dropped — no ergonomic surface on mobile.
   - Web `tooltip` (help icon) dropped pending Tooltip primitive.
   - Web `type="password"` → RN `secureTextEntry`. The eye toggle reads
     the prop, overrides internally when toggled.
   - Mobile-native props (`keyboardType`, `autoComplete`, `autoCapitalize`,
     `autoCorrect`, `returnKeyType`, `secureTextEntry`) forwarded to the
     underlying `<TextInput>`.
   - Size ramp bumped one Tailwind unit per `docs/tokens-rn-adjustments.md`
     §3a: sm=44 / md=48 (default) / lg=56. `sm` matches HIG floor; `md`
     thumbprint-comfortable.
   - Placeholder color uses `placeholderTextColor` (raw hex) not CSS — RN
     `TextInput` does not honor className for placeholder.
   ========================================================================== */

const inputFieldVariants = cva(
  ["flex-row items-center rounded-lg border bg-bg"],
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
        success: "border-border-success",
      },
      isFocused: { true: "", false: "" },
      isDisabled: { true: "opacity-50 bg-bg-secondary", false: "" },
      isReadOnly: { true: "bg-bg-secondary", false: "" },
    },
    compoundVariants: [
      // Focus tints border-brand only on default state — error/success
      // keep their own border-color through focus (already louder than
      // brand).
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

const inputTextVariants = cva(["min-w-0 flex-1 text-fg p-0"], {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-md",
      lg: "text-md",
    },
  },
  defaultVariants: { size: "md" },
})

const inlineTextVariants = cva("shrink-0 text-fg-tertiary", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-md",
      lg: "text-md",
    },
  },
  defaultVariants: { size: "md" },
})

type InputSize = NonNullable<VariantProps<typeof inputFieldVariants>["size"]>

/**
 * Placeholder + icon tints. Lucide icons + RN `placeholderTextColor` both
 * take raw color strings — neither resolves Tailwind classes nor CSS
 * variables. Light + dark maps switch via `useColorScheme()`.
 *
 * Values mirror `--color-fg-tertiary` / `--color-fg-error` resolution in
 * light + dark from `packages/tokens/src/global.css`.
 */
const placeholderTintLight = tokens.color.gray["500"]
const placeholderTintDark = tokens.color.gray["400"]
const iconTintLight = tokens.color.gray["500"]
const iconTintDark = tokens.color.gray["400"]
const errorTintLight = tokens.color.error["600"]
const errorTintDark = tokens.color.error["500"]

/** Lucide icon pixel size per input size — sourced from shared token map. */
const inlineIconSize: Record<InputSize, number> = {
  sm: tokenIconSize.sm,
  md: tokenIconSize.md,
  lg: tokenIconSize.md,
}

const TRAILING_HINT_SIZE = 16

export interface InputBaseProps
  extends Omit<TextInputProps, "style" | "children"> {
  /** Field size — `md` is default per RN mobile ramp. */
  size?: InputSize
  /** Red border + error state; sets `aria-invalid`. */
  isInvalid?: boolean
  /** Green border + success state. Ignored when `isInvalid`. */
  isSuccess?: boolean
  /** Icon component or element rendered before the input. */
  iconLeading?: IconProp
  /** Icon component or element rendered after the input. */
  iconTrailing?: IconProp
  /** Inline text/element before the input (e.g. "$", "https://"). */
  prefix?: ReactNode
  /** Inline text/element after the input (e.g. "USD", ".com"). */
  suffix?: ReactNode
  /** Mark the input read-only (muted bg, blocks editing). */
  readOnly?: boolean
  /** Mark the input disabled (50% opacity, blocks editing). */
  disabled?: boolean
  /** Class name applied to the field wrapper. */
  wrapperClassName?: string
  /** Class name applied to the inner `<TextInput>`. */
  className?: string
}

export const InputBase = forwardRef<ComponentRef<typeof TextInput>, InputBaseProps>(
  (
    {
      size = "md",
      isInvalid = false,
      isSuccess = false,
      iconLeading,
      iconTrailing,
      prefix,
      suffix,
      readOnly = false,
      disabled = false,
      secureTextEntry,
      wrapperClassName,
      className,
      onFocus,
      onBlur,
      placeholder,
      placeholderTextColor,
      editable,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const [isSecureVisible, setIsSecureVisible] = useState(false)

    const scheme = useColorScheme()
    const isDark = scheme === "dark"
    const state = isInvalid ? "error" : isSuccess ? "success" : "default"
    const isPassword = Boolean(secureTextEntry)
    const isEditable = !disabled && !readOnly && (editable ?? true)
    const iconPx = inlineIconSize[size]
    const iconTint = isDark ? iconTintDark : iconTintLight
    const errorTint = isDark ? errorTintDark : errorTintLight
    const resolvedPlaceholderColor =
      placeholderTextColor ?? (isDark ? placeholderTintDark : placeholderTintLight)

    return (
      <View
        className={cn(
          inputFieldVariants({
            size,
            state,
            isFocused,
            isDisabled: disabled,
            isReadOnly: readOnly && !disabled,
          }),
          wrapperClassName,
        )}
      >
        {iconLeading
          ? renderIcon(iconLeading, "leading", { color: iconTint, size: iconPx })
          : null}

        {prefix != null && prefix !== false ? (
          typeof prefix === "string" || typeof prefix === "number" ? (
            <Text className={cn(inlineTextVariants({ size }))}>{prefix}</Text>
          ) : (
            prefix
          )
        ) : null}

        <TextInput
          ref={ref}
          editable={isEditable}
          secureTextEntry={isPassword && !isSecureVisible}
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
          className={cn(inputTextVariants({ size }), className)}
          {...props}
        />

        {suffix != null && suffix !== false ? (
          typeof suffix === "string" || typeof suffix === "number" ? (
            <Text className={cn(inlineTextVariants({ size }))}>{suffix}</Text>
          ) : (
            suffix
          )
        ) : null}

        {iconTrailing && !isInvalid
          ? renderIcon(iconTrailing, "trailing", { color: iconTint, size: iconPx })
          : null}

        {isInvalid && !isPassword ? (
          <AlertCircle size={TRAILING_HINT_SIZE} color={errorTint} />
        ) : null}

        {isPassword ? (
          // 44pt touch target per CLAUDE.md HIG floor — negative margin keeps
          // the icon visually flush with the field's trailing padding even
          // while the tappable area extends well past the icon glyph. Toggle
          // is also disabled when the surrounding field is disabled, so a
          // dimmed field can't be partially interacted with.
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isSecureVisible ? "Hide password" : "Show password"}
            accessibilityState={{ disabled: !isEditable }}
            disabled={!isEditable}
            className="-mr-2 h-11 w-11 items-center justify-center"
            onPress={() => setIsSecureVisible((v) => !v)}
          >
            {isSecureVisible ? (
              <EyeOff size={TRAILING_HINT_SIZE} color={iconTint} />
            ) : (
              <Eye size={TRAILING_HINT_SIZE} color={iconTint} />
            )}
          </Pressable>
        ) : null}
      </View>
    )
  },
)

InputBase.displayName = "InputBase"

export interface InputProps extends InputBaseProps {
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

export const Input = forwardRef<ComponentRef<typeof TextInput>, InputProps>(
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
    const inputId = nativeID ?? generatedId
    const labelId = label ? `${inputId}-label` : undefined

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

        <InputBase
          ref={ref}
          nativeID={inputId}
          isInvalid={isInvalid}
          accessibilityLabelledBy={labelId}
          {...props}
        />

        {hint ? <HintText isInvalid={isInvalid}>{hint}</HintText> : null}
      </View>
    )
  },
)

Input.displayName = "Input"

export type InputSizeKey = InputSize
