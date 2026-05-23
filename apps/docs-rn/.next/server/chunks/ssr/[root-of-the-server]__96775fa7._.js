module.exports = [
"[project]/apps/docs-rn/.next-internal/server/app/(main)/components/[slug]/page/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/apps/docs-rn/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/docs-rn/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/apps/docs-rn/src/app/(main)/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/docs-rn/src/app/(main)/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/apps/docs-rn/src/lib/components-data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "components",
    ()=>components
]);
const components = [
    // ─── Actions ───────────────────────────────────────────────────────────────
    {
        slug: "button",
        name: "Button",
        category: "Actions",
        description: "Accessible, themeable button with 9 color variants and 4 sizes.",
        importPath: `import { Button } from "@mvp-ui-rn/ui"`,
        usageCode: `import { Button } from "@mvp-ui-rn/ui"
import { Plus } from "lucide-react-native"

<Button
  variant="primary"
  size="md"
  iconLeading={Plus}
  onPress={() => {}}
>
  Create account
</Button>`,
        props: [
            {
                name: "variant",
                type: `"primary" | "secondary" | "tertiary" | "link" | "destructive"`,
                default: `"primary"`,
                description: "Visual style of the button."
            },
            {
                name: "size",
                type: `"sm" | "md" | "lg" | "xl"`,
                default: `"md"`,
                description: "Height and padding scale."
            },
            {
                name: "isLoading",
                type: "boolean",
                default: "false",
                description: "Replaces children with a Spinner and disables interaction."
            },
            {
                name: "isDisabled",
                type: "boolean",
                default: "false",
                description: "Disables the button and applies reduced opacity."
            },
            {
                name: "iconLeading",
                type: "IconProp",
                description: "Icon rendered to the left of the label."
            },
            {
                name: "iconTrailing",
                type: "IconProp",
                description: "Icon rendered to the right of the label."
            },
            {
                name: "children",
                type: "ReactNode",
                required: true,
                description: "Button label content."
            }
        ],
        rnNotes: [
            "Touch targets ≥ 44pt baked into defaults — sm=40pt available but opt-in only.",
            "Icons must be lucide-react-native (not lucide-react).",
            "No :hover — use active: for pressed state via NativeWind.",
            "Use onPress not onClick."
        ]
    },
    {
        slug: "fab",
        name: "FAB",
        category: "Actions",
        description: "Floating Action Button — circular or extended pill shape with brand fill and elevation shadow.",
        importPath: `import { FAB } from "@mvp-ui-rn/ui"`,
        usageCode: `import { FAB } from "@mvp-ui-rn/ui"
import { Plus } from "lucide-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const insets = useSafeAreaInsets()

<View style={{ position: "absolute", bottom: insets.bottom + 24, right: 24 }}>
  <FAB icon={Plus} onPress={handleCreate} />
</View>`,
        props: [
            {
                name: "icon",
                type: "IconProp",
                required: true,
                description: "Icon displayed inside the FAB."
            },
            {
                name: "label",
                type: "string",
                description: "Optional text label — switches to the extended FAB pill layout."
            },
            {
                name: "size",
                type: `"md" | "lg"`,
                default: `"md"`,
                description: "Diameter of the circular button (56 or 64px)."
            },
            {
                name: "color",
                type: `"primary" | "secondary" | "surface"`,
                default: `"primary"`,
                description: "Fill color variant."
            },
            {
                name: "isLoading",
                type: "boolean",
                default: "false",
                description: "Shows a Spinner in place of the icon."
            },
            {
                name: "onPress",
                type: "() => void",
                required: true,
                description: "Callback fired on tap."
            }
        ],
        rnNotes: [
            "FAB is a visual primitive — it does not position itself. The caller manages position: absolute and insets.",
            "Primary color uses brand-tinted shadow; secondary/surface use the standard elevation token.",
            "Use the extended FAB (label prop) only when the action is not obvious from the icon alone."
        ]
    },
    // ─── Form ──────────────────────────────────────────────────────────────────
    {
        slug: "input",
        name: "Input",
        category: "Form",
        description: "Text input with label, hint text, error state, and leading/trailing icon support.",
        importPath: `import { Input } from "@mvp-ui-rn/ui"`,
        usageCode: `import { Input } from "@mvp-ui-rn/ui"
import { Mail } from "lucide-react-native"

<Input
  label="Email"
  placeholder="you@example.com"
  iconLeading={Mail}
  hintText="We'll never share your email."
  value={email}
  onChangeText={setEmail}
/>`,
        props: [
            {
                name: "value",
                type: "string",
                required: true,
                description: "Controlled text value."
            },
            {
                name: "onChangeText",
                type: "(text: string) => void",
                required: true,
                description: "Callback fired when text changes."
            },
            {
                name: "label",
                type: "string",
                description: "Label rendered above the input field."
            },
            {
                name: "placeholder",
                type: "string",
                description: "Placeholder text shown when the field is empty."
            },
            {
                name: "hintText",
                type: "string",
                description: "Helper text rendered below the input."
            },
            {
                name: "errorMessage",
                type: "string",
                description: "Error text that replaces hintText and applies error styling."
            },
            {
                name: "isDisabled",
                type: "boolean",
                default: "false",
                description: "Disables the field and applies reduced opacity."
            },
            {
                name: "iconLeading",
                type: "IconProp",
                description: "Icon rendered inside the left edge of the input."
            },
            {
                name: "iconTrailing",
                type: "IconProp",
                description: "Icon rendered inside the right edge of the input."
            },
            {
                name: "secureTextEntry",
                type: "boolean",
                default: "false",
                description: "Masks text — use for password fields."
            }
        ],
        rnNotes: [
            "Use secureTextEntry for password fields (no :type='password' in RN).",
            "Pair with KeyboardAvoidingScroll on form screens.",
            "errorMessage replaces hintText when set."
        ]
    },
    {
        slug: "textarea",
        name: "Textarea",
        category: "Form",
        description: "Multi-line text input with auto-grow, character count, and the same label/hint/error pattern as Input.",
        importPath: `import { Textarea } from "@mvp-ui-rn/ui"`,
        usageCode: `import { Textarea } from "@mvp-ui-rn/ui"

<Textarea
  label="Bio"
  placeholder="Tell us about yourself…"
  hintText="Max 500 characters."
  maxLength={500}
  showCharCount
  value={bio}
  onChangeText={setBio}
/>`,
        props: [
            {
                name: "value",
                type: "string",
                required: true,
                description: "Controlled text value."
            },
            {
                name: "onChangeText",
                type: "(text: string) => void",
                required: true,
                description: "Callback fired when text changes."
            },
            {
                name: "label",
                type: "string",
                description: "Label rendered above the field."
            },
            {
                name: "hintText",
                type: "string",
                description: "Helper text rendered below the field."
            },
            {
                name: "errorMessage",
                type: "string",
                description: "Error text that replaces hintText."
            },
            {
                name: "maxLength",
                type: "number",
                description: "Maximum character count."
            },
            {
                name: "showCharCount",
                type: "boolean",
                default: "false",
                description: "Renders a remaining-character counter below the field."
            },
            {
                name: "minHeight",
                type: "number",
                default: "96",
                description: "Minimum height in points before the field auto-grows."
            }
        ],
        rnNotes: [
            "Auto-grow is implemented via onContentSizeChange — the field expands vertically as lines are added.",
            "Wrap the form in KeyboardAvoidingScroll so the keyboard does not cover the textarea.",
            "multiline is always true — do not pass it as a prop."
        ]
    },
    {
        slug: "pin-input",
        name: "PinInput",
        category: "Form",
        description: "OTP / PIN code entry with per-digit cells, auto-advance, and paste support.",
        importPath: `import { PinInput } from "@mvp-ui-rn/ui"`,
        usageCode: `import { PinInput } from "@mvp-ui-rn/ui"

<PinInput
  length={6}
  value={pin}
  onChangeText={setPin}
  onComplete={(code) => verifyCode(code)}
  autoFocus
/>`,
        props: [
            {
                name: "length",
                type: "number",
                default: "6",
                description: "Number of digit cells."
            },
            {
                name: "value",
                type: "string",
                required: true,
                description: "Controlled PIN value (unmasked digits)."
            },
            {
                name: "onChangeText",
                type: "(value: string) => void",
                required: true,
                description: "Callback fired when any digit changes."
            },
            {
                name: "onComplete",
                type: "(value: string) => void",
                description: "Fires once all cells are filled."
            },
            {
                name: "obscure",
                type: "boolean",
                default: "false",
                description: "Shows dots instead of digits — use for PIN entry."
            },
            {
                name: "autoFocus",
                type: "boolean",
                default: "false",
                description: "Focuses the first cell on mount."
            }
        ],
        rnNotes: [
            "Pasting a full-length code auto-distributes across cells and fires onComplete.",
            "SMS OTP autofill is supported on iOS (textContentType='oneTimeCode') and Android (SMS Retriever).",
            "Minimum cell size is 44pt — do not constrain the container below 44 * length points."
        ]
    },
    {
        slug: "label",
        name: "Label",
        category: "Form",
        description: "Accessible form field label with optional required indicator, rendered as Text.",
        importPath: `import { Label } from "@mvp-ui-rn/ui"`,
        usageCode: `import { Label } from "@mvp-ui-rn/ui"

<Label required>Email address</Label>`,
        props: [
            {
                name: "children",
                type: "ReactNode",
                required: true,
                description: "Label text content."
            },
            {
                name: "required",
                type: "boolean",
                default: "false",
                description: "Appends a red asterisk to indicate the field is required."
            },
            {
                name: "isDisabled",
                type: "boolean",
                default: "false",
                description: "Applies reduced opacity to match a disabled field."
            },
            {
                name: "className",
                type: "string",
                description: "Additional NativeWind classes."
            }
        ],
        rnNotes: [
            "Use nativeID on the Label and pass it to accessibilityLabelledBy on the field for screen-reader pairing.",
            "Label is a pure Text component — it does not render an implicit touchable."
        ]
    },
    {
        slug: "hint-text",
        name: "HintText",
        category: "Form",
        description: "Helper or error text rendered below a form field, with variant styling for default and error states.",
        importPath: `import { HintText } from "@mvp-ui-rn/ui"`,
        usageCode: `import { HintText } from "@mvp-ui-rn/ui"

<HintText>Enter the email associated with your account.</HintText>
<HintText variant="error">This field is required.</HintText>`,
        props: [
            {
                name: "children",
                type: "ReactNode",
                required: true,
                description: "Hint text content."
            },
            {
                name: "variant",
                type: `"default" | "error"`,
                default: `"default"`,
                description: "Applies error color when set to 'error'."
            },
            {
                name: "className",
                type: "string",
                description: "Additional NativeWind classes."
            }
        ],
        rnNotes: [
            "Input and Select automatically render HintText internally — only use this component when building a custom form layout.",
            "Font size is bumped one step vs. web for mobile arm's-length readability."
        ]
    },
    {
        slug: "checkbox",
        name: "Checkbox",
        category: "Form",
        description: "Tri-state checkbox (checked / unchecked / indeterminate) built on @rn-primitives/checkbox.",
        importPath: `import { Checkbox } from "@mvp-ui-rn/ui"`,
        usageCode: `import { Checkbox } from "@mvp-ui-rn/ui"

<Checkbox
  checked={agreed}
  onCheckedChange={setAgreed}
  label="I agree to the terms of service"
/>`,
        props: [
            {
                name: "checked",
                type: `boolean | "indeterminate"`,
                required: true,
                description: "Controlled checked state."
            },
            {
                name: "onCheckedChange",
                type: "(checked: boolean) => void",
                required: true,
                description: "Callback fired when the state changes."
            },
            {
                name: "label",
                type: "string",
                description: "Optional text label rendered to the right of the box."
            },
            {
                name: "size",
                type: `"sm" | "md"`,
                default: `"md"`,
                description: "Box size — md=24pt, sm=20pt."
            },
            {
                name: "isDisabled",
                type: "boolean",
                default: "false",
                description: "Disables the checkbox and applies reduced opacity."
            }
        ],
        rnNotes: [
            "hitSlop extends the tappable area to meet the 44pt HIG touch target floor.",
            "Tapping an indeterminate checkbox transitions to checked, mirroring native browser behavior.",
            "Pair with FormField for label + hint + error layout."
        ]
    },
    {
        slug: "radio-group",
        name: "RadioGroup",
        category: "Form",
        description: "Single-selection radio group with accessible keyboard and screen-reader semantics.",
        importPath: `import { RadioGroup, RadioGroupItem } from "@mvp-ui-rn/ui"`,
        usageCode: `import { RadioGroup, RadioGroupItem } from "@mvp-ui-rn/ui"

<RadioGroup value={plan} onValueChange={setPlan}>
  <RadioGroupItem value="starter" label="Starter" />
  <RadioGroupItem value="pro" label="Pro" />
  <RadioGroupItem value="enterprise" label="Enterprise" />
</RadioGroup>`,
        props: [
            {
                name: "value",
                type: "string",
                required: true,
                description: "Currently selected option value."
            },
            {
                name: "onValueChange",
                type: "(value: string) => void",
                required: true,
                description: "Callback fired when the selection changes."
            },
            {
                name: "isDisabled",
                type: "boolean",
                default: "false",
                description: "Disables all items in the group."
            },
            {
                name: "children",
                type: "ReactNode",
                required: true,
                description: "RadioGroupItem children."
            }
        ],
        rnNotes: [
            "RadioGroupItem inherits disabled state from the parent RadioGroup.",
            "Each item touch target meets the 44pt HIG minimum via hitSlop.",
            "Use accessibilityRole='radio' — automatically applied by the primitive."
        ]
    },
    {
        slug: "switch",
        name: "Switch",
        category: "Form",
        description: "Toggle switch for boolean settings, built on @rn-primitives/switch with animated thumb.",
        importPath: `import { Switch } from "@mvp-ui-rn/ui"`,
        usageCode: `import { Switch } from "@mvp-ui-rn/ui"

<Switch
  checked={notifications}
  onCheckedChange={setNotifications}
  label="Push notifications"
/>`,
        props: [
            {
                name: "checked",
                type: "boolean",
                required: true,
                description: "Controlled on/off state."
            },
            {
                name: "onCheckedChange",
                type: "(checked: boolean) => void",
                required: true,
                description: "Callback fired on toggle."
            },
            {
                name: "label",
                type: "string",
                description: "Optional text label rendered beside the switch."
            },
            {
                name: "isDisabled",
                type: "boolean",
                default: "false",
                description: "Disables the switch."
            },
            {
                name: "size",
                type: `"sm" | "md"`,
                default: `"md"`,
                description: "Track and thumb size."
            }
        ],
        rnNotes: [
            "Track color uses bg-primary when on and border-border when off — both semantic aliases that flip in dark mode.",
            "Prefer Switch over Checkbox for settings-style binary toggles.",
            "SettingsRow composes Switch internally — use SettingsRow for list-style settings screens."
        ]
    },
    {
        slug: "select",
        name: "Select",
        category: "Form",
        description: "Dropdown selector with a sheet-style option list, label, hint, and error state.",
        importPath: `import { Select, SelectItem } from "@mvp-ui-rn/ui"`,
        usageCode: `import { Select, SelectItem } from "@mvp-ui-rn/ui"

<Select
  label="Country"
  placeholder="Select a country"
  value={country}
  onValueChange={setCountry}
>
  <SelectItem value="us" label="United States" />
  <SelectItem value="gb" label="United Kingdom" />
  <SelectItem value="au" label="Australia" />
</Select>`,
        props: [
            {
                name: "value",
                type: "string | undefined",
                required: true,
                description: "Currently selected value."
            },
            {
                name: "onValueChange",
                type: "(value: string) => void",
                required: true,
                description: "Callback fired when selection changes."
            },
            {
                name: "label",
                type: "string",
                description: "Label rendered above the trigger."
            },
            {
                name: "placeholder",
                type: "string",
                description: "Text shown in the trigger when no value is selected."
            },
            {
                name: "hintText",
                type: "string",
                description: "Helper text rendered below the trigger."
            },
            {
                name: "errorMessage",
                type: "string",
                description: "Error text that replaces hintText."
            },
            {
                name: "isDisabled",
                type: "boolean",
                default: "false",
                description: "Disables the trigger."
            },
            {
                name: "children",
                type: "ReactNode",
                required: true,
                description: "SelectItem children rendered in the dropdown."
            }
        ],
        rnNotes: [
            "The option list renders via @rn-primitives/select Portal — requires PortalHost in the app root.",
            "No combobox / typeahead in v1 — add a SearchBar above the list for long option sets.",
            "SelectItem value must be a string; transform numeric IDs before passing."
        ]
    },
    {
        slug: "slider",
        name: "Slider",
        category: "Form",
        description: "Horizontal range slider for numeric value selection with optional min/max labels.",
        importPath: `import { Slider } from "@mvp-ui-rn/ui"`,
        usageCode: `import { Slider } from "@mvp-ui-rn/ui"

<Slider
  label="Volume"
  value={volume}
  onValueChange={setVolume}
  minimumValue={0}
  maximumValue={100}
  step={5}
/>`,
        props: [
            {
                name: "value",
                type: "number",
                required: true,
                description: "Controlled slider value."
            },
            {
                name: "onValueChange",
                type: "(value: number) => void",
                required: true,
                description: "Callback fired as the thumb moves."
            },
            {
                name: "minimumValue",
                type: "number",
                default: "0",
                description: "Minimum value."
            },
            {
                name: "maximumValue",
                type: "number",
                default: "100",
                description: "Maximum value."
            },
            {
                name: "step",
                type: "number",
                default: "1",
                description: "Snap increment between values."
            },
            {
                name: "label",
                type: "string",
                description: "Label rendered above the track."
            },
            {
                name: "isDisabled",
                type: "boolean",
                default: "false",
                description: "Disables the slider."
            }
        ],
        rnNotes: [
            "Thumb touch target is padded to ≥ 44pt — do not constrain the container's height below 44pt.",
            "Haptic feedback fires on step boundaries when expo-haptics is installed.",
            "For dual-thumb range sliders, use two Sliders with min/max clamping in onValueChange."
        ]
    },
    {
        slug: "stepper",
        name: "Stepper",
        category: "Form",
        description: "Numeric increment/decrement control with +/- buttons and an editable value display.",
        importPath: `import { Stepper } from "@mvp-ui-rn/ui"`,
        usageCode: `import { Stepper } from "@mvp-ui-rn/ui"

<Stepper
  value={quantity}
  onValueChange={setQuantity}
  min={1}
  max={99}
  label="Quantity"
/>`,
        props: [
            {
                name: "value",
                type: "number",
                required: true,
                description: "Controlled numeric value."
            },
            {
                name: "onValueChange",
                type: "(value: number) => void",
                required: true,
                description: "Callback fired on increment or decrement."
            },
            {
                name: "min",
                type: "number",
                description: "Minimum clamp value — disables the decrement button at boundary."
            },
            {
                name: "max",
                type: "number",
                description: "Maximum clamp value — disables the increment button at boundary."
            },
            {
                name: "step",
                type: "number",
                default: "1",
                description: "Amount to add or subtract per tap."
            },
            {
                name: "label",
                type: "string",
                description: "Label rendered above the control."
            }
        ],
        rnNotes: [
            "Both + and - buttons meet the 44pt touch target minimum.",
            "Long-press on a button repeats the increment/decrement while held.",
            "Pair with HapticFeedback for tactile step feedback."
        ]
    },
    {
        slug: "date-time-picker",
        name: "DateTimePicker",
        category: "Form",
        description: "Cross-platform date and/or time picker using @react-native-community/datetimepicker with a custom trigger.",
        importPath: `import { DateTimePicker } from "@mvp-ui-rn/ui"`,
        usageCode: `import { DateTimePicker } from "@mvp-ui-rn/ui"

<DateTimePicker
  label="Appointment date"
  value={date}
  onChange={setDate}
  mode="datetime"
  minimumDate={new Date()}
/>`,
        props: [
            {
                name: "value",
                type: "Date",
                required: true,
                description: "Controlled date value."
            },
            {
                name: "onChange",
                type: "(date: Date) => void",
                required: true,
                description: "Callback fired when the user confirms a date."
            },
            {
                name: "mode",
                type: `"date" | "time" | "datetime"`,
                default: `"date"`,
                description: "Which part of the date to pick."
            },
            {
                name: "label",
                type: "string",
                description: "Label rendered above the trigger button."
            },
            {
                name: "minimumDate",
                type: "Date",
                description: "Earliest selectable date."
            },
            {
                name: "maximumDate",
                type: "Date",
                description: "Latest selectable date."
            }
        ],
        rnNotes: [
            "On iOS, the picker renders in a BottomSheet — the native wheel picker is presented modally.",
            "On Android, the system date/time picker dialog is used (OS-native UI).",
            "Format the displayed value yourself using a date library such as date-fns."
        ]
    },
    {
        slug: "form-field",
        name: "FormField",
        category: "Form",
        description: "Layout wrapper that composes Label, a form control, and HintText/error into a vertical stack with consistent spacing.",
        importPath: `import { FormField } from "@mvp-ui-rn/ui"`,
        usageCode: `import { FormField } from "@mvp-ui-rn/ui"
import { Checkbox } from "@mvp-ui-rn/ui"

<FormField
  label="Accept terms"
  hintText="You must accept to continue."
  errorMessage={errors.terms}
>
  <Checkbox checked={terms} onCheckedChange={setTerms} />
</FormField>`,
        props: [
            {
                name: "children",
                type: "ReactNode",
                required: true,
                description: "The form control to render (Checkbox, Switch, custom, etc.)."
            },
            {
                name: "label",
                type: "string",
                description: "Label rendered above the control."
            },
            {
                name: "hintText",
                type: "string",
                description: "Helper text rendered below the control."
            },
            {
                name: "errorMessage",
                type: "string",
                description: "Error text — replaces hintText and applies error color."
            },
            {
                name: "required",
                type: "boolean",
                default: "false",
                description: "Passes required indicator to the Label."
            }
        ],
        rnNotes: [
            "Input and Select have their own built-in label/hint — use FormField only for controls that lack them (Checkbox, Switch, Slider, etc.).",
            "errorMessage is typically sourced from a form library such as React Hook Form's fieldState.error.message."
        ]
    },
    {
        slug: "settings-row",
        name: "SettingsRow",
        category: "Form",
        description: "List row that composes a title, optional subtitle, and a trailing control (Switch, chevron, badge, or custom) for settings screens.",
        importPath: `import { SettingsRow } from "@mvp-ui-rn/ui"`,
        usageCode: `import { SettingsRow } from "@mvp-ui-rn/ui"

<SettingsRow
  title="Push notifications"
  subtitle="Receive alerts for new messages"
  trailing={
    <Switch checked={notifications} onCheckedChange={setNotifications} />
  }
/>`,
        props: [
            {
                name: "title",
                type: "string",
                required: true,
                description: "Primary row label."
            },
            {
                name: "subtitle",
                type: "string",
                description: "Secondary description text rendered below the title."
            },
            {
                name: "trailing",
                type: "ReactNode",
                description: "Element rendered at the trailing edge (Switch, Text, Icon, etc.)."
            },
            {
                name: "onPress",
                type: "() => void",
                description: "Makes the row a Pressable and fires on tap."
            },
            {
                name: "iconLeading",
                type: "IconProp",
                description: "Icon rendered at the leading edge."
            },
            {
                name: "isDisabled",
                type: "boolean",
                default: "false",
                description: "Disables press interaction and applies reduced opacity."
            }
        ],
        rnNotes: [
            "Group multiple SettingsRow items inside a Card with dividers for a standard iOS settings appearance.",
            "Row height is at least 56pt so the trailing switch is comfortable to tap.",
            "Do not embed another Pressable in trailing — the row itself is Pressable when onPress is provided."
        ]
    },
    // ─── Overlays ──────────────────────────────────────────────────────────────
    {
        slug: "dialog",
        name: "Dialog",
        category: "Overlays",
        description: "Modal dialog built on @rn-primitives/dialog with backdrop, animated entry, and compound sub-components.",
        importPath: `import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@mvp-ui-rn/ui"`,
        usageCode: `import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@mvp-ui-rn/ui"

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogTitle>Delete item?</DialogTitle>
    <DialogDescription>This action cannot be undone.</DialogDescription>
    <DialogClose asChild>
      <Button variant="destructive" onPress={handleDelete}>Delete</Button>
    </DialogClose>
  </DialogContent>
</Dialog>`,
        props: [
            {
                name: "open",
                type: "boolean",
                required: true,
                description: "Controls whether the dialog is visible."
            },
            {
                name: "onOpenChange",
                type: "(open: boolean) => void",
                required: true,
                description: "Fires when the dialog requests to open or close."
            },
            {
                name: "size",
                type: `"sm" | "md" | "lg"`,
                default: `"md"`,
                description: "Maximum width of the dialog panel (320 / 384 / 448pt)."
            },
            {
                name: "children",
                type: "ReactNode",
                required: true,
                description: "DialogContent and its children."
            }
        ],
        rnNotes: [
            "Requires PortalHost mounted in the app root — typically in _layout.tsx.",
            "Full-screen modals belong in a route or BottomSheet, not Dialog.",
            "Hardware back button on Android closes the dialog — handled by the primitive.",
            "Backdrop tap closes the dialog via the primitive's closeOnPress default."
        ]
    },
    {
        slug: "bottom-sheet",
        name: "BottomSheet",
        category: "Overlays",
        description: "Gesture-driven bottom sheet built on @gorhom/bottom-sheet with snap points.",
        importPath: `import { BottomSheet, BottomSheetView } from "@mvp-ui-rn/ui"`,
        usageCode: `import { useRef } from "react"
import { BottomSheet, BottomSheetView } from "@mvp-ui-rn/ui"
import type { BottomSheetModal } from "@gorhom/bottom-sheet"

const sheetRef = useRef<BottomSheetModal>(null)

// Open
sheetRef.current?.present()

<BottomSheet ref={sheetRef} snapPoints={["40%", "75%"]}>
  <BottomSheetView className="px-6 py-4">
    <Text className="text-fg text-lg font-semibold">Sheet title</Text>
  </BottomSheetView>
</BottomSheet>`,
        props: [
            {
                name: "snapPoints",
                type: "string[] | number[]",
                required: true,
                description: "Detent heights — percentages ('40%') or pixel values."
            },
            {
                name: "ref",
                type: "BottomSheetModal ref",
                required: true,
                description: "Ref used to imperatively present() or dismiss() the sheet."
            },
            {
                name: "enablePanDownToClose",
                type: "boolean",
                default: "true",
                description: "Allows dragging below the lowest snap point to dismiss."
            },
            {
                name: "backdropOpacity",
                type: "number",
                default: "0.5",
                description: "Opacity of the dimming backdrop."
            },
            {
                name: "onDismiss",
                type: "() => void",
                description: "Callback fired when the sheet fully closes."
            },
            {
                name: "children",
                type: "ReactNode",
                required: true,
                description: "Sheet content."
            }
        ],
        rnNotes: [
            "Requires @gorhom/bottom-sheet + reanimated v4.",
            "Mount BottomSheetModalProvider in root — or use PortalHost from @rn-primitives/portal.",
            "snapPoints accept percentages ('40%') or pixel values.",
            "Do not nest ScrollView inside — use BottomSheetScrollView instead."
        ]
    },
    {
        slug: "action-sheet",
        name: "ActionSheet",
        category: "Overlays",
        description: "Context action menu anchored to the bottom of the screen, with labeled action items and a cancel option.",
        importPath: `import { ActionSheet, ActionSheetItem } from "@mvp-ui-rn/ui"`,
        usageCode: `import { ActionSheet, ActionSheetItem } from "@mvp-ui-rn/ui"

<ActionSheet open={open} onOpenChange={setOpen} title="Photo options">
  <ActionSheetItem onPress={handleCamera}>Take photo</ActionSheetItem>
  <ActionSheetItem onPress={handleLibrary}>Choose from library</ActionSheetItem>
  <ActionSheetItem destructive onPress={handleRemove}>Remove photo</ActionSheetItem>
</ActionSheet>`,
        props: [
            {
                name: "open",
                type: "boolean",
                required: true,
                description: "Controls sheet visibility."
            },
            {
                name: "onOpenChange",
                type: "(open: boolean) => void",
                required: true,
                description: "Fires when the sheet should open or close."
            },
            {
                name: "title",
                type: "string",
                description: "Optional title rendered at the top of the action list."
            },
            {
                name: "children",
                type: "ReactNode",
                required: true,
                description: "ActionSheetItem children."
            }
        ],
        rnNotes: [
            "A Cancel item is always rendered automatically at the bottom.",
            "Destructive items render in error color — set the destructive prop on ActionSheetItem.",
            "ActionSheet is distinct from ContextMenu — ActionSheet is always bottom-anchored and full-width."
        ]
    },
    {
        slug: "popover",
        name: "Popover",
        category: "Overlays",
        description: "Anchor-relative floating panel built on @rn-primitives/popover for tooltips, menus, and pickers.",
        importPath: `import { Popover, PopoverTrigger, PopoverContent } from "@mvp-ui-rn/ui"`,
        usageCode: `import { Popover, PopoverTrigger, PopoverContent } from "@mvp-ui-rn/ui"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary" size="sm">Options</Button>
  </PopoverTrigger>
  <PopoverContent>
    <Text className="text-fg text-sm">Sort by date</Text>
    <Text className="text-fg text-sm">Sort by name</Text>
  </PopoverContent>
</Popover>`,
        props: [
            {
                name: "open",
                type: "boolean",
                description: "Controlled open state — omit for uncontrolled."
            },
            {
                name: "onOpenChange",
                type: "(open: boolean) => void",
                description: "Fires when open state changes (controlled mode)."
            },
            {
                name: "side",
                type: `"top" | "bottom" | "left" | "right"`,
                default: `"bottom"`,
                description: "Preferred side relative to the trigger."
            },
            {
                name: "sideOffset",
                type: "number",
                default: "8",
                description: "Gap in points between the trigger and the panel."
            }
        ],
        rnNotes: [
            "The panel renders via Portal — requires PortalHost in the app root.",
            "Position flips automatically when there is insufficient space on the preferred side.",
            "On small phones, prefer ActionSheet or BottomSheet over Popover for action menus."
        ]
    },
    {
        slug: "tooltip",
        name: "Tooltip",
        category: "Overlays",
        description: "Long-press tooltip that shows a short text label anchored to a trigger element.",
        importPath: `import { Tooltip, TooltipTrigger, TooltipContent } from "@mvp-ui-rn/ui"`,
        usageCode: `import { Tooltip, TooltipTrigger, TooltipContent } from "@mvp-ui-rn/ui"

<Tooltip>
  <TooltipTrigger asChild>
    <Icon name="info" />
  </TooltipTrigger>
  <TooltipContent>
    <Text>Requires a verified email</Text>
  </TooltipContent>
</Tooltip>`,
        props: [
            {
                name: "delayDuration",
                type: "number",
                default: "700",
                description: "Milliseconds of long-press before the tooltip appears."
            },
            {
                name: "side",
                type: `"top" | "bottom" | "left" | "right"`,
                default: `"top"`,
                description: "Preferred side relative to the trigger."
            },
            {
                name: "sideOffset",
                type: "number",
                default: "6",
                description: "Gap in points between the trigger and the tooltip."
            }
        ],
        rnNotes: [
            "Tooltip appears on long-press, not hover — there is no hover event in RN.",
            "Keep tooltip text under 60 characters; use Popover for richer content.",
            "Tooltip auto-dismisses after 3 seconds or on touch elsewhere."
        ]
    },
    {
        slug: "context-menu",
        name: "ContextMenu",
        category: "Overlays",
        description: "Long-press context menu with labeled items, built on @rn-primitives/context-menu.",
        importPath: `import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@mvp-ui-rn/ui"`,
        usageCode: `import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@mvp-ui-rn/ui"

<ContextMenu>
  <ContextMenuTrigger asChild>
    <Card>
      <Text className="text-fg">Long-press me</Text>
    </Card>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem onPress={handleCopy}>Copy</ContextMenuItem>
    <ContextMenuItem onPress={handleShare}>Share</ContextMenuItem>
    <ContextMenuItem destructive onPress={handleDelete}>Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
        props: [
            {
                name: "open",
                type: "boolean",
                description: "Controlled open state."
            },
            {
                name: "onOpenChange",
                type: "(open: boolean) => void",
                description: "Fires when open state changes."
            }
        ],
        rnNotes: [
            "Long-press activates the menu — the activation delay matches the OS default.",
            "Destructive items render in error color — set the destructive prop on ContextMenuItem.",
            "On iOS 16+, the system popover may be preferred — the primitive handles the platform difference."
        ]
    },
    {
        slug: "toast",
        name: "Toast",
        category: "Overlays",
        description: "Temporary notification overlay with 4 severity levels and swipe-to-dismiss.",
        importPath: `import { toast, Toaster } from "@mvp-ui-rn/ui"`,
        usageCode: `// 1. Add Toaster in root layout
import { Toaster } from "@mvp-ui-rn/ui"

export default function RootLayout() {
  return (
    <>
      <Stack />
      <Toaster />
    </>
  )
}

// 2. Trigger from anywhere
import { toast } from "@mvp-ui-rn/ui"

toast.success("Profile saved!")
toast.error("Network error", { description: "Please retry." })
toast.warning("Draft expires in 5 minutes.")
toast.info("3 items added to cart.")`,
        props: [
            {
                name: "message",
                type: "string",
                required: true,
                description: "Primary toast text (title)."
            },
            {
                name: "variant",
                type: `"success" | "error" | "warning" | "info"`,
                default: `"info"`,
                description: "Severity level — controls icon and accent color."
            },
            {
                name: "description",
                type: "string",
                description: "Optional secondary text rendered below the title."
            },
            {
                name: "duration",
                type: "number",
                default: "4000",
                description: "Auto-dismiss delay in milliseconds. Pass Infinity to require manual dismiss."
            },
            {
                name: "dismissible",
                type: "boolean",
                default: "true",
                description: "Shows a close button."
            }
        ],
        rnNotes: [
            "Mount Toaster once — typically in apps/showcase/src/app/_layout.tsx.",
            "Toasts stack vertically — max 3 visible at once.",
            "Swipe up on iOS / swipe down on Android to dismiss early."
        ]
    },
    {
        slug: "banner",
        name: "Banner",
        category: "Overlays",
        description: "Full-width informational strip anchored below the header or at the top of a screen for persistent alerts.",
        importPath: `import { Banner } from "@mvp-ui-rn/ui"`,
        usageCode: `import { Banner } from "@mvp-ui-rn/ui"

<Banner
  variant="warning"
  title="Scheduled maintenance"
  description="The service will be unavailable on Sunday 2am–4am UTC."
  onDismiss={() => setShowBanner(false)}
/>`,
        props: [
            {
                name: "variant",
                type: `"info" | "success" | "warning" | "error"`,
                default: `"info"`,
                description: "Severity — controls background color and icon."
            },
            {
                name: "title",
                type: "string",
                required: true,
                description: "Primary banner heading."
            },
            {
                name: "description",
                type: "string",
                description: "Optional supporting text."
            },
            {
                name: "onDismiss",
                type: "() => void",
                description: "Callback for the dismiss button — omit to hide the button."
            },
            {
                name: "action",
                type: "{ label: string; onPress: () => void }",
                description: "Optional inline action link."
            }
        ],
        rnNotes: [
            "Banner is persistent — it stays until dismissed or the condition resolves. Use Toast for transient messages.",
            "Position the Banner below the Header using a flex column layout rather than absolute positioning."
        ]
    },
    {
        slug: "alert",
        name: "Alert",
        category: "Overlays",
        description: "Inline status alert box with icon, title, and description for form-level or page-level feedback.",
        importPath: `import { Alert } from "@mvp-ui-rn/ui"`,
        usageCode: `import { Alert } from "@mvp-ui-rn/ui"

<Alert
  variant="error"
  title="Login failed"
  description="Your email or password is incorrect. Please try again."
/>`,
        props: [
            {
                name: "variant",
                type: `"info" | "success" | "warning" | "error"`,
                default: `"info"`,
                description: "Severity — controls icon and color scheme."
            },
            {
                name: "title",
                type: "string",
                required: true,
                description: "Primary alert heading."
            },
            {
                name: "description",
                type: "string",
                description: "Supporting detail text."
            },
            {
                name: "onDismiss",
                type: "() => void",
                description: "Adds a dismiss button when provided."
            }
        ],
        rnNotes: [
            "Alert is inline — it renders in document flow, not as an overlay. Use Toast for fire-and-forget feedback.",
            "All colors use semantic aliases (bg-error-bg, text-error-fg) that flip correctly in dark mode."
        ]
    },
    // ─── Navigation ────────────────────────────────────────────────────────────
    {
        slug: "header",
        name: "Header",
        category: "Navigation",
        description: "Screen-level navigation header with title, leading back/menu action, and trailing icon buttons.",
        importPath: `import { Header } from "@mvp-ui-rn/ui"`,
        usageCode: `import { Header } from "@mvp-ui-rn/ui"
import { ArrowLeft, MoreHorizontal } from "lucide-react-native"

<Header
  title="Profile"
  leadingIcon={ArrowLeft}
  onLeadingPress={router.back}
  trailingIcon={MoreHorizontal}
  onTrailingPress={openMenu}
/>`,
        props: [
            {
                name: "title",
                type: "string",
                required: true,
                description: "Screen title rendered in the center."
            },
            {
                name: "leadingIcon",
                type: "IconProp",
                description: "Icon for the leading action (typically back arrow or hamburger)."
            },
            {
                name: "onLeadingPress",
                type: "() => void",
                description: "Callback for the leading icon button."
            },
            {
                name: "trailingIcon",
                type: "IconProp",
                description: "Icon for the trailing action."
            },
            {
                name: "onTrailingPress",
                type: "() => void",
                description: "Callback for the trailing icon button."
            },
            {
                name: "transparent",
                type: "boolean",
                default: "false",
                description: "Removes the background and border — for screens with a hero image."
            }
        ],
        rnNotes: [
            "Header does not manage safe-area insets — wrap in SafeArea or use with expo-router's built-in header.",
            "For complex multi-action headers, use the trailingElement prop to pass arbitrary ReactNode.",
            "On Android, the hardware back button is separate — wire navigation.goBack() in the screen."
        ]
    },
    {
        slug: "tab-bar",
        name: "TabBar",
        category: "Navigation",
        description: "Bottom tab bar with icon + label tabs, active state, and optional FAB cutout variant.",
        importPath: `import { TabBar, TabBarItem } from "@mvp-ui-rn/ui"`,
        usageCode: `import { TabBar, TabBarItem } from "@mvp-ui-rn/ui"
import { Home, Search, Bell, User } from "lucide-react-native"

<TabBar>
  <TabBarItem icon={Home} label="Home" active onPress={() => router.push("/")} />
  <TabBarItem icon={Search} label="Search" onPress={() => router.push("/search")} />
  <TabBarItem icon={Bell} label="Alerts" onPress={() => router.push("/alerts")} />
  <TabBarItem icon={User} label="Profile" onPress={() => router.push("/profile")} />
</TabBar>`,
        props: [
            {
                name: "children",
                type: "ReactNode",
                required: true,
                description: "TabBarItem children."
            },
            {
                name: "fabCutout",
                type: "boolean",
                default: "false",
                description: "Renders a circular cutout in the center for a FAB."
            },
            {
                name: "className",
                type: "string",
                description: "Additional NativeWind classes applied to the bar container."
            }
        ],
        rnNotes: [
            "TabBar handles safe-area bottom insets automatically via useSafeAreaInsets.",
            "Use TabBar as a custom tabBar renderer inside expo-router's Tabs component.",
            "The fabCutout variant is paired with a FAB positioned above the bar using absolute layout."
        ]
    },
    {
        slug: "tabs",
        name: "Tabs",
        category: "Navigation",
        description: "Horizontal tab switcher for in-page content sections, built on @rn-primitives/tabs.",
        importPath: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@mvp-ui-rn/ui"`,
        usageCode: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@mvp-ui-rn/ui"

<Tabs value={tab} onValueChange={setTab}>
  <TabsList>
    <TabsTrigger value="posts">Posts</TabsTrigger>
    <TabsTrigger value="replies">Replies</TabsTrigger>
    <TabsTrigger value="media">Media</TabsTrigger>
  </TabsList>
  <TabsContent value="posts">
    <PostList />
  </TabsContent>
  <TabsContent value="replies">
    <ReplyList />
  </TabsContent>
</Tabs>`,
        props: [
            {
                name: "value",
                type: "string",
                required: true,
                description: "Currently active tab value."
            },
            {
                name: "onValueChange",
                type: "(value: string) => void",
                required: true,
                description: "Fires when the active tab changes."
            },
            {
                name: "children",
                type: "ReactNode",
                required: true,
                description: "TabsList and TabsContent children."
            }
        ],
        rnNotes: [
            "Tabs is for in-page sections — use TabBar for bottom navigation.",
            "TabsContent panels are conditionally rendered, not hidden — no stale renders.",
            "For scrollable tab lists, wrap TabsList in a ScrollView with horizontal."
        ]
    },
    {
        slug: "segmented-control",
        name: "SegmentedControl",
        category: "Navigation",
        description: "Compact multi-option selector styled as a segmented pill — ideal for filter or view-mode toggles.",
        importPath: `import { SegmentedControl } from "@mvp-ui-rn/ui"`,
        usageCode: `import { SegmentedControl } from "@mvp-ui-rn/ui"

<SegmentedControl
  value={view}
  onValueChange={setView}
  options={[
    { value: "list", label: "List" },
    { value: "grid", label: "Grid" },
    { value: "map", label: "Map" },
  ]}
/>`,
        props: [
            {
                name: "value",
                type: "string",
                required: true,
                description: "Currently selected segment value."
            },
            {
                name: "onValueChange",
                type: "(value: string) => void",
                required: true,
                description: "Fires when a segment is selected."
            },
            {
                name: "options",
                type: "{ value: string; label: string; icon?: IconProp }[]",
                required: true,
                description: "Segment options — each requires a value and a label."
            },
            {
                name: "size",
                type: `"sm" | "md"`,
                default: `"md"`,
                description: "Height of the control."
            },
            {
                name: "isDisabled",
                type: "boolean",
                default: "false",
                description: "Disables all segments."
            }
        ],
        rnNotes: [
            "Limit to 4 segments max — more than 4 degrades touch accuracy on small screens.",
            "The active segment slides with a spring animation using Reanimated layout transitions.",
            "Each segment meets the 44pt minimum touch target in md size."
        ]
    },
    {
        slug: "search-bar",
        name: "SearchBar",
        category: "Navigation",
        description: "Search input with leading magnifier icon, clear button, and optional cancel action.",
        importPath: `import { SearchBar } from "@mvp-ui-rn/ui"`,
        usageCode: `import { SearchBar } from "@mvp-ui-rn/ui"

<SearchBar
  value={query}
  onChangeText={setQuery}
  placeholder="Search contacts…"
  onCancel={() => {
    setQuery("")
    Keyboard.dismiss()
  }}
/>`,
        props: [
            {
                name: "value",
                type: "string",
                required: true,
                description: "Controlled search query."
            },
            {
                name: "onChangeText",
                type: "(text: string) => void",
                required: true,
                description: "Callback fired as the query changes."
            },
            {
                name: "placeholder",
                type: "string",
                default: `"Search"`,
                description: "Placeholder text."
            },
            {
                name: "onCancel",
                type: "() => void",
                description: "Shows a Cancel button on focus — fires on press."
            },
            {
                name: "autoFocus",
                type: "boolean",
                default: "false",
                description: "Focuses the input on mount."
            }
        ],
        rnNotes: [
            "The clear (×) button appears automatically when value is non-empty.",
            "SearchBar does not debounce internally — apply debouncing in the parent with useDebounce.",
            "Pair with a FlatList and use onChangeText to filter local data or trigger a remote search."
        ]
    },
    // ─── Content ───────────────────────────────────────────────────────────────
    {
        slug: "card",
        name: "Card",
        category: "Content",
        description: "Surface composition with border and rounded corners — compound sub-components for header, content, and footer.",
        importPath: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@mvp-ui-rn/ui"`,
        usageCode: `import { Card, CardHeader, CardTitle, CardContent } from "@mvp-ui-rn/ui"

<Card>
  <CardHeader>
    <CardTitle>Account summary</CardTitle>
  </CardHeader>
  <CardContent>
    <Text className="text-fg-secondary">Balance: $1,234.56</Text>
  </CardContent>
</Card>`,
        props: [
            {
                name: "className",
                type: "string",
                description: "Additional NativeWind classes on the root View."
            },
            {
                name: "children",
                type: "ReactNode",
                required: true,
                description: "Card sub-components and content."
            }
        ],
        rnNotes: [
            "Card is not pressable by default — wrap in Pressable when the card should navigate.",
            "Web shadow-xs is dropped; mobile surfaces use border-only chrome.",
            "CardDescription font size is bumped one step vs. web for mobile readability."
        ]
    },
    {
        slug: "avatar",
        name: "Avatar",
        category: "Content",
        description: "User avatar with image, initials fallback, and online indicator.",
        importPath: `import { Avatar } from "@mvp-ui-rn/ui"`,
        usageCode: `import { Avatar } from "@mvp-ui-rn/ui"

<Avatar
  src="https://i.pravatar.cc/150?img=3"
  alt="Jane Doe"
  size="lg"
  showOnline
/>`,
        props: [
            {
                name: "alt",
                type: "string",
                required: true,
                description: "Accessibility label describing the user."
            },
            {
                name: "src",
                type: "string",
                description: "Remote image URL."
            },
            {
                name: "size",
                type: `"xs" | "sm" | "md" | "lg" | "xl" | "2xl"`,
                default: `"md"`,
                description: "Avatar diameter."
            },
            {
                name: "initials",
                type: "string",
                description: "Shown when src is missing — auto-truncated to 2 characters."
            },
            {
                name: "showOnline",
                type: "boolean",
                default: "false",
                description: "Shows a green online indicator dot."
            },
            {
                name: "status",
                type: `"online" | "offline" | "away" | "busy"`,
                description: "Status dot with semantic color — overrides showOnline."
            }
        ],
        rnNotes: [
            "src uses expo-image under the hood — blurhash and transition supported.",
            "initials auto-truncates to 2 chars.",
            "Online indicator position is fixed — do not attempt to reposition via className."
        ]
    },
    {
        slug: "badge",
        name: "Badge",
        category: "Content",
        description: "Small status label with 12 color variants and optional leading icon, in pill or rounded shape.",
        importPath: `import { Badge } from "@mvp-ui-rn/ui"`,
        usageCode: `import { Badge } from "@mvp-ui-rn/ui"
import { CheckCircle } from "lucide-react-native"

<Badge color="success" shape="pill" iconLeading={CheckCircle}>
  Verified
</Badge>`,
        props: [
            {
                name: "children",
                type: "ReactNode",
                required: true,
                description: "Badge label text."
            },
            {
                name: "color",
                type: `"gray" | "brand" | "error" | "warning" | "success" | "slate" | "sky" | "blue" | "indigo" | "purple" | "pink" | "orange"`,
                default: `"gray"`,
                description: "Color variant."
            },
            {
                name: "shape",
                type: `"pill" | "rounded"`,
                default: `"pill"`,
                description: "Border radius style."
            },
            {
                name: "size",
                type: `"sm" | "md" | "lg"`,
                default: `"md"`,
                description: "Font and padding scale."
            },
            {
                name: "iconLeading",
                type: "IconProp",
                description: "Icon rendered to the left of the label."
            }
        ],
        rnNotes: [
            "Lucide icon color is set via a JS hex map (useColorScheme) because lucide-react-native ignores className.",
            "Web 'modern' type (bg-bg + shadow) is dropped — mobile surfaces avoid badge shadows.",
            "Badge is self-sizing (self-start) — it does not stretch to fill its container."
        ]
    },
    {
        slug: "list",
        name: "List",
        category: "Content",
        description: "Structured list with dividers, section headers, and customizable row layout.",
        importPath: `import { List, ListItem, ListSection } from "@mvp-ui-rn/ui"`,
        usageCode: `import { List, ListItem, ListSection } from "@mvp-ui-rn/ui"
import { Mail, Phone } from "lucide-react-native"

<List>
  <ListSection title="Contact">
    <ListItem
      title="Email"
      subtitle="jane@example.com"
      leadingIcon={Mail}
      onPress={() => Linking.openURL("mailto:jane@example.com")}
    />
    <ListItem
      title="Phone"
      subtitle="+1 555 000 1234"
      leadingIcon={Phone}
    />
  </ListSection>
</List>`,
        props: [
            {
                name: "children",
                type: "ReactNode",
                required: true,
                description: "ListSection and ListItem children."
            },
            {
                name: "showDividers",
                type: "boolean",
                default: "true",
                description: "Renders a 1pt border between rows."
            }
        ],
        rnNotes: [
            "For long dynamic lists, replace List with FlatList and render ListItem as renderItem.",
            "ListItem press target is full-row height (min 56pt).",
            "Leading icon tint uses the same JS hex map pattern as Badge."
        ]
    },
    {
        slug: "image",
        name: "Image",
        category: "Content",
        description: "Expo-image wrapper with blurhash placeholder, content-fit modes, and optional border radius.",
        importPath: `import { Image } from "@mvp-ui-rn/ui"`,
        usageCode: `import { Image } from "@mvp-ui-rn/ui"

<Image
  src="https://example.com/hero.jpg"
  alt="Mountain landscape"
  width={343}
  height={200}
  contentFit="cover"
  borderRadius={12}
  blurhash="L6PZfSi_.AyE_3t7t7R**0o#DgR4"
/>`,
        props: [
            {
                name: "src",
                type: "string",
                required: true,
                description: "Remote URL or local asset."
            },
            {
                name: "alt",
                type: "string",
                required: true,
                description: "Accessibility description."
            },
            {
                name: "width",
                type: "number | string",
                description: "Explicit width in points."
            },
            {
                name: "height",
                type: "number | string",
                description: "Explicit height in points."
            },
            {
                name: "contentFit",
                type: `"cover" | "contain" | "fill" | "none" | "scale-down"`,
                default: `"cover"`,
                description: "How the image fills its bounds."
            },
            {
                name: "blurhash",
                type: "string",
                description: "BlurHash string shown while the image loads."
            },
            {
                name: "borderRadius",
                type: "number",
                description: "Corner radius in points."
            }
        ],
        rnNotes: [
            "Prefer explicit width and height — avoid layout shifts on load.",
            "expo-image caches aggressively — use cachePolicy='none' for frequently-changing URLs.",
            "Do not use the standard RN Image — expo-image is the canonical choice in this codebase."
        ]
    },
    {
        slug: "skeleton",
        name: "Skeleton",
        category: "Content",
        description: "Pulsing placeholder shape for loading states — matches the geometry of the content it replaces.",
        importPath: `import { Skeleton } from "@mvp-ui-rn/ui"`,
        usageCode: `import { Skeleton } from "@mvp-ui-rn/ui"

{isLoading ? (
  <View className="gap-3 p-4">
    <Skeleton width="60%" height={20} />
    <Skeleton width="100%" height={16} />
    <Skeleton width="80%" height={16} />
  </View>
) : (
  <ArticleBody />
)}`,
        props: [
            {
                name: "width",
                type: "number | string",
                required: true,
                description: "Width of the skeleton shape."
            },
            {
                name: "height",
                type: "number",
                required: true,
                description: "Height of the skeleton shape."
            },
            {
                name: "borderRadius",
                type: "number",
                default: "8",
                description: "Corner radius — use a large value for circle/avatar skeletons."
            },
            {
                name: "className",
                type: "string",
                description: "Additional NativeWind classes."
            }
        ],
        rnNotes: [
            "Animate with Reanimated's FadeIn/FadeOut cycling rather than opacity interpolation for performance.",
            "Match skeleton dimensions to the actual content as closely as possible to avoid layout shifts.",
            "For circular skeletons (avatars), pass borderRadius equal to half the width/height."
        ]
    },
    {
        slug: "progress-bar",
        name: "ProgressBar",
        category: "Content",
        description: "Horizontal linear progress indicator with determinate and indeterminate modes.",
        importPath: `import { ProgressBar } from "@mvp-ui-rn/ui"`,
        usageCode: `import { ProgressBar } from "@mvp-ui-rn/ui"

<ProgressBar value={uploadProgress} max={100} label="Uploading…" />`,
        props: [
            {
                name: "value",
                type: "number",
                required: true,
                description: "Current progress value."
            },
            {
                name: "max",
                type: "number",
                default: "100",
                description: "Maximum value (100% fill)."
            },
            {
                name: "variant",
                type: `"primary" | "success" | "error"`,
                default: `"primary"`,
                description: "Fill color variant."
            },
            {
                name: "size",
                type: `"sm" | "md" | "lg"`,
                default: `"md"`,
                description: "Track height."
            },
            {
                name: "label",
                type: "string",
                description: "Accessible label describing what is progressing."
            },
            {
                name: "showPercentage",
                type: "boolean",
                default: "false",
                description: "Renders the percentage value as text above the bar."
            }
        ],
        rnNotes: [
            "Fill width animates with Reanimated layout animation — no JS loop required.",
            "Set accessibilityRole='progressbar' and accessibilityValue for screen reader support.",
            "For indeterminate state, pass value={0} and add a looping shimmer via Skeleton."
        ]
    },
    {
        slug: "circular-progress",
        name: "CircularProgress",
        category: "Content",
        description: "SVG-based circular progress ring with determinate value and optional center label.",
        importPath: `import { CircularProgress } from "@mvp-ui-rn/ui"`,
        usageCode: `import { CircularProgress } from "@mvp-ui-rn/ui"

<CircularProgress
  value={72}
  size={80}
  strokeWidth={8}
  variant="primary"
  centerLabel="72%"
/>`,
        props: [
            {
                name: "value",
                type: "number",
                required: true,
                description: "Progress value (0–max)."
            },
            {
                name: "max",
                type: "number",
                default: "100",
                description: "Maximum value."
            },
            {
                name: "size",
                type: "number",
                default: "64",
                description: "Diameter of the ring in points."
            },
            {
                name: "strokeWidth",
                type: "number",
                default: "6",
                description: "Thickness of the progress arc."
            },
            {
                name: "variant",
                type: `"primary" | "success" | "error"`,
                default: `"primary"`,
                description: "Arc color variant."
            },
            {
                name: "centerLabel",
                type: "string",
                description: "Text rendered at the center of the ring."
            }
        ],
        rnNotes: [
            "Built with react-native-svg — ensure the dependency is installed.",
            "For animated progress, wrap value changes with a spring transition in Reanimated.",
            "Keep strokeWidth below 20% of the diameter to avoid visual clipping."
        ]
    },
    {
        slug: "empty-state",
        name: "EmptyState",
        category: "Content",
        description: "Placeholder UI for empty lists or zero-result states with an icon, heading, description, and CTA.",
        importPath: `import { EmptyState } from "@mvp-ui-rn/ui"`,
        usageCode: `import { EmptyState } from "@mvp-ui-rn/ui"
import { Inbox } from "lucide-react-native"

<EmptyState
  icon={Inbox}
  title="No messages yet"
  description="When you receive a message it will appear here."
  actionLabel="Send a message"
  onAction={() => router.push("/compose")}
/>`,
        props: [
            {
                name: "icon",
                type: "IconProp",
                description: "Illustrative icon centered above the heading."
            },
            {
                name: "title",
                type: "string",
                required: true,
                description: "Primary empty state heading."
            },
            {
                name: "description",
                type: "string",
                description: "Supporting explanation text."
            },
            {
                name: "actionLabel",
                type: "string",
                description: "Label for the primary CTA button."
            },
            {
                name: "onAction",
                type: "() => void",
                description: "Callback for the primary CTA."
            }
        ],
        rnNotes: [
            "Center EmptyState in the available space using flex:1 + justifyContent:'center' on the parent.",
            "For search zero-results, show a different message than for truly empty data — they have different resolutions."
        ]
    },
    // ─── Interaction ───────────────────────────────────────────────────────────
    {
        slug: "swipeable-row",
        name: "SwipeableRow",
        category: "Interaction",
        description: "Swipe-to-reveal action row with leading and/or trailing action panels.",
        importPath: `import { SwipeableRow, SwipeableAction } from "@mvp-ui-rn/ui"`,
        usageCode: `import { SwipeableRow, SwipeableAction } from "@mvp-ui-rn/ui"
import { Trash2, Archive } from "lucide-react-native"

<SwipeableRow
  trailingActions={[
    <SwipeableAction key="delete" icon={Trash2} color="error" onPress={handleDelete} />,
  ]}
  leadingActions={[
    <SwipeableAction key="archive" icon={Archive} color="success" onPress={handleArchive} />,
  ]}
>
  <ListItem title="Invoice #1042" subtitle="Due Jan 15" />
</SwipeableRow>`,
        props: [
            {
                name: "children",
                type: "ReactNode",
                required: true,
                description: "Row content visible in the default (not-swiped) state."
            },
            {
                name: "trailingActions",
                type: "ReactNode[]",
                description: "Action panels revealed by swiping left (right-to-left)."
            },
            {
                name: "leadingActions",
                type: "ReactNode[]",
                description: "Action panels revealed by swiping right (left-to-right)."
            },
            {
                name: "friction",
                type: "number",
                default: "2",
                description: "Swipe friction — higher values require more force."
            }
        ],
        rnNotes: [
            "Built on react-native-gesture-handler Swipeable — GestureHandlerRootView is required in the app root.",
            "Children must have a solid background-color (bg-bg) or action panels bleed through.",
            "Snap-to-delete (full-swipe auto-confirm) is opt-in via the fullSwipeThreshold prop."
        ]
    },
    {
        slug: "pull-to-refresh",
        name: "PullToRefresh",
        category: "Interaction",
        description: "Wraps a scroll container with a native pull-to-refresh indicator wired to an async callback.",
        importPath: `import { PullToRefresh } from "@mvp-ui-rn/ui"`,
        usageCode: `import { PullToRefresh } from "@mvp-ui-rn/ui"

<PullToRefresh
  onRefresh={async () => {
    await refetchData()
  }}
>
  <FlatList data={items} renderItem={renderItem} />
</PullToRefresh>`,
        props: [
            {
                name: "onRefresh",
                type: "() => Promise<void>",
                required: true,
                description: "Async callback fired on pull — spinner hides when the promise resolves."
            },
            {
                name: "children",
                type: "ReactNode",
                required: true,
                description: "Scrollable content to wrap."
            },
            {
                name: "tintColor",
                type: "string",
                description: "Color of the native refresh spinner."
            }
        ],
        rnNotes: [
            "PullToRefresh uses the native RefreshControl under the hood — behavior and appearance differ between iOS and Android.",
            "The child must be a scroll container (ScrollView, FlatList, SectionList) — PullToRefresh passes RefreshControl as a prop.",
            "Errors thrown inside onRefresh are swallowed — handle them inside the callback before resolving."
        ]
    },
    {
        slug: "keyboard-avoiding-scroll",
        name: "KeyboardAvoidingScroll",
        category: "Interaction",
        description: "Scroll container that automatically adjusts its bottom inset when the keyboard appears.",
        importPath: `import { KeyboardAvoidingScroll } from "@mvp-ui-rn/ui"`,
        usageCode: `import { KeyboardAvoidingScroll } from "@mvp-ui-rn/ui"

<KeyboardAvoidingScroll contentContainerClassName="gap-5 p-6">
  <Input label="Email" value={email} onChangeText={setEmail} />
  <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry />
  <Button onPress={handleSubmit}>Sign in</Button>
</KeyboardAvoidingScroll>`,
        props: [
            {
                name: "children",
                type: "ReactNode",
                required: true,
                description: "Form content to scroll."
            },
            {
                name: "contentContainerClassName",
                type: "string",
                description: "NativeWind classes applied to the inner content container."
            },
            {
                name: "extraScrollHeight",
                type: "number",
                default: "24",
                description: "Extra pixels of padding added above the keyboard."
            }
        ],
        rnNotes: [
            "Uses KeyboardAwareScrollView from react-native-keyboard-aware-scroll-view internally.",
            "On iOS, behavior is 'padding'; on Android, behavior is 'height' by default.",
            "Place the submit button at the bottom of the scroll content so it scrolls into view before the keyboard."
        ]
    },
    {
        slug: "haptic-feedback",
        name: "HapticFeedback",
        category: "Interaction",
        description: "Utility component and hook for triggering haptic engine feedback via expo-haptics.",
        importPath: `import { HapticFeedback } from "@mvp-ui-rn/ui"`,
        usageCode: `import { HapticFeedback } from "@mvp-ui-rn/ui"

// Wrap any Pressable to add haptic feedback on press
<HapticFeedback style="impactLight">
  <Button onPress={handleSave}>Save</Button>
</HapticFeedback>

// Or call imperatively
import { triggerHaptic } from "@mvp-ui-rn/ui"
triggerHaptic("notificationSuccess")`,
        props: [
            {
                name: "style",
                type: `"impactLight" | "impactMedium" | "impactHeavy" | "notificationSuccess" | "notificationError" | "notificationWarning" | "selection"`,
                default: `"impactMedium"`,
                description: "Haptic pattern to play on press."
            },
            {
                name: "children",
                type: "ReactNode",
                required: true,
                description: "Pressable content that triggers the haptic on press."
            }
        ],
        rnNotes: [
            "Requires expo-haptics — no-op on Android devices without a haptic engine.",
            "Use impactLight for selections, impactMedium for primary actions, notificationSuccess/Error for outcomes.",
            "Do not fire haptics more than once per user gesture — double-haptic feels like a bug."
        ]
    },
    // ─── Utility ───────────────────────────────────────────────────────────────
    {
        slug: "safe-area",
        name: "SafeArea",
        category: "Utility",
        description: "Convenience wrapper that applies safe-area insets as padding on all edges using react-native-safe-area-context.",
        importPath: `import { SafeArea } from "@mvp-ui-rn/ui"`,
        usageCode: `import { SafeArea } from "@mvp-ui-rn/ui"

export default function Screen() {
  return (
    <SafeArea edges={["top", "bottom"]} className="flex-1 bg-bg">
      <Content />
    </SafeArea>
  )
}`,
        props: [
            {
                name: "edges",
                type: `("top" | "bottom" | "left" | "right")[]`,
                default: `["top", "bottom", "left", "right"]`,
                description: "Which edges to apply inset padding to."
            },
            {
                name: "children",
                type: "ReactNode",
                required: true,
                description: "Screen content."
            },
            {
                name: "className",
                type: "string",
                description: "Additional NativeWind classes on the root View."
            }
        ],
        rnNotes: [
            "Requires SafeAreaProvider wrapping the app root — already set up in the showcase _layout.tsx.",
            "On screens with a Header that handles the top inset, pass edges={['bottom']} to avoid double-padding.",
            "Do not apply additional paddingTop via className when edges includes 'top'."
        ]
    },
    {
        slug: "status-bar",
        name: "StatusBar",
        category: "Utility",
        description: "Configures the system status bar style (light, dark, auto) and background color for a screen.",
        importPath: `import { StatusBar } from "@mvp-ui-rn/ui"`,
        usageCode: `import { StatusBar } from "@mvp-ui-rn/ui"

export default function DarkHeroScreen() {
  return (
    <>
      <StatusBar style="light" />
      <View className="flex-1 bg-gray-950">
        <HeroContent />
      </View>
    </>
  )
}`,
        props: [
            {
                name: "style",
                type: `"auto" | "light" | "dark"`,
                default: `"auto"`,
                description: "Status bar text/icon color — use 'light' on dark backgrounds."
            },
            {
                name: "backgroundColor",
                type: "string",
                description: "Android only — background color of the status bar area."
            },
            {
                name: "hidden",
                type: "boolean",
                default: "false",
                description: "Hides the status bar entirely."
            }
        ],
        rnNotes: [
            "Built on expo-status-bar which is the canonical choice over the core RN StatusBar.",
            "On iOS, backgroundColor has no effect — the color is derived from the screen's background.",
            "In expo-router, each screen can declare its own StatusBar — the topmost screen wins."
        ]
    },
    {
        slug: "icon",
        name: "Icon",
        category: "Utility",
        description: "Thin wrapper around lucide-react-native icons that applies token-derived size and semantic color classes.",
        importPath: `import { Icon } from "@mvp-ui-rn/ui"`,
        usageCode: `import { Icon } from "@mvp-ui-rn/ui"
import { Bell } from "lucide-react-native"

<Icon icon={Bell} size={20} color="primary" />`,
        props: [
            {
                name: "icon",
                type: "LucideIcon",
                required: true,
                description: "Any lucide-react-native icon component."
            },
            {
                name: "size",
                type: "number",
                default: "20",
                description: "Icon width and height in points."
            },
            {
                name: "color",
                type: `"default" | "muted" | "primary" | "error" | "success" | "warning"`,
                default: `"default"`,
                description: "Semantic color alias applied to the icon stroke."
            }
        ],
        rnNotes: [
            "lucide-react-native requires explicit numeric px — it ignores className for color and size.",
            "Icon resolves the color alias to a hex value via useColorScheme for correct dark-mode behavior.",
            "For icons inside Button or Badge, pass the icon component as IconProp instead — those components handle sizing internally."
        ]
    },
    {
        slug: "spinner",
        name: "Spinner",
        category: "Utility",
        description: "Animated loading indicator using react-native-reanimated for smooth rotation.",
        importPath: `import { Spinner } from "@mvp-ui-rn/ui"`,
        usageCode: `import { Spinner } from "@mvp-ui-rn/ui"

// Inline loading indicator
<View className="flex-1 items-center justify-center">
  <Spinner size="lg" color="primary" />
</View>`,
        props: [
            {
                name: "size",
                type: `"sm" | "md" | "lg"`,
                default: `"md"`,
                description: "Diameter of the spinner (16 / 24 / 32pt)."
            },
            {
                name: "color",
                type: `"default" | "primary" | "white"`,
                default: `"primary"`,
                description: "Spinner stroke color — use 'white' on colored backgrounds."
            }
        ],
        rnNotes: [
            "Spinner uses Reanimated withRepeat — it continues animating even during heavy JS work.",
            "Button uses Spinner internally when isLoading — do not add a Spinner alongside a loading Button.",
            "For full-screen loading states, consider combining Spinner with a translucent overlay View."
        ]
    }
];
}),
"[project]/apps/docs-rn/src/components/docs/ComponentPreview.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ComponentPreview",
    ()=>ComponentPreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.18_babel-plugin-react-compiler@1.0.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ComponentPreview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ComponentPreview() from the server but ComponentPreview is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/docs-rn/src/components/docs/ComponentPreview.tsx <module evaluation>", "ComponentPreview");
}),
"[project]/apps/docs-rn/src/components/docs/ComponentPreview.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ComponentPreview",
    ()=>ComponentPreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.18_babel-plugin-react-compiler@1.0.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ComponentPreview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ComponentPreview() from the server but ComponentPreview is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/docs-rn/src/components/docs/ComponentPreview.tsx", "ComponentPreview");
}),
"[project]/apps/docs-rn/src/components/docs/ComponentPreview.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$docs$2d$rn$2f$src$2f$components$2f$docs$2f$ComponentPreview$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/docs-rn/src/components/docs/ComponentPreview.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$docs$2d$rn$2f$src$2f$components$2f$docs$2f$ComponentPreview$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/apps/docs-rn/src/components/docs/ComponentPreview.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$docs$2d$rn$2f$src$2f$components$2f$docs$2f$ComponentPreview$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/apps/docs-rn/src/components/docs/CodeBlock.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "CodeBlock",
    ()=>CodeBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.18_babel-plugin-react-compiler@1.0.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const CodeBlock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call CodeBlock() from the server but CodeBlock is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/docs-rn/src/components/docs/CodeBlock.tsx <module evaluation>", "CodeBlock");
}),
"[project]/apps/docs-rn/src/components/docs/CodeBlock.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "CodeBlock",
    ()=>CodeBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.18_babel-plugin-react-compiler@1.0.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const CodeBlock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call CodeBlock() from the server but CodeBlock is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/apps/docs-rn/src/components/docs/CodeBlock.tsx", "CodeBlock");
}),
"[project]/apps/docs-rn/src/components/docs/CodeBlock.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$docs$2d$rn$2f$src$2f$components$2f$docs$2f$CodeBlock$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/apps/docs-rn/src/components/docs/CodeBlock.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$docs$2d$rn$2f$src$2f$components$2f$docs$2f$CodeBlock$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/apps/docs-rn/src/components/docs/CodeBlock.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$docs$2d$rn$2f$src$2f$components$2f$docs$2f$CodeBlock$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/apps/docs-rn/src/lib/utils.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$6$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/tailwind-merge@3.6.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-rsc] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$6$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/apps/docs-rn/src/components/docs/PropsTable.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PropsTable",
    ()=>PropsTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.18_babel-plugin-react-compiler@1.0.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$docs$2d$rn$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/docs-rn/src/lib/utils.ts [app-rsc] (ecmascript)");
