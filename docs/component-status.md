# Component Status — mvp-ui-rn

Source of truth for which components are ported, in progress, or not yet started.
Update at the end of every session per CLAUDE.md mandate.

## Legend

| Mark | Meaning |
|---|---|
| ✅ | Ported, demoed in `apps/showcase`, documented in `packages/skill/components-rn.md` |
| 🚧 | In progress — partial implementation or pending demo/docs |
| ❌ | Not started |
| ⚠️ | Web-only — no RN port planned |

## Roadmap structure

Two-lens approach. Web-port parity = design-system consistency with `mvp-ui` (web). Mobile-native additions = patterns that web has no analog for but every real mobile app needs.

Priority tiers live below the inventory. Build order follows tier (P0 → P2), not inventory order.

## Inventory — Web-port parity

Ported from `mvp-ui` (web). Same variant API, same look, RN deltas documented per component.

| Component | Status | Notes |
|---|---|---|
| Button | ✅ | `packages/ui/src/components/button.tsx`. All 9 colors × 4 sizes + iconOnly + isLoading. RN deltas: `ActivityIndicator` spinner (tint does NOT flip in dark — follow-up), `hover:`/`focus-visible:` dropped, `min-h-11` (44pt) baked into every size. Demo: `apps/showcase/src/app/components/button.tsx`. Docs: `packages/skill/components-rn.md#button`. |
| Badge | ❌ | Uses tag-* semantic tokens. |
| Input | ❌ | `TextInput` based. Auto-grow not native. |
| Label | ❌ | Pair with form controls; `nativeID` instead of `htmlFor`. |
| Avatar | ❌ | `expo-image` for remote sources. |
| Icon wrapper | ❌ | Wrap `lucide-react-native`; respect `IconProp` contract. |
| Checkbox | ❌ | `@rn-primitives/checkbox`. |
| RadioGroup | ❌ | `@rn-primitives/radio-group`. |
| Switch | ❌ | `@rn-primitives/switch`. |
| Select | ❌ | `@rn-primitives/select`. |
| Textarea | ❌ | `TextInput multiline`. |
| PinInput | ❌ | Custom; consider `react-native-confirmation-code-field` as reference. |
| Dialog | ❌ | `@rn-primitives/dialog` + `@rn-primitives/portal`. |
| Drawer | ❌ | Use `@gorhom/bottom-sheet` — RN-idiomatic drawer is bottom sheet. |
| Popover | ❌ | `@rn-primitives/popover`. |
| Tooltip | ❌ | `@rn-primitives/tooltip`; touch-adjusted (long-press to show). |
| Toast | ❌ | Consider `burnt` or custom + portal. May overlap with `Snackbar` in mobile-native section — decide on one. |
| Tabs | ❌ | `@rn-primitives/tabs`. Content tabs (not bottom navigation — see `TabBar` in mobile-native). |
| Breadcrumb | ❌ | Less common on mobile; defer unless requested. |
| Pagination | ❌ | Mobile UX often prefers infinite scroll — confirm with user. |
| SideNav | ❌ | No primitive. `Drawer` from `react-native-drawer-layout` or custom. |
| Card | ❌ | Surface composition. |
| Alert | ❌ | Status surfaces (info/success/warning/error). |
| Table | ⚠️ | RN uses `FlatList` patterns; "Table" semantics don't transfer 1:1. Defer / redesign. |
| Skeleton | ❌ | Reanimated shimmer. |

## Inventory — Mobile-native additions

No direct web equivalent. App-readiness gap if missing. Build these alongside web ports to ship real screens.

### Navigation shells

| Component | Status | Notes |
|---|---|---|
| TabBar | ❌ | Bottom tab navigation. Expo Router `<Tabs>` skin with design-system styling + badges + blur background + safe-area. Most-used mobile pattern. |
| Header | ❌ | Screen header with large-title iOS pattern, collapsible on scroll, back button + title + right actions. Distinct from web header. |
| SegmentedControl | ❌ | iOS-style pill picker. Different UX from `Tabs` (Tabs = content sections, SegmentedControl = filter/mode switch). |

### Interaction primitives

