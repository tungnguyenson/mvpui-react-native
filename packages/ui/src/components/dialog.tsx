/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/application/modals/modal.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { pickShadow } from "@mvp-ui-rn/tokens"
import * as DialogPrim from "@rn-primitives/dialog"
import { cva, type VariantProps } from "class-variance-authority"
import {
  forwardRef,
  type ComponentRef,
  type ReactNode,
} from "react"
import { Pressable, StyleSheet, Text, View, useColorScheme } from "react-native"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"

import { cn } from "../lib/cn"

/* ==========================================================================
   Dialog — RN port of mvp-ui (web) Modal.

   RN deltas vs. web:
   - Web `react-aria-components` Modal/ModalOverlay/Dialog → RN
     `@rn-primitives/dialog` (Radix-style compound: Root, Trigger, Portal,
     Overlay, Content, Title, Description, Close). PortalHost in app root
     hosts the layer.
   - Sizes here are panel max-widths: sm 320 / md 384 (default) / lg 448.
     Web's `xl` / `full` dropped — full-screen modals on mobile should use
     a route or BottomSheet, not a Dialog.
   - Web uses `animate-in fade-in zoom-in` Tailwind utilities. RN port uses
     a single fade for both scrim + panel — zoom + spring tuning over-
     animates a transient overlay on mobile. Keep it simple.
   - Backdrop tap dismisses via primitive's `closeOnPress` (default true).
     Hardware back-button handled by primitive on Android.
   - Layering: Overlay = scrim (absolute fill, dim, taps close). Content =
     absolute fill positioning layer with `pointerEvents="box-none"` so
     taps on empty space fall through to the scrim; the inner panel itself
     catches taps (default `pointerEvents="auto"`) so interactions inside
     the dialog stay in the dialog.
   - Requires `<PortalHost />` mounted in app root (already there for
     Select).
   ========================================================================== */

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

// Scrim color resolves to a raw hex/alpha rather than className.
// NativeWind v5 cannot interop `Animated.createAnimatedComponent(Pressable)`
// (it auto-interops a known list of components; new ones created at runtime
// silently drop `className`). Using inline `backgroundColor` keeps the dim
// visible in both modes and avoids the silent-fail.
const scrimColor = (isDark: boolean) =>
  isDark ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.5)"

export type DialogSize = "sm" | "md" | "lg"

const contentVariants = cva(
  "w-full rounded-2xl bg-bg overflow-hidden",
  {
    variants: {
      size: {
        sm: "max-w-xs",
        md: "max-w-sm",
        lg: "max-w-md",
      },
    },
    defaultVariants: { size: "md" },
  },
)

/* -------------------------------------------------------------------------- */
/*  Root + Trigger + Close + Portal (pass-through wrappers)                    */
/* -------------------------------------------------------------------------- */

export const Dialog = DialogPrim.Root
export const DialogTrigger = DialogPrim.Trigger
export const DialogClose = DialogPrim.Close
export const DialogPortal = DialogPrim.Portal

/* -------------------------------------------------------------------------- */
/*  DialogOverlay — animated scrim                                             */
/* -------------------------------------------------------------------------- */

export interface DialogOverlayProps extends DialogPrim.OverlayProps {
  /** Scheme override — DialogContent forwards `useColorScheme()`. */
  isDark?: boolean
}

export const DialogOverlay = forwardRef<
  DialogPrim.OverlayRef,
  DialogOverlayProps
>(({ isDark = false, style, ...props }, ref) => (
  <DialogPrim.Overlay ref={ref} asChild {...props}>
    <AnimatedPressable
      entering={FadeIn.duration(150)}
      exiting={FadeOut.duration(120)}
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: scrimColor(isDark) },
        style,
      ]}
    />
  </DialogPrim.Overlay>
))

DialogOverlay.displayName = "DialogOverlay"

