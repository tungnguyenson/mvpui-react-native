# Batch 8 — Plan

Date: 2026-05-22
Status: **awaiting decisions on Q1–Q8** before build

---

## Scope summary

Union of four candidate themes. 8 components + 1 hook utility. Larger than prior batches (4 components each) but most are thin wrappers around mature libraries — bulk is in demos + dark-mode tint maps, not core logic.

| # | Component | Type | Library | Tier | Est. effort |
|---|---|---|---|---|---|
| 1 | `Popover` | Web-port | `@rn-primitives/popover` | P2 web | M |
| 2 | `Tooltip` | Web-port | `@rn-primitives/tooltip` | P2 web | S |
| 3 | `RadioGroup` | Web-port | `@rn-primitives/radio-group` | P2 web | M |
| 4 | `Slider` | Mobile-native | `@react-native-community/slider` | P1 | M |
| 5 | `DateTimePicker` | Mobile-native | `@react-native-community/datetimepicker` | P1 | L (platform deltas) |
| 6 | `ContextMenu` | Mobile-native | TBD (see Q1) | P2 mobile | M |
| 7 | `useHaptics` + `haptics` | Mobile-native | `expo-haptics` | P2 mobile | S |
| 8 | `SettingsRow` | Composite | composes Label / Switch / RadioGroup / Slider / chevron | P2 composite | M |

Effort legend: S = < 1h, M = 1–3h, L = 3–6h. Total ballpark: 12–18h focused build + verify.

## Build order

Deps-first. Each row depends only on rows above it.

```
1. Popover            (foundation primitive; reused by Select-sheet alt in future)
2. Tooltip            (long-press → popover; reuses Popover positioning patterns)
3. RadioGroup         (independent; Pressable-row pattern lifted from Checkbox)
4. Slider             (independent)
5. DateTimePicker     (independent; date | time | datetime via mode prop)
6. ContextMenu        (independent)
7. useHaptics + haptics  (lightweight wrapper; needed by SettingsRow row press feedback)
8. SettingsRow        (composes Label + RadioGroup/Slider/Switch + chevron + haptic)
```

## Infrastructure deltas

New deps in `packages/ui`:

| Package | Version | Purpose |
|---|---|---|
| `@rn-primitives/popover` | `^1.4.0` | Popover headless primitive |
| `@rn-primitives/tooltip` | `^1.4.0` | Tooltip headless primitive |
| `@rn-primitives/radio-group` | `^1.4.0` | RadioGroup headless primitive |
| `react-native-awesome-slider` | `^2.x` | Single + range slider (Reanimated-based) |
| `@react-native-community/datetimepicker` | `~9.x` | Native date/time wheels & dialogs |
| (ContextMenu lib) | TBD per Q1 | Native context menu |
| `expo-haptics` | `~16.x` (Expo SDK 56) | Haptic feedback |

No new portal hosts. `<PortalHost />` already mounted at app root (used by Select / Dialog / Toast). Popover and Tooltip reuse it.

No new providers — `zeego` (if chosen) renders into UIMenu on iOS natively. Slider and DateTimePicker are inline native views.

---

## Open questions

Each question has: **what it decides**, **the options with tradeoffs**, **recommendation + why**.

### Q1 — ContextMenu implementation library

**What it decides.** Which native (or pseudo-native) menu surface drives `ContextMenu`. Choice locks in platform feel, gesture model, animation, and accessibility behavior. Hard to swap later because consumers wire to a specific API shape.

#### Option A — `zeego` (RECOMMENDED)

`zeego` is a thin TypeScript wrapper that compiles down to:

- **iOS**: `UIMenu` via `expo-menu-actions` / `react-native-ios-context-menu`. Native long-press preview with blur, system haptic on engagement, native animations, dynamic type, dark mode automatic.
- **Android**: Material `PopupMenu` via `@react-native-menu/menu`. Material 3 styling, native ripple.
- **Web**: Radix DropdownMenu (irrelevant here, but means web devs already know the API).

Pros:
- Best-in-class native feel on both platforms. Most production iOS apps you'd compare against use `UIMenu`.
- Tree-shakable. ~3kb of JS in the consumer bundle.
- Same author family as `solito` + `dripsy` — actively maintained, widely used by Expo apps.
- API is declarative compound-component: `<ContextMenu.Root> <ContextMenu.Trigger> <ContextMenu.Content> <ContextMenu.Item> <ContextMenu.Label> </ContextMenu.Content> </ContextMenu.Root>`. Matches the rest of our `@rn-primitives` family ergonomically.

