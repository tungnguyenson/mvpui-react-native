/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and react-native-reusables.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { tokens } from "@mvp-ui-rn/tokens"
import { Search, X } from "lucide-react-native"
import {
  forwardRef,
  useState,
  type ComponentRef,
} from "react"
import {
  Pressable,
  Text,
  TextInput,
  View,
  useColorScheme,
  type TextInputProps,
} from "react-native"

import { cn } from "../lib/cn"

/* ==========================================================================
   SearchBar — RN-only. Standalone in-content primitive plus a helper
   for expo-router's native iOS `headerSearchBarOptions`.

   Standalone composition:
   - Field wrapper styled like Input but radius-full (pill) and a
     muted bg (`bg-bg-tertiary`) so it reads as a search affordance
     even when not focused.
   - Leading Search icon.
   - Trailing X clear button (visible while value is non-empty).
   - Optional Cancel text-button (visible while focused) that blurs +
     clears + fires `onCancel`.

   Always controlled — caller supplies `value` + `onChangeText` so the
   clear button can reset the value without internal duplicate state.
   ========================================================================== */

const ICON_SIZE = 18

export interface SearchBarProps
  extends Omit<TextInputProps, "style" | "value" | "onChangeText" | "placeholderTextColor"> {
  /** Current search text. */
  value: string
  /** Text change handler. */
  onChangeText: (text: string) => void
  /**
   * Show + wire a trailing "Cancel" text-button while the field is
   * focused. Tap → blur, clear value, fire `onCancel`. iOS convention.
   */
  showCancel?: boolean
  /** Fires after the Cancel button blurs + clears the field. */
  onCancel?: () => void
  /** Class names appended to the outer wrapper. */
  className?: string
  /** Class names applied to the inner field box. */
  fieldClassName?: string
  /** Placeholder. @default "Search" */
  placeholder?: string
  /** Override the Cancel button label. @default "Cancel" */
  cancelLabel?: string
}

export const SearchBar = forwardRef<ComponentRef<typeof TextInput>, SearchBarProps>(
  (
    {
      value,
      onChangeText,
      showCancel = false,
      onCancel,
      className,
      fieldClassName,
      placeholder = "Search",
      cancelLabel = "Cancel",
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const innerRef = useInnerRef(ref)
    const scheme = useColorScheme()
    const isDark = scheme === "dark"
    const iconTint = isDark ? tokens.color.gray["400"] : tokens.color.gray["500"]
    const placeholderTint = iconTint

    const hasValue = value.length > 0
    const showCancelButton = showCancel && isFocused

    const handleClear = () => {
      onChangeText("")
    }

    const handleCancel = () => {
      onChangeText("")
      innerRef.current?.blur()
      onCancel?.()
    }

    return (
      <View className={cn("flex-row items-center gap-2", className)}>
        <View
          className={cn(
            "h-14 flex-1 flex-row items-center gap-2 rounded-lg bg-bg-tertiary px-3.5",
            fieldClassName,
          )}
        >
          <Search size={ICON_SIZE} color={iconTint} />
          <TextInput
            ref={innerRef}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={placeholderTint}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            className="min-w-0 flex-1 p-0 text-md text-fg"
            {...props}
          />
          {hasValue ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Clear search"
              hitSlop={8}
              onPress={handleClear}
            >
              <X size={ICON_SIZE} color={iconTint} />
            </Pressable>
          ) : null}
        </View>

        {showCancelButton ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={cancelLabel}
            onPress={handleCancel}
          >
            <Text className="text-fg-brand text-md font-medium">{cancelLabel}</Text>
          </Pressable>
        ) : null}
      </View>
    )
  },
)
SearchBar.displayName = "SearchBar"

/**
 * Tiny ref-merger so the internal `innerRef` can call `.blur()` while
 * still forwarding the caller's ref.
 */
import { useEffect, useRef, type Ref } from "react"
function useInnerRef<T>(ref: Ref<T>) {
  const innerRef = useRef<T | null>(null)
  useEffect(() => {
    if (typeof ref === "function") ref(innerRef.current)
    else if (ref) (ref as { current: T | null }).current = innerRef.current
  })
  return innerRef
}

/* -------------------------------------------------------------------------- */
/*  searchBarScreenOptions — native iOS UISearchBar in expo-router header     */
/* -------------------------------------------------------------------------- */

export interface SearchBarScreenOptionsArgs {
  /** Placeholder shown inside the native search field. */
  placeholder?: string
  /** Cancel button label. */
  cancelButtonText?: string
  /** Hide automatically when scrolling away on iOS. */
  hideWhenScrolling?: boolean
  /** Pass through additional native options. */
  onChangeText?: (event: { nativeEvent: { text: string } }) => void
}

/**
 * Returns Stack.Screen `options.headerSearchBarOptions` for the native
 * iOS UISearchBar embedded in the header. On Android, expo-router
 * falls back to no native search — use the standalone `<SearchBar>` in
 * content for cross-platform parity.
 *
 * Usage:
 *
 * ```tsx
 * <Stack.Screen
 *   options={{
 *     headerSearchBarOptions: searchBarScreenOptions({
 *       placeholder: "Search inbox",
 *       onChangeText: (e) => setQuery(e.nativeEvent.text),
 *     }),
 *   }}
 * />
 * ```
 */
export function searchBarScreenOptions({
  placeholder = "Search",
  cancelButtonText = "Cancel",
  hideWhenScrolling = false,
  onChangeText,
}: SearchBarScreenOptionsArgs = {}) {
  return {
    placeholder,
    cancelButtonText,
    hideWhenScrolling,
    onChangeText,
  }
}