;
;
function PropsTable({ props, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$docs$2d$rn$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])("w-full overflow-x-auto rounded-xl border border-border", className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "w-full text-sm",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        className: "border-b border-border bg-bg-secondary",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-fg-tertiary",
                                children: "Prop"
                            }, void 0, false, {
                                fileName: "[project]/apps/docs-rn/src/components/docs/PropsTable.tsx",
                                lineNumber: 22,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-fg-tertiary",
                                children: "Type"
                            }, void 0, false, {
                                fileName: "[project]/apps/docs-rn/src/components/docs/PropsTable.tsx",
                                lineNumber: 25,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-fg-tertiary",
                                children: "Default"
                            }, void 0, false, {
                                fileName: "[project]/apps/docs-rn/src/components/docs/PropsTable.tsx",
                                lineNumber: 28,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-fg-tertiary hidden md:table-cell",
                                children: "Description"
                            }, void 0, false, {
                                fileName: "[project]/apps/docs-rn/src/components/docs/PropsTable.tsx",
                                lineNumber: 31,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/docs-rn/src/components/docs/PropsTable.tsx",
                        lineNumber: 21,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/docs-rn/src/components/docs/PropsTable.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    className: "divide-y divide-border bg-bg",
                    children: props.map((prop)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "hover:bg-bg-secondary transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3 align-top",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                className: "rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand",
                                                children: prop.name
                                            }, void 0, false, {
                                                fileName: "[project]/apps/docs-rn/src/components/docs/PropsTable.tsx",
                                                lineNumber: 41,
                                                columnNumber: 19
                                            }, this),
                                            prop.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-medium text-error-600 bg-error-50 rounded-full px-1.5 py-0.5",
                                                children: "required"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/docs-rn/src/components/docs/PropsTable.tsx",
                                                lineNumber: 45,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/docs-rn/src/components/docs/PropsTable.tsx",
                                        lineNumber: 40,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/docs-rn/src/components/docs/PropsTable.tsx",
                                    lineNumber: 39,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3 align-top",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "text-xs text-fg-secondary font-mono",
                                        children: prop.type
                                    }, void 0, false, {
                                        fileName: "[project]/apps/docs-rn/src/components/docs/PropsTable.tsx",
                                        lineNumber: 52,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/docs-rn/src/components/docs/PropsTable.tsx",
                                    lineNumber: 51,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3 align-top",
                                    children: prop.default !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "text-xs text-fg-tertiary font-mono",
                                        children: prop.default
                                    }, void 0, false, {
                                        fileName: "[project]/apps/docs-rn/src/components/docs/PropsTable.tsx",
                                        lineNumber: 56,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-fg-quaternary",
                                        children: "—"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/docs-rn/src/components/docs/PropsTable.tsx",
                                        lineNumber: 58,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/docs-rn/src/components/docs/PropsTable.tsx",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "px-4 py-3 align-top hidden md:table-cell",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-fg-secondary leading-relaxed",
                                        children: prop.description
                                    }, void 0, false, {
                                        fileName: "[project]/apps/docs-rn/src/components/docs/PropsTable.tsx",
                                        lineNumber: 62,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/docs-rn/src/components/docs/PropsTable.tsx",
                                    lineNumber: 61,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, prop.name, true, {
                            fileName: "[project]/apps/docs-rn/src/components/docs/PropsTable.tsx",
                            lineNumber: 38,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/docs-rn/src/components/docs/PropsTable.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/docs-rn/src/components/docs/PropsTable.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/docs-rn/src/components/docs/PropsTable.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/docs-rn/src/components/docs/RNNotes.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RNNotes",
    ()=>RNNotes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.18_babel-plugin-react-compiler@1.0.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$1$2e$16$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/lucide-react@1.16.0_react@19.2.3/node_modules/lucide-react/dist/esm/icons/smartphone.mjs [app-rsc] (ecmascript) <export default as Smartphone>");
;
;
function RNNotes({ notes }) {
    if (!notes.length) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-brand-200 bg-brand-50 px-4 py-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$1$2e$16$2e$0_react$40$19$2e$2$2e$3$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__["Smartphone"], {
                        className: "size-4 text-brand-600 shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/apps/docs-rn/src/components/docs/RNNotes.tsx",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-semibold text-brand-700",
                        children: "React Native Notes"
                    }, void 0, false, {
                        fileName: "[project]/apps/docs-rn/src/components/docs/RNNotes.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/docs-rn/src/components/docs/RNNotes.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "space-y-1.5 pl-1",
                children: notes.map((note, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "flex gap-2 text-xs text-brand-700 leading-relaxed",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400"
                            }, void 0, false, {
                                fileName: "[project]/apps/docs-rn/src/components/docs/RNNotes.tsx",
                                lineNumber: 19,
                                columnNumber: 13
                            }, this),
                            note
                        ]
                    }, i, true, {
                        fileName: "[project]/apps/docs-rn/src/components/docs/RNNotes.tsx",
                        lineNumber: 18,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/docs-rn/src/components/docs/RNNotes.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/docs-rn/src/components/docs/RNNotes.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ComponentPage,
    "generateMetadata",
    ()=>generateMetadata,
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.18_babel-plugin-react-compiler@1.0.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.18_babel-plugin-react-compiler@1.0.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.18_babel-plugin-react-compiler@1.0.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$docs$2d$rn$2f$src$2f$lib$2f$components$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/docs-rn/src/lib/components-data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$docs$2d$rn$2f$src$2f$components$2f$docs$2f$ComponentPreview$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/docs-rn/src/components/docs/ComponentPreview.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$docs$2d$rn$2f$src$2f$components$2f$docs$2f$CodeBlock$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/docs-rn/src/components/docs/CodeBlock.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$docs$2d$rn$2f$src$2f$components$2f$docs$2f$PropsTable$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/docs-rn/src/components/docs/PropsTable.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$docs$2d$rn$2f$src$2f$components$2f$docs$2f$RNNotes$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/docs-rn/src/components/docs/RNNotes.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
function generateStaticParams() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$docs$2d$rn$2f$src$2f$lib$2f$components$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["components"].map((c)=>({
            slug: c.slug
        }));
}
async function generateMetadata({ params }) {
    const { slug } = await params;
    const component = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$docs$2d$rn$2f$src$2f$lib$2f$components$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["components"].find((c)=>c.slug === slug);
    if (!component) return {};
    return {
        title: component.name
    };
}
async function ComponentPage({ params }) {
    const { slug } = await params;
    const component = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$docs$2d$rn$2f$src$2f$lib$2f$components$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["components"].find((c)=>c.slug === slug);
    if (!component) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    const lightSrc = `/screenshots/${slug}-light.png`;
    const darkSrc = `/screenshots/${slug}-dark.png`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "mx-auto max-w-4xl px-6 py-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "mb-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 mb-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "rounded-full bg-bg-secondary border border-border px-2.5 py-1 text-xs font-medium text-fg-tertiary",
                            children: component.category
                        }, void 0, false, {
                            fileName: "[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold tracking-tight text-fg mb-3",
                        children: component.name
                    }, void 0, false, {
                        fileName: "[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg text-fg-secondary leading-relaxed",
                        children: component.description
                    }, void 0, false, {
                        fileName: "[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-12 grid gap-6 lg:grid-cols-2 lg:items-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$docs$2d$rn$2f$src$2f$components$2f$docs$2f$ComponentPreview$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ComponentPreview"], {
                        slug: slug,
                        lightSrc: lightSrc,
                        darkSrc: darkSrc,
                        label: component.name
                    }, void 0, false, {
                        fileName: "[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-sm font-semibold text-fg mb-2",
                                        children: "Import"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx",
                                        lineNumber: 56,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$docs$2d$rn$2f$src$2f$components$2f$docs$2f$CodeBlock$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CodeBlock"], {
                                        code: component.importPath,
                                        language: "tsx",
                                        showCopy: true
                                    }, void 0, false, {
                                        fileName: "[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx",
                                        lineNumber: 57,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-sm font-semibold text-fg mb-2",
                                        children: "Usage"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx",
                                        lineNumber: 64,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$docs$2d$rn$2f$src$2f$components$2f$docs$2f$CodeBlock$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CodeBlock"], {
                                        code: component.usageCode,
                                        language: "tsx",
                                        showCopy: true
                                    }, void 0, false, {
                                        fileName: "[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx",
                                        lineNumber: 65,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            component.props.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mb-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold text-fg mb-4",
                        children: "Props"
                    }, void 0, false, {
                        fileName: "[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$docs$2d$rn$2f$src$2f$components$2f$docs$2f$PropsTable$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PropsTable"], {
                        props: component.props
                    }, void 0, false, {
                        fileName: "[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx",
                lineNumber: 76,
                columnNumber: 9
            }, this),
            component.rnNotes.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mb-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$18_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$docs$2d$rn$2f$src$2f$components$2f$docs$2f$RNNotes$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RNNotes"], {
                    notes: component.rnNotes
                }, void 0, false, {
                    fileName: "[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx",
                    lineNumber: 85,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx",
                lineNumber: 84,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/docs-rn/src/app/(main)/components/[slug]/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__96775fa7._.js.map