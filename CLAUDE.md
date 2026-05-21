# CLAUDE.md — mvp-ui-rn

## MANDATORY: Before any component or demo work

1. Read `docs/component-status.md` (create on bootstrap) — current ✅/❌ status of every RN component port.
2. Read `packages/skill/components-rn.md` — RN-adapted component contracts.
3. Confirm full scope with the user before writing a single line of code.
4. Update `docs/component-status.md` at end of every session.

## What this repo is

React Native / Expo port of `mvp-ui` (web design system). Separate repo, parallel evolution. Token values copied from web; components reimplemented against RN primitives. Goal = same Untitled UI look, same variant API, same `packages/skill/*.md` docs (mostly).

Brand color: Untitled UI default purple (`--color-primary: #7f56d9`).

## Architecture

- `packages/tokens` — design tokens (TS + CSS for NativeWind). Copied from web mvp-ui, kept in sync.
- `packages/ui` — RN components (NativeWind + `@rn-primitives/*` + `cva`). Depends on tokens.
- `packages/skill` — AI agent context. RN-adapted. Not a build target.
- `apps/showcase` — Expo app. Used to develop + demo components.

## Workflow for adding a component

1. Build component in `packages/ui/src/components/<name>.tsx` (mirror web file name).
2. Export from `packages/ui/src/index.ts`.
3. Add demo screen at `apps/showcase/app/components/<name>.tsx` with all variants.
4. Add entry in `packages/skill/components-rn.md` documenting:
   - Import path
   - Variant semantics (note RN-specific deltas vs web)
   - When to use / not use
   - Anti-patterns (touch targets, text wrapping, etc.)
5. Visually verify in `apps/showcase` on iOS + Android.
6. Add changeset: `pnpm changeset` (minor for new component, patch for fixes).

## Hard rules

- Never hardcode color/spacing values — always tokens.
- Never add a component without its docs entry.
- Never bypass tokens with arbitrary NativeWind values for known categories.
- One component per file, named export only.
- Use `@rn-primitives/*` for any component with complex interaction (Dialog, Popover, Tabs, etc.).
- Use `forwardRef` for components wrapping RN primitives.
- Never import from `react-dom`, `next/*`, or web-only packages.
- Text MUST be wrapped in `<Text>`. RN crashes on bare strings inside `<View>`.
- Touch targets ≥ 44pt — bake into variant defaults.
- RN has no `:hover`. Use `active:` (NativeWind → Pressable pressed state).

## Dark-safe styling (enforced)

Component variant/class strings must use semantic flipping aliases, never raw numbered color scales. Raw scales resolve to fixed values across modes — they look right in light and wash out in dark.

- **Banned in components** for `bg/text/border`: `gray|brand|error|success|warning` at any scale `-25…-950`, plus `bg-white`, `bg-black`, `text-black`.
- **Use instead**: surfaces `bg-bg` / `bg-bg-secondary` / `bg-bg-tertiary`; text `text-fg` / `text-fg-secondary` / `text-fg-brand`; borders `border-border` / `border-border-brand`; actions `bg-primary` / `bg-primary-hover` / `text-primary-fg`; status `bg-{info,success,warning,error}-bg` + matching `-border` / `-fg`.
- Need a new dark value? Add a semantic alias in `packages/tokens/src/global.css` — light default in the `@theme` block + dark override in the `@media (prefers-color-scheme: dark) { :root { ... } }` block. Don't reach for a raw scale.
- **Allowed exceptions** (genuinely mode-independent): keep raw class but put `dark-ok` in a comment on the same line.

Dark mode is driven by system preference (`prefers-color-scheme`). NativeWind v5 maps the `dark:` variant to the same media query, so semantic-alias utilities (`bg-bg`, `text-fg`, etc.) flip automatically — no `.dark` class on an ancestor required.

## IconProp contract (LOCKED — same as web)

```ts
type IconProp = FC<{ className?: string }> | ReactNode;
```

Render via `renderIcon` helper pattern (see `button.tsx`). Every icon slot uses this exact type. RN icons from `lucide-react-native` satisfy the FC form.

## License header (every component file)

Source-driven components (ported from Untitled UI React or web mvp-ui):
```ts
/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/{folder}/{file}.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */
```

Figma-only components:
```ts
/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and react-native-reusables.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */
```

## Token sync rule

Web mvp-ui changes a token → copy to RN repo in same PR cycle. Drift > 1 sprint = stop and re-sync.

## Styling pipeline (NativeWind v5 + Tailwind v4)

- Tokens live in `packages/tokens/src/global.css` as a single Tailwind v4 `@theme` block. Tailwind v4 reads theme directly from CSS — **no `tailwind.config.ts`**.
- NativeWind v5 wires into Metro only via `apps/showcase/metro.config.js` (`withNativewind`). **No babel plugin** — v5 is bundler-only.
- `apps/showcase/src/app/_layout.tsx` imports `@mvp-ui-rn/tokens/global.css` as a side effect.
- RN core component `className` typing comes from `react-native-css/types`, referenced via `apps/showcase/nativewind-env.d.ts`.
- JS/TS files in this repo omit trailing semicolons (`biome.json` → `semicolons: asNeeded`). CSS keeps them.

## Stack

Expo SDK 56 (RN 0.85, React 19) · TypeScript 6 · NativeWind v5 preview · Tailwind v4 · `@rn-primitives/*` · `react-native-reanimated` v4 · `@gorhom/bottom-sheet` · `cva` · Biome · Changesets

Originally targeted SDK 54 / TS 5.6 / Reanimated 3; the default Expo template now ships SDK 56 — bumped at bootstrap.
