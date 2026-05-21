# Source material — snapshot from mvp-ui (web)

Frozen reference copy of files the RN repo needs as starting input. Snapshot taken when README was written. Web repo continues evolving; re-sync periodically.

## Files

| File | Origin in web repo | Role in RN port |
|---|---|---|
| `tokens.ts` | `packages/tokens/src/tokens.ts` | **Copy verbatim** into `packages/tokens/src/tokens.ts` of RN repo. Pure TS, RN-safe. |
| `tokens.css` | `packages/tokens/src/tokens.css` | Raw token scale. Extract values, re-emit as RN `global.css` for NativeWind v5. Drop web-only properties (e.g. backdrop filters). |
| `theme.css` | `packages/tokens/src/theme.css` | Semantic flipping aliases (`--color-bg`, `--color-fg`, dark overrides). **Most important file** — port wholesale to RN `global.css`. |
| `index.ts` | `packages/tokens/src/index.ts` | Token barrel export. Copy as-is. |
| `TOKEN_TRANSLATION.md` | `packages/tokens/TOKEN_TRANSLATION.md` | Untitled UI → mvp-ui name mapping. Same mapping applies to RN — don't redo. |
| `TOKEN_REGISTRY.md` | `packages/tokens/TOKEN_REGISTRY.md` | New-token proposal process. Use same flow for RN-only tokens. |
| `system.md` | `packages/skill/system.md` | Design rationale (why these tokens, scale logic). Read first before touching tokens. |
| `tokens.md` | `packages/skill/tokens.md` | Token usage rules — semantic flipping pattern, dark-safe usage. Applies 1:1 to RN. |
| `components.md` | `packages/skill/components.md` | Per-component contract: import path, variants, when to use, anti-patterns. **Source of truth for RN component API.** Match these signatures. |
| `patterns.md` | `packages/skill/patterns.md` | Composition patterns (compound components, forwardRef, etc.). Mostly transferable. |
| `responsive.md` | `packages/skill/responsive.md` | Breakpoint strategy. **Web-leaning** — RN has different breakpoint conventions (320/375/414/768/1024). Adapt, don't copy. |

## How to use

1. RN repo bootstrap → copy `tokens.ts`, `tokens.css`, `theme.css`, `index.ts` into `packages/tokens/src/` of new repo.
2. Read `system.md` + `tokens.md` to understand the design rationale before any component work.
3. Before porting a component, read its entry in `components.md` — variant names, anti-patterns, when-to-use rules carry over.
4. Use `TOKEN_TRANSLATION.md` if a component references Untitled UI token names.
5. New tokens needed for RN-only concerns (e.g. safe-area, haptic): follow `TOKEN_REGISTRY.md` flow.

## Sync policy

- Snapshot date: track in commit message.
- Re-snapshot when: web tokens change, new component lands in `components.md`, design rationale shifts.
- Drift > 1 sprint = stop, re-sync, then resume RN work.
- Per [README](../README.md) sync rule: new token added in web → copy to RN in same PR cycle.

## NOT included (intentionally)

- Web component source (`packages/ui/src/components/*.tsx`) — RN reimplements each. Reading web source as reference is fine, but don't copy here.
- `tsup.config.ts`, `package.json` — RN repo has its own build (Metro / Expo).
- `apps/docs/*` — RN repo has its own showcase app.
- CLAUDE.md — see sibling `../rn-claude-md-template.md` for the RN-specific version.
