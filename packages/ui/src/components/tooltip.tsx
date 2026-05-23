/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/base/tooltip/tooltip.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { pickShadow } from "@mvp-ui-rn/tokens"
import * as PopoverPrim from "@rn-primitives/popover"
import { Slot } from "@rn-primitives/slot"
import {
  forwardRef,
  useCallback,
  useRef,
  type ComponentRef,
  type ReactNode,
} from "react"
import {
  Pressable,
  type PressableProps,
  Text,
  useColorScheme,
} from "react-native"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"

import { cn } from "../lib/cn"
import { PopoverPortal } from "./popover"

/* ==========================================================================
   Tooltip — RN port of mvp-ui (web) Tooltip.

   RN deltas vs. web:
   - Web `react-aria-components` `Tooltip` opens on hover. RN has no hover;
     mobile substitute is long-press. `@rn-primitives/tooltip` opens on tap,
     which is wrong for the design-system semantic (tap should fire onPress).
   - Built on `@rn-primitives/popover` instead, with a custom
     `TooltipTrigger` wrapping `Pressable.onLongPress` and driving the
     popover state via the primitive's exported `useRootContext`.
   - Default long-press duration `500ms`. iOS UIKit default is also 500ms.
   - Press-out closes the tooltip. Tap outside (overlay) also closes.
   - Tooltip content is a dark surface (`bg-fg`) with white text, mirroring
     the web tooltip's high-contrast convention. Independent of color
     scheme — tooltips on iOS Settings stay dark in both modes.
   - Requires `<PortalHost />` mounted in app root.
   ========================================================================== */

export type TooltipSide = "top" | "bottom"
export type TooltipAlign = "start" | "center" | "end"

/* -------------------------------------------------------------------------- */
/*  Tooltip — alias for Popover Root (uncontrolled open state)                 */
/* -------------------------------------------------------------------------- */

export const Tooltip = PopoverPrim.Root

/* -------------------------------------------------------------------------- */
/*  TooltipTrigger — Pressable with onLongPress → open, onPressOut → close     */
/* -------------------------------------------------------------------------- */

export interface TooltipTriggerProps
  extends Omit<PressableProps, "onLongPress" | "onPressOut"> {
  children?: ReactNode
  /** Render gestures onto the child element via `@rn-primitives/slot`. */
  asChild?: boolean
  /** Long-press duration in ms before tooltip opens. Default 500. */
  delayDuration?: number
  /** Forwarded `onPress` — fires as normal; tooltip is not affected. */
  onPress?: PressableProps["onPress"]
}

export const TooltipTrigger = forwardRef<
  ComponentRef<typeof Pressable>,
  TooltipTriggerProps
>(
  (
    { asChild = false, children, delayDuration = 500, onPress, ...rest },
    ref,
  ) => {
    const { onOpenChange, setTriggerPosition } = PopoverPrim.useRootContext()
    const internalRef = useRef<ComponentRef<typeof Pressable> | null>(null)

    const measure = useCallback(() => {
      internalRef.current?.measure?.((_x, _y, width, height, pageX, pageY) => {
        setTriggerPosition({ width, height, pageX, pageY })
      })
    }, [setTriggerPosition])

    const handleLongPress = useCallback(() => {
      measure()
      onOpenChange(true)
    }, [measure, onOpenChange])

    const handlePressOut = useCallback(() => {
      setTriggerPosition(null)
      onOpenChange(false)
    }, [onOpenChange, setTriggerPosition])

    const Component = asChild ? Slot : Pressable

    return (
      <Component
        ref={(node: ComponentRef<typeof Pressable> | null) => {
          internalRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) ref.current = node
        }}
        delayLongPress={delayDuration}
        onLongPress={handleLongPress}
        onPressOut={handlePressOut}
        onPress={onPress}
        {...rest}
      >
        {children}
      </Component>
    )
  },
)

TooltipTrigger.displayName = "TooltipTrigger"

/* -------------------------------------------------------------------------- */
/*  TooltipContent — dark surface popover panel                                */
/* -------------------------------------------------------------------------- */

export interface TooltipContentProps
  extends Omit<PopoverPrim.ContentProps, "children" | "style"> {
  children?: ReactNode
  className?: string
  portalHostName?: string
}

export const TooltipContent = forwardRef<
  ComponentRef<typeof Animated.View>,
  TooltipContentProps
>(
  (
    {
      side = "top",
      align = "center",
      sideOffset = 8,
      alignOffset = 0,
      avoidCollisions = true,
      insets,
      className,
      portalHostName,
      children,
      ...props
    },
    ref,
  ) => {
    const scheme = useColorScheme()
    const isDark = scheme === "dark"
    const shadow = pickShadow("md", isDark ? "dark" : "light")

    return (
      <PopoverPortal hostName={portalHostName}>
        {/*
          No overlay/scrim. Tooltip closes on the trigger's `onPressOut`
          when the user lifts their finger — no backdrop tap needed. We
          also keep the tooltip itself non-interactive (`pointerEvents="none"`
          on the panel) so it can't block taps on content behind it.
        */}
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
            pointerEvents="none"
            className={cn(
              "max-w-[16rem] rounded-md bg-fg px-2.5 py-1.5",
              className,
            )}
          >
            {typeof children === "string" ? (
              <Text className="text-xs font-medium text-bg">{children}</Text>
            ) : (
              children
            )}
          </Animated.View>
        </PopoverPrim.Content>
      </PopoverPortal>
    )
  },
)

TooltipContent.displayName = "TooltipContent"
