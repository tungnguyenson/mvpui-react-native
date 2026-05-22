# @mvp-ui-rn — Component contracts (React Native)

Per-component reference: import path, variants, when to use, anti-patterns,
and RN-specific deltas vs. the web `packages/skill/components.md`.

Update on every component PR per `CLAUDE.md`.

---

## Button

**Import**

```ts
import { Button, type ButtonProps, type IconProp } from "@mvp-ui-rn/ui"
```

**Variants** — color set + IconProp contract mirror mvp-ui (web) exactly. **Size ramp is mobile-tuned** (see `docs/tokens-rn-adjustments.md` §3a) and intentionally diverges from the web ramp: every step is one Tailwind unit bigger so thumbs can hit comfortably.

| Prop | Values | Default |
|---|---|---|
| `color` | `primary` · `secondary` · `tertiary` · `primary-destructive` · `secondary-destructive` · `tertiary-destructive` · `link-color` · `link-gray` · `link-destructive` | `primary` |
| `size` | `sm` (h=40, px=16, text-sm) · `md` (h=48, px=20, text-md) · `lg` (h=56, px=24, text-lg) · `xl` (h=64, px=28, text-xl) | **`md`** |
| `iconLeading` / `iconTrailing` | `IconProp` (component accepting `className`, or pre-rendered element) | — |
| `isLoading` | `boolean` — shows `ActivityIndicator`, blocks interaction | `false` |
| `showTextWhileLoading` | `boolean` — keep label visible alongside spinner | `false` |
| `asChild` | `boolean` — merge props onto child via `@rn-primitives/slot` | `false` |
| `disabled` | `boolean` — also engages `accessibilityState.disabled` | `false` |

`iconOnly` is derived (no children + at least one icon). When derived, the
button collapses to a square sized for 44pt+ touch (44 / 44 / 48 / 56 across
sm / md / lg / xl).

**When to use**

- Any tap-to-act surface — primary actions, secondary actions, destructive
  flows, and inline links inside body copy.
- `iconOnly` form for compact toolbars (still 44pt minimum).

**When NOT to use**

- Pure navigation between routes: prefer `<Link>` from `expo-router` styled
  with `asChild` if you must, or a dedicated `Link` component (TBD).
- Bottom-sheet handles, swipe affordances, or other gestural touch targets —
  use a `Pressable` directly.

**Anti-patterns**

- ❌ Bare strings inside `<Button>`: works (auto-wrapped in `<Text>`), but
  RN will crash if a custom variant ever renders the child outside `<Text>`.
  Treat the API as if it requires text content only.
- ❌ Hardcoded color in custom `className` — bypasses dark-mode flip. Use a
  semantic alias (`bg-bg`, `text-fg`, etc.) or extend `buttonVariants`.
- ❌ Setting `style={{ height: ... }}` to shrink below 44pt outside of a
  dense container. Touch targets are baked into variant sizes for
  accessibility — `sm` at 40pt is **only** valid inside Toolbar / dense
  ListItem / SegmentedControl wrappers per
  `docs/tokens-rn-adjustments.md` §3a. Free-standing CTAs use `md` or above.
- ❌ Passing an SVG element (web pattern) as `iconLeading`. Use a
  `lucide-react-native` component or any RN-renderable element.

**RN deltas vs. web**

- `hover:` states are dropped — no hover on touch surfaces.
- `focus-visible:ring-*` are dropped — RN has no keyboard-focus model.
  Use `accessibilityState` / platform a11y focus instead.
- Default size flipped from web `sm` to RN `md`. Every size step bumped one
  Tailwind unit larger than web. See `docs/tokens-rn-adjustments.md` §3a.
- Lucide icon `color` + `size` are passed as raw props (not className),
  derived from the same per-variant tint map as the spinner. Lucide does
  not accept Tailwind classes. **Tint does NOT flip in dark mode** — fix
  via cssInterop is a follow-up.
- Spinner is `ActivityIndicator` with the same per-variant tint as icons.
- `iconOnly` enforces a square ≥ 44pt regardless of size (sm bumps 40 → 44).
- `asChild` uses `@rn-primitives/slot` — semantics close to Radix `Slot` but
  no `Slottable` equivalent; passing custom layouts as children may not get
  pressed-state styling merged.

---

## Label

**Import**

```ts
import { Label, type LabelProps } from "@mvp-ui-rn/ui"
```

**Variants** — minimal API. Pairs with form controls via `nativeID` (RN
has no `<label htmlFor>` equivalent).

| Prop | Values | Default |
|---|---|---|
| `isRequired` | `boolean` — renders `*` indicator | `false` |
| `isInvalid` | `boolean` — re-tints the `*` from `text-fg-brand` to `text-fg-error` (label text itself does NOT shift color, matching web behavior) | `false` |
| `nativeID` | `string` — paired by consumer to `accessibilityLabelledBy` on the input | — |
| `children` | `ReactNode` | required |

