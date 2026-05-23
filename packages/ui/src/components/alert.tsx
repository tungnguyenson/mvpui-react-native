/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/alert.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { tokens } from "@mvp-ui-rn/tokens"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react-native"
import { forwardRef, type ComponentRef, type ReactNode } from "react"
import { Pressable, Text, View, useColorScheme, type TextProps, type ViewProps } from "react-native"
import Animated, { FadeOut } from "react-native-reanimated"

import { cn } from "../lib/cn"
import { renderIcon, type IconProp } from "../lib/render-icon"

/* ==========================================================================
   Alert — RN port of mvp-ui (web) Alert. 4 status variants tinted via the
   semantic `info/success/warning/error` token bundle (`-bg`, `-border`,
   `-fg`).

   RN deltas vs. web:
   - Adds optional `dismissible` X button (web has no built-in dismiss).
     `onDismiss` is called when tapped; the parent is responsible for
     removing the Alert from the tree. The Alert wraps its content in
     `Animated.View` with `exiting={FadeOut}` so the removal animates.
   - `AlertTitle` / `AlertDescription` inherit the variant `text-*-fg`
     color from the wrapper. RN does not cascade text color from a View
     to nested Text, so each sub-component restates the foreground color
     via the variant context (passed implicitly through className).
   - Lucide X icon uses a per-variant tint from the JS token export
     mapped through `useColorScheme()`.
   ========================================================================== */

const alertVariants = cva(
  "flex-row gap-3 rounded-xl border p-4",
  {
    variants: {
      variant: {
        info: "bg-info-bg border-info-border",
        success: "bg-success-bg border-success-border",
        warning: "bg-warning-bg border-warning-border",
        error: "bg-error-bg border-error-border",
      },
    },
    defaultVariants: { variant: "info" },
  },
)

const alertFgVariants = cva("", {
  variants: {
    variant: {
      info: "text-info-fg",
      success: "text-success-fg",
      warning: "text-warning-fg",
      error: "text-error-fg",
    },
  },
  defaultVariants: { variant: "info" },
})

type AlertVariant = NonNullable<VariantProps<typeof alertVariants>["variant"]>

/** Per-variant icon tints (light + dark) mirroring `--color-*-fg` resolution. */
const getIconTintLight = (): Record<AlertVariant, string> => ({
  info: tokens.color.brand["700"],
  success: tokens.color.success["700"],
  warning: tokens.color.warning["700"],
  error: tokens.color.error["700"],
})
const getIconTintDark = (): Record<AlertVariant, string> => ({
  info: tokens.color.brand["300"],
  success: tokens.color.success["300"],
  warning: tokens.color.warning["300"],
  error: tokens.color.error["300"],
})

const ICON_SIZE = 20

export interface AlertProps extends ViewProps {
  variant?: AlertVariant
  /** Icon component or pre-rendered element rendered before the body. */
  icon?: IconProp
  /** Adds a trailing X button. Tap calls `onDismiss`. */
  onDismiss?: () => void
  /** Accessibility label for the dismiss button. */
  dismissLabel?: string
  children?: ReactNode
}

export const Alert = forwardRef<ComponentRef<typeof View>, AlertProps>(
  (
    {
      variant = "info",
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
    const iconTint = (isDark ? getIconTintDark() : getIconTintLight())[variant]

    return (
      <Animated.View exiting={FadeOut.duration(200)}>
        <View
          ref={ref}
          accessibilityRole="alert"
          className={cn(alertVariants({ variant }), className)}
          {...props}
        >
          {icon
            ? renderIcon(icon, "leading", { color: iconTint, size: ICON_SIZE })
            : null}

          <View className="flex-1 flex-col gap-1">{children}</View>

          {onDismiss ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={dismissLabel}
              hitSlop={12}
              onPress={onDismiss}
              className="-mr-1 -mt-1 h-11 w-11 items-center justify-center"
            >
              <X size={18} color={iconTint} />
            </Pressable>
          ) : null}
        </View>
      </Animated.View>
    )
  },
)
Alert.displayName = "Alert"

/* -------------------------------------------------------------------------- */
/*  AlertTitle / AlertDescription                                             */
/* -------------------------------------------------------------------------- */

export interface AlertTextProps extends TextProps {
  variant?: AlertVariant
}

export const AlertTitle = forwardRef<ComponentRef<typeof Text>, AlertTextProps>(
  ({ className, variant = "info", ...props }, ref) => (
    <Text
      ref={ref}
      accessibilityRole="header"
      className={cn("text-md font-semibold", alertFgVariants({ variant }), className)}
      {...props}
    />
  ),
)
AlertTitle.displayName = "AlertTitle"

export const AlertDescription = forwardRef<ComponentRef<typeof Text>, AlertTextProps>(
  ({ className, variant = "info", ...props }, ref) => (
    <Text
      ref={ref}
      className={cn(
        "text-md opacity-90",
        alertFgVariants({ variant }),
        className,
      )}
      {...props}
    />
  ),
)
AlertDescription.displayName = "AlertDescription"

export type AlertVariantKey = AlertVariant
