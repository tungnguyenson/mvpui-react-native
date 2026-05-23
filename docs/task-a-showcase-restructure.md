# Task A — Showcase Restructure

## Goal

Restructure `apps/showcase` from a flat component list into a two-section app:
1. **Application Screens** — full app-like experience demos
2. **Components** — grouped by category (same content, better navigation)

---

## Current state

```
src/app/
├── index.tsx                    ← flat alphabetical list, 50+ links
└── components/
    ├── bottom-tabs/             ← navigation demo
    ├── bottom-tabs-fab/         ← navigation demo
    └── *.tsx                    ← 46 flat component demo files
```

---

## Target state

```
src/app/
├── index.tsx                    ← redesigned: 2 sections
├── screens/                     ← NEW
│   ├── bottom-tabs/             ← MOVED from components/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── inbox.tsx
│   │   ├── list.tsx
│   │   └── settings.tsx
│   ├── bottom-tabs-fab/         ← MOVED from components/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── inbox.tsx
│   │   ├── search.tsx
│   │   ├── create.tsx
│   │   └── profile.tsx
│   ├── onboarding.tsx           ← NEW
│   ├── login.tsx                ← NEW
│   ├── profile.tsx              ← NEW
│   ├── settings/                ← NEW (Stack: list → drill-down)
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── account.tsx
│   ├── feed.tsx                 ← NEW
│   ├── search.tsx               ← NEW
│   ├── chat.tsx                 ← NEW
│   ├── checkout.tsx             ← NEW
│   ├── notifications.tsx        ← NEW
│   └── dashboard.tsx            ← NEW
└── components/                  ← untouched files, index links updated
    └── *.tsx
```

---

## Index redesign

Built with the library's own components — the index is itself a demo.

### Visual structure