**Size:** 16px (`text-md font-medium`). One step larger than mvp-ui (web)'s `text-sm` — RN bumps for mobile arm's-length readability per `docs/tokens-rn-adjustments.md` §3a (same philosophy as Button's default size).

**When to use**

- Above every form field. Caller is responsible for the `nativeID` /
  `accessibilityLabelledBy` link (or use the composed `Input` which wires
  this automatically).

**When NOT to use**

- For inline help / status text below a field — use `HintText` instead.

**Anti-patterns**

- ❌ Custom `className` overriding `text-fg-secondary` to a raw scale
  (`text-gray-700` etc.) — breaks dark mode. Use a semantic alias.
- ❌ Skipping `nativeID` pairing on standalone use — screen readers won't
  announce the label when the input focuses.

**RN deltas vs. web**

- Web `<label htmlFor>` → RN `nativeID` + `accessibilityLabelledBy` on
  the input.
- Web `tooltip` / `tooltipDescription` props dropped — depends on a
  Tooltip primitive that hasn't been ported yet.
- Renders as `<Text>` inside a horizontal `<View>` (bare strings inside
  `<View>` crash RN; asterisk needs to sit inline with the label).

---

## HintText

**Import**

```ts
import { HintText, type HintTextProps } from "@mvp-ui-rn/ui"
```

**Variants**

| Prop | Values | Default |
|---|---|---|
| `size` | `sm` (`text-sm` / 14px) · `md` (`text-md` / 16px) | `md` |
| `isInvalid` | `boolean` — switches `text-fg-tertiary` → `text-fg-error` and announces to screen readers | `false` |

**When to use**

- Helper text below a field (`md`).
- Error message below a field (`md` + `isInvalid`).
- Compact metadata under list items / settings rows (`sm`).

**When NOT to use**

- As a label above a field — use `Label`.
- For toast / banner status — use the matching status component when ported.

**RN deltas vs. web**

- Web `role="alert"` → RN `accessibilityRole="alert"` +
  `accessibilityLiveRegion="polite"` (gated on `isInvalid`).
- Native `<p>` → RN `<Text>`.

---

## Input

**Import**

```ts
import { Input, InputBase, type InputProps, type InputBaseProps, type InputSizeKey } from "@mvp-ui-rn/ui"
```

`Input` composes `Label` + `InputBase` + `HintText`. `InputBase` is the
standalone field wrapper around a native `<TextInput>`.

**Variants**

| Prop | Values | Default |
|---|---|---|
| `size` | `sm` (h=44, dense, text-sm, icon 16) · `md` (h=48, default, text-md, icon 20) · `lg` (h=56, text-lg, icon 24) | `md` |
| `isInvalid` | `boolean` — red border, error `AlertCircle` trailing | `false` |
| `isSuccess` | `boolean` — green border. Ignored when `isInvalid`. | `false` |
| `iconLeading` / `iconTrailing` | `IconProp` | — |
| `prefix` / `suffix` | `ReactNode` — string/number auto-wraps in `<Text>` | — |
| `disabled` | `boolean` — 50% opacity + muted bg, blocks editing | `false` |
| `readOnly` | `boolean` — muted bg, blocks editing (no opacity) | `false` |
| `secureTextEntry` | `boolean` — password mode w/ eye toggle | `false` |
| `label` (`Input` only) | `string` — renders `Label` above | — |
| `hint` (`Input` only) | `ReactNode` — renders `HintText` below; auto-flips to error when `isInvalid` | — |
| `isRequired` (`Input` only) | `boolean` — required `*` in label, semantic hint | `false` |
| `hideRequiredIndicator` (`Input` only) | `boolean` — hide the `*` even when required | `false` |
| Native `TextInputProps` forwarded | `keyboardType`, `autoComplete`, `autoCapitalize`, `autoCorrect`, `returnKeyType`, `value`, `defaultValue`, `onChangeText`, … | — |

**When to use**

- Any single-line text entry: email, name, search, amounts, secrets.
- Reach for `Input` (composed) when you have a label + hint pair;
  use `InputBase` standalone for compact inline cases (search bars,
  table inline edits, input groups).

**When NOT to use**

- Multi-line text → `Textarea` (not yet ported).
- Dropdown / select → `Select` (not yet ported).
- Date / time → `DatePicker` (not yet ported).

**Anti-patterns**

- ❌ Hardcoded numeric `height` overriding the size token — breaks the
  44pt floor. Use `size` instead.
- ❌ Raw color in `className` (`border-gray-300`) — breaks dark mode.
  Use a semantic alias or extend `inputFieldVariants` upstream.
- ❌ Mounting with `secureTextEntry` + `defaultValue` — iOS native
  quirk leaves the field visually empty until focused. Use `value`
  (controlled) for static demo / read-only password reveal cases.
- ❌ Spreading the same `nativeID` to multiple inputs — screen readers
  associate the label with the last receiver only.

**RN deltas vs. web**

- Web `focus-within` ring → RN tracks focus via `onFocus`/`onBlur`,
  swaps the border color only. No box-shadow ring (visual noise on
  mobile + compositor cost; web's `ring-4 brand-500/22` doesn't
  translate). Note in skill docs if Tooltip / focus-indicator overlay
  needs revisiting.
- Web `shadow-xs` on the field is dropped — mobile inputs traditionally
  have no shadow.
- Web `shortcut` (kbd hint) and `tooltip` (help icon) props dropped.
  Re-add tooltip when the Tooltip primitive lands.
- Web `type="password"` → RN `secureTextEntry`. The eye toggle is a
  44×44pt `Pressable` with negative margin so it hugs the field
  visually while staying tappable.
- Size ramp bumped one Tailwind unit per
  `docs/tokens-rn-adjustments.md` §3a: `sm=44` (HIG floor) /
  `md=48` (default) / `lg=56`.
- Placeholder color uses `placeholderTextColor` (raw hex via JS token
  export). NativeWind v5 className→style does not reach RN's
  placeholder color.
- Lucide icons (leading / trailing / AlertCircle / Eye / EyeOff) take
  raw `color` + `size` props; tint flips via `useColorScheme()`. Same
  pattern as Button — see CLAUDE.md "Icon cssInterop" follow-up.
- `aria-invalid` is forwarded to the TextInput; web's
  `data-invalid` / `data-success` slot hooks are dropped (no styled
  parent selectors in RN).
- Password eye toggle is gated on `!disabled` — a dimmed field cannot
  be partially interacted with via the reveal button.

---

## Spinner

**Import**

```ts
import { Spinner, type SpinnerProps, type SpinnerSize, type SpinnerTintKey } from "@mvp-ui-rn/ui"
```

**Variants**

| Prop | Values | Default |
|---|---|---|
| `size` | `"sm"` (16) · `"md"` (20) · `"lg"` (24) · raw `number` | `"md"` |
| `tint` | `"fg"` · `"fg-secondary"` · `"fg-tertiary"` · `"fg-brand"` · `"fg-error"` · `"primary-fg"` | `"fg"` |
| `color` | raw RN color string — **overrides `tint`** | — |
| `durationMs` | full rotation period | `750` |

**When to use**

- Standalone loading indicator next to label text.
- Inline button loading (Button already wraps this internally).
- Page-level fetch / refresh affordance.

**When NOT to use**

- Determinate progress — use `ProgressBar` (not yet ported).
- Background async with no UI affordance — silent is fine.

**Anti-patterns**

- ❌ Hardcoding `color` to `#000000` — breaks dark mode. Use `tint` instead.
- ❌ `tint="primary-fg"` on the page background — primary-fg is white in
  both modes, intended for spinners sitting on a brand-filled surface
  (Button primary, FAB, modal action). Pair with `bg-primary` parent.

**RN deltas vs. web**

- Web uses an inline SVG inside Button only. RN promotes Spinner to a
  shared component with token-keyed size + semantic tint that
  auto-flips light/dark via `useColorScheme()`.
- `color` (raw) prop preserved for Button's per-variant tint map
  (`button.tsx`) — overrides `tint` when set so the existing call
  site keeps working.

---

## SafeArea

**Import**

```ts
import { SafeArea, type SafeAreaProps, type SafeAreaEdge } from "@mvp-ui-rn/ui"
```

RN-only primitive — no web equivalent. Wraps every screen.

**Variants**

| Prop | Values | Default |
|---|---|---|
| `edges` | array of `"top"` / `"bottom"` / `"left"` / `"right"` | all 4 |
| `statusBar` | `"auto"` (flips with `useColorScheme`) · `"light"` · `"dark"` · `false` (skip) | `"auto"` |
| `className` | appended to wrapper | — |

**When to use**

- Outermost wrapper of every screen rendered by `expo-router`.
- Pair with `<Stack>` from expo-router — Stack handles the header inset
  for native nav; SafeArea handles content + bottom home indicator.

**When NOT to use**

- Inside another `<SafeArea>` — double-padding stacks. SafeArea is a
  screen primitive, not a section primitive.
- For ad-hoc spacing inside content — use padding utilities directly.

**Anti-patterns**

- ❌ Overriding `bg-bg` with a raw color in `className` — breaks dark
  flip. Use semantic aliases when the screen needs a non-default
  surface.
- ❌ Setting `edges={[]}` when you mean "all four" — that disables ALL
  insets, leaving content under the notch.

---

## Card

**Import**

```ts
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@mvp-ui-rn/ui"
```

Surface composition mirroring mvp-ui (web). 6 sub-components, each
forwardRef.

**When to use**

- Grouped content with a clear visual boundary: settings sections,
  preview tiles, confirmation surfaces, list-row groups.

**When NOT to use**

- Whole-screen background — use the SafeArea + ScrollView root.
- Tap-to-navigate cards — wrap a `<Card>` in `<Pressable>` manually.
  Mirroring web, Card has no built-in Pressable variant.

**Anti-patterns**

- ❌ Stacking margin on a Card outer container — Card already provides
  surface chrome; use gap on the parent stack.
- ❌ Overriding the inner padding with a raw `style.padding` — breaks
  the 24pt rhythm. Use `className` overrides on CardHeader / Content /
  Footer with semantic spacing instead.

**RN deltas vs. web**

- Web `shadow-xs` dropped — mobile surfaces use border-only chrome.
  Same call as Input.
- `CardDescription` bumped one Tailwind step (`text-sm` → `text-md`)
  for mobile arm's-length readability — same RN ramp as Label /
  HintText / Button defaults.
- `<h3>` → RN `<Text accessibilityRole="header">`. `<p>` → RN `<Text>`.

---

## Alert

**Import**

```ts
import { Alert, AlertTitle, AlertDescription, type AlertProps, type AlertVariantKey } from "@mvp-ui-rn/ui"
```

**Variants**

| Prop | Values | Default |
|---|---|---|
| `variant` | `"info"` · `"success"` · `"warning"` · `"error"` | `"info"` |
| `icon` | `IconProp` — lucide component or pre-rendered element | — |
| `onDismiss` | `() => void` — adds trailing X button; tap fires this | — |
| `dismissLabel` | accessibility label for the dismiss button | `"Dismiss"` |

**Pair with:** `<AlertTitle variant={...}>` + `<AlertDescription variant={...}>`. Both
restate the variant so the foreground color renders correctly (RN does
not cascade Text color from a View ancestor — see RN deltas).

**When to use**

- Inline status notices inside scrollable content.
- Page-level state messages (form submission, validation summary).
- Dismissible reminders that should fade out on tap.

**When NOT to use**

- Transient feedback (use Toast / Snackbar when ported).
- Blocking confirmations (use Dialog when ported).

**Anti-patterns**

- ❌ Forgetting `variant=` on `AlertTitle` / `AlertDescription` — they
  inherit the prop, not the parent's variant. Defaults to `"info"`,
  which mismatches the wrapper color.
- ❌ Calling `onDismiss` without removing the Alert from the parent
  tree — the X tap fires, but the Alert stays rendered. Reanimated
  FadeOut only animates the unmount; parent must unmount.

**RN deltas vs. web**

- Web has no dismiss button. RN adds optional `onDismiss` + X button
  with 44pt touch target + Reanimated `FadeOut.duration(200)` on
  unmount.
- Web cascades text color via CSS inheritance from `text-*-fg` on the
  wrapper. RN does not — `AlertTitle` / `AlertDescription` take their
  own `variant` prop and apply the matching `text-*-fg` class.
- Lucide icons receive per-variant `color` from a light/dark hex map
  keyed by `useColorScheme()`. Same pattern as Input / Button.

---

## EmptyState

**Import**

```ts
import { EmptyState, type EmptyStateProps } from "@mvp-ui-rn/ui"
```

**Variants**

| Prop | Values | Default |
|---|---|---|
| `title` | `string` | required |
| `description` | `string` | — |
| `icon` | `ReactNode` (pre-rendered lucide / illustration) | — |
| `actions` | `ReactNode` (Button or row of Buttons) | — |

**When to use**

- First-run / zero-data states (empty inbox, no results, no documents).
- Filter-with-no-matches surface with a "clear filters" CTA.
- Onboarding placeholders before content streams in.

**When NOT to use**

- Loading state — use Spinner or Skeleton.
- Error state — use Alert (`variant="error"`).
- Compact list-empty in dense UIs — too much chrome; render an inline
  text row instead.

**Anti-patterns**

- ❌ Stuffing more than 2 buttons in `actions` — visual clutter; pick
  one primary + one secondary at most.
- ❌ Long description copy — keep it one sentence. The `max-w-xs` cap
  intentionally enforces a short width.

**RN deltas vs. web**

- Title + description bumped one Tailwind step each (`text-md` →
  `text-lg`, `text-sm` → `text-md`) for mobile readability. Hierarchy
  preserved (title remains one step above description).
- Dashed border + `bg-bg-secondary` surface chrome unchanged from web.

---

## Header

**Import**

```ts
import { Header, headerScreenOptions, type HeaderProps } from "@mvp-ui-rn/ui"
```

RN-only screen header primitive. Use when `headerShown: false` is set on the
route's Stack.Screen.

**Variants**

| Prop | Values | Default |
|---|---|---|
| `title` | `string` | — |
| `showBack` | `boolean` — renders back chevron | `true` |
| `onBack` | `() => void` — override default `router.back()` | — |
| `leading` | `ReactNode` — alongside / instead of back | — |
| `trailing` | `ReactNode` — right-aligned actions | — |

**When to use**

- Routes where you want full design-system typography / spacing on the
  header bar. Pair with `headerShown: false` so the native nav header
  doesn't double up.
- App-shell screens with custom right-side composables (avatar +
  multi-action rows).

**When NOT to use**

- Default stack routes — let the native expo-router header handle it
  and theme it with `headerScreenOptions({ isDark })`.

**RN deltas vs. web**

- No web equivalent. Built fresh for RN.
- Layout: `[back? · leading?]` + centered `title` + `[trailing]`. Left
  and right zones are fixed 88pt so the title stays centered when
  trailing is unbalanced.
- Back chevron uses `text-fg-brand` resolved through `useColorScheme`
  (brand-600 light / brand-400 dark).

### `headerScreenOptions({ isDark })`

Returns Stack.Screen options that color the native expo-router /
react-navigation header to match the design system. Pair with
`useColorScheme()` at the call site. Returns raw style objects (not
className) — the native nav header lives outside the NativeWind tree.

---

## TabBar

**Import**

```ts
import { tabBarScreenOptions, type TabBarScreenOptionsArgs } from "@mvp-ui-rn/ui"
```

RN-only. Skins expo-router's `<Tabs>` — native routing, accessibility,
and safe-area handling stay native; tokens drive the chrome.

```tsx
<Tabs screenOptions={tabBarScreenOptions({ isDark: scheme === "dark" })}>
```

**When to use**

- Bottom tab navigation across the app shell.

**When NOT to use**

- Content tabs inside a screen — use `Tabs` primitive (not yet ported).
- Need a blur background / FAB slot / badges — pass a fully custom
  `tabBar` component to `<Tabs>` instead.

**RN deltas vs. web**

- No web equivalent. Skin via `screenOptions` rather than a custom
  `tabBar` component so consumers don't have to rewire routing.
- Active tint follows `--color-primary` (brand-600 / brand-400). Inactive
  follows `--color-fg-tertiary`. Hairline top border (0.5pt).

---

## SearchBar

**Import**

```ts
import { SearchBar, searchBarScreenOptions, type SearchBarProps } from "@mvp-ui-rn/ui"
```

Always controlled — caller supplies `value` + `onChangeText` so the
clear button can reset the value without internal duplicate state.

**Variants**

| Prop | Values | Default |
|---|---|---|
| `value` | `string` | required |
| `onChangeText` | `(text: string) => void` | required |
| `showCancel` | `boolean` — shows "Cancel" while focused | `false` |
| `onCancel` | `() => void` — fires after Cancel blurs + clears | — |
| `placeholder` | `string` | `"Search"` |
| `cancelLabel` | `string` | `"Cancel"` |

**When to use**

- In-content search above a list / feed.
- Anywhere the native iOS UISearchBar header pattern doesn't fit
  (Android, mid-screen, modals).

**When NOT to use**

- Form fields — use `Input` with `iconLeading={Search}`. SearchBar's
  pill chrome is search-specific.

**RN deltas vs. web**

- Composes around RN `<TextInput>` with the search keyboard
  (`returnKeyType="search"`, `autoCorrect={false}`,
  `autoCapitalize="none"`).
- Trailing X clear button appears while value is non-empty.
- Cancel text-button slides in while focused (`showCancel` opt-in).
- Pill bg uses `bg-bg-tertiary` so the field reads as a search
  affordance even unfocused.

### `searchBarScreenOptions({ placeholder, cancelButtonText, hideWhenScrolling, onChangeText })`

Returns `Stack.Screen.options.headerSearchBarOptions` for the native iOS
UISearchBar in the header. Android falls back to no native search — use
the standalone `<SearchBar>` for cross-platform parity.

---

## SegmentedControl

**Import**

```ts
import {
  SegmentedControl,
  type SegmentedControlOption,
  type SegmentedControlProps,
} from "@mvp-ui-rn/ui"
```

iOS-style pill picker with a Reanimated sliding indicator. Filter / mode
switch. Distinct from `Tabs` (content navigation, not yet ported).

**Variants**

| Prop | Values |
|---|---|
| `options` | `ReadonlyArray<{ value: TValue; label: string }>` |
| `value` | `TValue` — current selection |
| `onChange` | `(value: TValue) => void` |
| `accessibilityLabel` | tablist a11y label |

**When to use**

- 2–4 mutually-exclusive view modes (Day / Week / Month / Year).
- Filter chips at the top of a list (All / Unread / Starred).

**When NOT to use**

- Content section navigation → `Tabs`.
- More than 4 options → `Select` / dropdown.
- On/off boolean → `Switch`.

**RN deltas vs. web**

- No web equivalent. Built fresh for RN.
- Always controlled.
- Sliding indicator implemented as an `Animated.View` with
  `translateX` interpolated through Reanimated `withTiming`
  (`220ms`, cubic-out). Snaps to the current selection on mount via
  the layout callback (no animation from x=0).
- Track bg uses `bg-bg-tertiary`; selected pill uses `bg-bg` (`gray-950`
  in dark → "carved out" effect against the gray-800 track).

---

## KeyboardAvoidingScroll

**Import**

```ts
import { KeyboardAvoidingScroll, type KeyboardAvoidingScrollProps } from "@mvp-ui-rn/ui"
```

RN-only form wrapper. ScrollView preconfigured for forms.

**Variants**

| Prop | Values | Default |
|---|---|---|
| `scrollClassName` | applied to the ScrollView | — |
| `contentContainerClassName` | applied to the ScrollView contentContainer | — |
| `scrollViewProps` | forwarded to the inner ScrollView (excluding the prebound ones) | — |

**When to use**

- The top-level scroll layout of every form screen. Wires
  `keyboardShouldPersistTaps="handled"` + `keyboardDismissMode="interactive"`.

**When NOT to use**

- Sticky-footer forms (a Save bar pinned above the keyboard) — wrap
  the ScrollView in a `KeyboardAvoidingView` manually. KAV is
  intentionally omitted from this primitive (see RN deltas).

**RN deltas vs. web**

- No web equivalent.
- `KeyboardAvoidingView` is **not** wrapped around the ScrollView.
  KAV is fragile across RN versions — collapses to zero height when
  nested in a flex column without explicit dimensions — and modern
  iOS scrolls a focused TextInput into view automatically. Android
  relies on `windowSoftInputMode=adjustResize`. Add KAV manually only
  when a sticky footer needs to lift with the keyboard.
- No explicit `flex` on the ScrollView and no `flexGrow` on the
  contentContainer — both broke the layout when nested under
  `<SafeArea>`. RN's ScrollView fills its parent intrinsically; we
  let it.

---

## Badge

**Import**

```ts
import { Badge, type BadgeColor, type BadgeProps, type BadgeShape, type BadgeSize } from "@mvp-ui-rn/ui"
```

**Variants**

| Prop | Values | Default |
|---|---|---|
| `color` | `gray` · `brand` · `error` · `warning` · `success` · `slate` · `sky` · `blue` · `indigo` · `purple` · `pink` · `orange` (12) | `gray` |
| `shape` | `pill` (rounded-full) · `rounded` (rounded-md) | `pill` |
| `size` | `sm` (h=20, text-xs, icon 10) · `md` (h=24, text-sm, icon 12) · `lg` (h=28, text-md, icon 14) | `md` |
| `iconLeading` | `IconProp` — lucide component or pre-rendered element | — |

**When to use**

- Status pills in lists, headers, table rows: "Active", "3 new", "Beta".
- Counts and filter chips.
- Tag-style decorations on cards and avatars.

**When NOT to use**

- Tap-to-act surfaces — use a Button.
- Dismissible inline notice — use Alert.

**Anti-patterns**

- ❌ Stacking >3 badges on a single row — visual clutter; collapse to a
  single counter badge.
- ❌ Raw color in `className` — bypasses dark-mode flip. Pick from the
  12 semantic `color` values (tag-* tokens flip per scheme).

**RN deltas vs. web**

- Web `ring-1 ring-inset` → RN `border` (no `ring` primitive on RN).
- Web `modern` type (bg-bg + shadow-xs) dropped — mobile chrome avoids
  shadows; pill + rounded shapes carry the variant story.
- `BadgeWithButton` / `BadgeWithImage` / `BadgeGroup` web sub-components
  deferred — base Badge + slot icon covers the common cases.
- Per-size font + icon step with height per trap #13 (web shared
  text-xs across sm/md, which read as no size step on RN hardware).

