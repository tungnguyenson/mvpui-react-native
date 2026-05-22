/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and react-native-reusables.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { forwardRef, type ComponentRef, type ReactNode } from "react"
import { ScrollView, type ScrollViewProps } from "react-native"

import { cn } from "../lib/cn"

/* ==========================================================================
   KeyboardAvoidingScroll — RN-only form wrapper.

   Ships a `ScrollView` with the conventions every form needs:
   - `keyboardShouldPersistTaps="handled"` — taps outside focused field
     dismiss the keyboard without swallowing the tap.
   - `keyboardDismissMode="interactive"` — dragging in the scroll area
     pulls the keyboard down (iOS Messages pattern).

   No explicit `flex` style on the ScrollView and no `flexGrow` on the
   contentContainer — both collapsed the layout when nested inside the
   showcase's SafeArea wrapper. RN's ScrollView fills its parent
   intrinsically; we let it.

   Intentional omission: `KeyboardAvoidingView`. KAV is fragile across
   RN versions and modern iOS scrolls a focused TextInput into view
   automatically. Android relies on `windowSoftInputMode=adjustResize`.
   Add KAV manually around the ScrollView only when a sticky footer
   must lift with the keyboard.
   ========================================================================== */

export interface KeyboardAvoidingScrollProps {
  children?: ReactNode
  /** Class names applied to the ScrollView. */
  scrollClassName?: string
  /** Class names applied to the ScrollView contentContainer. */
  contentContainerClassName?: string
  /** Forwarded to the inner ScrollView. */
  scrollViewProps?: Omit<
    ScrollViewProps,
    | "children"
    | "className"
    | "contentContainerClassName"
    | "keyboardShouldPersistTaps"
    | "keyboardDismissMode"
  >
}

export const KeyboardAvoidingScroll = forwardRef<
  ComponentRef<typeof ScrollView>,
  KeyboardAvoidingScrollProps
>(
  (
    {
      children,
      scrollClassName,
      contentContainerClassName,
      scrollViewProps,
    },
    ref,
  ) => (
    <ScrollView
      ref={ref}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      className={scrollClassName}
      contentContainerClassName={contentContainerClassName}
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  ),
)

KeyboardAvoidingScroll.displayName = "KeyboardAvoidingScroll"
