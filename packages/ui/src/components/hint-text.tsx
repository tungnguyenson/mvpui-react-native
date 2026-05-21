/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/input/hint-text.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type ComponentRef } from "react"
import { Text, type TextProps } from "react-native"

import { cn } from "../lib/cn"

/* ==========================================================================
   HintText — helper / error text below a field.

   RN deltas:
   - Web `role="alert"` (a11y) → RN `accessibilityLiveRegion="polite"` on
     Android + `accessibilityRole="alert"` on iOS, gated on `isInvalid`.
   - Native `<p>` → RN `<Text>`.
   ========================================================================== */

// Size ramp bumped one step from mvp-ui (web): md 14→16 (text-sm →
// text-md), sm 12→14 (text-xs → text-sm). Mirrors the Label bump for
// mobile readability — see docs/tokens-rn-adjustments.md §3a philosophy.
export const hintTextVariants = cva("", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-md",
    },
    isInvalid: {
      true: "text-fg-error",
      false: "text-fg-tertiary",
    },
  },
  defaultVariants: {
    size: "md",
    isInvalid: false,
  },
})

export interface HintTextProps
  extends Omit<TextProps, "children">,
    VariantProps<typeof hintTextVariants> {
  children?: TextProps["children"]
  /** Render as an error message (announces to screen readers). */
  isInvalid?: boolean
  className?: string
}

export const HintText = forwardRef<ComponentRef<typeof Text>, HintTextProps>(
  ({ className, size, isInvalid = false, children, ...props }, ref) => (
    <Text
      ref={ref}
      accessibilityRole={isInvalid ? "alert" : "text"}
      accessibilityLiveRegion={isInvalid ? "polite" : "none"}
      className={cn(hintTextVariants({ size, isInvalid }), className)}
      {...props}
    >
      {children}
    </Text>
  ),
)

HintText.displayName = "HintText"