Cons:
- Two transitive native deps (`react-native-ios-context-menu` + `@react-native-menu/menu`). Both ship prebuilt for Expo Go via config plugins; but `react-native-ios-context-menu` does require a custom dev client if we want the preview feature — Expo Go's bundled native code covers the menu itself.
- Slight version drift risk between zeego and its two backing libs; pin all three.

#### Option B — `@rn-primitives/context-menu`

JS-only context menu. Long-press on trigger → portal-rendered floating panel.

Pros:
- Family consistency: same author, same primitive style as our Popover/Tooltip/Select/Dialog. Zero new patterns to learn.
- Zero native deps. No Expo Go quirks, no dev client. Works identically to Popover under the hood.
- Fully styleable with our tokens. Dark mode flips automatically via `useColorScheme`.

Cons:
- **No native iOS preview**. Long-press shows a popover, not a UIMenu. On iOS this reads as "this app didn't bother with native polish". For a design-system that ports from Untitled UI's premium feel, this is a regression vs zeego.
- No system haptic on engage — we'd have to fire it manually from `useHaptics` (Q7's hook), which actually couples Q6 ↔ Q7 in a way zeego avoids.
- Long-press timing is JS-driven, less crisp than UIKit's 0.5s gesture recognizer.

#### Option C — `expo-context-menu`

Expo's own context-menu module.

Pros:
- One vendor (Expo), no third-party install. Auto-config under Expo SDK.

Cons:
- **Module status is "Preview"** in Expo SDK 56 docs. No API stability guarantee.
- Less feature coverage than zeego: no nested submenus, no destructive style on Android, no inline icons on Android.
- Smaller community footprint — fewer recipes, fewer real-world consumers reporting bugs.

#### Recommendation: **A — zeego**

Rationale:
1. Design system's premise is "Untitled UI look + RN-native feel". UIMenu's preview is the iconic iOS context-menu experience; reproducing it via popover (Option B) looks deliberately worse.
2. Zeego's compound-component API matches the `@rn-primitives/*` shape we already use, so consumer ergonomics stay consistent.
3. Maintenance risk is mitigated by pinning all three packages and the explicit native-dep documentation.

Trade we accept: one more native dep + a small consumer-side install note ("ContextMenu's UIMenu preview requires a dev client; non-preview menu works in Expo Go").

---

### Q2 — DateTimePicker scope (single vs split)

**What it decides.** Whether `DateTimePicker` is one component with a `mode` prop or two components (`DatePicker` + `TimePicker`). Affects file count, demo count, doc layout, and call-site ergonomics.

#### Option A — Single `<DateTimePicker mode>` (RECOMMENDED)

```tsx
<DateTimePicker mode="date" value={d} onChange={setD} />
<DateTimePicker mode="time" value={d} onChange={setD} />
<DateTimePicker mode="datetime" value={d} onChange={setD} />
```

Pros:
- 1:1 with `@react-native-community/datetimepicker`'s `mode` prop. Smaller surface, fewer abstractions.
- Single file, single demo screen, single docs entry.
- Easier to add `mode="countdown"` later (Android-only feature) without a third top-level component.
- Variant ramp (display, minimumDate, maximumDate, locale) shared across all three modes.

Cons:
- Call sites must always pass `mode`. Verbose for the common case (date only).
- Type narrowing for `mode`-specific props (e.g. `minuteInterval` is time-only) requires a discriminated union, which the upstream lib doesn't model — we'd inherit upstream's loose typing.

#### Option B — Split into `DatePicker` + `TimePicker`

```tsx
<DatePicker value={d} onChange={setD} />
<TimePicker value={d} onChange={setD} />
```

Pros:
- Most ergonomic call site. Common case (date only) reads cleanly.
- Per-component prop narrowing — `<TimePicker minuteInterval={5} />` only exists where applicable.
- Easier discovery in IDE autocomplete (typing "Da…" finds DatePicker directly).

Cons:
- Two files, two demos, two docs entries. Both wrap the same lib with 90% identical code → DRY violation.
- `datetime` mode is awkward: would either be a third component (`DateTimePicker`) or omitted. Omitting cuts a useful pattern.
- Skill doc has to explain "use DatePicker for date, TimePicker for time, but if you need both at once import DateTimePicker" — same ambiguity Option A solves.

#### Recommendation: **A — single component with `mode` prop**

