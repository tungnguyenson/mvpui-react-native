# @mvp-ui-rn — Agent Guide

Quick-start reference for AI agents building screens with this library.
Read this first, then `components-rn.md` for per-component API details.

---

## What this library is

React Native / Expo port of the Untitled UI design system (`mvp-ui`). Same
variant API as the web package, reimplemented against RN primitives.

Packages:
- `@mvp-ui-rn/ui` — all components
- `@mvp-ui-rn/tokens` — design tokens (TS constants + CSS for NativeWind)

---

## Setup

### 1. Install dependencies

```bash
# Core
pnpm add @mvp-ui-rn/ui @mvp-ui-rn/tokens

# Required peer deps
pnpm add nativewind@5.0.0-preview.4 tailwindcss
pnpm add lucide-react-native react-native-svg
pnpm add react-native-reanimated react-native-gesture-handler
pnpm add react-native-safe-area-context
pnpm add expo-image expo-haptics expo-status-bar expo-router
pnpm add @gorhom/bottom-sheet
pnpm add @rn-primitives/portal @rn-primitives/select @rn-primitives/dialog
```

### 2. Metro config

```js
// metro.config.js
const { getDefaultConfig } = require("expo/metro-config")
const { withNativewind } = require("nativewind/metro")

const config = getDefaultConfig(__dirname)
module.exports = withNativewind(config)
```

No Babel plugin. NativeWind v5 is bundler-only.

### 3. Import tokens in the CSS entry point

```css
/* global.css (or wherever Tailwind is imported) */
@import "@mvp-ui-rn/tokens/global.css";

/* Optional: override brand color (see Theme Color below) */
@import "@mvp-ui-rn/tokens/themes/purple";
```

### 4. Import CSS in app entry

```tsx
// app/_layout.tsx  (or wherever your root layout lives)
import "@mvp-ui-rn/tokens/global.css"
```

### 5. NativeWind env types

```ts
// nativewind-env.d.ts
/// <reference types="react-native-css/types" />
```

### 6. Root layout — required providers

Every app using this library needs this provider tree in the root layout:

```tsx
import "@mvp-ui-rn/tokens/global.css"

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { ActionSheetHost, Toaster } from "@mvp-ui-rn/ui"
import { PortalHost } from "@rn-primitives/portal"
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useColorScheme, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"

export default function RootLayout() {
  const scheme = useColorScheme()
  const navTheme = scheme === "dark" ? DarkTheme : DefaultTheme

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider value={navTheme}>
          <BottomSheetModalProvider>
            <StatusBar style="auto" />
            <View className="flex-1 bg-bg">
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: {
                    backgroundColor: scheme === "dark" ? "#0a0a0a" : "#ffffff",
                  },
                }}
              />
            </View>
            {/* Required for Select, Dialog, Popover, Tooltip */}
            <PortalHost />
            {/* Toast singleton — mount once */}
            <Toaster />
            {/* ActionSheet singleton — mount once */}
            <ActionSheetHost />
          </BottomSheetModalProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
```

Why each provider is required:

| Provider | Required by |
|---|---|
| `GestureHandlerRootView` | `BottomSheet`, swipe gestures |
| `SafeAreaProvider` | `SafeArea` component, insets |
| `BottomSheetModalProvider` | `BottomSheet` modal layer |
| `PortalHost` | `Select`, `Dialog`, `Popover`, `Tooltip` |
| `<Toaster />` | `toast.*` imperative API |
| `<ActionSheetHost />` | `actionSheet.*` imperative API |

---

## Theme Color

The library ships with a **purple default** (`#7f56d9`). All semantic
color aliases resolve through the `--color-brand-*` scale, so swapping
the brand scale changes the entire theme.

### Available themes

| Theme | Import |
|---|---|
| Purple (default) | `@mvp-ui-rn/tokens/themes/purple` |
| Blue | `@mvp-ui-rn/tokens/themes/blue` |
| Green | `@mvp-ui-rn/tokens/themes/green` |
| Indigo | `@mvp-ui-rn/tokens/themes/indigo` |
| Orange | `@mvp-ui-rn/tokens/themes/orange` |
| Rose | `@mvp-ui-rn/tokens/themes/rose` |
| Teal | `@mvp-ui-rn/tokens/themes/teal` |
| Violet | `@mvp-ui-rn/tokens/themes/violet` |

### Applying a theme

Import the theme CSS **after** `global.css` in your root layout. The theme
overrides the `--color-brand-*` scale:

```tsx
// app/_layout.tsx
import "@mvp-ui-rn/tokens/global.css"
import "@mvp-ui-rn/tokens/themes/blue"  // ← brand becomes blue
```

### Custom brand color

Add a `@theme` block **after** the global import:

