/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and react-native-reusables.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { createContext, forwardRef, useContext, useId, type ComponentRef, type ReactNode } from "react"
import { View, type ViewProps } from "react-native"

import { cn } from "../lib/cn"
import { HintText } from "./hint-text"
import { Label } from "./label"

/* ==========================================================================
   FormField — Label + control + HintText composite.

   Decision (component-status.md, 2026-05-22): own PR after forms-controls
   batch. API question Q2: slot vs `control` prop vs discriminated union.
   Locked: `children` slot — non-magical, future-proof for custom controls,
   no per-control coupling.

   FormField does three things:
   1. Renders <Label> (with `isRequired` + `isInvalid`).
   2. Renders the child control.
   3. Renders <HintText> showing `errorMessage` (with `isInvalid`) OR
      `hint`.

   Plus exposes <FormFieldContext> so child controls can opt-in to
   read shared state without prop drilling:
     - `nativeID`: unique id (useId()) — paired with the field via
       `nativeID` on TextInput / Select trigger and
       `accessibilityLabelledBy` matching back to Label.
     - `isInvalid` / `isRequired` / `isDisabled`

   `useFormField()` returns the context or `null` outside a FormField.

   v1 caveats:
   - InputBase / TextareaBase / Select / CheckboxBase / SwitchBase consume
     this context via opt-in props in a follow-up. Today, callers pass
     `nativeID` + `aria-labelledby` equivalents manually (same pattern
     CLAUDE.md established for the forms-controls batch). FormField still
     wires the Label `nativeID` so manual pairing is trivial.
   - `orientation="horizontal"` lays out label inline with control
     (Checkbox / Switch convention). Hint still appears under both.
   ========================================================================== */

export interface FormFieldContextValue {
  /** Unique id for the field; paired between Label + control. */
  nativeID: string
  isInvalid: boolean
  isRequired: boolean
  isDisabled: boolean
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null)

/** Read FormField state from inside a control. Returns `null` if not in a FormField. */
export function useFormField(): FormFieldContextValue | null {
  return useContext(FormFieldContext)
}

type Orientation = "vertical" | "horizontal"

export interface FormFieldProps extends Omit<ViewProps, "children"> {
  /** Visible label. Pass a ReactNode to wrap with custom typography if needed. */
  label?: ReactNode
  /** Helper text below the control. Hidden when `errorMessage` is present. */
  hint?: ReactNode
  /** Error message — replaces `hint` and flags the field as invalid. */
  errorMessage?: ReactNode
  isRequired?: boolean
  /** Overrides automatic detection from `errorMessage` when set. */
  isInvalid?: boolean
  isDisabled?: boolean
  /**
   * Stack label above control (default) or place inline beside it
   * (Checkbox/Switch convention). Hint still appears under both.
   * @default "vertical"
   */
  orientation?: Orientation
  /** Optional id override — default `useId()`. */
  nativeID?: string
  children: ReactNode
}

export const FormField = forwardRef<ComponentRef<typeof View>, FormFieldProps>(
  (
    {
      label,
      hint,
      errorMessage,
      isRequired = false,
      isInvalid: isInvalidProp,
      isDisabled = false,
      orientation = "vertical",
      nativeID: nativeIDProp,
      className,
      children,
      ...viewProps
    },
    ref,
  ) => {
    const generatedID = useId()
    const nativeID = nativeIDProp ?? generatedID
    const isInvalid = isInvalidProp ?? errorMessage !== undefined
    const labelID = `${nativeID}-label`
    const hintID = `${nativeID}-hint`

    const ctx: FormFieldContextValue = {
      nativeID,
      isInvalid,
      isRequired,
      isDisabled,
    }

    const labelNode = label !== undefined ? (
      <Label nativeID={labelID} isRequired={isRequired} isInvalid={isInvalid}>
        {label}
      </Label>
    ) : null

    const hintNode = errorMessage !== undefined ? (
      <HintText nativeID={hintID} isInvalid>
        {errorMessage}
      </HintText>
    ) : hint !== undefined ? (
      <HintText nativeID={hintID}>{hint}</HintText>
    ) : null

    const isHorizontal = orientation === "horizontal"

    return (
      <FormFieldContext.Provider value={ctx}>
        <View
          ref={ref}
          className={cn("gap-1.5", isDisabled && "opacity-50", className)}
          {...viewProps}
        >
          {isHorizontal ? (
            <View className="flex-row items-center gap-3">
              {children}
              {labelNode}
            </View>
          ) : (
            <>
              {labelNode}
              {children}
            </>
          )}

          {hintNode}
        </View>
      </FormFieldContext.Provider>
    )
  },
)

FormField.displayName = "FormField"
