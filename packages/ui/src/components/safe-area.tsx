/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and react-native-reusables.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { StatusBar } from "expo-status-bar"
import { forwardRef, type ComponentRef, type ReactNode } from "react"
import { useColorScheme, View } from "react-native"
import {
  SafeAreaView,
  type Edge,
} from "react-native-safe-area-context"

import { cn } from "../lib/cn"

/* ==========================================================================
   SafeArea — RN-only layout primitive. No direct web equivalent.

   Wraps `react-native-safe-area-context`'s `SafeAreaView` with:
   - `flex-1 bg-bg` default surface (paints behind the safe-area insets
     so the screen looks continuous with the inset margin).
   - `edges` prop (array of "top" | "bottom" | "left" | "right"; defaults
     to all four).
   - `expo-status-bar` coordination via `useColorScheme` — content color
     auto-flips (dark text on light bg / light text on dark bg) unless
     `statusBar` is explicitly overridden.

   Use as the outermost wrapper of every screen. Pairs with `<Stack>` from
   `expo-router` (which renders the native nav header outside the
   safe-area inset wrapper).
   ========================================================================== */

const ALL_EDGES: Edge[] = ["top", "bottom", "left", "right"]

export interface SafeAreaProps {
  /** Subset of edges to apply the safe-area inset on. */
  edges?: Edge[]
  /**
   * StatusBar content color. `"auto"` (default) follows `useColorScheme`:
   * dark scheme → light content; light scheme → dark content.
   * `false` skips rendering `<StatusBar>` entirely (caller manages it
   * elsewhere).
   */
  statusBar?: "auto" | "light" | "dark" | false
  /** Class names appended to the wrapper. */
  className?: string
  children?: ReactNode
}

export const SafeArea = forwardRef<ComponentRef<typeof View>, SafeAreaProps>(
  (
    {
      edges = ALL_EDGES,
      statusBar = "auto",
      className,
      children,
    },
    ref,
  ) => {
    const scheme = useColorScheme()
    const resolvedStatusBar =
      statusBar === "auto" ? (scheme === "dark" ? "light" : "dark") : statusBar

    return (
      <SafeAreaView
        ref={ref}
        edges={edges}
        className={cn("flex-1 bg-bg", className)}
      >
        {resolvedStatusBar !== false ? (
          <StatusBar style={resolvedStatusBar} />
        ) : null}
        {children}
      </SafeAreaView>
    )
  },
)

SafeArea.displayName = "SafeArea"

export type SafeAreaEdge = Edge