```css
/* app.css */
@import "@mvp-ui-rn/tokens/global.css";

@theme {
  --color-brand-25:  #fdf4ff;
  --color-brand-50:  #f5f0ff;
  --color-brand-100: #ede0ff;
  --color-brand-200: #d9bfff;
  --color-brand-300: #bf94ff;
  --color-brand-400: #a06af5;
  --color-brand-500: #8347e0;
  --color-brand-600: #6b2fc9;  /* ← primary CTA color */
  --color-brand-700: #5622a8;
  --color-brand-800: #421888;
  --color-brand-900: #310f6e;
  --color-brand-950: #1d0650;
}
```

The `--color-brand-600` value becomes the `bg-primary` / `text-fg-brand` /
button primary fill. The dark mode counterpart `text-fg-brand` automatically
uses `--color-brand-400`.

### Note on green brand

If using the green theme, swap the `--color-success-*` scale to `emerald`
or `lime` to keep status semantics visually distinct from the brand.

---

## Dark / Light Mode

Dark mode is **fully automatic** — driven by the system
`prefers-color-scheme` media query. No `.dark` ancestor class required.

### How it works

1. `packages/tokens/src/global.css` defines semantic aliases (light defaults)
   inside `@theme {}`.
2. A `@media (prefers-color-scheme: dark) { :root { ... } }` block overrides
   those aliases for dark.
3. NativeWind v5 maps the `dark:` variant to the same media query.
4. Utility classes like `bg-bg`, `text-fg`, `border-border` resolve to the
   correct value automatically.

### Semantic alias map

| Alias | Light | Dark |
|---|---|---|
| `bg-bg` | white | gray-950 |
| `bg-bg-secondary` | gray-25 | gray-900 |
| `bg-bg-tertiary` | gray-50 | gray-800 |
| `text-fg` | gray-900 | gray-25 |
| `text-fg-secondary` | gray-700 | gray-300 |
| `text-fg-tertiary` | gray-500 | gray-400 |
| `text-fg-brand` | brand-600 | brand-400 |
| `border-border` | gray-300 | gray-700 |
| `border-border-brand` | brand-300 | brand-400 |
| `bg-primary` | brand-600 | brand-600 |
| `text-primary-fg` | white | white |

### Reading the current scheme in code

```tsx
import { useColorScheme } from "react-native"

const scheme = useColorScheme() // "light" | "dark" | null
```

Use `scheme` when passing raw color values to components that can't accept
className (Lucide icons, native nav header, `contentStyle`):

```tsx
import { tokens } from "@mvp-ui-rn/tokens"

const iconColor = scheme === "dark"
  ? tokens.color.brand[400]
  : tokens.color.brand[600]
```

### Dark-safe styling rules

**Never** use raw color scales in component `className` for backgrounds,
text, or borders. Raw scales resolve to fixed values — they look right in
light and wash out (or disappear) in dark.

```tsx
// WRONG — fixed value, breaks dark mode
<View className="bg-white border-gray-200">
<Text className="text-gray-900">

// CORRECT — flips automatically
<View className="bg-bg border-border">
<Text className="text-fg">
```

**Banned** in component className: any `gray-*`, `brand-*`, `error-*`,
`success-*`, `warning-*` at raw scale steps (25–950), plus `bg-white`,
`bg-black`, `text-black`.

**Allowed exceptions** (genuinely mode-independent values):
add `{/* dark-ok */}` comment on the same line.

### Lucide icons — dark mode

Lucide icons do not accept `className` for color. Use a `useColorScheme`
hex map or the `<Icon>` wrapper component:

```tsx
import { Icon } from "@mvp-ui-rn/ui"
import { Search } from "lucide-react-native"

// Recommended — auto-flips via tint
<Icon as={Search} size="md" tint="fg-secondary" />

// Manual — same pattern used internally
const tint = scheme === "dark" ? "#a3a3a3" : "#737373" // gray-400 / gray-500
<Search size={20} color={tint} />
```

---

## Screen layout pattern

Every screen should use `SafeArea` as the outermost wrapper:

```tsx
import { SafeArea, Header } from "@mvp-ui-rn/ui"

export default function MyScreen() {
  return (
    <SafeArea>
      <Header title="My Screen" />
      {/* content */}
    </SafeArea>
  )
}
```

For forms with a keyboard:

```tsx
import { SafeArea, KeyboardAvoidingScroll } from "@mvp-ui-rn/ui"

export default function FormScreen() {
  return (
    <SafeArea>
      <KeyboardAvoidingScroll>
        {/* form fields */}
      </KeyboardAvoidingScroll>
    </SafeArea>
  )
}
```

---

## Touch targets

All interactive components bake in the **44pt HIG minimum** at their default
size. Do not shrink below this without `dense`-context justification:

