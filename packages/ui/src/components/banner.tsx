/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and react-native-reusables.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { tokens } from "@mvp-ui-rn/tokens"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react-native"
import { forwardRef, type ComponentRef, type ReactNode } from "react"
import { Pressable, Text, View, useColorScheme, type ViewProps } from "react-native"
import Animated, { FadeOut } from "react-native-reanimated"

import { cn } from "../lib/cn"
import { renderIcon, type IconProp } from "../lib/render-icon"

/* ==========================================================================
   Banner — full-width persistent in-page notice bar.

   Distinct from Alert (boxed, rounded, dismissible-on-tap) and Toast
   (ephemeral overlay). Banner is an inline layout element:
   - Full width, no border-radius (reads as a system-level bar).
   - Top + bottom hairline border.
   - Stays visible until the consumer conditionally unmounts it.
   - 5 variants: neutral (default) + 4 status (info/success/warning/error).

   Placement: between the Header and the ScrollView. Consumer controls
   visibility via React state — no singleton store.

   RN deltas vs. web:
   - Web has no Banner primitive. Pattern from native iOS system banners.
   - Text color does not cascade from View to Text in RN; title/description
     use explicit variant-aware color classes.
   - Lucide icon tint resolved via JS token map + useColorScheme().
   ========================================================================== */

const bannerVariants = cva(
  "w-full flex-row items-center gap-3 border-b border-t px-4 py-3",
  {
    variants: {
      variant: {
        neutral: "bg-bg-secondary border-border",
        info: "bg-info-bg border-info-border",
        success: "bg-success-bg border-success-border",
        warning: "bg-warning-bg border-warning-border",
        error: "bg-error-bg border-error-border",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
)

const titleVariants = cva("text-sm font-semibold", {
  variants: {
    variant: {
      neutral: "text-fg",
      info: "text-info-fg",
      success: "text-success-fg",
      warning: "text-warning-fg",
      error: "text-error-fg",
    },
  },
  defaultVariants: { variant: "neutral" },
})

const descVariants = cva("text-sm opacity-90", {
  variants: {
    variant: {
      neutral: "text-fg-secondary",
      info: "text-info-fg",
      success: "text-success-fg",
      warning: "text-warning-fg",
      error: "text-error-fg",
    },
  },
  defaultVariants: { variant: "neutral" },
})

type BannerVariant = NonNullable<VariantProps<typeof bannerVariants>["variant"]>

const iconTintLight: Record<BannerVariant, string> = {
  neutral: tokens.color.gray["600"],
  info: tokens.color.brand["700"],
  success: tokens.color.success["700"],
  warning: tokens.color.warning["700"],
  error: tokens.color.error["700"],
}

const iconTintDark: Record<BannerVariant, string> = {
  neutral: tokens.color.gray["400"],
  info: tokens.color.brand["300"],
  success: tokens.color.success["300"],
  warning: tokens.color.warning["300"],
  error: tokens.color.error["300"],
}

const ICON_SIZE = 18
const DISMISS_HIT = 12

export interface BannerProps extends ViewProps {
  variant?: BannerVariant
  /** Title text (required — the primary message). */
  title: string
  /** Optional supporting text below the title. */
  description?: string
  /** Leading icon component or pre-rendered element. */
  icon?: IconProp
  /**
   * Adds a trailing X button. Tap calls this callback; the parent is
   * responsible for removing the Banner from the tree. Reanimated
   * `FadeOut` animates the unmount.
   */
  onDismiss?: () => void
  /** Accessibility label for the dismiss button. @default "Dismiss" */
  dismissLabel?: string
  children?: ReactNode
}

export const Banner = forwardRef<ComponentRef<typeof View>, BannerProps>(
  (
    {
      variant = "neutral",
      title,
      description,
      icon,
      onDismiss,
      dismissLabel = "Dismiss",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const scheme = useColorScheme()
    const isDark = scheme === "dark"
    const iconTint = (isDark ? iconTintDark : iconTintLight)[variant]

    return (
      <Animated.View exiting={FadeOut.duration(200)}>
        <View
          ref={ref}
          accessibilityRole="alert"
          className={cn(bannerVariants({ variant }), className)}
          {...props}
        >
          {icon
            ? renderIcon(icon, "leading", { color: iconTint, size: ICON_SIZE })
            : null}

          <View className="flex-1 gap-0.5">
            <Text className={cn(titleVariants({ variant }))}>{title}</Text>
            {description ? (
              <Text className={cn(descVariants({ variant }))}>{description}</Text>
            ) : null}
            {children}
          </View>

          {onDismiss ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={dismissLabel}
              hitSlop={DISMISS_HIT}
              onPress={onDismiss}
              className="-mr-1 h-10 w-10 items-center justify-center"
            >
              <X size={16} color={iconTint} />
            </Pressable>
          ) : null}
        </View>
      </Animated.View>
    )
  },
)
Banner.displayName = "Banner"

export type BannerVariantKey = BannerVariant