```
┌─────────────────────────────────────┐
│  mvp-ui-rn              [☀/🌙]     │  ← Text + ThemeToggle
│  Untitled UI · React Native         │
├─────────────────────────────────────┤
│  APPLICATION SCREENS                │  ← Text xs uppercase fg-tertiary
│                                     │
│  ┌───────────┐  ┌───────────┐       │
│  │ bg-primary│  │bg-success │       │  ← Card, top area = colored bg
│  │    [icon] │  │   [icon]  │       │     bottom = CardTitle
│  │           │  │           │       │
│  │ Bottom    │  │ Onboarding│       │
│  │ Tabs      │  │           │       │
│  └───────────┘  └───────────┘       │
│  ┌───────────┐  ┌───────────┐       │
│  │ bg-warning│  │bg-error-bg│       │
│  │    [icon] │  │   [icon]  │       │
│  │           │  │           │       │
│  │ Login     │  │ Profile   │       │
│  └───────────┘  └───────────┘       │
│  … (6 more cards, 2 cols)           │
├─────────────────────────────────────┤
│  COMPONENTS                         │  ← Text xs uppercase fg-tertiary
│                                     │
│  ┌─────────────────────────────┐    │
│  │ Actions                     │    │  ← ListSection title
│  │  ⚡ Button              ›   │    │  ← ListItem leading=icon chevron
│  │  ＋ FAB                 ›   │    │
│  ├─────────────────────────────┤    │
│  │ Form                        │    │
│  │  ⌨ Input               ›   │    │
│  │  ¶  Textarea            ›   │    │
│  │  … (8 more)                 │    │
│  ├─────────────────────────────┤    │
│  │ Overlays  …                 │    │
│  │ Navigation …                │    │
│  │ Content   …                 │    │
│  │ Interaction …               │    │
│  │ Utility   …                 │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### Component breakdown

**Header:**
- Raw `Text` + `ThemeToggle` (no lib dep here — it's the root chrome)

**Screens grid — 2-column `FlatList numColumns={2}`:**
- Each cell: `Pressable` wrapping a `Card`
- Card top area: `View` with semantic bg color (varies per screen) + centered lucide icon
- Card bottom: `CardContent` with `Text` title

Screen → bg color + icon mapping:
| Screen | bg | icon |
|---|---|---|
| Bottom Tabs | `bg-primary` | `LayoutGrid` |
| Bottom Tabs + FAB | `bg-primary` | `PlusCircle` |
| Onboarding | `bg-success-bg` | `Sparkles` |
| Login / Auth | `bg-bg-tertiary` | `LogIn` |
| Profile | `bg-warning-bg` | `User` |
| Settings | `bg-bg-secondary` | `Settings` |
| Feed / Home | `bg-info-bg` | `Rss` |
| Search / Discover | `bg-bg-tertiary` | `Search` |
| Chat / Messaging | `bg-success-bg` | `MessageCircle` |
| Checkout | `bg-error-bg` | `ShoppingCart` |
| Notifications | `bg-warning-bg` | `Bell` |
| Dashboard | `bg-primary` | `BarChart2` |

Icon color: always `text-fg` (adapts light/dark) — do NOT use `text-primary-fg` (only valid on solid brand fills).

**Components section — `List` + `ListSection` + `ListItem`:**
- Each category = one `ListSection` with `title`
- Each component = `ListItem` with `leading={LucideIcon}` + `title="ComponentName"` + `onPress={() => router.push('/components/slug')}` + `chevron`
- No subtitle on component rows (too noisy)

Category → icon + components:
| Category | Section icon ref | Components |
|---|---|---|
| Actions | `Zap` | Button · FAB |
| Form | `FormInput` | Input · Textarea · PinInput · Label · HintText · Checkbox · RadioGroup · Switch · Select · Slider · Stepper · DateTimePicker · FormField · SettingsRow |
| Overlays | `Layers` | Dialog · BottomSheet · ActionSheet · Popover · Tooltip · ContextMenu · Toast · Banner · Alert |
| Navigation | `Navigation` | Header · TabBar · Tabs · SegmentedControl · SearchBar |
| Content | `LayoutList` | Card · Avatar · Badge · List · Image · Skeleton · ProgressBar · CircularProgress · EmptyState |
| Interaction | `Pointer` | SwipeableRow · PullToRefresh · Haptics · KeyboardAvoidingScroll |
| Utility | `Wrench` | SafeArea · StatusBar · Icon · Spinner |

Each `ListItem` uses its own icon (not the section icon). Mapping:

| Component | Icon |
|---|---|
| Button | `MousePointerClick` |
| FAB | `Plus` |
| Input | `Type` |
| Textarea | `AlignLeft` |
| PinInput | `Hash` |
| Label | `Tag` |
| HintText | `Info` |
| Checkbox | `CheckSquare` |
| RadioGroup | `CircleDot` |
| Switch | `ToggleLeft` |
| Select | `ChevronDown` |
| Slider | `SlidersHorizontal` |
| Stepper | `Minus` |
| DateTimePicker | `Calendar` |
| FormField | `Columns2` |
| SettingsRow | `Settings2` |
| Dialog | `Square` |
| BottomSheet | `PanelBottom` |
| ActionSheet | `List` |
| Popover | `MessageSquare` |
| Tooltip | `HelpCircle` |
| ContextMenu | `MoreHorizontal` |
| Toast | `Bell` |
| Banner | `Megaphone` |
| Alert | `AlertTriangle` |
| Header | `PanelTop` |
| TabBar | `PanelBottom` |
| Tabs | `Tabs` |
| SegmentedControl | `ToggleLeft` |
| SearchBar | `Search` |
| Card | `CreditCard` |
| Avatar | `UserCircle` |
| Badge | `Badge` |
| List | `ListOrdered` |
| Image | `Image` |
| Skeleton | `Loader` |
| ProgressBar | `Gauge` |
| CircularProgress | `RefreshCw` |
| EmptyState | `Inbox` |
| SwipeableRow | `ArrowLeftRight` |
| PullToRefresh | `RefreshCw` |
| Haptics | `Vibrate` |
| KeyboardAvoidingScroll | `Keyboard` |
| SafeArea | `Shield` |
| StatusBar | `Minus` |
| Icon | `Shapes` |
| Spinner | `Loader2` |

---

## Screen specs

Each screen uses static mock data (no network). Goal: look realistic, exercise the most components.

### Onboarding
- 3-slide paginated carousel (PagerView or FlatList horizontal)
- Dots indicator
- "Next" / "Get Started" Button
- Components: Button, Avatar (brand illustration slot), ProgressBar dots

### Login / Auth
- Logo + title
- Input (email, password with eye toggle)
- Button primary ("Sign in")
- Divider + social buttons (outline Button)
- "Forgot password?" TextButton
- Components: Input, Button, FormField

### Profile
- Header with Avatar (xl), name, username, badge
- Stats row (posts / followers / following) using Card or metric cells
- Tabs (Posts / About)
- EmptyState in Posts tab
- Edit profile Button
- Components: Avatar, Badge, Tabs, Card, Button, EmptyState

### Settings (Stack — 2 screens)

**Settings index** (`/screens/settings/index.tsx`):
- Avatar + name header row
- ListSection: Account (Avatar, Notifications, Privacy)
- ListSection: Preferences (Appearance with Switch, Language with Select)
- ListSection: Support (Help Center, Send Feedback)
- Danger zone: Log Out (destructive Button)
- Components: ListSection, ListItem, SettingsRow, Switch, Avatar, Button

**Account sub-screen** (`/screens/settings/account.tsx`):
- Edit name / email fields
- Save Button
- Components: FormField, Input, Button, Header (back)

### Feed / Home
- SearchBar (static, no interaction)
- PullToRefresh (mock async refresh, 1s delay)
- FlatList of 8–10 post cards:
  - Avatar + name + timestamp
  - Body text
  - Image (expo-image)
  - Like / Comment / Share row (icon Buttons)
  - SwipeableRow (archive left, delete right)
- Skeleton shown for 800ms on first load
- Components: SearchBar, Avatar, Badge, Image, Button, SwipeableRow, PullToRefresh, Skeleton

### Search / Discover
- SearchBar (controlled, filters list)
- SegmentedControl (All / People / Posts / Tags)
- 3-state: empty prompt, results list, no-results EmptyState
- Results: Avatar rows with Badge
- Components: SearchBar, SegmentedControl, Avatar, Badge, EmptyState, List

### Chat / Messaging
- Header with Avatar + name + status badge
- Message thread (FlatList, static 10 messages, alternating sent/received bubbles)
- Compose bar: Input + send Button
- KeyboardAvoidingScroll wraps the whole screen
- Components: Avatar, Badge, Input, Button, KeyboardAvoidingScroll, Header

### Checkout
- Header "Checkout"
- Order summary Card (items list, price rows)
- FormField sections: Shipping address (Input × 3), Payment (PinInput for CVV, Input for card)
- Stepper for quantity
- Total row + "Place Order" Button (primary)
- Success Dialog on submit
- Components: Card, FormField, Input, PinInput, Stepper, Button, Dialog

### Notifications
- FilterBar: SegmentedControl (All / Unread / Mentions)
- FlatList of 10–12 notification rows:
  - Avatar + notification text + timestamp + unread dot Badge
  - SwipeableRow (mark read left, delete right)
- PullToRefresh
- EmptyState when filter has no results
- Components: SegmentedControl, Avatar, Badge, SwipeableRow, PullToRefresh, EmptyState

### Dashboard
- Header + greeting
- Stats strip: 3 metric cards (CircularProgress + label + value)
- "Activity" section: ProgressBar rows (7-day breakdown)
- "Recent" section: List of 5 items with Avatar + trailing Badge
- Components: Card, CircularProgress, ProgressBar, Avatar, Badge, List

---

## Decisions locked

| # | Question | Decision |
|---|---|---|
| 1 | Mock data vs lorem | Static mock data — realistic content |
| 2 | Settings drill-down | Yes — Stack with Account sub-screen |
| 3 | Chat compose | Yes — Input + Button compose bar + KAS |
| 4 | Dashboard data viz | ProgressBar + CircularProgress + metric cards (no chart lib) |
| 5 | Feed + Notifications SwipeableRow | Yes — natural fit |
| 6 | Checkout flow | Single screen (not multi-step) — multi-step is app-layer scope |

---

## Build order

1. Restructure index + move bottom-tabs* to /screens/
2. Onboarding
3. Login / Auth
4. Profile
5. Settings (Stack)
6. Feed / Home
7. Search / Discover
8. Notifications
9. Chat / Messaging
10. Checkout
11. Dashboard

---

## Out of scope

- Real navigation between screens (screens are standalone demos, not a connected app)
- Real auth / network calls
- Multi-step checkout flow
- Maestro verification flows for screens (screens are visual demos, not interaction-tested at this stage)
