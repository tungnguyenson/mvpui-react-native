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