---

## Avatar

**Import**

```ts
import { Avatar, type AvatarProps, type AvatarSize, type AvatarStatus } from "@mvp-ui-rn/ui"
```

Cascade: `src` (expo-image) → `initials` → `placeholder` → default lucide
`<User />`. Adds a status dot at bottom-right when `status` is set.

**Variants**

| Prop | Values | Default |
|---|---|---|
| `size` | `xs` (h=24, text-xs, icon 14) · `sm` (h=32, text-sm, icon 18) · `md` (h=40, text-md, icon 22) · `lg` (h=48, text-lg, icon 26) · `xl` (h=56, text-xl, icon 30) · `2xl` (h=64, text-2xl, icon 34) | `md` |
| `src` | `string \| null` — remote URL (expo-image) | — |
| `alt` | `string` — accessibility label | — |
| `initials` | 1–2 char fallback | — |
| `placeholder` | `ReactNode` — overrides default lucide User icon | — |
| `status` | `online` (success) · `offline` (fg-quaternary) · `away` (warning) · `busy` (error) | — |
| `border` | adds `border-border` ring | `false` |
| `square` | rounded-md instead of rounded-full | `false` |

**When to use**

- User identity in headers, lists, chat threads, comments.
- Team grids and member rosters.
- Status presence in inboxes and rooms (`status` dot).

