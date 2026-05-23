/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/application/popovers/popovers.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { pickShadow } from "@mvp-ui-rn/tokens"
import * as PopoverPrim from "@rn-primitives/popover"
import { forwardRef, type ComponentRef, type ReactNode } from "react"
import { StyleSheet, useColorScheme } from "react-native"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"

import { cn } from "../lib/cn"

/* ==========================================================================
   Popover — RN port of mvp-ui (web) Popover.

   RN deltas vs. web:
   - Web Radix `Popover` → RN `@rn-primitives/popover` (compound: Root,
     Trigger, Portal, Overlay, Content). Same Radix-style API.
   - Native primitive supports `side: 'top' | 'bottom'` only.
     `start` / `end` (web's left/right) not implemented in the RN primitive —
     align via `align: 'start' | 'center' | 'end'` for horizontal nudging.
   - Web `Arrow` slot dropped. Our overlay family (Dialog, BottomSheet) is
     arrow-less; consistent visual language.
   - Tap outside dismisses via `<PopoverPrim.Overlay closeOnPress />`.
   - Requires `<PortalHost />` mounted in app root (shared with Dialog /
     Select / Tooltip / Toast).
   - Reanimated fade only — `[[simple-animations]]` memory.
   ========================================================================== */

export type PopoverSide = "top" | "bottom"
export type PopoverAlign = "start" | "center" | "end"

/* -------------------------------------------------------------------------- */
/*  Root / Trigger / Close / Portal (pass-through wrappers)                    */
/* -------------------------------------------------------------------------- */

export const Popover = PopoverPrim.Root
export const PopoverTrigger = PopoverPrim.Trigger
export const PopoverClose = PopoverPrim.Close
export const PopoverPortal = PopoverPrim.Portal

/* -------------------------------------------------------------------------- */
/*  PopoverContent — Portal + transparent overlay + animated panel             */
/* -------------------------------------------------------------------------- */

export interface PopoverContentProps
  extends Omit<PopoverPrim.ContentProps, "children" | "style"> {
  children?: ReactNode
  className?: string
  /** Host name for the Portal. */
  portalHostName?: string
  /** Tap outside closes. Default true. */
  closeOnPressOutside?: boolean
}

export const PopoverContent = forwardRef<
  ComponentRef<typeof Animated.View>,
  PopoverContentProps
>(
  (
    {
      side = "bottom",
      align = "center",
      sideOffset = 8,
      alignOffset = 0,
      avoidCollisions = true,
      insets,
      className,
      portalHostName,
      closeOnPressOutside = true,
      children,
      ...props
    },
    ref,
  ) => {
    const scheme = useColorScheme()
    const isDark = scheme === "dark"
    const shadow = pickShadow("lg", isDark ? "dark" : "light")

    return (
      <PopoverPortal hostName={portalHostName}>
        {/*
          Backdrop catcher. Must fill the screen for tap-outside to register —
          the primitive's default Pressable has zero size otherwise, and the
          earlier bare-View asChild caught no taps. Background stays
          transparent so the popover keeps its anchored-floater look (no
          dim scrim like Dialog).
        */}
        <PopoverPrim.Overlay
          closeOnPress={closeOnPressOutside}
          style={StyleSheet.absoluteFill}
        />
        <PopoverPrim.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          avoidCollisions={avoidCollisions}
          insets={insets}
          asChild
          {...props}
        >
          <Animated.View
            ref={ref}
            entering={FadeIn.duration(150)}
            exiting={FadeOut.duration(120)}
            style={shadow}
            className={cn(
              "min-w-[12rem] rounded-xl border border-border bg-bg p-1",
              className,
            )}
          >
            {children}
          </Animated.View>
        </PopoverPrim.Content>
      </PopoverPortal>
    )
  },
)

PopoverContent.displayName = "PopoverContent"
