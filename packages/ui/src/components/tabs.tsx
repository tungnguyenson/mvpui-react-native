/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/tabs.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import * as TabsPrimitive from "@rn-primitives/tabs"
import { cva } from "class-variance-authority"
import { createContext, forwardRef, useContext, type ComponentRef, type ReactNode } from "react"
import { ScrollView, Text, View } from "react-native"

import { cn } from "../lib/cn"

/* ==========================================================================
   Tabs — RN port of mvp-ui (web) Tabs.

   Compound: Tabs (Root) + TabsList + TabsTrigger + TabsContent. Built on
   `@rn-primitives/tabs` so keyboard / accessibility scaffolding matches
   the rest of the rn-primitives surface.

   v1 visual variants:
   - `underline` (default) — bottom border on active trigger, hairline
     base under the row. No sliding indicator (scrollable rows make a
     measured-translate indicator complex; ship simple active-border
     first, add sliding in a follow-up if needed).
   - `button-gray` — pill-style active background. No row border.
   - `button-border` — outline pill on active. No row border.

   Mobile considerations:
   - Wraps `TabsList` in horizontal `ScrollView` so overflow is reachable
     on narrow screens (web wraps; on mobile this lets dense headers fit
     and remain scrollable).
   - `fullWidth` collapses scroll + makes triggers `flex-1` for equal-
     width layouts (segmented-style headers).
   - No `:hover` — `active:` (Pressable pressed) drives the press-state
     bg via NativeWind variant.

   RN deltas vs web:
   - `underline-shadow` + `button-minimal` variants deferred.
   - Vertical orientation skipped — rare on mobile.
   - Optional `badgeCount` on trigger → small chip next to label.
   ========================================================================== */

type TabsVariant = "underline" | "button-gray" | "button-border"
type TabsSize = "sm" | "md"

interface TabsCtx {
  variant: TabsVariant
  size: TabsSize
  fullWidth: boolean
}

const Ctx = createContext<TabsCtx>({
  variant: "underline",
  size: "md",
  fullWidth: false,
})

export interface TabsProps
  extends Omit<TabsPrimitive.RootProps, "orientation" | "dir" | "activationMode"> {
  /** @default "underline" */
  variant?: TabsVariant
  /** @default "md" */
  size?: TabsSize
  /**
   * Triggers stretch to fill the list and the list no longer scrolls.
   * Useful for 2–4 stable tabs that should always show as a single row.
   * @default false
   */
  fullWidth?: boolean
  children: ReactNode
}

export const Tabs = forwardRef<ComponentRef<typeof TabsPrimitive.Root>, TabsProps>(
  (
    {
      variant = "underline",
      size = "md",
      fullWidth = false,
      children,
      ...rootProps
    },
    ref,
  ) => {
    return (
      <Ctx.Provider value={{ variant, size, fullWidth }}>
        <TabsPrimitive.Root ref={ref} {...rootProps}>
          {children}
        </TabsPrimitive.Root>
      </Ctx.Provider>
    )
  },
)
Tabs.displayName = "Tabs"

/* ------------------------------------------------------------------------ */
/* TabsList                                                                 */
/* ------------------------------------------------------------------------ */

const listVariants = cva("flex-row items-center gap-1", {
  variants: {
    variant: {
      underline: "border-b border-border-secondary",
      "button-gray": "",
      "button-border": "",
    },
  },
  defaultVariants: { variant: "underline" },
})

export interface TabsListProps {
  className?: string
  children: ReactNode
}

export const TabsList = forwardRef<ComponentRef<typeof View>, TabsListProps>(
  ({ className, children }, ref) => {
    const { variant, fullWidth } = useContext(Ctx)

    const list = (
      <TabsPrimitive.List
        ref={ref}
        className={cn(listVariants({ variant }), className)}
      >
        {children}
      </TabsPrimitive.List>
    )

    if (fullWidth) return list

    // Horizontal scroll for overflow on narrow screens.
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {list}
      </ScrollView>
    )
  },
)
TabsList.displayName = "TabsList"

/* ------------------------------------------------------------------------ */
/* TabsTrigger                                                              */
/* ------------------------------------------------------------------------ */

const triggerVariants = cva(
  "flex-row items-center justify-center gap-2 disabled:opacity-50",
  {
    variants: {
      variant: {
        underline: "border-b-2 border-transparent",
        "button-gray": "rounded-md",
        "button-border": "rounded-md border border-transparent",
      },
      size: {
        sm: "h-11 px-3",
        md: "h-14 px-4",
      },
      fullWidth: { true: "flex-1", false: "" },
    },
    defaultVariants: {
      variant: "underline",
      size: "md",
      fullWidth: false,
    },
  },
)

const triggerActiveVariants = cva("", {
  variants: {
    variant: {
      underline: "border-b-2 border-fg-brand",
      "button-gray": "bg-bg-tertiary",
      "button-border": "border border-border-brand bg-bg",
    },
  },
})

const triggerLabelVariants = cva("font-medium", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-md",
    },
    active: {
      true: "text-fg-brand",
      false: "text-fg-secondary",
    },
  },
  defaultVariants: { size: "md", active: false },
})

export interface TabsTriggerProps extends Omit<TabsPrimitive.TriggerProps, "value"> {
  value: string
  className?: string
  children: ReactNode
  /** Numeric count chip rendered next to the label. */
  badgeCount?: number
}

export const TabsTrigger = forwardRef<
  ComponentRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ value, children, className, badgeCount, ...rest }, ref) => {
  const { variant, size, fullWidth } = useContext(Ctx)

  return (
    <TabsPrimitive.Trigger ref={ref} value={value} {...rest}>
      <TabsTriggerVisual
        value={value}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        className={className}
        badgeCount={badgeCount}
      >
        {children}
      </TabsTriggerVisual>
    </TabsPrimitive.Trigger>
  )
})
TabsTrigger.displayName = "TabsTrigger"

interface TabsTriggerVisualProps {
  value: string
  variant: TabsVariant
  size: TabsSize
  fullWidth: boolean
  className?: string
  badgeCount?: number
  children: ReactNode
}

function TabsTriggerVisual({
  value,
  variant,
  size,
  fullWidth,
  className,
  badgeCount,
  children,
}: TabsTriggerVisualProps) {
  const root = TabsPrimitive.useRootContext()
  const isActive = root.value === value

  return (
    <View
      className={cn(
        triggerVariants({ variant, size, fullWidth }),
        isActive ? triggerActiveVariants({ variant }) : undefined,
        className,
      )}
    >
      {typeof children === "string" ? (
        <Text className={cn(triggerLabelVariants({ size, active: isActive }))}>
          {children}
        </Text>
      ) : (
        children
      )}

      {typeof badgeCount === "number" ? (
        <View
          className={cn(
            "ml-1 min-w-[20px] items-center justify-center rounded-full px-1.5",
            isActive ? "bg-primary" : "bg-bg-tertiary",
          )}
        >
          <Text
            className={cn(
              "text-xs font-medium",
              isActive ? "text-primary-fg" : "text-fg-secondary",
            )}
          >
            {badgeCount}
          </Text>
        </View>
      ) : null}
    </View>
  )
}

/* ------------------------------------------------------------------------ */
/* TabsContent                                                              */
/* ------------------------------------------------------------------------ */

export interface TabsContentProps extends TabsPrimitive.ContentProps {}

export const TabsContent = forwardRef<
  ComponentRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn("py-4", className)}
      {...props}
    />
  )
})
TabsContent.displayName = "TabsContent"

export type { TabsSize, TabsVariant }