**When NOT to use**

- Decorative icons unrelated to identity — use lucide directly.
- Brand logos in product UI — render an image without the round
  crop.

**Anti-patterns**

- ❌ Setting `src` to a string that often fails — leaves a flash of
  the loading state. Use blurhash via `<Image>` or guard with
  `?` upstream.
- ❌ Status dot without a status semantic — passing `online` to mean
  "verified" misleads screen readers. Use the upcoming `verified`
  state when ported (currently deferred).

**RN deltas vs. web**

- Remote `<img>` → `expo-image`; cached + 200ms transition by default.
- Falls back through the cascade on load failure.
- 4 status colors (vs web's online/offline only): online · offline ·
  away · busy.
- Drops `state="verified"|"blocked"`, `count` notification badge, and
  focusable-ring (no RN keyboard focus model). Re-add when consumers
  need them.
- Per-size font + icon step with height per trap #13 (web shared
  text-sm between sm and md).

---

## List + ListItem + ListSection

**Import**

```ts
import { List, ListItem, ListSection, type ListItemProps, type ListSectionProps } from "@mvp-ui-rn/ui"
```

RN-only — no direct web equivalent. iOS Settings-grouped pattern.

**Variants — ListSection**

| Prop | Values |
|---|---|
| `title` | small-caps heading above the card |
| `footer` | caption below the card |
| `children` | one or more `<ListItem>` |

