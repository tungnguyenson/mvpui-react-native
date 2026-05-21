# React Native styling approaches — landscape

Survey of styling options for RN as of 2026. Decision for `mvp-ui-rn`: **NativeWind v5** (see [README.md](./README.md)). This doc captures the alternatives + tradeoffs for future revisit.

## 1. `StyleSheet.create` (RN core)

```tsx
const s = StyleSheet.create({ box: { padding: 16, backgroundColor: "#fff" } });
<View style={s.box} />
```

- **Pros:** Zero deps. Fastest runtime (RN validates + freezes objects). Universally supported. Works in any RN env.
- **Cons:** No theming primitive. No variants. No responsive helpers. Verbose. No dark mode without manual plumbing.
- **Use when:** small app, no design system, or perf-critical leaf nodes.

## 2. Inline `style={{ ... }}`

- **Pros:** Trivial.
- **Cons:** New object every render → breaks `===` memoization. No reuse. No theming. Anti-pattern at scale.
- **Use when:** prototyping only.

## 3. NativeWind v5 (Tailwind) ← picked for mvp-ui-rn

```tsx
<View className="bg-bg p-4 rounded-lg dark:bg-bg-secondary" />
```

- **Pros:** Web mental model 1:1. CSS vars + `dark:` work. Tailwind plugins compose. Same `cva` patterns as web. Tree-shakes unused classes. Strong RSC + Expo Router support.
- **Cons:** Build-time setup (Babel + Metro plugin). Some web utilities don't exist (`backdrop-filter`, complex selectors). Larger bundle than raw StyleSheet. v5 still maturing — expect quirks.
- **Use when:** porting from Tailwind web codebase. ← our case.

## 4. `styled-components/native`

```tsx
const Box = styled.View`
  padding: 16px;
  background: ${(p) => p.theme.bg};
`;
```

- **Pros:** Familiar from web. Mature (10+ yrs). ThemeProvider built-in. Props-driven dynamic styles.
- **Cons:** Runtime cost (parses CSS strings every render). No static extraction in RN. Maintainer momentum stalled (v6 web release was rough, RN lags). Bundle bloat. Tag-template DX clashes with TS prop inference.
- **Use when:** team comes from styled-components web and refuses to switch.

## 5. Emotion (`@emotion/native`)

- **Pros:** Same model as styled-components, slightly faster runtime. Object syntax + tag templates both supported.
- **Cons:** Same runtime cost. Smaller RN community than styled-components. Rarely chosen new.
- **Use when:** already using Emotion on web and want one mental model.

## 6. Restyle (Shopify)

```tsx
<Box bg="cardPrimary" padding="m" borderRadius="l" />
```

- **Pros:** Type-safe theme via TS. Constraint-based props (only theme tokens allowed). Compiled at build, fast runtime. Excellent for strict design systems.
- **Cons:** Verbose prop API vs class strings. No utility-first composition. Smaller ecosystem. No web port — can't share with web team.
- **Use when:** RN-only product, strict token enforcement matters more than DX velocity.

## 7. Tamagui ← ruled out

```tsx
<Stack bg="$bg" p="$4" />
```

- **Pros:** Universal (web + native, same components). Compiler extracts to static styles → fast. Atomic CSS on web. Rich primitive set.
- **Cons:** Heavy install + compiler config. Opinionated component API (own `Stack`, `Text`). Lock-in. Steep learning curve. Custom token schema, hard to map to existing Tailwind tokens. Build complexity high.
- **Use when:** greenfield universal app, want one codebase web+native.

## 8. gluestack-ui v2 ← ruled out

- **Pros:** Universal. NativeWind-based now (v2). Pre-built shadcn-style components.
- **Cons:** Heavier than rolling own with NativeWind + `@rn-primitives`. Component decisions baked in. Less control over Untitled UI fidelity.
- **Use when:** want batteries-included universal lib and Untitled UI lookalike isn't required.

## 9. Unistyles v3

```tsx
const styles = StyleSheet.create((theme) => ({
  box: { backgroundColor: theme.colors.bg },
}));
```

- **Pros:** Built on RN `StyleSheet` — native perf. Theming, variants, breakpoints, runtime token swap, no re-render. C++ engine (v3). Best perf of any themeable RN lib right now. Active development (2025).
- **Cons:** New API (v3 is a rewrite). Not a Tailwind workalike. Requires Expo prebuild for native module. No web story (RN-only).
- **Use when:** RN-only, perf-critical, want StyleSheet semantics + real theming. Strong contender if NativeWind annoys.

## 10. Dripsy

- **Pros:** Theme-UI-style responsive arrays. Token-first. Variants built in.
- **Cons:** Smaller community. Slow updates. Niche.
- **Use when:** rarely — superseded by Restyle / NativeWind.

## 11. StyleX (Meta)

- **Pros:** Atomic, compile-time, used inside Facebook/Threads. Excellent perf.
- **Cons:** RN support still experimental / partial as of 2026. Build setup heavy. Limited community examples for RN.
- **Use when:** wait — not production-ready for RN yet.

## 12. Stitches

**Status:** Officially unmaintained since 2023. **Do not use.**

## Quick decision matrix

| Need | Pick |
|---|---|
| Port Tailwind web codebase | **NativeWind v5** |
| Strict token-only design system, RN-only | Restyle or Unistyles v3 |
| Max runtime perf, RN-only | Unistyles v3 |
| Universal web+native, one codebase | Tamagui |
| Familiar CSS-in-JS from web | styled-components/native (with reservations) |
| Tiny app, no design system | RN `StyleSheet` |

## Why NativeWind for mvp-ui-rn

Web codebase already Tailwind v4 + cva + semantic flipping tokens. Anything else = rebuild tokens + variants from zero. NativeWind keeps mental model, copies token CSS verbatim, lets `packages/skill` docs stay near-identical for both platforms.

## Revisit triggers

Switch evaluation if:
- NativeWind v5 perf regressions show up in profiling (Reanimated worklets, FlatList scroll).
- Bundle size from utility classes exceeds budget on Android cold start.
- v5 maturity issues block 2+ components.
- Web codebase pivots away from Tailwind.

In those cases, **Unistyles v3** is the primary fallback (RN-only) or **Tamagui** (if universal becomes a requirement).
