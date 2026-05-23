# Task B — Web Docs (apps/docs-rn)

## Goal

Build a web documentation site for mvp-ui-rn. Developers visiting the site can browse component APIs, copy code snippets, and see what each component looks like on a real device.

---

## Reference

Web docs for mvp-ui (web): `/Volumes/DATA/dev/projects/mvp-ui/apps/docs`
- Next.js app router
- Two-panel layout: sidebar nav + main content
- Live component rendering (web components render directly in the browser)

---

## The core problem

mvp-ui-rn components are React Native — they cannot render in a browser directly the way web components can. Three viable approaches:

### Option A — Static screenshots in device frames *(Recommended for v1)*

- Static PNG screenshots (light + dark) captured from the showcase app
- Displayed inside an iPhone frame SVG/PNG on the docs page
- Code snippet alongside
- Props table (manual or from TSDoc)

**Pros:** Ships fast. No infra dependency. Always accurate if screenshots are regenerated after changes.
**Cons:** Not interactive. Screenshots can go stale.

### Option B — Expo for Web iframe

- Build `apps/showcase` for web (`expo export --platform web`)
- Deploy to a subdomain (e.g. `showcase.mvp-ui-rn.vercel.app`)
- Docs embeds `<iframe src="https://showcase.mvp-ui-rn.vercel.app/components/button" />`
- Frame styled with iPhone chrome

**Pros:** Live, interactive. Reflects actual component state. Works for animated components.
**Cons:** Requires Expo Web build to work correctly — NativeWind v5 web support is still preview. Iframe CORS + sizing complexity. Two deploy targets to maintain.

### Option C — Expo Snack embed

- Embed `<iframe src="https://snack.expo.dev/..." />` per component
- Snack contains the component + demo code

