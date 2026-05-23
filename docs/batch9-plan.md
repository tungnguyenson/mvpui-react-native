# Batch 9 — Plan

Date: 2026-05-23
Status: **confirmed — building**

---

## Scope summary

Final design-system batch. Closes all remaining ❌ items that belong in `packages/ui` (as opposed to app-layer or deferred/redesign).

| # | Component | Type | Library | Tier | Est. effort |
|---|---|---|---|---|---|
| 1 | `StatusBar` | Mobile-native | `expo-status-bar` | P2 mobile | XS |
| 2 | `Banner` | Mobile-native | none (RN primitives) | P2 mobile | S |
| 3 | `CircularProgress` | Mobile-native | `react-native-svg` + Reanimated | P2 mobile | M |
| 4 | `FAB` | Mobile-native | none (RN primitives) | P2 mobile | S |
| 5 | `PinInput` | Web-port | `react-native-confirmation-code-field` | P2 web | M |

Effort legend: XS = < 30min, S = < 1h, M = 1–3h. Total ballpark: 4–7h focused build + verify.

**Explicitly excluded from batch 9:**

| Item | Reason |
|---|---|
| Breadcrumb | "Less common on mobile; defer unless requested" — no user request |
| Pagination | "Mobile prefers infinite scroll" — defer |
| SideNav | Complex; no primitive; app-routing concern |
| Table | Needs full redesign as FlatList pattern — different component class |
| Card variants | App-layer. Base `Card` is the design-system primitive |
| Onboarding slides | App-layer |

---

## Build order

Deps-first.

```
1. StatusBar        (standalone; closes the single ❌ in nav shells)
2. Banner           (standalone; inline content surface)
3. CircularProgress (standalone; Reanimated + SVG, no deps on other batch items)
4. FAB              (standalone; needs CircularProgress done first only if FAB shows a loading state — see Q3)
5. PinInput         (standalone; new lib, no cross-deps in batch)
```

---

## Infrastructure deltas

New deps in `packages/ui`:

| Package | Version | Purpose |
|---|---|---|
| `react-native-confirmation-code-field` | `^7.x` | PinInput cell layout + auto-advance |

`react-native-svg` and `react-native-reanimated` are already in `packages/ui` deps (used by Spinner + ProgressBar + SegmentedControl). No new installs needed for CircularProgress.

`expo-status-bar` is already in `apps/showcase` deps (via Expo SDK). `packages/ui` adds it as a peerDep.

No new portal hosts. No new providers.

---

## Open questions

Each question: **what it decides**, **options with tradeoffs**, **recommendation + why**.

---

### Q1 — Banner positioning and lifecycle

**What it decides.** Where Banner sits in the layout and what "persistent" means. This separates it from Alert (dismissible inline notice) and Toast (ephemeral overlay). Getting this wrong makes Banner feel like a duplicate of Alert.

#### Option A — Inline static (RECOMMENDED)

Banner is a `View` rendered by the consumer in the layout tree, like `Alert`. It stays visible until the consumer removes it from the tree (controlling `visible` prop or conditional rendering).

```tsx
{hasOfflineError && (
  <Banner
    variant="error"
    title="No connection"
    description="Changes will sync when back online."
    onDismiss={() => setHasOfflineError(false)}
  />
)}
```

Sits below the Header and above the ScrollView content. No absolute positioning. No portal.

Pros:
- Zero portal complexity. Consumer controls lifecycle via React state.
- Scrolls with content OR sits above the scroll — consumer decides by placement.
- Consistent with Alert's inline pattern. One mental model for both.
- No singleton store (Toast already owns that pattern; two singleton overlays is one too many).

Cons:
- Consumer must manage the visible-state themselves. More boilerplate vs Toast's imperative API.
- "App-level sticky banner" (e.g. offline indicator always at top, below nav) requires consumer to place it in the layout root. This is the right responsibility for the app layer, but some teams want the design system to own it.

#### Option B — Singleton portal (imperative)

Like Toast: `banner.show({ variant, title, description })` / `banner.hide()`. Renders via a `<BannerHost />` mounted at layout root.

Pros:
- Imperative API — fire from anywhere.
- Guaranteed to always render above content.

Cons:
- Duplicates Toast's infrastructure. Two singleton overlay systems.
- "Persistent" + "singleton" means only one banner at a time — a meaningful constraint that consumers hit unexpectedly.
- Harder to compose with conditional logic (show banner only on a certain screen).

#### Recommendation: **A — inline static**

Rationale:
1. Alert is inline. Banner differs in persistence (no auto-dismiss timer) and visual weight (full-width bar vs. boxed notice), not in rendering model.
2. Singleton infrastrucure is Toast's job. Banner is not a notification system.
3. Inline placement gives consumers the precise control they need for app-level vs. screen-level banners.

---

### Q2 — CircularProgress API

**What it decides.** Prop surface and SVG animation approach. Sets the contract for things like indeterminate mode later.

#### Option A — Mirror ProgressBar API + `thickness` prop (RECOMMENDED)

```tsx
<CircularProgress value={75} />
<CircularProgress value={value} size={64} color="success" thickness={6} label="75%" />
```