**Variants — ListItem**

| Prop | Values |
|---|---|
| `leading` | `IconProp` — lucide component or a function returning an Avatar (`leading={() => <Avatar … />}`) |
| `title` | primary line, single-line truncated |
| `subtitle` | optional secondary line, 2-line truncated |
| `trailing` | `ReactNode` — Badge / Switch / inline text |
| `chevron` | force on/off; defaults to `isPressable && trailing == null` |
| `onPress` | when set, row renders `<Pressable>` with `active:bg-bg-tertiary` |
| `disabled` | 50% opacity, blocks press |

**When to use**

- Settings screens, inbox / contacts, navigation groupings, account
  detail pages, simple selection lists.

**When NOT to use**

- Unbounded data lists — render a FlatList directly. The component
  is View-based (no virtualization).
- Edge-to-edge feed cards — use `<Card>` instead.

**Anti-patterns**

- ❌ Passing a `<View>` of complex layout as `leading` — leading is
  reserved for icon-sized elements (~22pt). For richer leading, use a
  function-as-leading: `leading={() => <Avatar size="sm" />}`.
- ❌ Forgetting `chevron={false}` on team / readonly rows — chevron
  defaults to on for pressable rows and signals "tap to drill in",
  misleading users on view-only rows.

**RN deltas vs. web**

