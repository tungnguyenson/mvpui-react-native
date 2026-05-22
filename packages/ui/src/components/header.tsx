/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and react-native-reusables.
 *
 * Copyright (c) 2026 TungMVP)
 * Licensed under MIT
 */

import { tokens } from "@mvp-ui-rn/tokens"
import { router } from "expo-router"
import { ChevronLeft } from "lucide-react-native"
import { forwardRef, type ComponentRef, type ReactNode } from "react"
import { Pressable, Text, View, useColorScheme, type ViewProps } from "react-native"

import { cn } from "../lib/cn"

/* ==========================================================================
   Header — RN-only screen header primitive. No direct web equivalent.

   Use when `headerShown: false` is set on the route's Stack.Screen — this
   gives full design-system control over title typography, back button
   styling, and right-side actions. For routes that keep the native
   header, use `headerScreenOptions()` below to theme the native header
   to match.

   Layout: [back? · leading?] · title · [trailing actions]. Title is
   horizontally centered when both ends are equal-width; falls back to
   left-aligned when one side is unbalanced.
   ========================================================================== */

const HEADER_HEIGHT = 56

export interface HeaderProps extends Omit<ViewProps, "children"> {
  /** Title shown center-aligned. */
  title?: string
  /** Render a back button on the left (default: true if `canGoBack`). */
  showBack?: boolean
  /** Override the back button tap handler (default: `router.back()`). */
  onBack?: () => void
  /** Custom leading content. Renders alongside / instead of the back button. */
  leading?: ReactNode
  /** Right-aligned action(s). Pass a single ReactNode or a `<View>` of rows. */
  trailing?: ReactNode
}

export const Header = forwardRef<ComponentRef<typeof View>, HeaderProps>(
  (
    { title, showBack = true, onBack, leading, trailing, className, ...props },
    ref,
  ) => {
    const handleBack = onBack ?? (() => router.back())

    return (
      <View
        ref={ref}
        accessibilityRole="header"
        className={cn(
          "flex-row items-center border-b border-border bg-bg px-4",
          className,
        )}
        style={{ height: HEADER_HEIGHT }}
        {...props}
      >
        <View className="flex-row items-center" style={{ width: 88 }}>
          {showBack ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back"
              hitSlop={8}
              onPress={handleBack}
              className="-ml-2 h-11 w-11 items-center justify-center"
            >
              <BackChevron />
            </Pressable>
          ) : null}
          {leading ? <View className="ml-1">{leading}</View> : null}
        </View>

        <View className="flex-1 items-center">
          {title ? (
            <Text
              numberOfLines={1}
              className="text-lg font-semibold text-fg"
            >
              {title}
            </Text>
          ) : null}
        </View>

        <View
          className="flex-row items-center justify-end"
          style={{ width: 88 }}
        >
          {trailing}
        </View>
      </View>
    )
  },
)
Header.displayName = "Header"

function BackChevron() {
  const scheme = useColorScheme()
  const color =
    scheme === "dark" ? tokens.color.brand["400"] : tokens.color.brand["600"]
  return <ChevronLeft size={24} color={color} />
}

/* -------------------------------------------------------------------------- */
/*  headerScreenOptions — theme the native expo-router header                 */
/* -------------------------------------------------------------------------- */

export interface HeaderScreenOptionsArgs {
  isDark?: boolean
}

/**
 * Returns Stack.Screen `options` that color the native expo-router /
 * react-navigation header with the same surface, border, and title tint
 * as the custom `<Header>` primitive. Pair with `useColorScheme()` at
 * the call site:
 *
 * ```tsx
 * const scheme = useColorScheme()
 * <Stack.Screen options={headerScreenOptions({ isDark: scheme === "dark" })} />
 * ```
 *
 * Returns raw style objects (not className) because the native nav
 * header lives outside the NativeWind tree.
 */
export function headerScreenOptions({ isDark = false }: HeaderScreenOptionsArgs = {}) {
  const surface = isDark ? tokens.color.gray["950"] : "#ffffff"
  const borderColor = isDark ? tokens.color.gray["700"] : tokens.color.gray["300"]
  const titleColor = isDark ? tokens.color.gray["25"] : tokens.color.gray["900"]
  const tintColor = isDark ? tokens.color.brand["400"] : tokens.color.brand["600"]

  return {
    headerStyle: { backgroundColor: surface },
    headerShadowVisible: false,
    headerTitleStyle: {
      color: titleColor,
      fontSize: 18,
      fontWeight: "600" as const,
    },
    headerTintColor: tintColor,
    headerBackTitleVisible: false,
    // expo-router exposes headerLargeStyle / headerLargeTitleStyle when
    // `headerLargeTitle: true`; consumers can spread these into their
    // own options. We do not enable large-title by default — most
    // showcase screens are single-line headers.
    contentStyle: { backgroundColor: surface },
    headerBorderColor: borderColor,
  }
}