| Prop | Values | Default |
|---|---|---|
| `value` | `0`–`100`, clamped | required |
| `size` | px number | `48` |
| `color` | `primary` / `success` / `warning` / `error` | `primary` |
| `thickness` | stroke width in px | `4` |
| `label` | center text override (else renders nothing) | — |
| `showValue` | render `${round(value)}%` in center | `false` |
| `animationDurationMs` | override easing duration | `motion.slow` (300ms) |

SVG approach: `react-native-svg` `<Circle>` with `strokeDasharray` + animated `strokeDashoffset` via Reanimated `withTiming`. Track circle (full stroke, muted color) + fill circle (animated strokeDashoffset). Both centered, same `cx/cy/r`.

Pros:
- API is visually symmetric with `ProgressBar` (same `value`, `color`, `size`, `showValue`, `animationDurationMs` shape).
- `react-native-svg` is already in `packages/ui` deps. No new lib.
- `strokeDashoffset` animation lives on the compositor (Reanimated worklet), not the JS thread.

Cons:
- `thickness` is a new prop not on ProgressBar (makes sense for a circle — ProgressBar uses `h-1.5/2/2.5`). Slight asymmetry.

#### Option B — `variant` size enum only (no raw px)

```tsx
<CircularProgress value={75} size="sm" />  // 32px
<CircularProgress value={75} size="md" />  // 48px (default)
<CircularProgress value={75} size="lg" />  // 64px
```

Pros:
- Consistent with ProgressBar's `size` enum. No magic numbers in call sites.

Cons:
- CircularProgress is commonly sized by its layout context (e.g. filling an avatar-slot or a card corner). Token size enum restricts that. Raw `number` gives consumers the control they need.
- Both are easy — raw number is strictly more flexible. Enum can be a named-sizes shortcut on top.

#### Recommendation: **A — raw number `size` + ProgressBar-mirrored props**

Rationale:
1. Raw `size` px matches how `Spinner` and `Avatar` work (both accept raw number or size key). Circular shapes need specific sizing more often than bar shapes.
2. API symmetry with ProgressBar reduces the learning surface — same `value`/`color`/`showValue`/`animationDurationMs` everywhere.
3. `thickness` is necessary for the circular shape to feel proportional across sizes — ProgressBar doesn't need it because height variants already encode proportionality.

---

### Q3 — FAB scope (visual primitive vs positioned overlay)

**What it decides.** Whether `packages/ui/src/components/fab.tsx` is a visual primitive (circular button, no opinion on placement) or a self-positioning floating overlay.

**Context:** `apps/showcase/src/components/FabTabBar.tsx` already demonstrates the canonical FAB pattern for this repo — a circular button embedded in a custom tab bar with `marginTop: -24` lifting it above the bar chrome. The button visual is inline in that file (lines 52–80). Two distinct layers exist:

1. **FAB button** — the 56px circular `Pressable` with brand fill + shadow + icon.
2. **FabTabBar** — the tab bar wrapper that positions the FAB in the center cutout. App-layer, coupled to expo-router's tab bar API.

#### Option A — Visual primitive only, consumer owns placement (RECOMMENDED)

`packages/ui` ships the circular FAB button. No `position: absolute`, no safe-area math built in. Consumer places it — either inside `FabTabBar` (tab-bar cutout pattern) or inside a `position: absolute` overlay at the screen level.

```tsx
// Inside FabTabBar (existing app-layer pattern):
<FAB icon={Plus} onPress={handleCreate} />

// Standalone overlay (consumer positions):
<View style={{ position: "absolute", bottom: insets.bottom + 24, right: 24 }}>
  <FAB icon={Plus} onPress={handleCreate} />
</View>
```

Pros:
- Matches how the existing showcase code already uses it — no rearchitecting required.
- `FabTabBar` stays app-layer (expo-router dep stays out of `packages/ui`).
- One visual component works for both the tab-bar pattern and the floating pattern.
- Positioning math (safe-area, screen edge distance) belongs at the screen layout layer, not the button.

Cons:
- Consumers building the floating pattern need two lines of layout wrapper. Acceptable — same trade-off as Button (no built-in screen positioning).

#### Option B — Self-positioning overlay

FAB ships with `position: absolute` + `useSafeAreaInsets()` baked in.

Pros:
- Zero-config for the floating pattern.

Cons:
- Incompatible with the tab-bar cutout pattern (which uses `marginTop: -24`, not absolute positioning).
- Adds expo-router / safe-area math as a hard dep in the component.
- The existing `FabTabBar.tsx` would need to bypass or ignore the built-in positioning — redundant.

#### Recommendation: **A — visual primitive, no built-in positioning**

Rationale:
1. The existing `FabTabBar.tsx` already proves this is the right split — the button visual is separate from the layout host.
2. `packages/ui` stays routing-agnostic.
3. Floating pattern is two lines of wrapper at the call site, not a design-system responsibility.

**`FabTabBar` disposition:** document as a recipe (copy from `apps/showcase/src/components/FabTabBar.tsx`). Do NOT move into `packages/ui` — expo-router dep + tab-bar API coupling makes it app-layer.