- Built fresh for RN. Web has no `List` primitive — it uses ad-hoc
  flex stacks per page.
- Hairline dividers between rows are absolute-positioned `bg-border`
  Views (no `divide-y` utility on RN).
- Row height 56pt minimum; subtitle multiplies the height naturally.
- `leading` supports both `IconProp` (lucide) and a function returning
  a node — handy for Avatar leading without forcing the consumer to
  pre-render.

---

## Image

**Import**

```ts
import { Image, type ImageProps } from "@mvp-ui-rn/ui"
```

Thin wrapper around `expo-image`. Use for general-purpose images;
`Avatar` covers identity-with-cascade.

**Defaults**

| Prop | Value |
|---|---|
| `contentFit` | `"cover"` |
| `transition` | `200` (ms fade) |
| `placeholder` | derived from `blurhash` if passed |

All other `expo-image` props pass through.

**When to use**

- Photos, hero images, product covers, illustrations.
- Anywhere `expo-image`'s caching / blurhash / disk-cache matter.

**When NOT to use**

- User-identity avatars → use `<Avatar>` (cascade fallback baked in).
- Icons → lucide-react-native.
- Inline SVG → `react-native-svg`.

**Anti-patterns**

- ❌ Forgetting `width`/`height` — expo-image renders to zero unless
  sized via `style` or `className`.
- ❌ Reach for `Image.Background` patterns — not yet wired. Compose
  via absolute children inside a parent View.

**RN deltas vs. web**

- No web equivalent — web uses `<img>` + CSS `object-fit`. RN ships
  `expo-image` with native caching + blurhash + disk-cache as the
  perf-friendly default.

---

## Skeleton

**Import**

```ts
import { Skeleton, type SkeletonProps, type SkeletonShape } from "@mvp-ui-rn/ui"
```

Reanimated opacity-pulse loading placeholder.

**Variants**

| Prop | Values | Default |
|---|---|---|
| `shape` | `rect` · `circle` · `text` | `rect` |
| `width` | px number or `"100%"` (rect / text only) | `"100%"` |
| `height` | px number (rect only) | `16` |
| `size` | px (circle only) | `40` |
| `rounded` | corner radius (rect only) | `6` |

**Sizing rules**

- `circle` → square with `borderRadius: size / 2`.
- `text` → height locked to `24` (text-md line-height); width defaults
  to `"100%"`.
- `rect` → caller controls everything.

**Animation:** opacity oscillates between 0.45 and 1.0 over 1200ms with
cubic-in-out easing, repeating reverse. Single `Animated.View` — no
masked gradient overlay, no LinearGradient dep.

**When to use**

- Initial mount before remote data resolves.
- List rows / cards / feed items as filler while content streams in.
- Avatar slot during image load.

**When NOT to use**

- Static empty state — use `EmptyState`.
- Determinate progress — use `ProgressBar` (not yet ported).
- During tap action — use Button's `isLoading` instead.

**RN deltas vs. web**

- Built fresh for RN. Web typically uses CSS keyframes; we use
  Reanimated to stay on the compositor thread.

---

## Checkbox

**Import**

```ts
import { Checkbox, CheckboxBase, type CheckboxProps, type CheckboxBaseProps, type CheckboxSize, type CheckboxState } from "@mvp-ui-rn/ui"
```

`Checkbox` is the composed row: pressable wrapper + visual box + optional
label + hint. `CheckboxBase` is the visual cell only (no Pressable, no
a11y role) — use inside other components (e.g. inside a `SelectItem`
indicator) where the parent owns the tap.

**Variants**

| Prop | Values | Default |
|---|---|---|
| `checked` | `boolean \| "indeterminate"` — tristate | `false` |
| `onCheckedChange` | `(next: CheckboxState) => void` — fires with next state | — |
| `size` | `sm` (20px box, text-sm) · `md` (24px box, text-md) | `sm` |
| `isInvalid` | `boolean` — red border when unchecked | `false` |
| `disabled` | `boolean` — 50% row opacity + muted box bg, blocks taps | `false` |
| `label` (`Checkbox` only) | `ReactNode` — primary label, tap toggles | — |
| `hint` (`Checkbox` only) | `ReactNode` — helper text under label | — |
| `containerClassName` | wrapper class for the row | — |
| `className` | class for the box | — |
| `hitSlop` | RN Pressable `hitSlop` — default `{top/bottom/left/right: 10}` | 10pt | 

**Tristate behaviour**

Clicking the indeterminate state transitions to `true` — mirrors browser
+ react-aria. From `true` the next tap goes to `false`; from `false`,
`true`. Consumers that want a 3-cycle (false → true → indeterminate →
false) override `onCheckedChange` and re-set `checked` themselves.

**When to use**

- Multi-select rows in lists or tables.
- Acceptance flows ("I agree to the terms").
- Setting toggles where the value is binary AND the option is part of a
  group (use `Switch` for solo on/off settings).
