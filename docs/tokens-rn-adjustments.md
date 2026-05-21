# Tokens — RN Adjustments Backlog

Tokens in `packages/tokens/src/global.css` were copied verbatim from web mvp-ui.
Mostly fit RN, but several gaps must be closed before component port work scales.

## Status legend

- ✅ safe as-is
- ⚠️ works but incomplete
- ❌ broken / dead in RN

## Audit

### ✅ Safe as-is

| Token group | Notes |
|---|---|
| Raw color scales (`--color-brand-*`, `--color-gray-*`, …) | Hex values, RN parses directly. |
| Semantic aliases (`--color-bg`, `--color-fg`, …) | NativeWind v5 resolves CSS vars at compile. |
| Dark-mode flips via `@media (prefers-color-scheme: dark)` | NativeWind v5 maps `dark:` variant to system appearance. |
| `--radius-*` in `rem` | NativeWind compiles `rem` → `px` at base 16. |
| `--text-*` size scale | Same `rem` → `px` conversion. |

### ⚠️ Works but incomplete

#### 1. Typography missing line-height / letter-spacing

`--text-xs … --text-5xl` defines `font-size` only. RN does not auto-derive line-height; bare `text-md` renders tight and inconsistent vs web.

**Fix:** add companion CSS vars per size, or a TS export:

```ts
// packages/tokens/src/typography.ts
export const textSize = {
  xs:  { fontSize: 12, lineHeight: 18 },
  sm:  { fontSize: 14, lineHeight: 20 },
  md:  { fontSize: 16, lineHeight: 24 },
  lg:  { fontSize: 18, lineHeight: 28 },
  xl:  { fontSize: 20, lineHeight: 30 },
  '2xl': { fontSize: 24, lineHeight: 32 },
  '3xl': { fontSize: 30, lineHeight: 38 },
  '4xl': { fontSize: 36, lineHeight: 44 },
  '5xl': { fontSize: 48, lineHeight: 60 },
} as const
```

Mirror Untitled UI web type ramp (1.5x line-height for body, 1.25x for display).

#### 2. Fonts declared but not loaded

`--font-sans: Inter, …` and `--font-mono: "JetBrains Mono", …` exist, but RN has no system font lookup. Inter silently falls back to platform default.

**Fix:** either

- Load via `expo-font` in `apps/showcase/src/app/_layout.tsx`:

  ```ts
  import { useFonts } from 'expo-font'

  const [loaded] = useFonts({
    Inter: require('../../assets/fonts/Inter-Variable.ttf'),
    'JetBrainsMono': require('../../assets/fonts/JetBrainsMono-Variable.ttf'),
  })
  if (!loaded) return null
  ```

- Or drop to `System` / `ui-sans-serif` only and document that brand font is opt-in per consumer app.

#### 3. Spacing scale inherited from Tailwind defaults

No `--space-*` tokens. Works, but no `--size-touch-target: 44` constant — touch-target rule lives only in CLAUDE.md prose, not in code.

**Fix:** add sizing tokens:

```css
--size-touch-target-min: 2.75rem; /* 44pt */
--size-icon-sm: 1rem;
--size-icon-md: 1.25rem;
--size-icon-lg: 1.5rem;
```

Bake into Button/IconButton variant defaults.

#### 3a. Control size ramps must scale up vs web

Web mvp-ui control defaults are desktop-tuned. Same heights on mobile = cramped, unreachable feel, fail "thumb-comfortable" bar even when they pass HIG 44pt floor. Issue noticed first on Button — `defaultVariants.size = "sm"` lands at `min-h-11` (44pt) which is HIG *floor*, not comfort.

**Current Button ramp (problem):**

| Size | min-h | px | text | Notes |
|------|-------|----|----|-------|
| sm (default) | 44 (`min-h-11`) | 12 (`px-3`) | 14 | HIG floor only — feels cramped for primary CTA |
| md | 44 | 14 (`px-3.5`) | 14 | visually identical to sm (2px padding delta) |
| lg | 48 (`min-h-12`) | 16 | 16 | OK |
| xl | 56 (`min-h-14`) | 20 | 16 | OK |

Two issues: (a) default is the floor, (b) sm and md collapse into one visual size.

**Reference — native-mobile defaults:**

| Lib | Default button height |
|---|---|
| Material 3 (Android) | 40 (text) / 48 (filled) |
| iOS UIKit `.large` | 50 |
| Tamagui `$true` | 44 |
| RN Paper `Button` | ~40 text / ~48 contained |
| NativeBase | 40 |
| Untitled UI Figma (mobile spec) | 44 / 48 / 56 / 64 |

**Proposed RN Button ramp:**

| Size | min-h | px | text | Use |
|------|-------|----|----|-----|
| sm | 40 | 16 | 14 | dense lists, secondary actions, toolbars |
| **md (default)** | **48** | **20** | **16** | **primary CTA, forms** |
| lg | 56 | 24 | 16 | hero CTA, onboarding |
| xl | 64 | 28 | 18 | marketing landing, modal primary |

