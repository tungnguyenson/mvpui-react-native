/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and react-native-reusables.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { tokens } from "@mvp-ui-rn/tokens"
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field"
import { forwardRef, useImperativeHandle, type ReactNode } from "react"
import { StyleSheet, Text, View, useColorScheme } from "react-native"

import { HintText } from "./hint-text"

/* ==========================================================================
   PinInput — OTP / PIN controlled input.

   Wraps `react-native-confirmation-code-field` v9 with our design-system
   cell styling. Each cell is a styled View with border-color reflecting
   focus + validity state. Animated blinking cursor from the library's
   `<Cursor />` component occupies the active empty cell.

   Always controlled: consumer owns `value` string + `onChangeText`.
   `onComplete(code)` fires when all cells are filled (value.length === length).

   API mirrors Input for error/hint wiring: `isInvalid` turns all cell
   borders error-red; `hint` renders below the cells.

   RN deltas:
   - No web equivalent (web uses `<input maxlength>` hacks). Built fresh.
   - `secureTextEntry` masks digits with "•" at the renderCell layer; the
     underlying TextInput is also set secureTextEntry so iOS/Android mask
     the input method as well.
   - `autoFocus` handled by CodeField's own prop.
   ========================================================================== */

const CELL_WIDTH = 48
const CELL_HEIGHT = 56
const CELL_GAP = 8
const CELL_RADIUS = 12
const CELL_FONT_SIZE = 20 // text-xl
const CELL_FONT_WEIGHT = "600"

/** Imperative ref exposed to consumers. */
export interface PinInputRef {
  focus: () => void
  blur: () => void
  /** Clear value and re-focus the first cell. Caller must also reset `value` via `onChangeText`. */
  clear: () => void
}

export interface PinInputProps {
  /** Number of input cells. @default 6 */
  length?: number
  /** Controlled value (string of digits/chars). */
  value: string
  /** Fires on every character change. */
  onChangeText: (val: string) => void
  /** Fires when all cells are filled (`val.length === length`). */
  onComplete?: (val: string) => void
  /** Red cell borders. */
  isInvalid?: boolean
  /** Helper or error text below the cells. */
  hint?: ReactNode
  /** Mask filled cells with "•". @default false */
  secureTextEntry?: boolean
  /** @default "number-pad" */
  keyboardType?: "number-pad" | "decimal-pad" | "ascii-capable" | "default"
  /** Focus the first cell on mount. @default false */
  autoFocus?: boolean
  /** Disable the input. @default true */
  editable?: boolean
}

export const PinInput = forwardRef<PinInputRef, PinInputProps>(
  (
    {
      length = 6,
      value,
      onChangeText,
      onComplete,
      isInvalid = false,
      hint,
      secureTextEntry = false,
      keyboardType = "number-pad",
      autoFocus = false,
      editable = true,
    },
    ref,
  ) => {
    const scheme = useColorScheme()
    const isDark = scheme === "dark"

    const internalRef = useBlurOnFulfill({ value, cellCount: length })
    const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue: onChangeText,
    })

    useImperativeHandle(ref, () => ({
      focus: () => internalRef.current?.focus(),
      blur: () => internalRef.current?.blur(),
      clear: () => {
        onChangeText("")
        internalRef.current?.focus()
      },
    }))

    // Resolved cell border colors from semantic token aliases
    const borderDefault = isDark ? tokens.color.gray["700"] : tokens.color.gray["300"]
    const borderFocus = isDark ? tokens.color.brand["400"] : tokens.color.brand["600"]
    const borderError = isDark ? tokens.color.error["500"] : tokens.color.error["600"]
    const textColor = isDark ? tokens.color.gray["25"] : tokens.color.gray["900"]
    const bgColor = isDark ? tokens.color.gray["950"] : tokens.color.white
    const cursorColor = isDark ? tokens.color.brand["400"] : tokens.color.brand["600"]

    const handleChangeText = (val: string) => {
      onChangeText(val)
      if (val.length === length) {
        onComplete?.(val)
      }
    }

    return (
      <View className="gap-2">
        <CodeField
          ref={internalRef}
          {...codeFieldProps}
          value={value}
          onChangeText={handleChangeText}
          cellCount={length}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          textContentType="oneTimeCode"
          autoFocus={autoFocus}
          editable={editable}
          rootStyle={{ flexDirection: "row", gap: CELL_GAP, justifyContent: "center" }}
          renderCell={({ index, symbol, isFocused }) => {
            const borderColor = isInvalid
              ? borderError
              : isFocused
                ? borderFocus
                : borderDefault
            const borderWidth = isFocused ? 2 : 1

            return (
              <View
                key={index}
                onLayout={getCellOnLayoutHandler(index)}
                style={[
                  styles.cell,
                  {
                    borderColor,
                    borderWidth,
                    backgroundColor: bgColor,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.cellText,
                    { color: isFocused && !symbol ? cursorColor : textColor },
                  ]}
                >
                  {symbol ? (
                    secureTextEntry ? "•" : symbol
                  ) : isFocused ? (
                    <Cursor cursorSymbol="|" delay={500} />
                  ) : null}
                </Text>
              </View>
            )
          }}
        />

        {hint ? (
          <HintText isInvalid={isInvalid} className="text-center">
            {hint}
          </HintText>
        ) : null}
      </View>
    )
  },
)
PinInput.displayName = "PinInput"

const styles = StyleSheet.create({
  cell: {
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    borderRadius: CELL_RADIUS,
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: {
    fontSize: CELL_FONT_SIZE,
    fontWeight: CELL_FONT_WEIGHT,
    textAlign: "center",
  },
})