**FAB variants:**

| Prop | Values | Default |
|---|---|---|
| `icon` | `IconProp` | required |
| `onPress` | `() => void` | required |
| `size` | `md` (56px) / `lg` (64px) | `md` |
| `color` | `primary` / `secondary` / `surface` | `primary` |
| `isLoading` | `boolean` — shows Spinner | `false` |
| `disabled` | `boolean` | `false` |
| `label` | extended FAB label text (pill layout when set) | — |
| `accessibilityLabel` | `string` | required when no `label` |

`label` prop switches to "extended FAB" layout (icon + text row, pill-shaped, wider). Without `label`, standard circular FAB.

---

### Q4 — PinInput controlled shape

**What it decides.** The prop contract (controlled vs uncontrolled, value type, cell count flexibility) and library integration model.

#### Option A — Controlled string `value` + flexible `length` (RECOMMENDED)

```tsx
<PinInput
  length={6}
  value={code}
  onChangeText={setCode}
  onComplete={(code) => verifyOTP(code)}
  isInvalid={!!codeError}
  hint={codeError}
/>
```

| Prop | Values | Default |
|---|---|---|
| `length` | `number` of cells | `6` |
| `value` | `string` (controlled) | required |
| `onChangeText` | `(val: string) => void` | required |
| `onComplete` | `(val: string) => void` — fires when all cells filled | — |
| `isInvalid` | `boolean` | `false` |
| `hint` | `ReactNode` — error/helper below | — |
| `secureTextEntry` | `boolean` — mask digits | `false` |
| `keyboardType` | `"number-pad"` / `"decimal-pad"` / `"ascii-capable"` | `"number-pad"` |
| `autoFocus` | `boolean` | `false` |
| `editable` | `boolean` | `true` |

Library: `react-native-confirmation-code-field` v7.

- Provides `useBlurOnFulfill` + `useClearByFocusCell` hooks for standard UX out of the box.
- Renders a `CodeField` with fully custom `renderCell` — we own all visual styling (cell boxes, focus ring, filled state, invalid state).
- Controlled via `value` + `setValue` from `useBlurOnFulfill` / `useState` at consumer.

Pros:
- Matches Input/Textarea controlled pattern. Consumers using `react-hook-form` pass `field.value` + `field.onChange` directly.
- `onComplete` callback closes the "fire on fill" use case without consumers manually checking value length.
- Flexible `length` covers 4-digit PINs, 6-digit OTPs, 8-digit recovery codes in a single component.

Cons:
- Consumer must manage `useState(value)` themselves for uncontrolled use. Acceptable — forms should be controlled.

#### Option B — Uncontrolled with `defaultValue` + `onComplete` only

```tsx
<PinInput length={6} onComplete={(code) => verify(code)} />
```

Pros:
- Zero boilerplate for the simple case.

Cons:
- No way to reset or pre-fill the field programmatically (e.g. "wrong code — clear and try again" requires a key prop hack).
- Incompatible with `react-hook-form` without a wrapper.
- Library's `value` prop is the correct surface; hiding it forces consumers to go around the design system.

#### Recommendation: **A — controlled string `value`**

Rationale:
1. Controlled is the correct default for form inputs that participate in validation (OTP codes always do).
2. `onComplete` + `isInvalid` + `hint` gives consumers the complete validation cycle without boilerplate.
3. Flexible `length` in one component keeps the API small (no `PinInput4` / `PinInput6` variants).

**Cell visuals:**

Each cell is a `View` with `border-border` bottom or full border (toggle via `cellStyle` — default `full`, option `underline` for a cleaner look). Filled cell: `text-fg`. Focus cell: `border-primary`. Invalid: `border-error`. Size: 48px wide × 56px tall (`md`), matching Input height. Per-size font step: `text-lg` (same as Input `lg`).

---

## Risks / open follow-ups

- **CircularProgress indeterminate:** rotating animated arc. Not in v1 (Spinner covers it). Non-breaking add later.
- **PinInput biometric trigger:** many OTP flows show biometric auth on `autoFocus`. That's app-layer logic — consumer fires `LocalAuthentication` in `onComplete`. Not a design-system concern.
- **FAB extended label alignment:** icon + label row needs `gap-2` and careful text-truncation at small widths. Verify on narrow devices (SE form factor — 375pt).
- **Banner `variant="neutral"`:** neutral/info/success/warning/error. Match Alert's 4 variants but add `neutral` (gray, no status connotation) for system notices like "Offline mode enabled".

## Verify approach

Same playbook as prior batches:

1. Maestro flow at `apps/showcase/.maestro/batch9-showcase.yaml`.
2. Wrapper `apps/showcase/scripts/verify-batch9.sh`.
3. pnpm script `verify:batch9`.
4. Light + dark screenshots per component.
5. PinInput real-device verify: keyboard appearance, auto-advance, backspace-clear feel.
6. FAB real-device verify: safe-area inset clearance (home indicator), shadow depth.

## Decisions to record

When user confirms, locked decisions go in `docs/component-status.md` under **"Batch 9 — 2026-05-23"** mirroring prior batch footers.