/* -------------------------------------------------------------------------- */
/*  DialogContent — composes Portal + Overlay + positioned animated panel      */
/* -------------------------------------------------------------------------- */

export interface DialogContentProps
  extends Omit<DialogPrim.ContentProps, "children">,
    VariantProps<typeof contentVariants> {
  children?: ReactNode
  /** Host name for the Portal. Defaults to the primitive's default host. */
  portalHostName?: string
  /** Class forwarded to the overlay scrim. */
  overlayClassName?: string
}

export const DialogContent = forwardRef<
  ComponentRef<typeof Animated.View>,
  DialogContentProps
>(
  (
    {
      size = "md",
      className,
      overlayClassName,
      portalHostName,
      children,
      ...props
    },
    ref,
  ) => {
    const scheme = useColorScheme()
    const isDark = scheme === "dark"
    const shadow = pickShadow("xl", isDark ? "dark" : "light")

    return (
      <DialogPortal hostName={portalHostName}>
        <DialogOverlay isDark={isDark} className={overlayClassName} />
        <DialogPrim.Content asChild>
          <View
            pointerEvents="box-none"
            style={StyleSheet.absoluteFill}
            className="items-center justify-center px-4 py-8"
          >
            <Animated.View
              ref={ref}
              entering={FadeIn.duration(150)}
              exiting={FadeOut.duration(120)}
              style={shadow}
              className={cn(contentVariants({ size }), className)}
              {...props}
            >
              {children}
            </Animated.View>
          </View>
        </DialogPrim.Content>
      </DialogPortal>
    )
  },
)

DialogContent.displayName = "DialogContent"

/* -------------------------------------------------------------------------- */
/*  DialogHeader / DialogBody / DialogFooter                                   */
/* -------------------------------------------------------------------------- */

export interface DialogSectionProps {
  children?: ReactNode
  className?: string
}

export const DialogHeader = forwardRef<
  ComponentRef<typeof View>,
  DialogSectionProps
>(({ children, className }, ref) => (
  <View ref={ref} className={cn("flex-col gap-1 px-6 pt-6 pb-4", className)}>
    {children}
  </View>
))

DialogHeader.displayName = "DialogHeader"

export const DialogBody = forwardRef<
  ComponentRef<typeof View>,
  DialogSectionProps
>(({ children, className }, ref) => (
  <View ref={ref} className={cn("px-6 pb-4", className)}>
    {children}
  </View>
))

DialogBody.displayName = "DialogBody"

export const DialogFooter = forwardRef<
  ComponentRef<typeof View>,
  DialogSectionProps
>(({ children, className }, ref) => (
  <View
    ref={ref}
    className={cn(
      "flex-row items-center justify-end gap-3 border-t border-border px-6 py-4",
      className,
    )}
  >
    {children}
  </View>
))

DialogFooter.displayName = "DialogFooter"

/* -------------------------------------------------------------------------- */
/*  DialogTitle / DialogDescription                                            */
/* -------------------------------------------------------------------------- */

export interface DialogTitleProps extends DialogPrim.TitleProps {}

export const DialogTitle = forwardRef<DialogPrim.TitleRef, DialogTitleProps>(
  ({ className, children, ...props }, ref) => (
    <DialogPrim.Title asChild {...props}>
      <Text
        ref={ref}
        className={cn("text-lg font-semibold text-fg", className)}
      >
        {children}
      </Text>
    </DialogPrim.Title>
  ),
)

DialogTitle.displayName = "DialogTitle"

export interface DialogDescriptionProps extends DialogPrim.DescriptionProps {}

export const DialogDescription = forwardRef<
  DialogPrim.DescriptionRef,
  DialogDescriptionProps
>(({ className, children, ...props }, ref) => (
  <DialogPrim.Description asChild {...props}>
    <Text
      ref={ref}
      className={cn("text-md text-fg-secondary", className)}
    >
      {children}
    </Text>
  </DialogPrim.Description>
))

DialogDescription.displayName = "DialogDescription"