**Pros:** Interactive. User can edit code. No custom infra.
**Cons:** External dependency (Expo's servers). Slow load. Each component needs a separate maintained Snack. Package resolution flaky on private workspaces.

**Decision: Option A for v1. Option B as upgrade path once Expo Web is verified stable.**

---

## Tech stack

- **Framework:** Next.js 15 (app router) — same as `apps/docs` in mvp-ui web
- **Styling:** Tailwind v4 + shadcn/ui (web docs are a web app, not RN)
- **Location:** `apps/docs-rn/` in the same monorepo
- **Package name:** `@mvp-ui-rn/docs`

---

## Site structure

```
/                          → redirect to /docs/introduction
/docs/introduction         → what this library is, install, quick start
/docs/theming              → tokens, dark mode, NativeWind setup
/docs/contributing         → how to add a new component
/components/[slug]         → component reference page
/screens                   → application screen demos (screenshots)
```

---

## Navigation (sidebar)

```
Getting Started
  Introduction
  Installation
  Theming
  Contributing

Components
  Actions
    Button
    FAB
  Form
    Input
    Textarea
    PinInput
    Label
    HintText
    Checkbox
    RadioGroup
    Switch
    Select
    Slider
    Stepper
    DateTimePicker
    FormField
    SettingsRow
  Overlays
    Dialog
    BottomSheet
    ActionSheet
    Popover
    Tooltip
    ContextMenu
    Toast
    Banner
    Alert
  Navigation
    Header
    TabBar
    Tabs
    SegmentedControl
    SearchBar
  Content
    Card
    Avatar
    Badge
    List
    Image
    Skeleton
    ProgressBar
    CircularProgress
    EmptyState
  Interaction
    SwipeableRow
    PullToRefresh
    KeyboardAvoidingScroll
    HapticFeedback
  Utility
    SafeArea
    StatusBar
    Icon
    Spinner

Screens
  Bottom Tab Navigation
  Bottom Tabs + FAB
  Onboarding
  Login / Auth
  Profile
  Settings
  Feed / Home
  Search / Discover
  Chat / Messaging
  Checkout
  Notifications
  Dashboard
```

---

## Component reference page layout

```
┌─────────────────────────────────────────────────────────┐
│  Button                                    [light][dark] │
│  Accessible, themeable button with 9 color variants.    │
│                                                         │
│  ┌─────────────┐  ┌────────────────────────────────┐   │
│  │             │  │ import { Button } from          │   │
│  │  [iPhone    │  │   "@mvp-ui-rn/ui"              │   │
│  │   mockup    │  │                                │   │
│  │   showing   │  │ <Button variant="primary"       │   │
│  │   all       │  │   size="md"                    │   │
│  │   variants] │  │   onPress={() => {}}           │   │
│  │             │  │ >                              │   │
│  └─────────────┘  │   Sign in                      │   │
│                   │ </Button>                       │   │
│                   └────────────────────────────────┘   │
│                                                         │
│  Props ──────────────────────────────────────────────   │
│  variant    "primary"|"secondary"|…  "primary"          │
│  size       "sm"|"md"|"lg"|"xl"      "md"               │
│  isLoading  boolean                  false              │
│  isDisabled boolean                  false              │
│  iconLeading IconProp                —                  │
│                                                         │
│  RN Notes ───────────────────────────────────────────   │
│  • Touch targets ≥ 44pt baked in. sm=40pt opt-in only.  │
│  • Icons must be lucide-react-native (not lucide-react). │
│  • No :hover — use active: for pressed state.           │
└─────────────────────────────────────────────────────────┘
```

---

## Screenshots strategy

Screenshots are captured from `apps/showcase` running in the iOS simulator.

### Naming convention
```
public/screenshots/<slug>-light.png
public/screenshots/<slug>-dark.png
```

### How to regenerate

```bash
# From apps/showcase
pnpm verify:<batch>        # existing Maestro flows capture screenshots
# Copy outputs to docs-rn/public/screenshots/
```

Long term: add a `pnpm screenshots` script that runs all Maestro flows and copies PNGs to docs.

### iPhone frame

Use an SVG iPhone 15 frame as a wrapper component in the docs. Component:
```tsx
<IPhoneFrame>
  <img src="/screenshots/button-light.png" />
</IPhoneFrame>
```

Light/dark toggle on the page switches the `src`.

---

## Screens page layout

```
┌─────────────────────────────────────────────────────────┐
│  Feed / Home Screen                                     │
│  Demonstrates: SwipeableRow · PullToRefresh · Skeleton  │
│  Avatar · Badge · Image · Button                        │
│                                                         │
│  ┌──────────┐  ┌──────────┐                            │
│  │ [light   │  │ [dark    │                            │
│  │ mockup]  │  │ mockup]  │                            │
│  └──────────┘  └──────────┘                            │
└─────────────────────────────────────────────────────────┘
```

Side-by-side light + dark iPhone mockups. No code snippet (screens are composed patterns, not copy-paste primitives).

---

## Build order

1. Scaffold `apps/docs-rn` (Next.js 15 + Tailwind v4)
2. Layout: sidebar nav + content area + mobile hamburger
3. Introduction + Installation pages (MDX or plain TSX)
4. `IPhoneFrame` component
5. Component reference template (screenshot + code + props table)
6. Generate 5 representative component pages (Button, Input, Avatar, Toast, BottomSheet)
7. Screens page template
8. Fill remaining component pages
9. Screens pages (after Task A screenshots exist)

---

## Open questions (decide before build)

| # | Question | Options |
|---|---|---|
| 1 | MDX for content or plain TSX? | MDX = easier content editing. TSX = type-safe, simpler build. |
| 2 | Props table source? | Manual (fast, must maintain) vs TSDoc extraction via `typedoc` (automated, complex setup) |
| 3 | Deploy target? | Vercel (same account as mvp-ui web). Subdomain `rn.mvp-ui.com` or separate domain? |
| 4 | Upgrade path to Expo Web iframe: when? | After verifying NativeWind v5 web stability in `apps/showcase`. |

---

## Out of scope (v1)

- Search
- Versioned docs
- Expo Snack embeds
- Live Expo Web iframe
- Auto-generated props tables from TSDoc
- Changelog page