| Component | Minimum size |
|---|---|
| Button `sm` | 40pt — only valid inside Toolbar / dense ListItem |
| Button `md` | 48pt (default free-standing CTA) |
| Input `sm` | 44pt (HIG floor, same as touch minimum) |
| Checkbox / Switch | `hitSlop: 10pt` pads bare-box to ≥ 44pt |
| Icon-only buttons | Square ≥ 44pt regardless of size prop |

---

## Component index

Full per-component API (variants, anti-patterns, RN deltas) is in
`packages/skill/components-rn.md`. Quick reference:

| Component | Import |
|---|---|
| Button | `import { Button } from "@mvp-ui-rn/ui"` |
| Input / InputBase | `import { Input, InputBase } from "@mvp-ui-rn/ui"` |
| Textarea / TextareaBase | `import { Textarea, TextareaBase } from "@mvp-ui-rn/ui"` |
| Select / SelectItem | `import { Select, SelectItem } from "@mvp-ui-rn/ui"` |
| Checkbox / CheckboxBase | `import { Checkbox, CheckboxBase } from "@mvp-ui-rn/ui"` |
| RadioGroup / RadioGroupItem | `import { RadioGroup, RadioGroupItem } from "@mvp-ui-rn/ui"` |
| Switch / SwitchBase | `import { Switch, SwitchBase } from "@mvp-ui-rn/ui"` |
| Label | `import { Label } from "@mvp-ui-rn/ui"` |
| HintText | `import { HintText } from "@mvp-ui-rn/ui"` |
| FormField | `import { FormField } from "@mvp-ui-rn/ui"` |
| Avatar | `import { Avatar } from "@mvp-ui-rn/ui"` |
| Badge | `import { Badge } from "@mvp-ui-rn/ui"` |
| Icon | `import { Icon } from "@mvp-ui-rn/ui"` |
| Spinner | `import { Spinner } from "@mvp-ui-rn/ui"` |
| Skeleton | `import { Skeleton } from "@mvp-ui-rn/ui"` |
| Card / CardHeader / … | `import { Card, CardHeader, CardContent, CardFooter } from "@mvp-ui-rn/ui"` |
| Alert / AlertTitle / … | `import { Alert, AlertTitle, AlertDescription } from "@mvp-ui-rn/ui"` |
| EmptyState | `import { EmptyState } from "@mvp-ui-rn/ui"` |
| List / ListItem / ListSection | `import { List, ListItem, ListSection } from "@mvp-ui-rn/ui"` |
| Dialog / DialogContent / … | `import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogClose } from "@mvp-ui-rn/ui"` |
| BottomSheet / BottomSheetHeader / … | `import { BottomSheet, BottomSheetHeader, BottomSheetBody } from "@mvp-ui-rn/ui"` |
| Popover / PopoverContent / … | `import { Popover, PopoverTrigger, PopoverContent } from "@mvp-ui-rn/ui"` |
| Tooltip / TooltipTrigger / … | `import { Tooltip, TooltipTrigger, TooltipContent } from "@mvp-ui-rn/ui"` |
| Tabs / TabsList / … | `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@mvp-ui-rn/ui"` |
| SegmentedControl | `import { SegmentedControl } from "@mvp-ui-rn/ui"` |
| Toast (imperative) | `import { toast, Toaster } from "@mvp-ui-rn/ui"` |
| Header | `import { Header, headerScreenOptions } from "@mvp-ui-rn/ui"` |
| SafeArea | `import { SafeArea } from "@mvp-ui-rn/ui"` |
| SearchBar | `import { SearchBar } from "@mvp-ui-rn/ui"` |
| KeyboardAvoidingScroll | `import { KeyboardAvoidingScroll } from "@mvp-ui-rn/ui"` |
| Image | `import { Image } from "@mvp-ui-rn/ui"` |
| ProgressBar | `import { ProgressBar } from "@mvp-ui-rn/ui"` |
| Stepper | `import { Stepper } from "@mvp-ui-rn/ui"` |
| PinInput | `import { PinInput } from "@mvp-ui-rn/ui"` |
| usePullToRefresh | `import { usePullToRefresh } from "@mvp-ui-rn/ui"` |

---

## Hard rules (enforced by CLAUDE.md)

1. **No raw color scales** in component `className` for bg/text/border —
   use semantic aliases. See "Dark-safe styling rules" above.
2. **Text must be wrapped in `<Text>`** — RN crashes on bare strings inside
   `<View>`.
3. **Touch targets ≥ 44pt** — baked into variant defaults; do not override
   sizes below the floor.
4. **No `hover:` classes** — use `active:` (NativeWind → Pressable pressed
   state).
5. **No web-only imports** — never import from `react-dom`, `next/*`, or
   any web-only package.
6. **One component per file, named export only.**
7. **New component = docs entry** in `packages/skill/components-rn.md`
   before the PR is closed.
