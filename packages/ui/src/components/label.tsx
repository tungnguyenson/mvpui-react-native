/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/input/label.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { cva } from "class-variance-authority"
import { forwardRef, type ComponentRef, type ReactNode } from "react"
import { Text, type TextProps, View } from "react-native"

import { cn } from "../lib/cn"

/* ==========================================================================
   Label — RN port of mvp-ui (web) Label.

   RN deltas:
   - Web `<label htmlFor>` → RN has no native form association. Caller pairs
     by setting `nativeID` here and `accessibilityLabelledBy` on the paired
     `TextInput`. `Input` (composed) wires this for you.
   - Web `tooltip` prop dropped — depends on a Tooltip primitive that
     hasn't been ported yet. Will be re-added when Tooltip lands.
   - Label color does NOT shift on `isInvalid` — only the required asterisk
     re-tints (matches web behavior; verified against the web source).
   ========================================================================== */

const labelVariants = cva([
  "text-sm font-medium text-fg-secondary",
])

const asteriskVariants = cva("text-sm font-medium", {
  variants: {
    isInvalid: {
      true: "text-fg-error",
      false: "text-fg-brand",
    },
  },
  defaultVariants: { isInvalid: false },
})

export interface LabelProps extends Omit<TextProps, "children"> {
  children: ReactNode
  /** Show the required `*` indicator after the label text. */
  isRequired?: boolean
  /** Tint the required asterisk with the error color. */
  isInvalid?: boolean
  className?: string
}

export const Label = forwardRef<ComponentRef<typeof Text>, LabelProps>(
  ({ className, children, isRequired = false, isInvalid = false, ...props }, ref) => {
    // Bare strings inside <View> crash — wrap label content in <Text>.
    // The asterisk needs to render adjacent without breaking line flow, so
    // both label text + asterisk live inside a single horizontal <View>.
    return (
      <View className="flex-row items-center gap-0.5">
        <Text ref={ref} className={cn(labelVariants(), className)} {...props}>
          {children}
        </Text>

        {isRequired ? (
          <Text
            accessibilityLabel="required"
            className={cn(asteriskVariants({ isInvalid }))}
          >
            *
          </Text>
        ) : null}
      </View>
    )
  },
)

Label.displayName = "Label"