- `"indeterminate"` for parent rows that summarize partial-selection of
  children ("3 of 12 selected").

**When NOT to use**

- Mutually exclusive choice in a small set → `RadioGroup` (not yet
  ported).
- Solo on/off setting (notifications, dark mode) → `Switch`.
- Free-text yes/no with detail → `Textarea`.

**Anti-patterns**

- ❌ Raw color class on the box (`bg-brand-600`) — breaks dark mode. Use
  the supplied variants or extend `boxVariants` upstream.
- ❌ Cycling `false → indeterminate` via user tap. Indeterminate is a
  *parent* state — consumers should set it when child group membership
  is partial, not on user input.
- ❌ Tiny `hitSlop={0}` overrides. The 20px box at `sm` is below the
  44pt HIG floor; default hitSlop pads it. Override only inside dense
  table rows where the row itself is the tap target.

**RN deltas vs. web**

- Web `ring-1 ring-border ring-inset` outline → RN `border border-border`
  (1px inset). NativeWind has no `ring-*` utility — border + same
  baseline weight produces an identical visual.
- Web `react-aria` two-state Checkbox → RN tristate
  (`boolean | "indeterminate"`). `@rn-primitives/checkbox` Root only
  knows boolean, so tristate is layered at the wrapper — accessibility
  state is forced to `"mixed"` for screen readers when indeterminate.
- Web SVG check/dash inside a `<div>` → RN `react-native-svg` Path with
  the same coordinates. Glyph stroke is hardcoded `#ffffff` to match
  `--color-primary-fg` in both modes.
- Sizes bumped from web (sm 16 → 20, md 20 → 24) for touch comfort.
- No focus-visible ring (RN has no focus-visible primitive; touch is
  the dominant input).

---

## Switch

**Import**

```ts
import { Switch, SwitchBase, type SwitchProps, type SwitchBaseProps, type SwitchSize } from "@mvp-ui-rn/ui"
```

`Switch` is the composed pressable + animated pill + optional label/hint.
`SwitchBase` is the visual-only pill (no Pressable) for static-state
embeds (ListItem trailing, settings preview, etc.).

**Variants**

| Prop | Values | Default |
|---|---|---|
| `checked` | `boolean` | `false` |
| `onCheckedChange` | `(next: boolean) => void` | — |
| `size` | `sm` (24×44 track, 20 thumb) · `md` (28×52 track, 24 thumb) | `sm` |
| `disabled` | `boolean` — 50% opacity, blocks taps | `false` |
| `label` (`Switch` only) | `ReactNode` — tap toggles whole row | — |
| `hint` (`Switch` only) | `ReactNode` — helper text under label | — |
| `containerClassName` / `className` | wrapper / pill class overrides | — |
| `hitSlop` | RN Pressable `hitSlop` — default 10pt all sides | 10pt |

**Animation**

Track color + thumb position animate together over 200ms via Reanimated
`useDerivedValue(withTiming(...))`. Switching the controlled `checked`
prop crossfades — no snap.

- Off track: `bg-bg-tertiary` (gray-50 light / gray-800 dark)
- On track: `--color-primary` (brand-600 both modes)
- Thumb: white in both modes (matches `--color-primary-fg`)

**When to use**

- Solo on/off setting: notifications, airplane mode, biometric login.
- Inside a ListItem `trailing` slot for Settings-style rows.
- When the result is applied *immediately* (no Save button). For
  deferred application use a `Checkbox`.

**When NOT to use**

- One-of-many choice → `Select` or `SegmentedControl`.
- Multi-select inside a list → `Checkbox`.
- Pending / loading state — Switch should reflect the resolved value
  only; render a `Spinner` next to it during the in-flight write.

**Anti-patterns**

- ❌ Custom hardcoded track colors. Off-state must reference
  `tokens.color.gray.50` / `gray-800` (dark) so it stays muted in both
  modes; on-state is brand-600. Roll your own only after extending the
  semantic alias map.
- ❌ Bare pill inside a dense list with no hitSlop override. The pill
  width (44 / 52) hits 44pt minimum naturally, but the height (24 / 28)
  needs hitSlop for HIG compliance — default `10pt` covers it.
- ❌ Using `Switch` for actions that POST and may fail. Add a `Spinner`
  + rollback handler, or use a `Button`.

**RN deltas vs. web**

- Web `ring`-outlined track → RN flat track with Reanimated
  `interpolateColor` crossfade. No ring utility in RN.
- Web `slim` variant (bordered track) deferred — see Open follow-ups
  in `docs/component-status.md`.
- Sizes bumped from web for iOS UISwitch alignment + ≥ 44pt touch.
- Focus-visible outline dropped (no focus-visible on touch).
- `aria-valuetext` is set by `@rn-primitives/switch` Root — VoiceOver
  reads "on" / "off" automatically.

---

## Textarea

**Import**

```ts
import { Textarea, TextareaBase, type TextareaProps, type TextareaBaseProps, type TextareaSizeKey } from "@mvp-ui-rn/ui"
```

`Textarea` composes `Label` + `TextareaBase` + `HintText` (mirrors
`Input`). `TextareaBase` is the standalone multiline field.

**Variants**

| Prop | Values | Default |
|---|---|---|
| `size` | `sm` (text-sm, py-3) · `md` (text-md, py-3) · `lg` (text-lg, py-3.5) | `md` |
| `rows` | minimum visible rows — drives `minHeight` via `lineHeight × rows + padding × 2` | `4` |
| `isInvalid` / `isSuccess` | `boolean` — red / green border | `false` |
| `disabled` / `readOnly` | `boolean` — opacity / muted bg | `false` |
| `label` (`Textarea` only) | `string` | — |
| `hint` (`Textarea` only) | `ReactNode` — auto-flips to error tint when `isInvalid` | — |
| `isRequired` (`Textarea` only) | `boolean` — required `*` in label | `false` |
| Native `TextInputProps` forwarded | `value`, `defaultValue`, `onChangeText`, `maxLength`, `autoCapitalize`, … | — |

**Sizing**

