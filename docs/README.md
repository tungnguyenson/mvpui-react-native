# mvp-ui-react-native

React Native / Expo port of `mvp-ui`. Separate repo, parallel evolution.

## Contents of this dir

| File | Role |
|---|---|
| `README.md` (this) | Strategy, stack, repo layout, migration plan |
| `styling-approaches.md` | Survey of RN styling options + why NativeWind won |
| `rn-claude-md-template.md` | Drop-in `CLAUDE.md` for the new RN repo |
| `source-material/` | Snapshot of web tokens + skill docs to seed the RN repo |
| `source-material/MANIFEST.md` | Per-file role + sync policy |

## Decisions (locked)

- **Separate repo**, not a workspace in `mvp-ui`.
- **Copy tokens** from `packages/tokens` into the RN repo. No git submodule, no npm dep on web tokens.
- **No Tamagui, no gluestack.** Stay close to web mental model.
- Untitled UI fidelity preserved — same variant API, same component names.

## Stack

| Layer | Choice |
|---|---|
| Runtime | Expo SDK 54+ (React Native 0.81+) |
| Router | Expo Router (file-based, RSC-aware) |
| Styling | NativeWind v5 (Tailwind v4 runtime for RN, CSS vars + `dark:`) |
| Primitives | `@rn-primitives/*` (Radix-equivalent, headless) |
| Component patterns | react-native-reusables (shadcn-for-RN) as reference |
| Variants | `cva` (same as web) |
| Icons | `lucide-react-native` |
| TS | 5.6+ |
| Lint/format | Biome (mirror web) |

## Repo layout

```
mvp-ui-rn/
├── packages/
│   ├── tokens/          ← copy of mvp-ui/packages/tokens, RN-safe only
│   │   ├── src/
│   │   │   ├── colors.ts
│   │   │   ├── spacing.ts
│   │   │   ├── typography.ts
│   │   │   └── index.ts
│   │   └── global.css   ← NativeWind v5 reads CSS vars from here
│   ├── ui/              ← RN components, 1:1 with web names
│   │   └── src/components/
│   └── skill/           ← copy + diff layer (RN-specific anti-patterns)
└── apps/
    └── showcase/        ← Expo app, mirrors apps/docs role
```

## Token strategy

1. Copy `packages/tokens/src/*.ts` from web verbatim — pure TS, no CSS imports.
2. Re-emit semantic flipping tokens as CSS vars in `global.css` for NativeWind v5:
   ```css
   :root {
     --color-bg: #ffffff;
     --color-fg: #101828;
     --color-border-brand: #7f56d9;
   }
   .dark:root {
     --color-bg: #0c111d;
     --color-fg: #f5f5f6;
   }
   ```
3. Tailwind config maps semantic names → CSS vars, identical to web.
4. **Sync rule:** new token added in web → copy to RN in same PR cycle. No drift > 1 sprint.

## Component migration order

Migrate web → RN in this order. Each component blocks the next group.

1. **Primitives:** Button, Badge, Input, Label, Avatar, Icon wrapper
2. **Forms:** Checkbox, RadioGroup, Switch, Select, Textarea, PinInput
3. **Overlays:** Dialog, Drawer (= bottom-sheet on RN), Popover, Tooltip, Toast
4. **Nav:** Tabs, Breadcrumb, Pagination, SideNav
5. **Data:** Card, Alert, Table (FlatList-based), Skeleton

## Radix → RN primitive map

| Web (Radix) | RN equivalent |
|---|---|
| `@radix-ui/react-dialog` | `@rn-primitives/dialog` |
| `@radix-ui/react-popover` | `@rn-primitives/popover` |
| `@radix-ui/react-tabs` | `@rn-primitives/tabs` |
| `@radix-ui/react-checkbox` | `@rn-primitives/checkbox` |
| `@radix-ui/react-select` | `@rn-primitives/select` |
| `@radix-ui/react-tooltip` | `@rn-primitives/tooltip` (touch-adjusted) |
| Drawer (vaul) | `@gorhom/bottom-sheet` |

Gaps (no direct primitive): SideNav, complex Table, Command palette — build from scratch.

## Hard rules (RN-specific)

