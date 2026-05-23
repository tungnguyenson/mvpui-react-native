/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and react-native-reusables.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { tokens } from "@mvp-ui-rn/tokens"
import { ChevronRight } from "lucide-react-native"
import { Children, isValidElement, type ComponentRef, forwardRef, type ReactNode } from "react"
import {
  Pressable,
  Text,
  View,
  useColorScheme,
  type PressableProps,
  type ViewProps,
} from "react-native"

import { cn } from "../lib/cn"
import { renderIcon, type IconProp } from "../lib/render-icon"

/* ==========================================================================
   List + ListItem + ListSection — RN-only iOS Settings-style grouped list.

   Composition:
   - `<ListSection title="...">{...<ListItem/>}</ListSection>` →
     rounded card surface (`bg-bg` + `border-border`) with the children
     stacked vertically; a hairline divider is inserted between adjacent
     `<ListItem>` children automatically.
   - `<ListItem leading={...} title="..." subtitle="..." trailing={...} onPress={...} />` →
     row primitive. Renders `<Pressable>` when `onPress` is set, otherwise
     `<View>`. Adds a chevron-right when `chevron` is true (default when
     `onPress` is set and `trailing` is not passed).
   - `<List>` — bare vertical stack with `gap-6` between sections. Use
     when stacking multiple `<ListSection>` blocks; optional.

   Distinct from `Card` — sections carry the list-row chrome (hairline
   dividers, full-width rows) instead of free-form content.
   ========================================================================== */

const LIST_ROW_HEIGHT = 64

/* -------------------------------------------------------------------------- */
/*  List — top-level stack of sections                                        */
/* -------------------------------------------------------------------------- */

export const List = forwardRef<ComponentRef<typeof View>, ViewProps>(
  ({ className, ...props }, ref) => (
    <View ref={ref} className={cn("gap-6", className)} {...props} />
  ),
)
List.displayName = "List"

/* -------------------------------------------------------------------------- */
/*  ListSection — title + rounded-card with hairline dividers between rows    */
/* -------------------------------------------------------------------------- */

export interface ListSectionProps extends Omit<ViewProps, "children"> {
  /** Section heading rendered above the card (iOS small-caps style). */
  title?: string
  /** Footer caption rendered below the card. */
  footer?: string
  children?: ReactNode
}

export const ListSection = forwardRef<ComponentRef<typeof View>, ListSectionProps>(
  ({ title, footer, children, className, ...props }, ref) => {
    const items = Children.toArray(children).filter(isValidElement)
    return (
      <View ref={ref} className={cn("gap-2", className)} {...props}>
        {title ? (
          <Text className="px-1 text-md font-medium uppercase tracking-wide text-fg-tertiary">
            {title}
          </Text>
        ) : null}
        <View className="overflow-hidden rounded-xl border border-border bg-bg">
          {items.map((child, index) => (
            <View key={index}>
              {index > 0 ? <View className="ml-4 h-px bg-border" /> : null}
              {child}
            </View>
          ))}
        </View>
        {footer ? (
          <Text className="px-1 text-sm text-fg-tertiary">{footer}</Text>
        ) : null}
      </View>
    )
  },
)
ListSection.displayName = "ListSection"

/* -------------------------------------------------------------------------- */
/*  ListItem — single row                                                     */
/* -------------------------------------------------------------------------- */

export interface ListItemProps extends Omit<PressableProps, "children" | "style"> {
  /** Leading element — icon component, pre-rendered node, or Avatar. */
  leading?: IconProp
  /** Primary line of text. */
  title: string
  /** Optional secondary line below the title. */
  subtitle?: string
  /** Trailing element — text, badge, switch, chevron, etc. */
  trailing?: ReactNode
  /**
   * Show a chevron-right at the trailing edge. Defaults to `true` when
   * `onPress` is supplied and `trailing` is empty; `false` otherwise.
   */
  chevron?: boolean
  className?: string
}

export const ListItem = forwardRef<ComponentRef<typeof Pressable>, ListItemProps>(
  (
    {
      leading,
      title,
      subtitle,
      trailing,
      chevron,
      onPress,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const scheme = useColorScheme()
    const isPressable = Boolean(onPress) && !disabled
    const showChevron =
      chevron ?? (isPressable && trailing == null)
    const iconTint =
      scheme === "dark" ? tokens.color.gray["400"] : tokens.color.gray["500"]
    const chevronTint =
      scheme === "dark" ? tokens.color.gray["500"] : tokens.color.gray["400"]

    const Comp = (isPressable ? Pressable : View) as React.ElementType

    return (
      <Comp
        ref={ref as never}
        accessibilityRole={isPressable ? "button" : undefined}
        onPress={isPressable ? onPress : undefined}
        disabled={disabled}
        className={cn(
          "flex-row items-center gap-3 px-4",
          isPressable && "active:bg-bg-tertiary",
          disabled && "opacity-50",
          className,
        )}
        style={{ minHeight: LIST_ROW_HEIGHT }}
        {...(isPressable ? props : {})}
      >
        {leading
          ? renderIcon(leading, "leading", { color: iconTint, size: 22 })
          : null}

        <View className="flex-1 py-3">
          <Text className="text-md text-fg" numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text className="text-sm text-fg-tertiary" numberOfLines={2}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        {trailing}

        {showChevron ? <ChevronRight size={18} color={chevronTint} /> : null}
      </Comp>
    )
  },
)
ListItem.displayName = "ListItem"
