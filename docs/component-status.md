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

## Inventory

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
| Toast | ❌ | Consider `burnt` or custom + portal. |
| Tabs | ❌ | `@rn-primitives/tabs`. |
| Breadcrumb | ❌ | Less common on mobile; defer unless requested. |
| Pagination | ❌ | Mobile UX often prefers infinite scroll — confirm with user. |
| SideNav | ❌ | No primitive. `Drawer` from `react-native-drawer-layout` or custom. |
| Card | ❌ | Surface composition. |
| Alert | ❌ | Status surfaces (info/success/warning/error). |
| Table | ⚠️ | RN uses `FlatList` patterns; "Table" semantics don't transfer 1:1. Defer / redesign. |
| Skeleton | ❌ | Reanimated shimmer. |

## Bootstrap notes (2026-05-21)

Repo scaffolded via Task 1 of `docs/init-prompt.md`:

- pnpm workspace at root: `apps/*` + `packages/*`.
- `apps/showcase` — Expo SDK 56 + Expo Router (newer than CLAUDE.md "SDK 54+" minimum; works the same).
- `packages/tokens` — TS constants (`tokens.ts`) + Tailwind v4 `@theme` CSS (`global.css`). Verbatim web snapshots in `tokens.css` / `theme.css` for reference + future web export.
- NativeWind v5 (preview) + Tailwind v4 wired via `metro.config.js` `withNativewind`. **No `tailwind.config.ts`** — Tailwind v4 reads `@theme` directly from CSS. **No babel plugin** — v5 is bundler-only.
- Dark mode: `@media (prefers-color-scheme: dark)` on `:root`. NativeWind v5 maps `dark:` variant to this query — automatic system-pref flipping. `.dark:root` selector (web-only) intentionally NOT used. CLAUDE.md "Dark-safe styling" wording about `.dark:root` should be updated when CLAUDE.md is next touched.
- Biome 2 formatter configured with `semicolons: asNeeded` per user preference. JS/TS files in this repo omit trailing semicolons.

## Open follow-ups

- Confirm dark-mode toggle strategy: system-pref only (current) vs. user-toggleable via `Appearance.setColorScheme` or `VariableContextProvider`. Currently system-only.
- Confirm font loading approach (`expo-font` + Inter + JetBrains Mono) before Button port lands — text components will need it.
- `packages/ui` + `packages/skill` landed alongside Button port (2026-05-22).
- Follow-up: wire `cssInterop` for `lucide-react-native` so spinner/icon colors can use semantic className tokens and flip in dark mode.

## NativeWind v5 install gotchas (encountered 2026-05-22)

1. **PostCSS config required.** Tailwind v4 `@theme` directives are processed by `@tailwindcss/postcss` BEFORE `react-native-css`'s Metro transformer touches the CSS. Missing → `Unknown at rule: @theme` warning + bundle abort. Fixed via `apps/showcase/postcss.config.js`:
   ```js
   module.exports = { plugins: { "@tailwindcss/postcss": {} } }
   ```
2. **lightningcss must be pinned to 1.30.1.** NW v5 docs (Migrate from v4 page) call this out explicitly. Newer lightningcss (1.31+) breaks with `failed to deserialize; expected an object-like struct named Specifier, found ()` when parsing `nativewind/theme.css`'s nested `@media ios { ... }` blocks. Pinned via root `package.json` `pnpm.overrides`.
