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
| Button | ✅ | `packages/ui/src/components/button.tsx`. All 9 colors × 4 sizes + iconOnly + isLoading + asChild. Mobile-tuned ramp (sm=40 / md=48 default / lg=56 / xl=64). **Per-size font steps with height**: sm=text-sm / md=text-md / lg=text-lg / xl=text-xl (fixed 2026-05-22 — prior `lg: text-md` matched md font and read as same size on hardware; see trap #13). Custom `<Spinner>` via `react-native-svg` + Reanimated mirrors the web two-circle pattern. Per-variant `iconTint` maps (light + dark, switched via `useColorScheme`) for lucide icons and spinner. Dark-mode parity verified in both modes. Demo: `apps/showcase/src/app/components/button.tsx`. Docs: `packages/skill/components-rn.md#button`. |
| Badge | ✅ | `packages/ui/src/components/badge.tsx`. 12 colors × 3 sizes × 2 shapes (pill/rounded) + slot `iconLeading`. Per-size font + icon step with height per trap #13 (sm=text-xs+10px, md=text-sm+12px, lg=text-md+14px). Tag-* tokens flip per scheme. WithButton/WithImage/BadgeGroup deferred. Demo: `apps/showcase/src/app/components/badge.tsx`. |
| Input | ✅ | `packages/ui/src/components/input.tsx`. `InputBase` (field box) + composed `Input` (Label + InputBase + HintText). Sizes sm=44 / md=48 default / lg=56 per RN ramp. **Per-size font + icon step with height**: sm=text-sm+16px / md=text-md+20px / lg=text-lg+24px (fixed 2026-05-22 — prior `lg: text-md` + `lg icon: tokenIconSize.md (20px)` matched md; lg felt identical on hardware; see trap #13). State default/error/success, focus tracked via `onFocus`/`onBlur` (no `focus-within` on RN), prefix/suffix, leading/trailing icons (lucide via per-mode tint map), password mode with 44pt eye toggle, forwards mobile-native props (`keyboardType`, `autoComplete`, etc.). Dark-mode parity verified in both modes. Demo: `apps/showcase/src/app/components/input.tsx`. Docs: `packages/skill/components-rn.md#input`. |
| Label | ✅ | `packages/ui/src/components/label.tsx`. `isRequired` asterisk in `text-fg-brand`, re-tinted to `text-fg-error` when `isInvalid`. Paired by consumer via `nativeID` + `accessibilityLabelledBy` (RN has no `htmlFor`). Web `tooltip` prop deferred until Tooltip primitive lands. |
| HintText | ✅ | `packages/ui/src/components/hint-text.tsx`. Helper / error text below fields. Sizes sm/md. `isInvalid` switches to `text-fg-error` + announces via `accessibilityLiveRegion="polite"`. |
| Avatar | ✅ | `packages/ui/src/components/avatar.tsx`. 6 sizes (xs/sm/md/lg/xl/2xl) with per-size font + icon step. Cascade: src (expo-image) → initials → placeholder → lucide User. Status dot supports 4 statuses (online/offline/away/busy). `border` + `square` opt-in. Verified all sizes light + dark. |
| Icon wrapper | ✅ | `packages/ui/src/components/icon.tsx`. Token-aware wrapper around the `IconProp` contract (LOCKED — same as Spinner). `size` keyed to `iconSize.{sm,md,lg,xl}` (16/20/24/28) or raw `number`. `tint` semantic alias auto-flipping via `useColorScheme` (`fg` / `fg-secondary` / `fg-tertiary` / `fg-brand` / `fg-error` / `fg-warning` / `fg-success` / `primary-fg`); raw `color` override preserved. Renders via `renderIcon` — same channel Button/Input/Badge use. Demo: `apps/showcase/src/app/components/icon.tsx`. Docs: `packages/skill/components-rn.md#icon`. Verified iPhone 15 (iOS 18.5) light + dark via `pnpm verify:batch6`. |
| Checkbox | ✅ | `packages/ui/src/components/checkbox.tsx`. `@rn-primitives/checkbox` Root + tristate (`boolean \| "indeterminate"`) layered at wrapper. Sizes sm (20px box, text-sm) / md (24px box, text-md). States default/checked/indeterminate/disabled/invalid. SVG check + dash glyphs via `react-native-svg` mirror web paths verbatim; stroke hardcoded `#ffffff` = `--color-primary-fg`. Default `hitSlop: 10pt` extends bare-box tap area to ≥ 44pt. Composed `Checkbox` (Pressable row + box + label/hint) + `CheckboxBase` (visual-only cell for embed inside other Pressables like Select item indicator). Demo: `apps/showcase/src/app/components/checkbox.tsx`. Docs: `packages/skill/components-rn.md#checkbox`. Verified on iPhone 15 sim (iOS 18.5) light + dark via `pnpm verify:batch4`. |
| RadioGroup | ✅ | `packages/ui/src/components/radio-group.tsx`. `@rn-primitives/radio-group` Root + Item (Indicator skipped — our `GroupContext` drives circle tint per row). Controlled `value` + `onValueChange`. Sizes sm (16px circle, text-sm) / md (20px circle, text-md). Full-row Pressable mirroring Checkbox. `hitSlop: 10pt` extends bare-circle tap area to ≥ 44pt. Composed `<RadioGroup>` + `<RadioGroupItem>` + visual-only `<RadioGroupBase>` for embedding in other Pressables. Per-row `disabled` + `isInvalid` + size override. Demo: `apps/showcase/src/app/components/radio-group.tsx`. Docs: `packages/skill/components-rn.md#radiogroup`. |
| Switch | ✅ | `packages/ui/src/components/switch.tsx`. `@rn-primitives/switch` Root + Reanimated v4 animated pill (Track color + thumb translate via `useDerivedValue(withTiming(200ms))`). Sizes sm (24×44 track, 20 thumb) / md (28×52 track, 24 thumb). On-state track tint = `--color-primary` (brand-600 both modes); off-state = `bg-bg-tertiary` (gray-50 light / gray-800 dark) via `useColorScheme`. Thumb white in both modes. Composed `Switch` (Pressable row + pill + label/hint) + `SwitchBase` (visual-only pill). `slim` variant deferred to follow-up. Demo: `apps/showcase/src/app/components/switch.tsx`. Docs: `packages/skill/components-rn.md#switch`. Verified on iPhone 15 sim (iOS 18.5) light + dark via `pnpm verify:batch4`. |
| Select | ✅ | `packages/ui/src/components/select.tsx`. `@rn-primitives/select` (Radix-style compound: Root + Trigger + Portal + Overlay + Content + Item + ItemText + ItemIndicator). Trigger mirrors Input box (`triggerVariants` cva — sm h-11 / md h-12 / lg h-14). Popover elevation via `pickShadow("lg", mode)` token. Items support leading `IconProp`, disabled, right-aligned check indicator. Consumer API: `value` / `defaultValue` / `onValueChange` use `SelectOption = { value, label } \| undefined` matching primitive. **Requires** `<PortalHost />` mounted in app root (added to showcase `_layout.tsx`). Deferred for v1: `items` prop + render-prop children, `avatarUrl` / `supportingText` per-item, `selectionIndicator="checkbox"`, combobox typeahead, `variant="sheet"`. Demo: `apps/showcase/src/app/components/select.tsx`. Docs: `packages/skill/components-rn.md#select`. Verified on iPhone 15 sim (iOS 18.5) light + dark via `pnpm verify:batch4`. |
| Textarea | ✅ | `packages/ui/src/components/textarea.tsx`. `TextInput multiline` + `textAlignVertical="top"` (Android caret-at-top). Sizes sm (px-3 py-3 text-sm) / md (px-3.5 py-3 text-md) / lg (px-3.5 py-3.5 text-lg). `rows` prop drives `minHeight` via `LEADING[size] × rows + PADDING_Y[size] × 2` — content grows beyond min. States default/error/success/disabled/readonly. Composed `Textarea` (Label + TextareaBase + HintText, mirrors Input) + `TextareaBase` (standalone field). Web `::-webkit-resizer` custom SVG handle dropped (RN grows auto). Placeholder color resolved as raw hex via JS tokens. Demo: `apps/showcase/src/app/components/textarea.tsx`. Docs: `packages/skill/components-rn.md#textarea`. Verified on iPhone 15 sim (iOS 18.5) light + dark via `pnpm verify:batch4`. |
| PinInput | ❌ | Custom; consider `react-native-confirmation-code-field` as reference. |
| Dialog | ✅ | `packages/ui/src/components/dialog.tsx`. Compound: `Dialog` (Root) + `DialogTrigger` + `DialogContent` (Portal+Overlay+Content+animated panel) + `DialogHeader/Body/Footer` + `DialogTitle` + `DialogDescription` + `DialogClose`. Sizes sm (max-w-xs) / md (max-w-sm default) / lg (max-w-md). Scrim = `AnimatedPressable` (createAnimatedComponent on Pressable) with raw inline `backgroundColor` because NativeWind v5 can't interop runtime-created animated components — `className` is silently dropped. Reanimated v4 `FadeIn.duration(150)` / `FadeOut.duration(120)` on both scrim + panel (zoom/spring stripped per `[[simple-animations]]`). Scheme-aware scrim color via `useColorScheme`. Backdrop tap + Android hardware-back dismiss handled by primitive. Demo: `apps/showcase/src/app/components/dialog.tsx`. Verified iPhone 15 (iOS 18.5) light + dark via `pnpm verify:batch5`. |
| Drawer | ⚠️ | Replaced by `BottomSheet` — RN-idiomatic drawer is the bottom sheet pattern. |
| Popover | ✅ | `packages/ui/src/components/popover.tsx`. `@rn-primitives/popover` (compound: Root + Trigger + Portal + Overlay + Content). `side='top'|'bottom'` (RN primitive doesn't implement left/right; use `align='start'|'center'|'end'` for horizontal nudge). `sideOffset` default 8. Token shadow via `pickShadow("lg")`. Reanimated `FadeIn 150ms` / `FadeOut 120ms` only. Reuses existing `<PortalHost />`. No arrow (consistent with Dialog/BottomSheet). Demo: `apps/showcase/src/app/components/popover.tsx`. Docs: `packages/skill/components-rn.md#popover`. |
| Tooltip | ✅ | `packages/ui/src/components/tooltip.tsx`. **Pivoted from `@rn-primitives/tooltip` to `@rn-primitives/popover`** — the tooltip primitive only supports tap-to-open (conflicts with `onPress`), no controlled mode, no public `useRootContext`. Tooltip = Popover Root + custom `TooltipTrigger` (Pressable with `delayLongPress=500`, drives state via `PopoverPrim.useRootContext().onOpenChange` + manual `measure()`). Press-out closes via `onPressOut`. Tap outside closes via Popover overlay. `asChild` via `@rn-primitives/slot` Slot. Dark-surface tooltip (`bg-fg` + white text) in both modes. Demo: `apps/showcase/src/app/components/tooltip.tsx`. Docs: `packages/skill/components-rn.md#tooltip`. |
| Toast | ✅ | `packages/ui/src/components/toast.tsx`. Custom store + portal (no `sonner` / `burnt` dep). Module-level singleton subscribed via `useSyncExternalStore`. Imperative API: `toast(msg)` / `toast.info` / `toast.success` / `toast.warning` / `toast.error` + `toast.dismiss(id?)`. Auto-dismiss timer (`duration` ms, default 4000; `Infinity` for sticky). 4 variants with per-mode icon tint + semantic border (info/success/warning/error). Reanimated `FadeIn.duration(150)` / `FadeOut.duration(120)` (slide+spring stripped per `[[simple-animations]]`). `<Toaster />` mounted once at app root. Position default `"bottom"` (top would collide with native iOS `UINavigationBar`). Demo: `apps/showcase/src/app/components/toast.tsx`. Verified iPhone 15 light + dark via `pnpm verify:batch5`. |
| Tabs | ✅ | `packages/ui/src/components/tabs.tsx`. Compound: `Tabs` (Root) + `TabsList` + `TabsTrigger` + `TabsContent` on `@rn-primitives/tabs`. Controlled (`value` + `onValueChange`). v1 variants: `underline` (default, active border-bottom + brand label), `button-gray` (pill bg-bg-tertiary on active), `button-border` (outline pill on active). Sizes sm (40h) / md (48h, default). `fullWidth` collapses scroll + makes triggers `flex-1`. `badgeCount` prop on TabsTrigger renders a numeric pill (brand fill on active, neutral otherwise). List wraps in horizontal `ScrollView` for overflow (unless `fullWidth`). No sliding underline indicator in v1 — active trigger paints its own bottom border; deferred. `underline-shadow` + `button-minimal` variants + vertical orientation deferred. Demo: `apps/showcase/src/app/components/tabs.tsx`. Docs: `packages/skill/components-rn.md#tabs`. Verified iPhone 15 (iOS 18.5) light + dark via `pnpm verify:batch6`. |
| Breadcrumb | ❌ | Less common on mobile; defer unless requested. |
| Pagination | ❌ | Mobile UX often prefers infinite scroll — confirm with user. |
| SideNav | ❌ | No primitive. `Drawer` from `react-native-drawer-layout` or custom. |
| Card | ✅ | `packages/ui/src/components/card.tsx`. Card + CardHeader/Title/Description/Content/Footer. Mirror web; no Pressable. `shadow-xs` dropped (RN mobile chrome). `CardDescription` bumped `text-sm`→`text-md` per RN ramp. Demo: `apps/showcase/src/app/components/card.tsx`. Docs: `packages/skill/components-rn.md#card`. |
| Alert | ✅ | `packages/ui/src/components/alert.tsx`. 4 status variants (info/success/warning/error) + icon slot + AlertTitle/AlertDescription. `onDismiss` adds 44pt X button + Reanimated `FadeOut.duration(200)`. Per-variant lucide tint via light/dark hex map. Verified all 4 statuses × both modes + dismissible. |
| Table | ⚠️ | RN uses `FlatList` patterns; "Table" semantics don't transfer 1:1. Defer / redesign. |
| Skeleton | ✅ | `packages/ui/src/components/skeleton.tsx`. Reanimated opacity-pulse (1200ms, cubic-in-out, reverse). 3 shapes: rect (width/height/rounded), circle (size), text (locked 24h, width default 100%). bg-bg-tertiary base. Demo composes list-item + feed-card placeholders. |

## Inventory — Mobile-native additions

No direct web equivalent. App-readiness gap if missing. Build these alongside web ports to ship real screens.

### Navigation shells

| Component | Status | Notes |
|---|---|---|
| TabBar | ✅ | `packages/ui/src/components/tab-bar.tsx`. `tabBarScreenOptions({ isDark })` skins expo-router `<Tabs>` via screenOptions. Native routing preserved. Active tint follows `--color-primary`; inactive follows `--color-fg-tertiary`; 0.5pt hairline top border. Verified light + dark via static preview. |
| Header | ✅ | `packages/ui/src/components/header.tsx`. Custom `<Header>` primitive (title + back + right actions). 88pt fixed end-zones keep title centered. Back chevron uses `text-fg-brand` (brand-600 / brand-400). Plus `headerScreenOptions({ isDark })` for theming the native expo-router header. |
| SegmentedControl | ✅ | `packages/ui/src/components/segmented-control.tsx`. iOS pill picker with Reanimated sliding indicator (220ms cubic-out). Always controlled. Track `bg-bg-tertiary`, selected pill `bg-bg`. Verified 2/3/4 segments × light/dark; indicator snaps to selected index on mount. |

### Interaction primitives

| Component | Status | Notes |
|---|---|---|
| SwipeableRow | ✅ | `packages/ui/src/components/swipeable-row.tsx`. `ReanimatedSwipeable` from `react-native-gesture-handler` ~2.31. Data-driven `leftActions` / `rightActions` arrays of `{key,label,icon,color: primary\|destructive\|neutral,width,onPress}`. Tapping an action fires `onPress` then auto-closes. Imperative ref → `close()/openLeft()/openRight()/reset()`. Threshold defaults to half panel-width. `overshootLeft/Right={false}`. Light + dark color maps via `useColorScheme`. Demo: `apps/showcase/src/app/components/swipeable-row.tsx`. Docs: `packages/skill/components-rn.md#swipeablerow`. |
| PullToRefresh | ✅ | `packages/ui/src/hooks/use-pull-to-refresh.tsx`. Hook returning `{ refreshing, refreshControl, setRefreshing }`. Wraps RN's built-in `RefreshControl`. iOS `tintColor`+`titleColor` vs Android `colors[]`+`progressBackgroundColor` normalised via `Platform.select`. Theme-aware tint default `text-fg-tertiary` (gray-500/gray-400) via `useColorScheme`. `onRefresh` may be async — `refreshing` flips off in `finally`. Demo: `apps/showcase/src/app/components/pull-to-refresh.tsx`. Docs: `packages/skill/components-rn.md#usepulltorefresh`. |
| ActionSheet | ✅ | `packages/ui/src/components/action-sheet.tsx`. **Pivoted mid-batch from native (`@expo/react-native-action-sheet`) to design-system-controlled custom implementation on RN's built-in `Modal`** — user-driven decision after seeing side-by-side ("I prefer the Custom version C"). Single `<ActionSheetHost />` mounted at app root, singleton store, imperative API `actionSheet.present({ title?, message?, options: [{label, description?, icon?, style?, disabled?, onPress?}] }) → Promise<number \| null>`. Hook form `useActionSheet()` also available. Rich options API — per-option `icon` + `description` (native variants take strings only). iOS-style two-panel layout: main options card + separated cancel panel. RN `Animated` scrim fade + slide-up. Tokens flow: `bg-bg`, `text-fg-error` destructive, `pickShadow("xl")` panels, light+dark via `useColorScheme`. Demo: `apps/showcase/src/app/components/action-sheet.tsx`. Docs: `packages/skill/components-rn.md#actionsheet`. |
| ContextMenu | ✅ | `packages/ui/src/components/context-menu.tsx`. **Pivoted from `zeego` to existing `actionSheet` infrastructure** — zeego requires `react-native-ios-context-menu` + `@react-native-menu/menu` native deps that don't ship with Expo Go (would force dev-client build for verify). Long-press (default 500ms) opens `actionSheet.present({ title, message, options })`. Items: `{ key, label, icon, description, style?, disabled? }`. `onSelect(key | null)` — `null` on dismiss. Auto-prepends Cancel row (`showCancel` opt-out). `onPress` still fires on short tap (ContextMenu doesn't consume taps). Trade vs. zeego: no UIMenu long-press preview, gain Expo Go compat + single-lib surface. Future: zeego upgrade behind a flag for custom dev-client consumers. Demo: `apps/showcase/src/app/components/context-menu.tsx`. Docs: `packages/skill/components-rn.md#contextmenu`. |
| KeyboardAvoidingScroll | ✅ | `packages/ui/src/components/keyboard-avoiding-scroll.tsx`. ScrollView preconfigured with `keyboardShouldPersistTaps="handled"` + `keyboardDismissMode="interactive"`. `KeyboardAvoidingView` intentionally NOT wrapped (fragile across RN versions, collapses to 0h under flex columns); modern iOS scrolls focused input automatically, Android `softInputMode=adjustResize` handles resize. |
| HapticFeedback | ✅ | `packages/ui/src/hooks/use-haptics.tsx`. `expo-haptics` wrapper. Two surfaces: imperative `haptics.*` (call from anywhere — event handlers, stores, sagas) + `useHaptics()` hook (returns the same shape; future preference-gating layer). API: `selection()` / `impact("light"|"medium"|"heavy"|"soft"|"rigid")` / `notify("success"|"warning"|"error")`. Promises swallowed (fire-and-forget; expo-haptics rejects on unsupported devices). Demo: `apps/showcase/src/app/components/haptics.tsx`. Docs: `packages/skill/components-rn.md#haptics--usehaptics`. |

### Content surfaces

| Component | Status | Notes |
|---|---|---|
| List + ListItem + ListSection | ✅ | `packages/ui/src/components/list.tsx`. iOS Settings-grouped: `<ListSection title footer>` = rounded card with hairline dividers between rows. `<ListItem leading title subtitle trailing onPress disabled chevron>` — chevron default-on when pressable + no trailing. Supports lucide leading OR function-as-leading (`leading={() => <Avatar … />}`). View-based; not virtualized. |
| EmptyState | ✅ | `packages/ui/src/components/empty-state.tsx`. Icon + title + description + actions. Dashed border + `bg-bg-secondary` surface. Title bumped `text-md`→`text-lg`, description `text-sm`→`text-md` per RN ramp. Composes Button. Demo: `apps/showcase/src/app/components/empty-state.tsx`. |
| BottomSheet (detent variants) | ✅ | `packages/ui/src/components/bottom-sheet.tsx`. Wrapper over `@gorhom/bottom-sheet` v5 `BottomSheetModal`. Imperative ref API: `present()` / `dismiss()` / `snapToIndex(i)` / `expand()` / `close()`. Default `snapPoints={["50%","90%"]}`. Token-driven `bg-bg` + `pickShadow("xl")` (light + dark maps via `useColorScheme`). Drag handle visible by default (`hideHandle` opt-out). `BottomSheetBackdrop` dim + `pressBehavior="close"`. `enablePanDownToClose`. Section helpers: `BottomSheetHeader/Body/Footer/Title/Description` mirror Dialog. **Requires** `<BottomSheetModalProvider>` inside `<GestureHandlerRootView>` at app root (added to showcase `_layout.tsx`). Trust library animations — no custom Reanimated. Demo: `apps/showcase/src/app/components/bottom-sheet.tsx`. Verified iPhone 15 light + dark via `pnpm verify:batch5`. |
| SafeArea wrapper | ✅ | `packages/ui/src/components/safe-area.tsx`. Wraps `react-native-safe-area-context` SafeAreaView. `edges` array (default all 4) + `bg-bg` default. `statusBar="auto"` flips light/dark via `useColorScheme` through `expo-status-bar`. Use as outermost wrapper of every screen. |
| StatusBar | ❌ | Per-screen light/dark control via `expo-status-bar`. |

### Inputs

| Component | Status | Notes |
|---|---|---|
| Stepper | ✅ | `packages/ui/src/components/stepper.tsx`. `-` / value / `+` numeric picker. Sizes sm (h=40) / md (h=48 default). Controlled `value` + `onChange`. Clamps to `min`/`max` (defaults `0` / `Number.MAX_SAFE_INTEGER`). Custom `step` + `format`. Hold-to-repeat — 500ms initial delay → 100ms interval; refs track live `value`/`min`/`max`/`step` so latest props apply on every tick; cancels on release / clamp / disable. VoiceOver via `accessibilityRole="adjustable"` + increment/decrement actions. Center label uses `fontVariant: tabular-nums` so digits stay monospaced. Demo: `apps/showcase/src/app/components/stepper.tsx`. Docs: `packages/skill/components-rn.md#stepper`. |
| Slider | ✅ | `packages/ui/src/components/slider.tsx`. **Pivoted from `react-native-awesome-slider` (single-only) to `@miblanchard/react-native-slider`** — supports single + range from one component via `value: number | number[]`. JS-styled thumb (24px circle, brand-600 border, soft shadow) — consistent visual identity across iOS/Android, not native UISlider chrome. Active track `--color-primary`, inactive `bg-bg-tertiary` (gray-200 light / gray-700 dark) via `useColorScheme`. `onChange` continuous during drag; `onSlidingComplete` for debounced commits. Demo: `apps/showcase/src/app/components/slider.tsx`. Docs: `packages/skill/components-rn.md#slider`. |
| DatePicker / TimePicker | ✅ | `packages/ui/src/components/date-time-picker.tsx`. `@react-native-community/datetimepicker`. Single `DateTimePicker` with `mode='date'|'time'|'datetime'`. iOS: inline `display="compact"` pill (HIG-blessed); `themeVariant` from `useColorScheme()`. Android: imperative `DateTimePickerAndroid.open` triggered by a `<Button>` we render. `datetime` on Android chains date → time dialogs in sequence. Constraints via `minimumDate` / `maximumDate`. `minuteInterval` works both platforms. `is24Hour` is Android-only (iOS follows device locale). Demo: `apps/showcase/src/app/components/date-time-picker.tsx`. Docs: `packages/skill/components-rn.md#datetimepicker`. |
| SearchBar | ✅ | `packages/ui/src/components/search-bar.tsx`. Standalone pill primitive with leading Search icon + trailing X clear + optional Cancel button on focus. Always controlled. Pill bg `bg-bg-tertiary`, search keyboard preset. Plus `searchBarScreenOptions()` for the native iOS UISearchBar via `headerSearchBarOptions`. |

### Media + feedback

| Component | Status | Notes |
|---|---|---|
| Image | ✅ | `packages/ui/src/components/image.tsx`. `expo-image` wrapper with `contentFit="cover"` + `transition={200}` defaults. Optional `blurhash` prop derives the placeholder. All other expo-image props pass through. Complements `Avatar`. |
| ProgressBar | ✅ | `packages/ui/src/components/progress-bar.tsx`. Determinate linear progress. View track + Reanimated-animated fill (`withTiming` on width percent, `motion.slow` 300ms × `easing.standard`). Sizes sm (h-1.5) / md (h-2 default) / lg (h-2.5). Colors `primary` / `success` / `warning` / `error` (semantic solids, tracks stay `bg-bg-tertiary`). `value` clamped 0–100. Optional `label` (left) + `showValue` (right `${round(value)}%`) caption row above bar. `accessibilityRole="progressbar"` + `accessibilityValue`. Stripe / shimmer / indeterminate variants deferred. Demo: `apps/showcase/src/app/components/progress-bar.tsx`. Docs: `packages/skill/components-rn.md#progressbar`. Verified iPhone 15 (iOS 18.5) light + dark via `pnpm verify:batch6`. |
| CircularProgress | ❌ | Determinate circular. Reanimated. |
| Spinner | ✅ | `packages/ui/src/components/spinner.tsx`. Token-keyed `size` (`sm`/`md`/`lg` or raw number) + semantic `tint` (`fg`/`fg-secondary`/`fg-tertiary`/`fg-brand`/`fg-error`/`primary-fg`) auto-flipping via `useColorScheme`. `color` raw override preserved for Button's per-variant tint map. Demo: `apps/showcase/src/app/components/spinner.tsx`. |
| Snackbar | ⚠️ | Dropped 2026-05-22 (batch5 decision). `Toast` covers ephemeral feedback; actionable bottom bars use `BottomSheet` or a composed pattern in the app layer. |
| Banner | ❌ | Persistent in-page notice. Distinct from `Alert` (modal). |

### Composite / application-type

Composed from primitives. Open question whether design-system surface or app-layer concern — decide per item before building.

| Component | Status | Notes |
|---|---|---|
| FormField | ✅ | `packages/ui/src/components/form-field.tsx`. Composes Label + child control + HintText. API resolved Q2 → **children slot** (non-magical, no per-control coupling). Renders `<Label>` with `isRequired` / `isInvalid`, child, then `<HintText>` — `errorMessage` (with `isInvalid` tint) takes precedence over `hint`. Exposes `<FormFieldContext>` + `useFormField()` so controls can opt-in to shared state (`nativeID`, `isInvalid`, `isRequired`, `isDisabled`) — base controls auto-wire in a follow-up. `orientation="horizontal"` (Q3 OK) lays out label inline beside Checkbox/Switch; vertical is default. Wrapper drops to `opacity-50` when `isDisabled`. Pair with `*Base` controls (`InputBase`, `TextareaBase`, `Select`, `Checkbox`, `Switch`) — never the composed `Input`/`Textarea` which already render Label+HintText. Demo: `apps/showcase/src/app/components/form-field.tsx`. Docs: `packages/skill/components-rn.md#formfield`. Verified iPhone 15 (iOS 18.5) light + dark via `pnpm verify:batch6`. |
| SettingsRow | ✅ | `packages/ui/src/components/settings-row.tsx`. iOS Settings-style row composite. Children-slot pattern mirroring `FormField` (Q4 of batch 8). Two layouts via `orientation`: `"inline"` (default; control in trailing column — Switch/value text/chevron) or `"stacked"` (control below title row at full width — Slider/RadioGroup). Composes Label + leading icon + title + subtitle + trailing/below control. `onPress` makes the whole row pressable; chevron auto-renders on pressable+no-children inline rows. Group inside `<ListSection>` for grouped-card hairline-divider chrome. Demo: `apps/showcase/src/app/components/settings-row.tsx`. Docs: `packages/skill/components-rn.md#settingsrow`. |
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
- ~~Decide Toast vs Snackbar~~ — resolved 2026-05-22: `Toast` covers ephemeral, Snackbar dropped.
- Decide which composite components (FormField, SettingsRow, Card variants) live in `packages/ui` vs app-layer.
- Confirm P0 list with user before sequencing builds.

### Forms-controls batch (2026-05-22) — landed + verified

Decisions locked:
- **Q1 — Select picker:** Option A (popover via `@rn-primitives/select`). Matches web. Sheet variant deferred until BottomSheet ships.
- **Q2 — Checkbox indeterminate:** ship on first land. `checked: boolean | "indeterminate"`.
- **Q3 — FormField:** separate PR after the 4 controls. Manual `nativeID` wiring in this batch's demos (established Input pattern).

Build order shipped: Checkbox → Switch → Textarea → Select. All four pass `tsc --noEmit` across `packages/tokens` / `packages/ui` / `apps/showcase` and were verified on the iPhone 15 simulator (iOS 18.5) in both light + dark via `pnpm verify:batch4` (Maestro flow `apps/showcase/.maestro/batch4-showcase.yaml` + wrapper `apps/showcase/scripts/verify-batch4.sh`). Select popover open + item-tap + value-update path verified with an additional probe flow.

Infrastructure changes shipped alongside this batch:
- `@rn-primitives/{checkbox,switch,select}@^1.4.0` added to `packages/ui` deps.
- `<PortalHost />` mounted at the top of `apps/showcase/src/app/_layout.tsx` (outside `Stack`, inside `ThemeProvider`) — required by `@rn-primitives/select`. Future overlay primitives (Dialog, Tooltip, BottomSheet) reuse the same host.

Maestro flow notes (for future batches):
- `tapOn` on a long-scroll link in the index list was flaky — after a fresh Expo Go bundle hydration, Maestro's tap on the scrolled link consistently registered without firing the Link's onPress. Switching the batch flow to `openLink "exp://localhost:8081/--/<route>"` for each component bypasses the link-tap problem entirely.
- Cold-launch Expo Go via `launchApp: { stopApp: true }` at the start of each flow keeps state predictable between light + dark passes.
- `extendedWaitUntil` against the index title absorbs the splash-screen wait during the cold-bundle reload (~30s ceiling).

### Overlays batch (2026-05-22) — landed + verified

Decisions locked:
- **Q1 — Dialog scope:** full compound (Trigger/Portal/Overlay/Content/Header/Body/Footer/Title/Description/Close). AlertDialog deferred.
- **Q2 — BottomSheet scope:** modal + snap points via `@gorhom/bottom-sheet` v5. Persistent non-modal deferred.
- **Q3 — Toast library:** custom store + portal (no `sonner` / `burnt` dep). Variants info/success/warning/error.
- **Q4 — Snackbar:** dropped. Toast covers ephemeral; actionable bottom bars use BottomSheet or app-layer composition.
- **Animation tone:** user feedback during build — "animations way complex, unnecessary". All custom `ZoomIn` + `springify().damping()` + direction-aware `SlideInUp/Down` removed. Components now use `FadeIn.duration(150)` / `FadeOut.duration(120)` only. BottomSheet trusts library defaults (no custom Reanimated wrapper). See `[[simple-animations]]` memory.

Infrastructure changes shipped alongside this batch:
- `@rn-primitives/dialog@^1.4.0` + `@gorhom/bottom-sheet@^5` added to `packages/ui` deps. `react-native-gesture-handler` added to `packages/ui` peer.
- `<GestureHandlerRootView>` mounts above `<SafeAreaProvider>` in `apps/showcase/src/app/_layout.tsx` (required by gesture-handler for BottomSheet pan gestures).
- `<BottomSheetModalProvider>` wraps inside ThemeProvider; modals can present from anywhere.
- `<Toaster />` mounted once at root (bottom position by default).
- Maestro flow `apps/showcase/.maestro/batch5-showcase.yaml` + wrapper `apps/showcase/scripts/verify-batch5.sh` + `pnpm verify:batch5` script.

Maestro flow notes (for future overlay batches):
- BottomSheet content lives inside the native modal overlay; UIAutomation tree-walk can't see internal text labels or tap buttons inside the sheet. Dismiss via coord-tap on backdrop (`tapOn: { point: "50%, 15%" }`) — the `BottomSheetBackdrop`'s `pressBehavior="close"` closes the modal. `swipe DOWN` from the sheet body doesn't reliably trigger pan-to-close under Maestro.
- Toast position must be `"bottom"` for testing — `"top"` toasts render behind the native iOS `UINavigationBar` and don't appear in screenshots even though the component is mounted.

### P0 closers + nav batch (2026-05-22) — landed + verified

Decisions locked (Q1–Q7 confirmed before build):
- **Q1 — Icon visual surface:** ship — centralises the light/dark hex maps that Button/Spinner/Input each carry locally.
- **Q2 — FormField API:** children slot (`<FormField>{<InputBase/>}</FormField>`) — non-magical, future-proof for custom controls, no per-control coupling. `type` discriminated union rejected.
- **Q3 — FormField horizontal orientation:** ship — Checkbox / Switch demand inline layout.
- **Q4 — Tabs variants v1:** ship all three (`underline` default, `button-gray`, `button-border`). Sliding underline indicator deferred; active trigger paints own border.
- **Q5 — Tabs vertical orientation:** skip — rare on mobile.
- **Q6 — ProgressBar indeterminate:** defer — Spinner covers "thinking" UX.
- **Q7 — ProgressBar stripe/shimmer:** defer — decorative.

Build order shipped: Icon → ProgressBar → Tabs → FormField. All four pass `tsc --noEmit` across `packages/ui` / `apps/showcase` and were verified on the iPhone 15 simulator (iOS 18.5) in both light + dark via `pnpm verify:batch6` (Maestro flow `apps/showcase/.maestro/batch6-showcase.yaml` + wrapper `apps/showcase/scripts/verify-batch6.sh`).

Infrastructure changes shipped alongside this batch:
- `@rn-primitives/tabs@^1.4.0` added to `packages/ui` deps.
- No new portal hosts / providers needed — Tabs renders inline, FormField is composition only, ProgressBar uses Reanimated already in use.

P0 tier now closed. Remaining web-port: PinInput, Popover, Tooltip, Breadcrumb, Pagination, SideNav, Table (all P2 or defer/redesign).

### Mobile-interactions batch (2026-05-22) — landed

Decisions locked (Q1–Q4 confirmed before build):
- **Q1 — ActionSheet implementation:** ⚠️ pivoted mid-batch. Initial direction = native via `@expo/react-native-action-sheet` (UIAlertController on iOS, Material on Android). User reviewed side-by-side in showcase, picked **Option C — custom-only**: "I prefer the Custom version C". Final impl = single design-system component on RN `Modal` + `Animated`. Drops external dep + root provider. See ActionSheet row above for full notes.
- **Q2 — SwipeableRow action API:** data-driven `leftActions` / `rightActions` arrays. Render-prop slots rejected to keep design-system styling consistent.
- **Q3 — Stepper long-press:** ship hold-to-repeat in v1 (500ms delay → 100ms interval).
- **Q4 — ActionSheet return:** `Promise<number | null>` for composable async flows; per-option `onPress` still fires for callback-style consumers.

Build order shipped: Stepper → PullToRefresh hook → ActionSheet (native build → side-by-side compare → pivot to custom) → SwipeableRow. All four pass `tsc --noEmit` across `packages/tokens` / `packages/ui` / `apps/showcase`. Maestro flow `apps/showcase/.maestro/batch7-showcase.yaml` + wrapper `apps/showcase/scripts/verify-batch7.sh` + `pnpm verify:batch7` script.

Infrastructure changes shipped alongside this batch:
- `@expo/react-native-action-sheet@^4.1.1` added then **dropped** after pivot to custom impl.
- No new provider mount required — `ActionSheetProvider` was briefly added then removed. Single `<ActionSheetHost />` mounted alongside `<Toaster />` is all the custom variant needs.
- New `packages/ui/src/hooks/` directory — `use-pull-to-refresh.tsx` is the first hook (vs component) export.

ActionSheet pivot — **gorhom `BottomSheetModal` failure** investigated in detail before settling on RN `Modal`:
- First custom attempt used `@gorhom/bottom-sheet`'s `BottomSheetModal` (already wired for our `BottomSheet` primitive). Build looked correct: store flipped, `modalRef.current.present()` returned without exception, ref was non-null, snapPoints + handleComponent configured. **But the sheet never painted.** No scrim, no panel, no visible animation.
- Diagnosed via Maestro probe (`apps/showcase/.maestro/probe-actionsheet-custom.yaml`) plus an on-screen debug overlay rendered from the host (`AS:OPEN/2o · present-called`). Overlay confirmed every JS-side branch executed; gorhom's internal portal still produced nothing.
- Hypothesis (not fully verified, no time to bisect deeper): gorhom v5's `BottomSheetModal` has a layout-context dependency that breaks when its host is mounted at the app-root level as a sibling to a flex-1 layout child. The provider tree was correct, modal-ref was set, but the portal's internal `useAnimatedReaction` chain seems to fail-open silently in that configuration.
- Pivot = swap to RN's built-in `Modal` (transparent + animationType="none" + RN `Animated` scrim/slide). No portal magic, no measurement requirements, behaviour proven on first attempt. Final impl is ~480 lines, no external deps beyond RN core + safe-area-context.

Maestro caveats (for future swipe / overlay batches):
- **SwipeableRow gesture-driven open is flaky under Maestro** — RN-GH expects a real pan velocity that Maestro's `swipe` event doesn't always reproduce. The flow uses the imperative `Open` trigger (ref.openRight()) to verify the open state instead of relying on swipe gestures.
- **PullToRefresh `swipe DOWN`** from 30% → 85% with `duration: 1500ms` engages the iOS RefreshControl reliably. Wait on the `Refresh count: 1` text to confirm completion (the async work + state flip).
- **ActionSheet custom impl IS inspectable in Maestro** — options live in the JS tree. `tapOn: "Cancel"` and `assertVisible: "Take photo"` both work. (The original UIAlertController approach would have required coord-taps + screenshot review.)

P1 mobile-native remaining after this batch: SettingsRow, Slider, DatePicker/TimePicker, HapticFeedback (P2).

### Floaters + forms-completion batch (2026-05-22) — landed

Union of four candidate themes (forms completion + floaters + P1 mobile closers + forms-only trio). Landed all 8 components in a single batch.

Decisions locked (Q1–Q8 confirmed before build, refined during build):
- **Q1 — ContextMenu lib:** plan was zeego; **pivoted to existing actionSheet during build** — zeego requires `react-native-ios-context-menu` + `@react-native-menu/menu` native deps that don't ship with Expo Go, would force a dev-client build for verify. ContextMenu ships as long-press → actionSheet wrapper. Trade: lose UIMenu preview, gain Expo Go compat + single-lib surface. Future: zeego opt-in path for custom dev-client consumers.
- **Q2 — DateTimePicker scope:** single component with `mode='date'|'time'|'datetime'` prop, mirroring upstream API.
- **Q3 — Slider scope:** plan was "single + range via one lib (`react-native-awesome-slider`)"; **pivoted to `@miblanchard/react-native-slider`** when awesome-slider turned out to be single-only. Miblanchard supports both natively (`value: number | number[]`).
- **Q4 — SettingsRow API:** children-slot pattern (same as `FormField`). Two layouts via `orientation`: inline (default) + stacked (full-width control below title).
- **Q5 — Tooltip trigger:** long-press only (500ms). **Pivoted from `@rn-primitives/tooltip` to building on `@rn-primitives/popover`** — the tooltip primitive only supports tap-to-open (conflicts with `onPress`), no controlled mode, no public context hook. Tooltip is now a thin layer over Popover with a custom long-press trigger driving state via the popover's exported `useRootContext`.
- **Q6 — Popover scope:** full positioning (side='top'|'bottom', align='start'|'center'|'end', sideOffset, alignOffset, avoidCollisions). No arrow. RN primitive doesn't implement `left`/`right` sides — call sites use `align` for horizontal nudging.
- **Q7 — useHaptics:** both surfaces — imperative `haptics.*` (singleton) + `useHaptics()` (hook). Identical API in v1; hook gains preference-gating in a follow-up.
- **Q8 — RadioGroup row:** full-row Pressable (mirrors Checkbox). Bare-circle `hitSlop: 10pt` extends tap area to ≥ 44pt. Lifted selection state to our own `GroupContext` (primitive doesn't export `useRadioGroupContext`).

Build order shipped: Popover → Tooltip → RadioGroup → Slider → DateTimePicker → ContextMenu → haptics+useHaptics → SettingsRow. All pass `tsc --noEmit` across `packages/tokens` / `packages/ui` / `apps/showcase`. Maestro flow `apps/showcase/.maestro/batch8-showcase.yaml` + wrapper `apps/showcase/scripts/verify-batch8.sh` + `pnpm verify:batch8` script (visual verify pending on simulator).

Infrastructure changes shipped alongside this batch:
- `@rn-primitives/popover@^1.4.0` + `@rn-primitives/radio-group@^1.4.0` added to `packages/ui` deps. `@rn-primitives/tooltip@^1.4.0` installed but **not imported** — Tooltip builds on Popover instead; cleanup-pass candidate.
- `@miblanchard/react-native-slider@^2.6.0` added to `packages/ui` deps (slider impl).
- `@react-native-community/datetimepicker@9.1.0` added to `packages/ui` peerDeps + `apps/showcase` deps (via `npx expo install`). Auto-config plugin added.
- `expo-haptics@~56.0.3` added to `packages/ui` peerDeps + `apps/showcase` deps (via `npx expo install`).
- `zeego@^3.0.6` installed but **not imported** in v1 — kept for the future opt-in upgrade path. Cleanup-pass candidate.
- No new portal hosts / providers needed — `<PortalHost />` (already at app root) carries Popover + Tooltip. `<ActionSheetProvider>` (already at app root from batch 7) carries ContextMenu's underlying sheet.

Maestro caveats (for future overlay batches):
- **Popover + Tooltip content renders in the PortalHost overlay layer** — inspectable but layered above other touchables. Dismiss via backdrop-tap coords (`50%, 90%`) when needed.
- **Tooltip long-press timing** — Maestro `longPressOn` works; capture state BEFORE release because `onPressOut` closes the tooltip. Or use `tapOn { longPress: true }` with immediate `takeScreenshot`.
- **DateTimePicker on iOS** renders a native UIDatePicker pill (compact). Tapping opens the system wheel outside the JS tree — skip interactive verification, snapshot the pill only.
- **ContextMenu opens via long-press → ActionSheet** — same chrome as batch 7 ActionSheet. Options are inspectable; `tapOn: "Cancel"` dismisses.
- **Haptics are silent on simulator** — verify by tapping each button and asserting the screen rendered. Functional verification requires a real device.

P2 web-port remaining after this batch: PinInput, Breadcrumb, Pagination, SideNav, Table (defer/redesign).
P2 mobile-native remaining: CircularProgress, Banner, StatusBar, Card variants (app-layer), Onboarding (app-layer), FAB.

### Deferred (post-batch)

- **Tabs sliding indicator** — measured-translate animated underline on the `underline` variant (mirror SegmentedControl's 220ms cubic-out). Non-breaking add. Needs layout measurement of each trigger relative to the horizontal ScrollView's content origin; build when consumers ask for it.
- **Tabs `underline-shadow` / `button-minimal` variants** — defer. Two of five web variants shipped; remaining two are visual deltas only.
- **FormField auto-wire via `useFormField()`** — base controls (`InputBase`, `TextareaBase`, `Select`, `CheckboxBase`, `SwitchBase`) opt-in to read `nativeID` + `isInvalid` + `isDisabled` from FormFieldContext. v1 still requires manual prop pass-through (same as forms-controls batch). Schedule alongside SettingsRow build.
- **`Select` sheet variant** — `variant="sheet"` (bottom-sheet wheel for long lists OR ActionSheet rows for short lists). Non-breaking addition. Blocked on BottomSheet primitive shipping. Re-evaluate UX: wheel vs ActionSheet at decision time.
- **`Select` extras** — `items` prop + render-prop children form, `avatarUrl` / `supportingText` per item, `selectionIndicator="checkbox"`, combobox typeahead. Pulled out of v1 for scope; add as opt-in props in follow-ups.
- **`Switch` slim variant** — bordered track for dense dashboards. Web Toggle has it; RN port deferred to keep first land iOS-pill-shaped.
- **FormField composite** — own PR. Open API question: `control` slot (`<FormField control={<Input />} />`) vs `type` prop (`<FormField type="text" />`). Decide after consumer feedback from the 4 raw controls.
- **RadioGroup** — P2. Not in forms-controls batch. Build alongside FormField if `react-hook-form` integration demands it.
- **SettingsRow** — composes `Label` + control. Blocked on forms-controls batch landing.

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

## Component port playbook (lessons from Button — 2026-05-22)

Distilled from the Button port. Apply before / during / after every new
component. None of these surfaced in `tsc`; all required visual
per-variant audit at full screenshot resolution.

### Silent-fail traps

| # | Trap | Mitigation |
|---|---|---|
| 1 | Tailwind v4 doesn't cross workspace package boundaries. Utilities used only in `packages/ui/` or showcase `app/components/` get silently dropped → unstyled components. | Explicit `@source` directives in `packages/tokens/src/global.css`. Compile + grep before building any new component. |
| 2 | `lucide-react-native` icons ignore `className`. | Per-variant `iconTint` map. Pass `color` + `size` as props. |
| 3 | iconTint hardcoded to light hex → invisible in dark. | Light + dark maps, switch via `useColorScheme()`. |
| 4 | `ActivityIndicator` ≠ web spinner (iOS asterisk vs two-circle). | Use the canonical `<Spinner>` in `packages/ui/src/components/spinner.tsx`. |
| 5 | Root layout missing `bg-bg` wrapper → screen stays white in dark while components flip. | `<View className="flex-1 bg-bg">` at root + `contentStyle: { backgroundColor: "transparent" }` on Stack. |
| 6 | Native Stack header doesn't inherit NativeWind. | `ThemeProvider` from `expo-router` with `DarkTheme` / `DefaultTheme`. |
| 7 | `<Link>` from `expo-router` doesn't merge className into inner text. | Wrap content in `<Text>` via `<Link asChild>`. |
| 8 | Web default size `sm` (44pt HIG floor) feels cramped on mobile. | Default `md` (48pt). `sm` only inside dense containers — document in `packages/skill/components-rn.md`. |
| 9 | Brand font declared but never loaded → silent fallback to platform. | `useFonts({ Inter: require("…/Inter.ttf") })` + `SplashScreen.preventAutoHideAsync()` until ready. |
| 10 | Maestro tap on small iconOnly buttons can trip Expo Go's dev menu. | Use `xcrun simctl ui` to drive state externally, or build always-on demo rows that don't need a tap. |
| 11 | Maestro `tapOn` doesn't wait for React state flush → state-dependent screenshots miss the state. | `waitForAnimationToEnd` after taps, OR always-on demo rows. |
| 12 | Declaring "renders correctly" from one good variant → other variants silently broken. | Per-variant audit at full screenshot resolution, every variant × {light, dark, disabled, loading, pressed}. |
| 13 | Per-size **font + icon** stalls while height/padding step up (e.g. web pattern `lg: text-md` same as `md: text-md`). On a real device `lg` then reads as "just a taller `md`" — perceived as no size step. Maestro screenshots at 393×852 don't expose this; only real-device feel does. | Each size step MUST bump font AND icon one Tailwind unit. Sync `inputTextVariants` / `inlineTextVariants` / `labelVariants` / `inlineIconSize` to the same step as `controlHeight`. Verify on hardware, not screenshots. |
| 14 | Screenshot-based audit can't catch perceived-size complaints. "Looks fine in 393×852 PNG" ≠ "feels right at arm's length on iPhone". | When user reports a size/feel issue, push to physical device and re-evaluate before any token-ramp change. Bumping the ramp blindly after a screenshot audit risks double-correction. |
| 15 | `Animated.createAnimatedComponent(Pressable)` silently drops `className` — NativeWind v5 only auto-interops a known list of components (Animated.View / Text / Image / etc), not anything `createAnimatedComponent` returns. Symptom: scrim bg invisible, content blends with screen, dialog looks like inline content. | Use raw inline `style={{ backgroundColor }}` on the AnimatedPressable. Resolve token colors via `useColorScheme()` + JS hex maps. Document the constraint at the call site. |
| 16 | Maestro UIAutomation can't reach into `@gorhom/bottom-sheet` native modal layer — text labels + buttons inside the sheet aren't selectable. Also: iOS native `UINavigationBar` lives outside the JS tree, so top-anchored portal content (toasts at `top: insets.top + 8`) renders behind it and looks like the toast never appeared. | For BottomSheet: dismiss via coord-tap on backdrop (`tapOn: point: "50%, 15%"` — `pressBehavior="close"`). For toasts: default `position="bottom"`. Document both as Maestro caveats in the per-batch flow comments. |

### Build template (next component)

1. Add row to **Inventory** above with status 🚧.
2. Open the web ref at the path listed in `docs/web-component-map.md`. Screenshot the demo at iPhone-15 viewport (393 × 852) via Chrome DevTools MCP for visual reference.
3. Plan the variant matrix — list every (variant × state × mode) tuple, then confirm token coverage.
4. Compile `packages/tokens/src/global.css` through `@tailwindcss/postcss` and grep that every class used in the planned cva strings actually emits a `.bg-…` / `.text-…` rule. Add `@source` entries if not.
5. Build `packages/ui/src/components/<slug>.tsx`:
   - License header (Untitled UI adapted vs Figma-only — see CLAUDE.md).
   - `forwardRef`. `cva` for variants. `useColorScheme` for any non-CSS tint.
   - `<Text>` wrap labels when not `asChild`.
   - Touch target ≥ 44pt baked into variant defaults; `sm` opt-in only.
   - Import sizing from `@mvp-ui-rn/tokens` (`iconSize` / `controlHeight` / `controlPaddingX`) — do not hardcode pixel values.
   - **Per-size font + icon must step with height.** Web often shares `lg: text-md` with `md`; on RN that reads as same size. Each size step bumps text class AND icon px one unit (sm→text-sm+iconSize.sm, md→text-md+iconSize.md, lg→text-lg+iconSize.lg, xl→text-xl+iconSize.xl). Audit on hardware, not Maestro screenshots. See trap #13.
6. Export from `packages/ui/src/index.ts`.
7. Demo at `apps/showcase/src/app/components/<slug>.tsx`. Cover every color × size × state. Add always-on rows for tap-triggered states.
8. Maestro flow `apps/showcase/.maestro/<slug>-showcase.yaml` + wrapper `apps/showcase/scripts/verify-<slug>.sh` (clone of `verify-button.sh`) + pnpm script.
9. Run wrapper. Audit BOTH `*-light.png` and `*-dark.png` per variant. List pass/fail explicitly.
10. Side-by-side compare with the web demo at iPhone-15 viewport.
11. Update `packages/skill/components-rn.md` with import path, variant table, when-to-use, anti-patterns, RN deltas.
12. Update this file's **Inventory** row to ✅.
13. Commit: `feat(<slug>): port from mvp-ui (web)`.

### Communication during build

- Never silent more than ~20s on long ops. Narrate image reads, bundle waits, Monitor windows.
- Never "perfect" / "renders correctly" without per-variant audit + web side-by-side.
- JS/TS: no trailing semicolons (Biome `semicolons: asNeeded`).

## NativeWind v5 install gotchas (encountered 2026-05-22)

1. **PostCSS config required.** Tailwind v4 `@theme` directives are processed by `@tailwindcss/postcss` BEFORE `react-native-css`'s Metro transformer touches the CSS. Missing → `Unknown at rule: @theme` warning + bundle abort. Fixed via `apps/showcase/postcss.config.js`:
   ```js
   module.exports = { plugins: { "@tailwindcss/postcss": {} } }
   ```
2. **lightningcss must be pinned to 1.30.1.** NW v5 docs (Migrate from v4 page) call this out explicitly. Newer lightningcss (1.31+) breaks with `failed to deserialize; expected an object-like struct named Specifier, found ()` when parsing `nativewind/theme.css`'s nested `@media ios { ... }` blocks. Pinned via root `package.json` `pnpm.overrides`.
