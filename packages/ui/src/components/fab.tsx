/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and react-native-reusables.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { pickShadow, tokens } from "@mvp-ui-rn/tokens"
import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type ComponentRef } from "react"
import { Pressable, Text, View, useColorScheme, type PressableProps } from "react-native"

import { cn } from "../lib/cn"
import { renderIcon, type IconProp } from "../lib/render-icon"
import { Spinner } from "./spinner"

/* ==========================================================================
   FAB — Floating Action Button visual primitive.

   Circular (or extended pill) Pressable with brand fill + shadow.
   The component is a VISUAL PRIMITIVE — it does not set `position: absolute`
   or manage safe-area insets. The caller decides placement:

     // Inside FabTabBar (tab-bar cutout):
     <FAB icon={Plus} onPress={handleCreate} />

     // Standalone floating (consumer owns positioning):
     <View style={{ position:"absolute", bottom: insets.bottom + 24, right: 24 }}>
       <FAB icon={Plus} onPress={handleCreate} />
     </View>

   `label` prop switches to the "extended FAB" layout: pill shape with icon
   on the left and a text label on the right.

   Sizes: md (56px) / lg (64px).
   Colors: primary (brand fill) / secondary (bg fill + border) / surface (bg-secondary fill).

   Shadow is brand-tinted for `primary` (matching the established FabTabBar
   convention in apps/showcase) and uses the standard token shadow for
   secondary/surface.
   ========================================================================== */

const FAB_SIZE = { md: 56, lg: 64 } as const
const ICON_SIZE = { md: 24, lg: 28 } as const
const LABEL_SIZE = { md: 16, lg: 18 } as const

type FabSize = keyof typeof FAB_SIZE
type FabColor = "primary" | "secondary" | "surface"

/* Background color (JS — needed for shadow + bg together) */
const getBgColorLight = (): Record<FabColor, string> => ({
  primary: tokens.color.brand["600"],
  secondary: "#ffffff",
  surface: tokens.color.gray["50"],
})
const getBgColorDark = (): Record<FabColor, string> => ({
  primary: tokens.color.brand["600"],
  secondary: tokens.color.gray["950"],
  surface: tokens.color.gray["900"],
})

/* Icon / label tint */
const getIconTintLight = (): Record<FabColor, string> => ({
  primary: "#ffffff", // dark-ok: white on brand fill
  secondary: tokens.color.brand["600"],
  surface: tokens.color.gray["700"],
})
const getIconTintDark = (): Record<FabColor, string> => ({
  primary: "#ffffff", // dark-ok
  secondary: tokens.color.brand["400"],
  surface: tokens.color.gray["300"],
})

const containerVariants = cva("items-center justify-center overflow-hidden", {
  variants: {
    color: {
      primary: "",
      secondary: "border border-border",
      surface: "",
    },
    shape: {
      circle: "rounded-full",
      extended: "rounded-full flex-row gap-2 px-4",
    },
  },
  defaultVariants: { color: "primary", shape: "circle" },
})

export interface FabProps extends Omit<PressableProps, "children"> {
  /** Icon to display in the FAB. */
  icon: IconProp
  /** When provided, renders the "extended FAB" pill layout with icon + label. */
  label?: string
  /** @default "md" */
  size?: FabSize
  /** @default "primary" */
  color?: FabColor
  /** Shows a Spinner in place of the icon. Blocks interaction. */
  isLoading?: boolean
  /** Accessibility label (required when no `label` prop). */
  accessibilityLabel?: string
}

export const FAB = forwardRef<ComponentRef<typeof Pressable>, FabProps>(
  (
    {
      icon,
      label,
      size = "md",
      color = "primary",
      isLoading = false,
      disabled = false,
      accessibilityLabel,
      style,
      className,
      ...props
    },
    ref,
  ) => {
    const scheme = useColorScheme()
    const isDark = scheme === "dark"

    const px = FAB_SIZE[size]
    const iconPx = ICON_SIZE[size]
    const labelSize = LABEL_SIZE[size]
    const bgColor = (isDark ? getBgColorDark() : getBgColorLight())[color]
    const iconColor = (isDark ? getIconTintDark() : getIconTintLight())[color]
    const isDisabled = disabled || isLoading
    const shape = label ? "extended" : "circle"

    const shadow =
      color === "primary"
        ? {
            shadowColor: tokens.color.brand["600"],
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.45,
            shadowRadius: 10,
            elevation: 8,
          }
        : pickShadow("md", isDark ? "dark" : "light")

    return (
      <Pressable
        ref={ref}
        accessibilityRole="button"
        accessibilityLabel={label ?? accessibilityLabel}
        accessibilityState={{ disabled: isDisabled, busy: isLoading }}
        disabled={isDisabled}
        style={style}
        {...props}
      >
        {({ pressed }) => (
          <View
            style={[
              shape === "circle" ? { width: px, height: px } : { height: px },
              shadow,
              { backgroundColor: bgColor, opacity: pressed || isDisabled ? 0.75 : 1 },
            ]}
            className={cn(containerVariants({ color, shape }), className)}
          >
            {isLoading ? (
              <Spinner size={iconPx} tint={color === "primary" ? "primary-fg" : "fg-brand"} />
            ) : (
              renderIcon(icon, "leading", { color: iconColor, size: iconPx })
            )}
            {label ? (
              <Text
                style={{ fontSize: labelSize, color: iconColor, fontWeight: "600" }}
                numberOfLines={1}
              >
                {label}
              </Text>
            ) : null}
          </View>
        )}
      </Pressable>
    )
  },
)
FAB.displayName = "FAB"

export type FabSizeKey = FabSize
export type FabColorKey = FabColor