`rows` sets the minimum visible height. Content beyond `rows` expands
the field — there is no built-in `maxRows` cap (RN's multiline TextInput
grows naturally). Apply `maxHeight` via `className`/`style` if a fixed
cap is needed.

**When to use**

- Multi-line text input: bio, description, message, code snippet,
  feedback form.
- Long-form fields next to a `Label` + `HintText` triple.

**When NOT to use**

- Single-line text → `Input`.
- Rich-text / markdown editor → not yet ported.

**Anti-patterns**

- ❌ Omitting `rows` for long-form fields — defaults to 4. Stage
  3-line / 6-line / 10-line variants explicitly so the layout doesn't
  reflow on first keystroke.
- ❌ Setting `numberOfLines` (Android-only) without `minHeight` — iOS
  ignores it. Use `rows` which derives both.
- ❌ Raw `height` style overriding the size token — breaks the size
  ramp's vertical-padding ratio. Use `rows` for height; `size` for
  text + padding density.

**RN deltas vs. web**

- Web `react-aria` TextField + TextArea handles focus + invalid + label
  wiring; RN tracks focus via `onFocus`/`onBlur` and pairs label via
  `nativeID` + `accessibilityLabelledBy`.
- Web custom `::-webkit-resizer` SVG handle dropped — RN multiline
  TextInput grows automatically with content; no user-resizable corner.
- Web `ring-2 ring-border-brand` focus ring → RN border-color swap
  only (matches Input).
- `textAlignVertical="top"` baked in so Android caret sits at line 1
  when content < height.
- Placeholder color resolved as raw hex via JS tokens; RN does not
  honor className on placeholder text.

---

## Select

**Import**

```ts
import { Select, SelectItem, type SelectProps, type SelectItemProps, type SelectOption, type SelectSize } from "@mvp-ui-rn/ui"
```

Popover-style picker. Trigger looks like an `Input` box; options
render in a portal-positioned popover anchored below (or above on
collision) the trigger.

**Variants**

| Prop | Values | Default |
|---|---|---|
| `value` / `defaultValue` | `SelectOption` = `{ value: string; label: string } \| undefined` | — |
| `onValueChange` | `(next: SelectOption) => void` | — |
| `size` | `sm` (h-11) · `md` (h-12) · `lg` (h-14) | `md` |
| `placeholder` | trigger text when nothing selected | `"Select"` |
| `isInvalid` | `boolean` — red trigger border | `false` |
| `isRequired` | `boolean` — required `*` in label | `false` |
| `disabled` | `boolean` — 50% opacity, blocks open | `false` |
| `label` / `hint` | composed Label + HintText slots | — |
| `containerClassName` / `triggerClassName` / `contentClassName` | class overrides | — |

`SelectItem`:

| Prop | Values | Default |
|---|---|---|
| `value` | `string` — required | — |
| `label` | `string` — required, rendered by `SelectPrim.ItemText` | — |
| `icon` | `IconProp` — leading lucide icon or pre-rendered element | — |
| `disabled` | `boolean` | `false` |
| `size` | `sm` · `md` · `lg` — visual size; usually inherits Select's `size` | `md` |

**When to use**

- Single choice from a small-to-medium list (≤ 20 options) that fits
  in a popover without scroll fatigue.
- Settings dropdowns, country pickers, role pickers, currency
  selection.

**When NOT to use**

- Long lists (countries, timezones) — use the sheet variant
  (`variant="sheet"`) once it lands; for now, `Select` still works but
  the popover becomes tall.
- Multi-select → `MultiSelect` (not yet ported).
- Typeahead search inside the dropdown → `Combobox` (not yet ported).
- One-of-two-or-three on a tight row → `SegmentedControl`.
- Boolean → `Switch` or `Checkbox`.

**Anti-patterns**

- ❌ Forgetting to mount `<PortalHost />` in the app root. Without it,
  the popover never renders. See `apps/showcase/src/app/_layout.tsx`
  for the canonical placement (outside `Stack`, inside the theme
  provider).
- ❌ Passing a raw string as `value`. The primitive's option shape is
  `{ value, label }`; if you only have the value string, pair it with
  the resolved label or look it up before setting state.
- ❌ Nesting non-`SelectItem` children directly inside `Select`.
  Children render inside a `<View>` wrapper but only `SelectItem`
  registers in the primitive's item context; arbitrary nodes won't
  participate in selection.

**RN deltas vs. web**

- Web `react-aria-components` Select → RN
  `@rn-primitives/select` (Radix-style compound API). The primitive
  measures the trigger and positions Content relative to it via a
  portal — no manual layout math.
- Web `items` prop + render-prop children dropped for v1. Consumers
  map data → `SelectItem` children directly.
- Web `avatarUrl` / `supportingText` per-item dropped for v1. `icon`
  slot only. Pair an `<Avatar>` element via the icon slot if needed.
- Web `selectionIndicator="checkbox"` deferred. v1 ships
  right-aligned check-mark indicator only.
- Web `combobox` (typeahead) is its own component on RN —
  not bundled into Select.
- Sheet variant (bottom-sheet wheel / ActionSheet rows for long lists)
  deferred until BottomSheet ships. Non-breaking when added.
- Trigger looks like `Input` box. Border tints brand on `open`
  (no `focus-within` in RN).
- Popover elevation via `pickShadow("lg", mode)` token — light + dark
  shadow maps to keep depth visible in dark mode.
- Popover width = `triggerPosition.width` from `useRootContext()`. The
  primitive's `useRelativePosition` returns `top`/`left` only — width
  isn't propagated, so without an explicit override the items
  (`flex-1` text) collapse to 0 and the popover renders as a narrow
  vertical strip on the left.
- Popover max-height per size: `sm: 224` / `md: 256` / `lg: 320` — mirrors
  web `max-h-56/64/80`. Items past the cap scroll inside a `<ScrollView>`
  with `bounces={false}` for a desktop-popover feel.
- Collision avoidance flips popover above the trigger when there's no
  room below. `insets={useSafeAreaInsets()}` is forwarded to the
  primitive so the home-indicator + status-bar safe areas are
  respected; without it the popover overlaps the home indicator on
  bottom-anchored triggers.

---
