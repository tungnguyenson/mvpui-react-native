/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/empty-state.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { forwardRef, type ComponentRef, type ReactNode } from "react"
import { Text, View, type ViewProps } from "react-native"

import { cn } from "../lib/cn"

/* ==========================================================================
   EmptyState — RN port of mvp-ui (web) EmptyState.

   RN deltas vs. web:
   - Title bumped one Tailwind step (`text-md` → `text-lg`) and
     description bumped (`text-sm` → `text-md`) per the same mobile RN
     ramp as Label / HintText / Card.Description. Maintains the
     web's two-step hierarchy (title > description).
   - `actions` slot expects a `<Button>` or `<View>` of buttons (no
     change from web shape).
   - Container uses `bg-bg-secondary` + dashed border to read as a
     visually inset empty-region surface, distinct from a filled Card.
   ========================================================================== */

export interface EmptyStateProps extends Omit<ViewProps, "children"> {
  /** Icon / illustration rendered above the title. Pre-rendered ReactNode. */
  icon?: ReactNode
  /** Primary heading. */
  title: string
  /** Supporting description below the title. */
  description?: string
  /** Action button(s). Pre-composed ReactNode (e.g. `<Button>` or row). */
  actions?: ReactNode
  className?: string
}

export const EmptyState = forwardRef<ComponentRef<typeof View>, EmptyStateProps>(
  ({ icon, title, description, actions, className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn(
        "items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-bg-secondary px-6 py-12",
        className,
      )}
      {...props}
    >
      {icon ? <View className="mb-1 items-center justify-center">{icon}</View> : null}

      <View className="items-center gap-1">
        <Text className="text-center text-lg font-semibold text-fg">{title}</Text>
        {description ? (
          <Text className="max-w-xs text-center text-md text-fg-tertiary">
            {description}
          </Text>
        ) : null}
      </View>

      {actions ? (
        <View className="mt-1 flex-row flex-wrap items-center justify-center gap-3">
          {actions}
        </View>
      ) : null}
    </View>
  ),
)

EmptyState.displayName = "EmptyState"