Rules:
- `defaultVariants.size = "md"` (not `"sm"`).
- `sm` drops below 44pt HIG floor — allowed **only** when wrapped by Toolbar / dense ListItem / segmented control. Variant docs in `packages/skill/components-rn.md` must call this out.
- `iconOnly` enforces ≥ 44pt regardless of size (`w-11 h-11` floor on sm).
- All paddings bump one Tailwind step vs web equivalent.

**Propagate to other touch-target controls:**

| Component | Web default | RN default |
|---|---|---|
| Input | `h-10` (40) | `h-12` (48) |
| Select trigger | `h-10` (40) | `h-12` (48) |
| Checkbox row | row `h-10` | row `h-12` |
| Radio row | row `h-10` | row `h-12` |
| Switch row | row `h-10` | row `h-12` |
| ListItem | `h-12` (48) | `h-14` (56) |
| Tab trigger | `h-9` (36) | `h-12` (48) |
| Menu item | `h-9` (36) | `h-12` (48) |
| IconButton | matches Button | matches Button, 44 floor |

**Encode in `size.ts`:**

```ts
// packages/tokens/src/size.ts
export const touchTarget = {
  min: 44,       // HIG floor — last resort
  comfort: 48,   // mobile primary default
  prominent: 56, // hero CTA
  hero: 64,      // marketing
} as const

export const controlHeight = {
  sm: 40,
  md: 48,
  lg: 56,
  xl: 64,
} as const

export const controlPaddingX = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
} as const

export const iconSize = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
} as const
```

CSS mirror for NativeWind utility coverage:

```css
--size-control-sm: 2.5rem;   /* 40 */
--size-control-md: 3rem;     /* 48 */
--size-control-lg: 3.5rem;   /* 56 */
--size-control-xl: 4rem;     /* 64 */

--size-touch-min: 2.75rem;   /* 44 — HIG floor */
```

### ❌ Broken / dead in RN

#### 4. `--color-ring` is dead

Web uses it for `box-shadow: 0 0 0 4px var(--ring)` focus ring. RN has no focus ring concept on touch platforms.

**Fix:** either

- Drop the token, OR
- Repurpose as border color for keyboard-nav focus on tvOS/web targets (`--color-focus-border`).

#### 5. No shadow / elevation tokens

Web uses Tailwind `shadow-sm/md/lg`. RN needs `shadowColor/shadowOffset/shadowRadius/shadowOpacity` (iOS) + `elevation` (Android). Currently zero coverage.

**Fix:** TS export for runtime consumption:

```ts
// packages/tokens/src/shadow.ts
export const shadow = {
  sm: {
    shadowColor: '#0a0a0a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#0a0a0a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#0a0a0a',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.10,
    shadowRadius: 24,
    elevation: 8,
  },
} as const
```

Dark-mode shadow tint: black with higher opacity tends to disappear on dark surfaces; consider `shadowColor` = `var(--color-gray-950)` and bump opacity.

#### 6. No motion / duration tokens

Web uses CSS `transition-duration`. RN motion runs through Reanimated `withTiming({ duration })`. Need shared values:

```ts
// packages/tokens/src/motion.ts
export const duration = {
  fast: 150,
  normal: 200,
  slow: 300,
} as const

export const easing = {
  standard: [0.2, 0, 0, 1],
  emphasized: [0.16, 1, 0.3, 1],
} as const
```

## Recommended architecture split

Single CSS file = single source of truth no longer holds once shadows + motion + numeric typography enter. Move to:

```
packages/tokens/src/
├── global.css        # NativeWind utility source (colors, radii, font sizes)
├── typography.ts     # text size + line-height pairs
├── shadow.ts         # iOS + Android shadow objects
├── motion.ts         # duration + easing
├── size.ts           # touch-target + icon sizes
└── index.ts          # re-export TS modules
```

Components import TS tokens directly where utilities can't express the value (Reanimated, StyleSheet shadow, etc.). NativeWind classes keep covering color/spacing/radius.

Optional next step: generate both `global.css` and the `.ts` modules from a JSON source-of-truth, so web mvp-ui sync stays one-way and machine-checkable.

## Action items

- [ ] Add `typography.ts` with size+line-height pairs.
- [ ] Wire `expo-font` for Inter + JetBrains Mono OR drop brand font from `--font-sans`.
- [ ] Add `size.ts` with touchTarget / controlHeight / controlPaddingX / iconSize maps.
- [ ] Mirror control-height tokens into `global.css` (`--size-control-*`, `--size-touch-min`).
- [ ] Rewrite Button variants to new ramp (sm=40, md=48 default, lg=56, xl=64); flip `defaultVariants.size` from `"sm"` to `"md"`.
- [ ] Audit & resize Input, Select, Checkbox/Radio/Switch rows, ListItem, Tab trigger, Menu item per Component table.
- [ ] Document "sm below 44pt floor only inside Toolbar/dense container" rule in `packages/skill/components-rn.md`.
- [ ] Drop or repurpose `--color-ring`.
- [ ] Add `shadow.ts` with iOS+Android shadow objects.
- [ ] Add `motion.ts` with duration + easing constants.
- [ ] Decide JSON-source generator vs hand-maintained split.

## Token sync rule (reminder)

Web mvp-ui token change → propagate to RN within same sprint. Drift > 1 sprint = stop and re-sync (CLAUDE.md "Token sync rule"). Adjustments above are RN-only additions; do not back-port to web.
