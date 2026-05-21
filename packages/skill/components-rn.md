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
| `size` | `sm` (h=40, px=16, text-sm) · `md` (h=48, px=20, text-md) · `lg` (h=56, px=24, text-md) · `xl` (h=64, px=28, text-lg) | **`md`** |
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
| `size` | `sm` (h=44, dense) · `md` (h=48, default) · `lg` (h=56) | `md` |
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
