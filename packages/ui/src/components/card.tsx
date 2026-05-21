/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/card.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { forwardRef, type ComponentRef } from "react"
import { Text, View, type TextProps, type ViewProps } from "react-native"

import { cn } from "../lib/cn"

/* ==========================================================================
   Card — surface composition. Mirrors mvp-ui (web) sub-components:
   Card / CardHeader / CardTitle / CardDescription / CardContent / CardFooter.

   RN deltas vs. web:
   - Web `shadow-xs` dropped — RN box-shadow approximates poorly; mobile
     surfaces generally use border-only chrome (same call as Input).
   - `CardDescription` bumped one Tailwind step (`text-sm` → `text-md`)
     for mobile arm's-length readability — same RN ramp philosophy as
     Label / HintText / Button.
   - No built-in Pressable. Consumers wrap in `<Pressable>` when the card
     should be tap-to-navigate.
   ========================================================================== */

export const Card = forwardRef<ComponentRef<typeof View>, ViewProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn("rounded-xl border border-border bg-bg", className)}
      {...props}
    />
  ),
)
Card.displayName = "Card"

export const CardHeader = forwardRef<ComponentRef<typeof View>, ViewProps>(
  ({ className, ...props }, ref) => (
    <View ref={ref} className={cn("gap-1.5 p-6", className)} {...props} />
  ),
)
CardHeader.displayName = "CardHeader"

export const CardTitle = forwardRef<ComponentRef<typeof Text>, TextProps>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      accessibilityRole="header"
      className={cn("text-lg font-semibold text-fg", className)}
      {...props}
    />
  ),
)
CardTitle.displayName = "CardTitle"

export const CardDescription = forwardRef<ComponentRef<typeof Text>, TextProps>(
  ({ className, ...props }, ref) => (
    <Text
      ref={ref}
      className={cn("text-md text-fg-tertiary", className)}
      {...props}
    />
  ),
)
CardDescription.displayName = "CardDescription"

export const CardContent = forwardRef<ComponentRef<typeof View>, ViewProps>(
  ({ className, ...props }, ref) => (
    <View ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  ),
)
CardContent.displayName = "CardContent"

export const CardFooter = forwardRef<ComponentRef<typeof View>, ViewProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn("flex-row items-center gap-3 p-6 pt-0", className)}
      {...props}
    />
  ),
)
CardFooter.displayName = "CardFooter"
