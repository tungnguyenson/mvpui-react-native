/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/buttons/social-button.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { tokens } from "@mvp-ui-rn/tokens"
import { cva, type VariantProps } from "class-variance-authority"
import React, { forwardRef, type ComponentRef } from "react"
import { Pressable, Text, useColorScheme, type PressableProps } from "react-native"

import { cn } from "../lib/cn"
import { AppleLogo, GoogleLogo, type LogoProps } from "./social-logos"

/* ==========================================================================
   SocialButton — RN port of mvp-ui (web) SocialButton.

   Web divergences:
   - No hover states (RN touch only). `active:` → NativeWind pressed state.
   - No focus-visible ring.
   - `theme` prop: only "brand" supported (gray monochrome not needed yet).
   - Google: gray bg + colorful logo (brand theme default).
   - Apple: black bg, white logo + label. Brand-mandated fill — dark-ok.
   - Provider logo uses react-native-svg (not <svg>).
   ========================================================================== */

export type SocialProvider = "google" | "apple"

const rootVariants = cva(
  "flex-row items-center justify-center gap-2.5 rounded-lg border",
  {
    variants: {
      provider: {
        google: "bg-bg border-border active:bg-bg-secondary",
        apple: "bg-black border-transparent active:bg-neutral-800", // dark-ok: brand-mandated solid
      },
      size: {
        md: "px-3.5 py-2.5 min-h-[44px]",
        lg: "px-4 py-3 min-h-[44px]",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
)

const labelVariants = cva("font-semibold", {
  variants: {
    provider: {
      google: "text-fg-secondary",
      apple: "text-white", // dark-ok: on black brand fill
    },
    size: {
      md: "text-sm",
      lg: "text-md",
    },
  },
  defaultVariants: {
    size: "lg",
  },
})

const LOGO_SIZE: Record<NonNullable<VariantProps<typeof rootVariants>["size"]>, number> = {
  md: 16,
  lg: 20,
}

const logoColorLight: Record<SocialProvider, string> = {
  google: tokens.color.gray["500"],
  apple: "#ffffff", // dark-ok: on black brand fill
}

const logoColorDark: Record<SocialProvider, string> = {
  google: tokens.color.gray["400"],
  apple: "#ffffff", // dark-ok: on black brand fill
}

export interface SocialButtonProps
  extends Omit<PressableProps, "children" | "style"> {
  provider: SocialProvider
  size?: "md" | "lg"
  children?: string
}

const LOGOS: Record<SocialProvider, (props: LogoProps) => React.JSX.Element> = {
  google: GoogleLogo,
  apple: AppleLogo,
}

export const SocialButton = forwardRef<
  ComponentRef<typeof Pressable>,
  SocialButtonProps
>(({ provider, size = "lg", children, className, ...props }, ref) => {
  const isDark = useColorScheme() === "dark"
  const logoColor = isDark ? logoColorDark[provider] : logoColorLight[provider]
  const colorful = provider === "google" // Google gets full-color logo in brand theme
  const logoSize = LOGO_SIZE[size]

  const Logo = LOGOS[provider]

  return (
    <Pressable
      ref={ref}
      className={cn(rootVariants({ provider, size }), className)}
      accessibilityRole="button"
      {...props}
    >
      <Logo size={logoSize} color={logoColor} colorful={colorful} />
      {children ? (
        <Text className={labelVariants({ provider, size })}>{children}</Text>
      ) : null}
    </Pressable>
  )
})

SocialButton.displayName = "SocialButton"
