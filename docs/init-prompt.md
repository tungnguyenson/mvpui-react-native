Bootstrap mvp-ui-rn — React Native / Expo port of the web design system at
/Volumes/DATA/dev/projects/mvp-ui.

REFERENCE MATERIAL (read first, in order):
1. /Volumes/DATA/dev/projects/mvp-ui/docs/mvp-ui-react-native/README.md
   — strategy, stack, repo layout, migration order
2. /Volumes/DATA/dev/projects/mvp-ui/docs/mvp-ui-react-native/rn-claude-md-template.md
   — drop into ./CLAUDE.md verbatim (this becomes the project rules file)
3. /Volumes/DATA/dev/projects/mvp-ui/docs/mvp-ui-react-native/source-material/MANIFEST.md
   — explains the seed files

You may read anything under /Volumes/DATA/dev/projects/mvp-ui/packages/ui
for web-component reference. Do NOT copy .tsx files verbatim — RN reimplements
each component against RN primitives. Use web source only to understand
variant API, prop names, and behavior contract.

DO NOT MODIFY anything under /Volumes/DATA/dev/projects/mvp-ui — read-only.

TASK 1 — bootstrap (confirm scope before running anything):
a. pnpm create expo-app . --template blank-typescript
b. Install: nativewind@next tailwindcss@next class-variance-authority
   @rn-primitives/slot @rn-primitives/portal lucide-react-native
   react-native-reanimated react-native-gesture-handler
c. Configure NativeWind v5 per its current docs (babel plugin, metro config,
   tailwind preset). Use context7 mcp for current API — do not guess.
d. Create packages/tokens/ and copy these 4 files from
   /Volumes/DATA/dev/projects/mvp-ui/docs/mvp-ui-react-native/source-material/
   into packages/tokens/src/: tokens.ts, tokens.css, theme.css, index.ts
e. Create global.css at repo root combining tokens.css + theme.css,
   adapted for NativeWind v5 (CSS vars in :root + .dark:root).
f. Write tailwind.config.ts mapping semantic names → CSS vars
   (template in docs/mvp-ui-react-native/README.md "Styling & theming" section).
g. Drop the rn-claude-md-template.md content into ./CLAUDE.md.
h. Create docs/component-status.md with empty inventory table
   (Component | Status | Notes columns).
i. Verify: pnpm tsc --noEmit + expo start, app boots blank on iOS sim.

TASK 2 — first component (separate session, after Task 1 reviewed):
Port Button using web reference at
/Volumes/DATA/dev/projects/mvp-ui/packages/ui/src/components/button.tsx
Match variant names + IconProp contract exactly. Adapt for RN
(Pressable, active: not hover:, 44pt touch target, Text wrapping).
Demo screen in apps/showcase. Update component-status.md.

Confirm scope, ask any blocking questions, then proceed step by step.
Do not bundle Task 1 + Task 2 in one go.
