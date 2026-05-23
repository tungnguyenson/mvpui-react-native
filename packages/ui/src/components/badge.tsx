/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/badges/badge.tsx + shared.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { tokens } from "@mvp-ui-rn/tokens"
import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type ComponentRef } from "react"
import { Text, View, useColorScheme, type ViewProps } from "react-native"

import { cn } from "../lib/cn"
import { renderIcon, type IconProp } from "../lib/render-icon"

/* ==========================================================================
   Badge — RN port of mvp-ui (web) Badge. Base only per Track-D scope:
   color + size + optional iconLeading slot.

   RN deltas vs. web:
   - Web `ring-1 ring-inset` → RN `border` (no ring primitive on RN).
   - Web "modern" type (bg-bg + shadow-xs) dropped — mobile chrome avoids
     shadows; the two pill/rounded shapes carry the variant story alone.
   - `BadgeWithButton` / `BadgeWithImage` / `BadgeGroup` deferred until
     a real consumer screen needs them.
   - Lucide icon tints use a per-color hex map keyed by `useColorScheme`
     because lucide ignores className.
   ========================================================================== */

export type BadgeColor =
  | "gray"
  | "brand"
  | "error"
  | "warning"
  | "success"
  | "slate"
  | "sky"
  | "blue"
  | "indigo"
  | "purple"
  | "pink"
  | "orange"

export type BadgeShape = "pill" | "rounded"
export type BadgeSize = "sm" | "md" | "lg"

const badgeVariants = cva(
  ["flex-row items-center self-start border"],
  {
    variants: {
      shape: {
        pill: "rounded-full",
        rounded: "rounded-md",
      },
      size: {
        sm: "h-6 px-2.5 gap-1",
        md: "h-7 px-3 gap-1",
        lg: "h-8 px-3.5 gap-1.5",
      },
      color: {
        gray: "bg-tag-gray-bg border-tag-gray-border",
        brand: "bg-tag-brand-bg border-tag-brand-border",
        error: "bg-tag-error-bg border-tag-error-border",
        warning: "bg-tag-warning-bg border-tag-warning-border",
        success: "bg-tag-success-bg border-tag-success-border",
        slate: "bg-tag-slate-bg border-tag-slate-border",
        sky: "bg-tag-sky-bg border-tag-sky-border",
        blue: "bg-tag-blue-bg border-tag-blue-border",
        indigo: "bg-tag-indigo-bg border-tag-indigo-border",
        purple: "bg-tag-purple-bg border-tag-purple-border",
        pink: "bg-tag-pink-bg border-tag-pink-border",
        orange: "bg-tag-orange-bg border-tag-orange-border",
      },
    },
    defaultVariants: {
      shape: "pill",
      size: "md",
      color: "gray",
    },
  },
)

// Per-size font + icon must step with height — see trap #13. Web's
// Badge had `sm`/`md` sharing `text-xs`; on RN that reads as no
// size step. Each tier bumps one Tailwind unit.
const badgeTextVariants = cva("font-medium", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-md",
    },
    color: {
      gray: "text-tag-gray-fg",
      brand: "text-tag-brand-fg",
      error: "text-tag-error-fg",
      warning: "text-tag-warning-fg",
      success: "text-tag-success-fg",
      slate: "text-tag-slate-fg",
      sky: "text-tag-sky-fg",
      blue: "text-tag-blue-fg",
      indigo: "text-tag-indigo-fg",
      purple: "text-tag-purple-fg",
      pink: "text-tag-pink-fg",
      orange: "text-tag-orange-fg",
    },
  },
  defaultVariants: { size: "md", color: "gray" },
})

/**
 * Per-color icon accent tints (light + dark). Mirrors
 * `--color-tag-{c}-accent` resolution in light + dark mode from
 * `packages/tokens/src/global.css`. Lucide takes `color` as raw RN
 * color, so we resolve via JS token map switched on `useColorScheme()`.
 */
const accentLight: Record<BadgeColor, string> = {
  gray: tokens.color.gray["500"],
  brand: tokens.color.brand["500"],
  error: tokens.color.error["500"],
  warning: tokens.color.warning["500"],
  success: tokens.color.success["500"],
  slate: "#64748b",
  sky: "#0ea5e9",
  blue: "#3b82f6",
  indigo: "#6366f1",
  purple: "#a855f7",
  pink: "#ec4899",
  orange: "#f97316",
}

const accentDark: Record<BadgeColor, string> = {
  gray: tokens.color.gray["400"],
  brand: tokens.color.brand["400"],
  error: "#f87171",
  warning: "#fbbf24",
  success: tokens.color.success["300"],
  slate: "#94a3b8",
  sky: "#38bdf8",
  blue: "#60a5fa",
  indigo: "#818cf8",
  purple: "#c084fc",
  pink: "#f472b6",
  orange: "#fb923c",
}

// Icon px steps with size per trap #13 (font + icon must step together).
const ICON_PX_BY_SIZE: Record<BadgeSize, number> = {
  sm: 10,
  md: 12,
  lg: 14,
}

export interface BadgeProps
  extends Omit<ViewProps, "children">,
    VariantProps<typeof badgeVariants> {
  children?: React.ReactNode
  /** Icon component or element rendered before the label. */
  iconLeading?: IconProp
  className?: string
}

export const Badge = forwardRef<ComponentRef<typeof View>, BadgeProps>(
  (
    {
      color = "gray",
      shape = "pill",
      size = "md",
      iconLeading,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const scheme = useColorScheme()
    const tint = (scheme === "dark" ? accentDark : accentLight)[color as BadgeColor]
    const iconPx = ICON_PX_BY_SIZE[size as BadgeSize]

    return (
      <View
        ref={ref}
        className={cn(badgeVariants({ color, shape, size }), className)}
        {...props}
      >
        {iconLeading
          ? renderIcon(iconLeading, "leading", { color: tint, size: iconPx })
          : null}
        {typeof children === "string" || typeof children === "number" ? (
          <Text className={cn(badgeTextVariants({ size, color }))}>{children}</Text>
        ) : (
          children
        )}
      </View>
    )
  },
)

Badge.displayName = "Badge"
