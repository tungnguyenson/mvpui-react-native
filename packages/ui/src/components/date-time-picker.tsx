/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and react-native-reusables.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import RNDateTimePicker, {
  DateTimePickerAndroid,
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import { Calendar, Clock } from "lucide-react-native"
import { forwardRef, useCallback } from "react"
import { Platform, useColorScheme, View } from "react-native"

import { Button } from "./button"

/* ==========================================================================
   DateTimePicker — Mobile-native picker (no web equivalent).

   RN deltas vs. web (web `<input type="date">`):
   - iOS: renders the picker inline via `display="compact"` — Apple's HIG-
     blessed pill. Tapping the pill expands the wheel/calendar via system
     UI. Returns the chosen value via `onValueChange`.
   - Android: no inline picker chrome — instead expose a `<Button>` trigger
     that calls `DateTimePickerAndroid.open(...)` to present the system
     date/time dialog. Same `onValueChange` payload.
   - Single API: `mode='date' | 'time' | 'datetime'`. iOS supports all
     three; Android natively splits date + time, so `datetime` on Android
     chains two dialogs (date → time).
   - Theming: `themeVariant` from `useColorScheme()` flips iOS picker
     light/dark. Android system dialog inherits app theme via
     `expo-system-ui` (already configured).
   - Minimum/maximum date constraint applies on both platforms.
   ========================================================================== */

export type DateTimePickerMode = "date" | "time" | "datetime"

export interface DateTimePickerProps {
  value: Date
  onValueChange: (date: Date) => void
  mode?: DateTimePickerMode
  minimumDate?: Date
  maximumDate?: Date
  is24Hour?: boolean
  minuteInterval?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30
  disabled?: boolean
  /** Android-only: label used on the trigger button. Default: formatted value. */
  triggerLabel?: string
  className?: string
}

function formatForButton(value: Date, mode: DateTimePickerMode): string {
  if (mode === "time") {
    return value.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }
  if (mode === "datetime") {
    return value.toLocaleString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
  return value.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export const DateTimePicker = forwardRef<View, DateTimePickerProps>(
  (
    {
      value,
      onValueChange,
      mode = "date",
      minimumDate,
      maximumDate,
      is24Hour,
      minuteInterval,
      disabled = false,
      triggerLabel,
      className,
    },
    ref,
  ) => {
    const scheme = useColorScheme()

    const handleIOSChange = useCallback(
      (_evt: DateTimePickerEvent, date?: Date) => {
        if (date) onValueChange(date)
      },
      [onValueChange],
    )

    if (Platform.OS === "ios") {
      // iOS supports `mode="datetime"` natively in the inline picker.
      // `is24Hour` is not an iOS prop — the picker follows the device locale.
      return (
        <View ref={ref} className={className}>
          <RNDateTimePicker
            value={value}
            mode={mode}
            display="compact"
            themeVariant={scheme === "dark" ? "dark" : "light"}
            disabled={disabled}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            minuteInterval={minuteInterval}
            onChange={handleIOSChange}
          />
        </View>
      )
    }

    // Android: imperative dialog opened from a trigger button.
    const openAndroid = useCallback(() => {
      if (disabled) return

      const openAt = (androidMode: "date" | "time") => {
        DateTimePickerAndroid.open({
          value,
          mode: androidMode,
          is24Hour,
          minimumDate,
          maximumDate,
          minuteInterval,
          onChange: (_evt, picked) => {
            if (!picked) return
            if (mode === "datetime" && androidMode === "date") {
              // After choosing the date, chain into time picker.
              openAt("time")
              return
            }
            onValueChange(picked)
          },
        })
      }

      openAt(mode === "time" ? "time" : "date")
    }, [
      disabled,
      is24Hour,
      maximumDate,
      minimumDate,
      minuteInterval,
      mode,
      onValueChange,
      value,
    ])

    const Icon = mode === "time" ? Clock : Calendar

    return (
      <View ref={ref} className={className}>
        <Button
          color="secondary"
          size="md"
          onPress={openAndroid}
          disabled={disabled}
          iconLeading={Icon}
        >
          {triggerLabel ?? formatForButton(value, mode)}
        </Button>
      </View>
    )
  },
)

DateTimePicker.displayName = "DateTimePicker"
