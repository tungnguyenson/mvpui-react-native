/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and react-native-reusables.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { forwardRef, useCallback, type ComponentRef, type ReactNode } from "react"
import { Pressable, type PressableProps } from "react-native"

import type { IconProp } from "../lib/render-icon"
import {
  actionSheet,
  type ActionSheetOption,
  type ActionSheetOptionStyle,
} from "./action-sheet"

/* ==========================================================================
   ContextMenu — Long-press menu for mobile.

   Pivoted from zeego (Q1 plan) to ActionSheet under the hood. Rationale:
   zeego depends on `react-native-ios-context-menu` + `@react-native-menu/menu`
   native modules that don't ship with Expo Go — would force a dev-client
   build for verify. ActionSheet (already in our toolkit) is native iOS
   UIAlertController + Material on Android, no extra native deps.

   Trade vs. zeego:
   - Lose iOS UIMenu's long-press preview (the bouncy enlargement). Native
     ActionSheet still slides up from bottom with system styling.
   - Gain Expo Go compatibility, single-lib surface, consistency with
     existing ActionSheet pattern.

   Future: optional zeego upgrade behind a build-time flag for dev-client
   consumers wanting UIMenu preview. Out of scope for v1.

   Usage:
     <ContextMenu
       items={[
         { key: "share", label: "Share", icon: ShareIcon },
         { key: "delete", label: "Delete", style: "destructive" },
       ]}
       title="Note actions"
       onSelect={(key) => handle(key)}
     >
       <Pressable>...</Pressable>
     </ContextMenu>
   ========================================================================== */

export type ContextMenuItemStyle = ActionSheetOptionStyle

export interface ContextMenuItem {
  /** Stable identifier returned by `onSelect`. */
  key: string
  /** Row label. */
  label: string
  /** Optional secondary line. */
  description?: string
  /** Optional leading icon. */
  icon?: IconProp
  /** `"destructive"` paints red. `"cancel"` is moved to bottom. */
  style?: ContextMenuItemStyle
  /** Block tap + dim. */
  disabled?: boolean
}

export interface ContextMenuProps
  extends Omit<
    PressableProps,
    "onLongPress" | "onPress" | "delayLongPress" | "children"
  > {
  /** Trigger content — typically a row, card, or button. */
  children?: ReactNode
  /** Menu rows. */
  items: ContextMenuItem[]
  /** Bold header above the rows. */
  title?: string
  /** Sub-header below the title. */
  message?: string
  /** Fires with the chosen item's `key` (or `null` if dismissed). */
  onSelect?: (key: string | null) => void
  /** Auto-prepend a "Cancel" row. Default true. */
  showCancel?: boolean
  /** Label for the auto-cancel row. */
  cancelLabel?: string
  /** Long-press delay in ms. Default 500 (matches iOS UIKit). */
  delayDuration?: number
  /** Block context menu (still fires onPress if provided). */
  disabled?: boolean
  /** Fires on normal tap (short press). ContextMenu does NOT consume taps. */
  onPress?: PressableProps["onPress"]
}

export const ContextMenu = forwardRef<
  ComponentRef<typeof Pressable>,
  ContextMenuProps
>(
  (
    {
      children,
      items,
      title,
      message,
      onSelect,
      showCancel = true,
      cancelLabel = "Cancel",
      delayDuration = 500,
      disabled = false,
      onPress,
      ...rest
    },
    ref,
  ) => {
    const handleLongPress = useCallback(async () => {
      if (disabled) return

      const sheetOptions: ActionSheetOption[] = items.map((item) => ({
        label: item.label,
        description: item.description,
        icon: item.icon,
        style: item.style,
        disabled: item.disabled,
      }))

      if (showCancel) {
        sheetOptions.push({ label: cancelLabel, style: "cancel" })
      }

      const index = await actionSheet.present({
        title,
        message,
        options: sheetOptions,
      })

      if (index === null) {
        onSelect?.(null)
        return
      }
      const chosen = items[index]
      if (!chosen || chosen.style === "cancel") {
        onSelect?.(null)
        return
      }
      onSelect?.(chosen.key)
    }, [
      cancelLabel,
      disabled,
      items,
      message,
      onSelect,
      showCancel,
      title,
    ])

    return (
      <Pressable
        ref={ref}
        delayLongPress={delayDuration}
        onLongPress={handleLongPress}
        onPress={onPress}
        {...rest}
      >
        {children}
      </Pressable>
    )
  },
)

ContextMenu.displayName = "ContextMenu"
