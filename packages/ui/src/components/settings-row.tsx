/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and react-native-reusables.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { tokens } from "@mvp-ui-rn/tokens"
import { ChevronRight } from "lucide-react-native"
import {
  forwardRef,
  type ComponentRef,
  type ReactNode,
} from "react"
import {
  Pressable,
  Text,
  useColorScheme,
  View,
  type PressableProps,
} from "react-native"

import { cn } from "../lib/cn"
import { renderIcon, type IconProp } from "../lib/render-icon"

/* ==========================================================================
   SettingsRow — iOS-style settings row composite.

   Composes the same shell as ListItem (leading icon + title + subtitle) but
   adds a children slot for the trailing control. API uses the children-slot
   pattern locked alongside FormField (Q4 batch 8) for consistency.

   Two layouts via `orientation`:
   - `"inline"` (default) — children render in the trailing column next to
     the title. Use for Switch, Select, small text values, chevron.
   - `"stacked"` — children render below the title row, full width. Use for
     Slider, RadioGroup, anything that needs the full row width.

   `onPress` makes the whole row pressable (link-style settings rows).
   Chevron auto-appears on pressable rows that don't supply children.

   Group multiple SettingsRows inside <ListSection> for the hairline-divider
   iOS Settings convention. No section management here — single row only.
   ========================================================================== */

const ROW_MIN_HEIGHT = 56

export type SettingsRowOrientation = "inline" | "stacked"

export interface SettingsRowProps
  extends Omit<PressableProps, "children" | "style"> {
  /** Leading icon (lucide component, pre-rendered node, or Avatar). */
  leading?: IconProp
  /** Primary label. */
  title: string
  /** Optional secondary line below the title. */
  subtitle?: string
  /** Trailing / below-title control. Switch / Select / Slider / etc. */
  children?: ReactNode
  /** `"inline"`: control next to title. `"stacked"`: control under title row. */
  orientation?: SettingsRowOrientation
  /** Show chevron-right at trailing edge. Defaults true on pressable + no children. */
  chevron?: boolean
  className?: string
}

export const SettingsRow = forwardRef<
  ComponentRef<typeof Pressable>,
  SettingsRowProps
>(
  (
    {
      leading,
      title,
      subtitle,
      children,
      orientation = "inline",
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
      chevron ?? (isPressable && children == null && orientation === "inline")

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
          "flex-col px-4",
          isPressable && "active:bg-bg-tertiary",
          disabled && "opacity-50",
          className,
        )}
        style={{ minHeight: ROW_MIN_HEIGHT }}
        {...(isPressable ? props : {})}
      >
        <View
          className="flex-row items-center gap-3 py-3"
          pointerEvents="box-none"
        >
          {leading
            ? renderIcon(leading, "leading", { color: iconTint, size: 22 })
            : null}

          <View className="flex-1">
            <Text className="text-md text-fg" numberOfLines={1}>
              {title}
            </Text>
            {subtitle ? (
              <Text className="text-sm text-fg-tertiary" numberOfLines={2}>
                {subtitle}
              </Text>
            ) : null}
          </View>

          {orientation === "inline" && children ? (
            <View
              className="flex-row items-center"
              pointerEvents="box-none"
            >
              {children}
            </View>
          ) : null}

          {showChevron ? (
            <ChevronRight size={18} color={chevronTint} />
          ) : null}
        </View>

        {orientation === "stacked" && children ? (
          <View
            className="pb-3"
            pointerEvents="box-none"
            // Stacked control sits flush with the title row's leading edge;
            // consumer can adjust padding via wrapper if needed.
          >
            {children}
          </View>
        ) : null}
      </Comp>
    )
  },
)

SettingsRow.displayName = "SettingsRow"