Rationale:
1. Mirrors upstream API. Consumers reading `@react-native-community/datetimepicker` docs hit the same `mode` they pass to us — zero translation cost.
2. DRY: one component, one set of platform-delta handlers (iOS shows inline wheel; Android opens a dialog). Splitting means duplicating that logic.
3. The verbosity argument (Option B's main pro) is weakened by the fact that consumers wrap pickers in their own field component (`<BirthdayField>` etc.) — they rarely call ours directly twice.

---

### Q3 — Slider scope v1 (single thumb vs single + range)

**What it decides.** Whether v1 ships range-slider support or defers it. Affects library choice — `@react-native-community/slider` does NOT support a second thumb.

#### Decision: **LOCKED — single + range, one unified library**

User locked range support in v1 (2026-05-22).

**Lib:** `react-native-awesome-slider` (~v2.x).

- Reanimated v4 + gesture-handler driven. Stack we already use across `SwipeableRow`, `BottomSheet`, `SegmentedControl`.
- Single thumb: `<Slider progress />`.
- Range thumb: `<Slider progress lowerValue upperValue />` (both shared values).
- One animation profile + one thumb visual across modes → no visual drift.
- Token-styled thumb (we own radius / shadow / color), not native UISlider chrome.

**API shape:**

```tsx
// Single
<Slider value={vol} min={0} max={100} step={1} onChange={setVol} />

// Range
<Slider value={[lo, hi]} min={0} max={100} step={1} onChange={([l, h]) => …} />
```

Internal: `value: number | [number, number]`. Single → one Reanimated SharedValue. Range → two SharedValues + lower/upper props. Same component, prop-narrowed branching.

**Rejected alternatives:**

| Option | Why rejected |
|---|---|
| `@react-native-community/slider` (single) + `rn-range-slider` (range) | Two libs = two thumb visuals = drift. |
| `@miblanchard/react-native-slider` | Older, JS-driven (no Reanimated). Less smooth on Android. |
| Defer range to follow-up | User explicitly needs range in batch 8. |

**Trade accepted:** thumb is not native UISlider on iOS. JS-styled thumb matches the rest of our overlay surfaces (Dialog, BottomSheet, Toast) which are also JS-rendered, not native chrome.

---

### Q4 — SettingsRow API shape (children vs discriminated union)

**What it decides.** How consumers compose a settings row. Affects type safety, ergonomics, and consistency with `FormField`.

#### Option A — Children slot (RECOMMENDED)

```tsx
<SettingsRow leading={Bell} title="Notifications" subtitle="Push, email, SMS">
  <Switch checked={enabled} onCheckedChange={setEnabled} />
</SettingsRow>

<SettingsRow leading={Moon} title="Appearance">
  <RadioGroup …>…</RadioGroup>
</SettingsRow>

<SettingsRow leading={Volume2} title="Volume" subtitle={`${vol}%`}>
  <Slider value={vol} onChange={setVol} />
</SettingsRow>

<SettingsRow leading={ChevronRight} title="Account" onPress={…} />
// no children → just chevron on the right
```

Pros:
- Consistent with `FormField`'s decided pattern (Q2 of batch 6). Two composite components, same mental model.
- Future-proof — any new control (a custom toggle, a small button) drops in without SettingsRow API churn.
- No discriminated-union maintenance burden. The control's own props stay native to that control.

Cons:
- Less guardrail: a consumer could put a `<Button>` or arbitrary JSX in the slot. Acceptable trade — `FormField` has the same property and hasn't caused real issues.
- Layout of the right edge (alignment, width budget) has to be opinionated by SettingsRow regardless of child type.

#### Option B — Discriminated union by `type`

```tsx
<SettingsRow type="switch" title="Notifications" value={enabled} onValueChange={setEnabled} />
<SettingsRow type="radio" title="Theme" value={theme} onValueChange={setTheme} options={[…]} />
<SettingsRow type="slider" title="Volume" value={vol} onValueChange={setVol} />
<SettingsRow type="link" title="Account" onPress={…} />
```

Pros:
- Tight type guardrails. Wrong props for the chosen `type` are compile errors.
- Slightly cleaner call site for the common cases.

Cons:
- Coupling: SettingsRow now knows about Switch, RadioGroup, Slider, Button internally. New control = new `type` + new branch in implementation = new release.
- Inconsistent with FormField. Two composite components with two API styles is a design-system smell.
- Bypassing the union ("I want a Stepper here") becomes awkward — adding `type="stepper"` then `type="custom"` re-introduces children-slot via the back door.

#### Recommendation: **A — children slot**

Rationale:
1. Consistency with FormField is the dominant factor. Composite components in this repo speak the same compositional language.
2. The "wrong child" risk is low in practice and not worth the per-type branching.
3. Easier to land — no per-control prop forwarding to type-narrow.

---

### Q5 — Tooltip trigger model on RN

**What it decides.** What gesture/event shows the tooltip. Web has hover; RN doesn't. Must pick the mobile substitute.

#### Option A — Long-press only (RECOMMENDED)

Press-and-hold the trigger for 500ms → tooltip appears anchored to the trigger via Popover positioning. Release → tooltip closes. Same gesture iOS uses for its native tooltips and ContextMenu.

Pros:
- One gesture model, easy for users to discover (consistent with iOS UIMenu).
- Doesn't compete with onPress — a normal tap still fires onPress. Tooltip only on hold.
- Library-supported: `@rn-primitives/tooltip` exposes `delayDuration` directly.

Cons:
- Long-press already conflicts with ContextMenu's gesture on the same surface. If a row needs both a context menu AND a tooltip, the consumer must choose.

#### Option B — Long-press + tap-to-dismiss (sticky)

Long-press opens, stays open until tapped elsewhere. Like an info popover.

Pros:
- Information persists long enough to read for verbose tooltips.

Cons:
- Two different dismiss models in our overlay family (Popover sticky, Tooltip transient) would diverge from web mvp-ui's Tooltip-as-hover semantic.
- Less "tooltip-y", more "info-popover-y" — for that we already have Popover.

#### Option C — Focus-only (keyboard nav)

Tooltip appears when a focusable trigger receives focus (Bluetooth keyboard, switch control).

Pros:
- Accessibility win for external-keyboard users.

Cons:
- Most consumers don't trigger focus on RN. Bare buttons aren't focusable by default. Would be invisible to 99% of users.

#### Recommendation: **A — long-press only**, with `delayDuration={500}` default

Rationale:
1. Matches platform expectation (iOS shows tooltips on touch-and-hold).
2. Simplest mental model — gesture-down shows, gesture-up hides.
3. ContextMenu conflict is real but rare; document the precedence rule ("if both are wired on the same trigger, ContextMenu wins").
4. Add focus-trigger as an opt-in `triggerOn={["press", "focus"]}` prop in a follow-up batch when keyboard nav lands.

---

### Q6 — Popover scope (positioning + arrow)

**What it decides.** How much of `@rn-primitives/popover`'s positioning API we expose in v1.

#### Option A — Full positioning, no arrow indicator (RECOMMENDED)

Expose `side` (`top` / `bottom` / `start` / `end`), `align` (`start` / `center` / `end`), `sideOffset` (default 8). No arrow component — popover is a plain rounded surface with shadow, anchored visually by proximity to trigger.

Pros:
- Matches our overlay style (Dialog has no arrow, BottomSheet has no arrow).
- Cleaner visual language for the design system. Untitled UI's web popover is also arrow-less in the default variant.
- Smaller component surface, less to test.

Cons:
- Some consumer contexts (small icon buttons in a dense toolbar) benefit from an arrow to tie popover to trigger.

#### Option B — Full positioning + optional arrow

`<PopoverArrow />` as a sub-component. Renders a 12×6 triangle via SVG matching popover bg + shadow.

Pros:
- Belt-and-suspenders affordance, useful in dense UIs.
- Web mvp-ui has an arrow variant.

Cons:
- Arrow positioning is finicky (must align to trigger center, must adjust for `align`, must adjust for boundary collisions). Implementation cost is moderate.
- Visual inconsistency with the rest of our overlays.

#### Option C — Minimum: `side="bottom"` only

Hard-code bottom alignment. No `side` prop.

Pros:
- Trivial implementation.

Cons:
- Useless for triggers near the screen bottom (popover clips off screen).

#### Recommendation: **A — full positioning, no arrow**

Rationale:
1. Visual consistency with the rest of our overlay family.
2. Arrow adds engineering cost (SVG + dynamic positioning) for marginal UX gain.
3. Defer arrow to a follow-up if a consumer asks. Non-breaking add.

---

### Q7 — `useHaptics` / `haptics` API shape

**What it decides.** Whether haptic feedback is a hook (component-bound) or an imperative singleton (callable anywhere).

#### Option A — Both: imperative `haptics.*` + `useHaptics()` (RECOMMENDED)

```ts
// Imperative — usable from event handlers anywhere
import { haptics } from "@mvp-ui-rn/ui"
haptics.selection()
haptics.impact("light" | "medium" | "heavy")
haptics.notify("success" | "warning" | "error")

// Hook — gives same surface but respects user prefs (Settings → Reduce Motion → Haptics)
const h = useHaptics()
h.selection()
```

Pros:
- Imperative API handles 90% of cases (button onPress → haptic). No hook boilerplate at call site.
- Hook adds opt-in user-preference gating — `useHaptics()` returns no-op functions if user disabled haptics or has Reduce Motion on. Imperative API skips that check; consumer must gate manually if desired.
- Mirrors how `toast` (imperative singleton) and `useColorScheme` (hook) coexist in our repo.

Cons:
- Two surfaces to document.

#### Option B — Hook only

`useHaptics()` everywhere. Callable from any component.

Pros:
- Forces user-preference gating in all call sites.
- One surface.

Cons:
- Hook can't be called from non-React contexts (e.g. a Zustand store action, a deep callback in a saga). Consumer would need to call hook at component boundary and pass the function down — boilerplate.

#### Option C — Imperative only

`haptics.*` everywhere. No hook.

Pros:
- Simplest possible API.

Cons:
- No user-preference gating layer. Power users with haptics disabled in iOS Settings still get system-level no-op, but no app-level toggle.

#### Recommendation: **A — both surfaces**

Rationale:
1. Imperative API matches the toast pattern — already familiar to consumers.
2. Hook layer adds preference gating, which we'll want for accessibility later.
3. Minimal duplication: `useHaptics` is a thin wrapper that no-ops when prefs disable haptics. ~20 lines of code.

---

### Q8 — RadioGroup row interaction pattern

**What it decides.** How a radio option is laid out and what triggers the selection. Affects accessibility and feel.

#### Option A — Pressable row, full-row tap (RECOMMENDED)

```tsx
<RadioGroup value={theme} onValueChange={setTheme}>
  <RadioGroup.Item value="light" label="Light" hint="Always light" />
  <RadioGroup.Item value="dark" label="Dark" hint="Always dark" />
  <RadioGroup.Item value="system" label="System" hint="Follow OS" />
</RadioGroup>
```

Row is a Pressable. Tap anywhere on the row selects that option. Visual: 20×20 circle on the left (or right per platform), label on the other side, hint below label. Hit slop extends row height to 48pt minimum.

Pros:
- Matches Checkbox's row pattern. One mental model across both controls.
- iOS settings pattern — Apple's Settings app uses full-row tap for radio-style choices.
- VoiceOver friendly: `accessibilityRole="radio"` on the row, `accessibilityState={{ checked }}`.

Cons:
- Larger touch target = more screen real estate. For dense lists, may feel chunky.

#### Option B — Circle-only tap

Tap registers only on the 20×20 circle indicator. Label and hint are non-interactive.

Pros:
- Smaller touch surface, denser layout possible.

Cons:
- Sub-44pt touch target. Violates our P0 rule.
- Inconsistent with Checkbox (which we shipped as full-row).

#### Option C — Both circle-tap AND label-tap

Same as A but layout adapts when a row also has a separate trailing control (e.g. info button).

Pros:
- Edge case handled for hybrid rows.

Cons:
- Edge case is rare; can be solved with a slot prop later.

#### Recommendation: **A — full-row Pressable**

Rationale:
1. Consistency with Checkbox is the dominant factor — same compound pattern, same hit slop, same accessibility shape.
2. iOS HIG and Material 3 both endorse full-row tap for list-style radio.
3. Touch target floor (≥ 44pt) compliance is automatic.

---

## Risks / open follow-ups (post-batch)

- **`@rn-primitives/tooltip` portal**: needs the existing PortalHost. Confirmed mounted.
- **`zeego` Expo Go limitation**: long-press *preview* (the bouncy enlargement on iOS) requires a custom dev client. The menu itself works in Expo Go. Document as a deferred-polish item, not a blocker.
- **DateTimePicker dark mode on Android**: native Android dialog inherits app theme via the activity's `android:theme`. We rely on `expo-system-ui` already configured for both modes. Verify in batch verification step.
- **Slider thumb shadow**: iOS UISlider thumb has a built-in shadow. Android Slider thumb does not. Decide whether to override Android thumb color to match the visual weight.
- **Haptics opt-out**: future iteration adds a global `<HapticsProvider enabled>` if consumers ask. Out of scope for this batch.

## Verify approach

Same playbook as prior batches:
1. Maestro flow at `apps/showcase/.maestro/batch8-showcase.yaml`.
2. Wrapper `apps/showcase/scripts/verify-batch8.sh`.
3. pnpm script `verify:batch8`.
4. Light + dark screenshots per component.
5. Real-device pass for Slider thumb feel and DateTimePicker wheel feel (Maestro screenshots won't catch native chrome).

## Decisions to record

When user confirms recommendations, this section gets filled in at the bottom of `docs/component-status.md` under a new heading **"Batch 8 (Floaters + forms-completion) — 2026-05-22"** mirroring batch 6/7's "decisions locked" block.
