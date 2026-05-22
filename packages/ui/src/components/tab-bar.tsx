/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and react-native-reusables.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { tokens } from "@mvp-ui-rn/tokens"

/* ==========================================================================
   TabBar — RN-only bottom tab navigation. Skins expo-router's <Tabs>.

   Per Track-A decision: skin the native tab bar via `screenOptions`
   instead of replacing it with a custom `tabBar` slot. Routing, accessibility,
   and safe-area handling stay native; tokens drive the chrome.

   Usage:

   ```tsx
   import { Tabs } from "expo-router"
   import { tabBarScreenOptions } from "@mvp-ui-rn/ui"
   import { useColorScheme } from "react-native"

   export default function TabsLayout() {
     const scheme = useColorScheme()
     return (
       <Tabs screenOptions={tabBarScreenOptions({ isDark: scheme === "dark" })}>
         <Tabs.Screen name="index" options={{ title: "Home" }} />
         <Tabs.Screen name="settings" options={{ title: "Settings" }} />
       </Tabs>
     )
   }
   ```

   Active tint follows `--color-primary` (brand-600 light / brand-400 dark).
   Inactive tint follows `--color-fg-tertiary`. Tab bar surface follows
   `--color-bg`; top hairline follows `--color-border`.
   ========================================================================== */

const TAB_BAR_HEIGHT_BASE = 64

export interface TabBarScreenOptionsArgs {
  isDark?: boolean
  /** Override the base height (the safe-area inset adds on top). */
  height?: number
  /**
   * Bottom safe-area inset. Pass `useSafeAreaInsets().bottom` from the layout
   * so the bar clears the iOS home indicator. Defaults to 0 (preview / Android
   * gesture-nav devices report 0 here).
   */
  bottomInset?: number
}

export function tabBarScreenOptions({
  isDark = false,
  height = TAB_BAR_HEIGHT_BASE,
  bottomInset = 0,
}: TabBarScreenOptionsArgs = {}) {
  const surface = isDark ? tokens.color.gray["950"] : "#ffffff"
  const borderColor = isDark ? tokens.color.gray["800"] : tokens.color.gray["200"]
  const activeTint = isDark ? tokens.color.brand["400"] : tokens.color.brand["600"]
  const inactiveTint = isDark ? tokens.color.gray["400"] : tokens.color.gray["500"]

  return {
    tabBarStyle: {
      backgroundColor: surface,
      borderTopColor: borderColor,
      borderTopWidth: 0.5,
      height: height + bottomInset,
      paddingTop: 6,
      paddingBottom: 6 + bottomInset,
    },
    tabBarActiveTintColor: activeTint,
    tabBarInactiveTintColor: inactiveTint,
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: "500" as const,
      marginTop: 2,
    },
    headerShown: false,
  }
}