| Component | Status | Notes |
|---|---|---|
| SwipeableRow | ❌ | Left/right swipe reveals actions (Mail-style). `react-native-gesture-handler` Swipeable. |
| PullToRefresh | ❌ | `RefreshControl` wrapper. Convention not optional. |
| ActionSheet | ❌ | iOS-native sheet of options. `@expo/ui` or custom over bottom-sheet. |
| ContextMenu | ❌ | Long-press menu. iOS 13+ native via `zeego` or `expo-context-menu`. |
| KeyboardAvoidingScroll | ❌ | Layout wrapper — every form needs it. |
| HapticFeedback | ❌ | `expo-haptics` wrapper. Design-system concern: when to fire (success/warning/selection). |

### Content surfaces

| Component | Status | Notes |
|---|---|---|
| List + ListItem + ListSection | ❌ | Grouped iOS list (Settings app pattern). `SectionList`-based. Distinct from Card grid. |
| EmptyState | ❌ | Illustration + headline + CTA. High frequency on mobile. |
| BottomSheet (detent variants) | ❌ | Extends `Drawer` → snap points (half/full), modal-sheet (pull-down dismiss). `@gorhom/bottom-sheet`. |
| SafeArea wrapper | ❌ | `react-native-safe-area-context`. Layout primitive — wraps every screen. |
| StatusBar | ❌ | Per-screen light/dark control via `expo-status-bar`. |

### Inputs

| Component | Status | Notes |
|---|---|---|
| Stepper | ❌ | `-` / number / `+`. iOS-native pattern. |
| Slider | ❌ | `@react-native-community/slider`. Web range input no good on touch. |
| DatePicker / TimePicker | ❌ | `@react-native-community/datetimepicker`. Native wheels on iOS, dialog on Android. |
| SearchBar | ❌ | Header-integrated search with cancel button. Distinct from `Input`. |

### Media + feedback

| Component | Status | Notes |
|---|---|---|
| Image | ❌ | `expo-image` wrapper with placeholder + blurhash + transition. General-purpose, complements `Avatar`. |
| ProgressBar | ❌ | Determinate horizontal progress. |
| CircularProgress | ❌ | Determinate circular. Reanimated. |
| Spinner | ❌ | Standalone (Button has it inline). Should share tint logic with Button spinner — fix dark tint follow-up here too. |
| Snackbar | ❌ | Bottom bar with action. Decide vs `Toast` — likely Toast = ephemeral, Snackbar = actionable. |
| Banner | ❌ | Persistent in-page notice. Distinct from `Alert` (modal). |

### Composite / application-type

Composed from primitives. Open question whether design-system surface or app-layer concern — decide per item before building.

| Component | Status | Notes |
|---|---|---|
| FormField | ❌ | `Label` + `Input` + helper + error. Controlled by `react-hook-form`. Likely design-system. |
| SettingsRow | ❌ | `Label` + control (Switch/Select/chevron). iOS Settings convention. Likely design-system. |
| Card variants | ❌ | ProductCard / ListCard / MediaCard. Likely app-layer; design-system provides base `Card`. |
| Onboarding slides | ❌ | Paginated intro with dots. App-layer. |
| FAB | ❌ | Material primary action. Android-leaning. |

## Priority tiers

Build first regardless of inventory section. Tiers reflect what's needed to ship a real mobile MVP — not web-port completeness.

| Tier | Components |
|---|---|
| **P0 — must have** | Input · Label · Icon wrapper · Card · Alert · SafeArea wrapper · Header · TabBar · List/ListItem · BottomSheet · SearchBar · EmptyState · Spinner · KeyboardAvoidingScroll · FormField |
| **P1 — likely needed** | Badge · Avatar · Checkbox · Switch · Select · Textarea · Dialog · Toast · Tabs · Skeleton · SegmentedControl · SwipeableRow · PullToRefresh · ActionSheet · Stepper · Slider · DatePicker · Image · ProgressBar · SettingsRow |
| **P2 — niche / defer** | RadioGroup · PinInput · Popover · Tooltip · Breadcrumb · Pagination · SideNav · ContextMenu · FAB · Onboarding · Banner · CircularProgress · Snackbar · HapticFeedback · StatusBar |
| **⚠️ defer / redesign** | Table |

## Bootstrap notes (2026-05-21)

