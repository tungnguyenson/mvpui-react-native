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

**Variants** — mirror mvp-ui (web) exactly.

| Prop | Values | Default |
|---|---|---|
| `color` | `primary` · `secondary` · `tertiary` · `primary-destructive` · `secondary-destructive` · `tertiary-destructive` · `link-color` · `link-gray` · `link-destructive` | `primary` |
| `size` | `sm` · `md` · `lg` · `xl` | `sm` |
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
- ❌ Setting `style={{ height: ... }}` to shrink below 44pt. Touch targets
  are baked into variant sizes for accessibility — override only when there
  is a designed exception.
- ❌ Passing an SVG element (web pattern) as `iconLeading`. Use a
  `lucide-react-native` component or any RN-renderable element.

**RN deltas vs. web**

- `hover:` states are dropped — no hover on touch surfaces.
- `focus-visible:ring-*` are dropped — RN has no keyboard-focus model.
  Use `accessibilityState` / platform a11y focus instead.
- Spinner is `ActivityIndicator` with a hex tint resolved from the JS token
  export. **The spinner color does NOT flip in dark mode** (transient state,
  acceptable trade-off). Follow-up: wire `cssInterop` for a lucide spinner.
- `min-h-11` (44pt) is baked into every size for touch-target compliance.
- `asChild` uses `@rn-primitives/slot` — semantics close to Radix `Slot` but
  no `Slottable` equivalent; passing custom layouts as children may not get
  pressed-state styling merged.

---