- Never hardcode color/spacing — always tokens (same as web).
- Never import from `react-dom`, `next/*`, or any web-only package.
- Every component file gets `"use client"` removed (RN has no RSC split).
- IconProp contract identical to web: `type IconProp = FC<{ className?: string }> | ReactNode;`
- Touch targets ≥ 44pt — enforce in variant defaults (Button `sm` = 44pt min height, not web's 36px).
- Test on iOS + Android before shipping. Web/Expo-web not a release target.

## What NOT to share

- CSS files (web-only).
- Radix imports.
- Next.js anything (routing, image, font).
- DOM-specific hooks (`useLayoutEffect` patterns assuming DOM measurement).

## Open questions

- Dark mode trigger: system pref via `useColorScheme()` or app-level toggle?
- Animation lib: Reanimated 3 (default) — confirm before any motion component.
- Form lib: react-hook-form works in RN; keep parity with web.
- Distribution: private git dep (like web) or internal npm registry?

## Component starting set

| Layer | Use | Why |
|---|---|---|
| Layout/text/touch | RN core (`View`, `Text`, `Pressable`, `TextInput`, `ScrollView`, `FlatList`, `Image`) | Zero deps. Every alt lib wraps these. |
| Headless interaction | `@rn-primitives/*` | Radix-equivalent — Dialog/Popover/Tabs/Select/Checkbox/Switch/Tooltip. Headless, unstyled, accessible. |
| Reference patterns | `react-native-reusables` (RNR) | shadcn-for-RN. **Copy code, don't depend.** Same pattern as web shadcn. |
| Bottom sheet | `@gorhom/bottom-sheet` | No `@rn-primitives` equivalent worth using. |
| Animation | `react-native-reanimated` v3 | Default with Expo. Required by RNR + bottom-sheet. |
| Gesture | `react-native-gesture-handler` | Required by reanimated + bottom-sheet. |

**Skip:** Tamagui, gluestack, NativeBase, React Native Paper, RN Elements — wrong abstraction or wrong design lang.

**First-component order:**
1. Bootstrap Expo + NativeWind + cva.
2. Install `@rn-primitives/slot` (foundational).
3. Port Button using `Pressable` + cva — no headless primitive needed.
4. Port Dialog using `@rn-primitives/dialog` — validates overlay + portal path.

## Styling & theming

### Engine

NativeWind v5 = Tailwind v4 runtime for RN. Same class strings as web (mostly). Reads CSS vars from `global.css`. `cva` builds variant maps identical to web.

### Tailwind config

`tailwind.config.ts`:
```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./packages/ui/src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        "bg-secondary": "var(--color-bg-secondary)",
        fg: "var(--color-fg)",
        "fg-secondary": "var(--color-fg-secondary)",
        "fg-brand": "var(--color-fg-brand)",
        border: "var(--color-border)",
        "border-brand": "var(--color-border-brand)",
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-fg": "var(--color-primary-fg)",
      },
    },
  },
} satisfies Config;
```

### Token file (`global.css`)

Mirror web's flipping pattern. NativeWind v5 reads CSS vars:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-bg: #ffffff;
  --color-bg-secondary: #f9fafb;
  --color-fg: #101828;
  --color-fg-secondary: #475467;
  --color-fg-brand: #6941c6;
  --color-border: #eaecf0;
  --color-border-brand: #7f56d9;
  --color-primary: #7f56d9;
  --color-primary-hover: #6941c6;
  --color-primary-fg: #ffffff;
}

.dark:root {
  --color-bg: #0c111d;
  --color-bg-secondary: #161b26;
  --color-fg: #f5f5f6;
  --color-fg-secondary: #cecfd2;
  --color-border: #1f242f;
  --color-primary: #7f56d9;
  --color-primary-fg: #ffffff;
}
```

### Theme toggle

`app/_layout.tsx`:
```tsx
import "../global.css";
import { useColorScheme } from "nativewind";
import { View } from "react-native";
import { Slot } from "expo-router";

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <View className={colorScheme === "dark" ? "dark flex-1 bg-bg" : "flex-1 bg-bg"}>
      <Slot />
    </View>
  );
}
```

User-controlled toggle: `useColorScheme().setColorScheme("dark" | "light" | "system")`.

### Component example (Button, end-to-end)

`packages/ui/src/components/button.tsx`:
```tsx
import { Pressable, Text, View, type PressableProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const buttonVariants = cva(
  "flex-row items-center justify-center rounded-lg active:opacity-80",
  {
    variants: {
      variant: {
        primary: "bg-primary",
        secondary: "bg-bg-secondary border border-border",
        ghost: "bg-transparent",
      },
      size: {
        sm: "h-11 px-3",
        md: "h-12 px-4",
        lg: "h-14 px-5",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

const labelVariants = cva("font-medium", {
  variants: {
    variant: {
      primary: "text-primary-fg",
      secondary: "text-fg",
      ghost: "text-fg-brand",
    },
    size: { sm: "text-sm", md: "text-base", lg: "text-lg" },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

type Props = PressableProps & VariantProps<typeof buttonVariants> & { label: string };

export const Button = forwardRef<View, Props>(
  ({ variant, size, label, className, ...rest }, ref) => (
    <Pressable
      ref={ref}
      className={buttonVariants({ variant, size, className })}
      {...rest}
    >
      <Text className={labelVariants({ variant, size })}>{label}</Text>
    </Pressable>
  ),
);
Button.displayName = "Button";
```

### Hard rules (theming-specific)

- Never hardcode hex in components. Always semantic class (`bg-bg`, `text-fg`).
- Never pass `style={{ color: ... }}`. NativeWind only.
- Status colors (`bg-success-bg`, `text-error-fg`, etc.) — same names as web in `global.css`.
- RN has no `:hover`. Use `active:` (NativeWind maps to Pressable pressed). Skip hover variants from web.
- Dark mode only via `dark:` class on ancestor — don't read `colorScheme` inside leaf components.
- Text MUST live inside `<Text>`. RN crashes on bare strings in `<View>`. Different from web.

## Next step

Bootstrap repo:
```bash
pnpm create expo-app mvp-ui-rn --template blank-typescript
cd mvp-ui-rn
pnpm add nativewind@next tailwindcss@next @rn-primitives/portal class-variance-authority
```
Then port Button as first component to validate token + variant pipeline end-to-end.