Repo scaffolded via Task 1 of `docs/init-prompt.md`:

- pnpm workspace at root: `apps/*` + `packages/*`.
- `apps/showcase` — Expo SDK 56 + Expo Router (newer than CLAUDE.md "SDK 54+" minimum; works the same).
- `packages/tokens` — TS constants (`tokens.ts`) + Tailwind v4 `@theme` CSS (`global.css`). Verbatim web snapshots in `tokens.css` / `theme.css` for reference + future web export.
- NativeWind v5 (preview) + Tailwind v4 wired via `metro.config.js` `withNativewind`. **No `tailwind.config.ts`** — Tailwind v4 reads `@theme` directly from CSS. **No babel plugin** — v5 is bundler-only.
- Dark mode: `@media (prefers-color-scheme: dark)` on `:root`. NativeWind v5 maps `dark:` variant to this query — automatic system-pref flipping. `.dark:root` selector (web-only) intentionally NOT used. CLAUDE.md "Dark-safe styling" wording about `.dark:root` should be updated when CLAUDE.md is next touched.
- Biome 2 formatter configured with `semicolons: asNeeded` per user preference. JS/TS files in this repo omit trailing semicolons.

## Open follow-ups

- **Dark-mode toggle strategy** — both wired (2026-05-22): system-pref drives automatic flips via `@media (prefers-color-scheme: dark)`, and the `ThemeToggle` in the showcase header drives a user override via `Appearance.setColorScheme`. Open: confirm which is the *intended* default for real consumer apps (system-only is current product default).
- **Font loading** — Inter Variable wired in showcase via `expo-font` + local `apps/showcase/assets/fonts/Inter.ttf` (single 880KB TTF covers every weight via RN variable-font support). `useFonts` holds the splash until ready. Consumer apps replicate the pattern OR override `--font-sans` per their own brand.
- **Icon cssInterop** — still pending. Spinner + lucide icons currently take per-variant hex via JS token export (light/dark maps in `button.tsx`); wiring `cssInterop` would let className drive these and clean up the dark-mode hex duplication.
- Decide Toast vs Snackbar — one component or two with different semantics (ephemeral vs actionable).
- Decide which composite components (FormField, SettingsRow, Card variants) live in `packages/ui` vs app-layer.
- Confirm P0 list with user before sequencing builds.

## Tokens backlog progress (vs docs/tokens-rn-adjustments.md)

| § | Item | Status |
|---|---|---|
| 1 | Typography line-heights pairs | ✅ `packages/tokens/src/typography.ts` + `--leading-*` in `global.css` |
| 2 | Font loading | ✅ Inter Variable via `expo-font` in showcase `_layout.tsx` |
| 3 | size.ts (touchTarget, controlHeight, controlPaddingX, iconSize) | ✅ + `--size-control-*` / `--size-touch-min` CSS mirrors |
| 3a | Button size ramp (sm=40, md=48 default, lg=56, xl=64) | ✅ Applied |
| 4 | `--color-ring` repurpose | ⚠️ Still declared, unused — drop or rename `--color-focus-border` when keyboard-nav target ships |
| 5 | shadow.ts (iOS shadow* + Android elevation, light + dark maps) | ✅ `packages/tokens/src/shadow.ts` |
| 6 | motion.ts (duration + easing) | ✅ `packages/tokens/src/motion.ts` |
| — | JSON source-of-truth generator | ❌ Not scheduled |

## NativeWind v5 install gotchas (encountered 2026-05-22)

1. **PostCSS config required.** Tailwind v4 `@theme` directives are processed by `@tailwindcss/postcss` BEFORE `react-native-css`'s Metro transformer touches the CSS. Missing → `Unknown at rule: @theme` warning + bundle abort. Fixed via `apps/showcase/postcss.config.js`:
   ```js
   module.exports = { plugins: { "@tailwindcss/postcss": {} } }
   ```
2. **lightningcss must be pinned to 1.30.1.** NW v5 docs (Migrate from v4 page) call this out explicitly. Newer lightningcss (1.31+) breaks with `failed to deserialize; expected an object-like struct named Specifier, found ()` when parsing `nativewind/theme.css`'s nested `@media ios { ... }` blocks. Pinned via root `package.json` `pnpm.overrides`.
