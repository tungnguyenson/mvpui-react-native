/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/buttons/button.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Slot } from "@rn-primitives/slot"
import { tokens } from "@mvp-ui-rn/tokens"
import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type ComponentRef, type ReactNode } from "react"
import { ActivityIndicator, Pressable, Text, type PressableProps } from "react-native"

import { cn } from "../lib/cn"
import { renderIcon, type IconProp } from "../lib/render-icon"

/* ==========================================================================
   Button — RN port of mvp-ui (web) Button.

   Surface: `Pressable` (or `Slot` when `asChild`). Web `hover:` states are
   dropped (no hover on touch); `active:` maps to NativeWind's Pressable
   pressed state. Focus-visible rings are dropped — RN has no equivalent
   keyboard-focus model. Minimum touch target is 44pt per Apple HIG +
   CLAUDE.md hard rule.

   Variant API + IconProp contract mirror the web exactly so the same docs
   in `packages/skill/components-rn.md` apply.
   ========================================================================== */

export const buttonVariants = cva(
  ["group flex-row items-center justify-center min-h-11"],
  {
    variants: {
      color: {
        primary: ["bg-primary active:bg-primary-active disabled:opacity-50"],
        secondary: [
          "bg-bg border border-border",
          "active:bg-bg-tertiary disabled:opacity-50",
        ],
        tertiary: ["active:bg-bg-tertiary disabled:opacity-50"],
        "primary-destructive": [
          "bg-error-600", // dark-ok: solid destructive fill, vivid both modes
          "active:bg-error-700 disabled:opacity-50", // dark-ok: pressed/disabled keep destructive ramp
        ],
        "secondary-destructive": [
          "bg-bg border border-border-error",
          "active:bg-bg-tertiary disabled:opacity-50",
        ],
        "tertiary-destructive": ["active:bg-bg-tertiary disabled:opacity-50"],
        "link-color": ["bg-transparent disabled:opacity-50"],
        "link-gray": ["bg-transparent disabled:opacity-50"],
        "link-destructive": ["bg-transparent disabled:opacity-50"],
      },
      size: {
        sm: "gap-1 rounded-md px-3",
        md: "gap-1 rounded-md px-3.5",
        lg: "gap-1.5 rounded-md px-4 min-h-12",
        xl: "gap-1.5 rounded-lg px-5 min-h-14",
      },
      iconOnly: { true: "", false: "" },
      isLink: { true: "px-0 min-h-0", false: "" },
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", className: "px-0 w-11" },
      { iconOnly: true, size: "md", className: "px-0 w-11" },
      { iconOnly: true, size: "lg", className: "px-0 w-12" },
      { iconOnly: true, size: "xl", className: "px-0 w-14" },
    ],
    defaultVariants: {
      color: "primary",
      size: "sm",
      iconOnly: false,
      isLink: false,
    },
  },
)

const labelVariants = cva(["font-semibold text-center"], {
  variants: {
    color: {
      primary: "text-primary-fg",
      secondary: "text-fg-secondary",
      tertiary: "text-fg-secondary",
      "primary-destructive": "text-white", // dark-ok: white sits on solid error-600 fill
      "secondary-destructive": "text-fg-error",
      "tertiary-destructive": "text-fg-error",
      "link-color": "text-fg-brand underline",
      "link-gray": "text-fg-tertiary underline",
      "link-destructive": "text-fg-error underline",
    },
    size: {
      sm: "text-sm",
      md: "text-sm",
      lg: "text-md",
      xl: "text-md",
    },
  },
  defaultVariants: { color: "primary", size: "sm" },
})

/**
 * Per-variant spinner tint.
 *
 * `ActivityIndicator` accepts a raw color string and does not inherit Text
 * color nor resolve CSS variables from NativeWind, so we feed it literal
 * hex values from the JS token export. This means the spinner does NOT
 * flip in dark mode — acceptable for a transient loading state. Swap for
 * a className-driven lucide+Reanimated spinner once `cssInterop` is wired
 * for icon components.
 */
const spinnerTint: Record<ButtonColorKey, string> = {
  primary: "#ffffff",
  secondary: tokens.color.gray["700"],
  tertiary: tokens.color.gray["700"],
  "primary-destructive": "#ffffff", // dark-ok: matches white label on error fill
  "secondary-destructive": tokens.color.error["600"],
  "tertiary-destructive": tokens.color.error["600"],
  "link-color": tokens.color.brand["600"],
  "link-gray": tokens.color.gray["500"],
  "link-destructive": tokens.color.error["600"],
}

type ButtonColorKey = NonNullable<VariantProps<typeof buttonVariants>["color"]>

const LINK_COLORS = ["link-color", "link-gray", "link-destructive"] as const

export interface ButtonProps
  extends Omit<PressableProps, "children" | "style">,
    Pick<VariantProps<typeof buttonVariants>, "color" | "size"> {
  /** Render styles onto the child element via `@rn-primitives/slot`. */
  asChild?: boolean
  /** Shows a spinner and blocks interaction. */
  isLoading?: boolean
  /** Keep the label visible while loading (spinner sits inline). */
  showTextWhileLoading?: boolean
  /** Icon component or element rendered before the label. */
  iconLeading?: IconProp
  /** Icon component or element rendered after the label. */
  iconTrailing?: IconProp
  /** Button text. Wrapped in `<Text>` automatically (unless `asChild`). */
  children?: ReactNode
  className?: string
}

export const Button = forwardRef<ComponentRef<typeof Pressable>, ButtonProps>(
  (
    {
      className,
      color = "primary",
      size = "sm",
      asChild = false,
      isLoading = false,
      showTextWhileLoading = false,
      iconLeading,
      iconTrailing,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : Pressable
    const hasChildren =
      children !== undefined && children !== null && children !== false
    const isIconOnly = !hasChildren && Boolean(iconLeading || iconTrailing)
    const isLink = LINK_COLORS.includes(color as (typeof LINK_COLORS)[number])
    const isDisabled = Boolean(disabled || isLoading)

    return (
      <Comp
        ref={ref}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: isLoading }}
        disabled={isDisabled}
        className={cn(
          buttonVariants({ color, size, iconOnly: isIconOnly, isLink }),
          className,
        )}
        {...props}
      >
        {!isLoading && iconLeading ? renderIcon(iconLeading, "leading") : null}

        {isLoading ? (
          <ActivityIndicator size="small" color={spinnerTint[color as ButtonColorKey]} />
        ) : null}

        {hasChildren && (isLoading ? showTextWhileLoading : true) ? (
          asChild ? (
            children
          ) : (
            <Text className={cn(labelVariants({ color, size }))}>{children}</Text>
          )
        ) : null}

        {!isLoading && iconTrailing ? renderIcon(iconTrailing, "trailing") : null}
      </Comp>
    )
  },
)

Button.displayName = "Button"

/**
 * Re-export for ergonomic prop typing in consumers that build wrapper
 * components and need the same variant union as `Button`.
 */
export type ButtonColor = ButtonColorKey
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>
