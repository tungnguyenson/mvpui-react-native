export interface ScreenDef {
  slug: string
  name: string
  description: string
  components: string[]
}

export const screens: ScreenDef[] = [
  {
    slug: "bottom-tab-navigation",
    name: "Bottom Tab Navigation",
    description:
      "Standard tab-based app shell with 4 tabs, active indicator, and icon+label layout.",
    components: ["TabBar", "Header", "SafeArea", "StatusBar"],
  },
  {
    slug: "bottom-tabs-fab",
    name: "Bottom Tabs + FAB",
    description:
      "Tab shell with a centered FAB that replaces the middle tab — common in social/creation apps.",
    components: ["TabBar", "FAB", "Header", "SafeArea"],
  },
  {
    slug: "onboarding",
    name: "Onboarding",
    description:
      "Multi-step onboarding flow with progress indicator, illustration area, and CTA button.",
    components: ["Button", "ProgressBar", "SafeArea"],
  },
  {
    slug: "login-auth",
    name: "Login / Auth",
    description: "Email + password login screen with social sign-in options and error handling.",
    components: ["Input", "Button", "HintText", "SafeArea"],
  },
  {
    slug: "profile",
    name: "Profile",
    description:
      "User profile with avatar, stats row, action buttons, and a list of recent activity.",
    components: ["Avatar", "Button", "Badge", "List", "Header", "SafeArea"],
  },
  {
    slug: "settings",
    name: "Settings",
    description: "Grouped settings screen using SettingsRow with switch, chevron, and badge variants.",
    components: ["SettingsRow", "Switch", "Badge", "Header", "SafeArea"],
  },
  {
    slug: "feed-home",
    name: "Feed / Home",
    description:
      "Scrollable content feed with pull-to-refresh, skeleton loading, and swipeable rows.",
    components: ["SwipeableRow", "PullToRefresh", "Skeleton", "Avatar", "Badge", "Card"],
  },
  {
    slug: "search-discover",
    name: "Search / Discover",
    description:
      "Search interface with SearchBar, tag filters, and a results grid with Avatar + Badge.",
    components: ["SearchBar", "Badge", "Avatar", "Card", "EmptyState"],
  },
  {
    slug: "chat-messaging",
    name: "Chat / Messaging",
    description:
      "Conversation screen with message bubbles, avatar indicators, and keyboard-avoiding input.",
    components: ["Avatar", "Input", "KeyboardAvoidingScroll", "Header"],
  },
  {
    slug: "checkout",
    name: "Checkout",
    description:
      "Multi-step checkout with form inputs, a summary card, and a sticky action button.",
    components: ["Input", "Select", "Card", "Button", "ProgressBar", "SafeArea"],
  },
  {
    slug: "notifications",
    name: "Notifications",
    description:
      "Notification list with read/unread states, swipeable actions, and empty state.",
    components: ["SwipeableRow", "Avatar", "Badge", "EmptyState", "Header"],
  },
  {
    slug: "dashboard",
    name: "Dashboard",
    description:
      "Analytics dashboard with metric cards, progress rings, and a chart placeholder.",
    components: ["Card", "CircularProgress", "ProgressBar", "Badge", "Header", "Skeleton"],
  },
]
