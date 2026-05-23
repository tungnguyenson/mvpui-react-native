export interface NavItem {
  name: string
  href: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export interface NavGroup {
  label: string
  sections: NavSection[]
}

export const docsSections: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { name: "Introduction", href: "/docs/introduction" },
      { name: "Installation", href: "/docs/installation" },
      { name: "Theming", href: "/docs/theming" },
      { name: "Contributing", href: "/docs/contributing" },
    ],
  },
]

export const componentSections: NavSection[] = [
  {
    title: "Actions",
    items: [
      { name: "Button", href: "/components/button" },
      { name: "FAB", href: "/components/fab" },
    ],
  },
  {
    title: "Form",
    items: [
      { name: "Input", href: "/components/input" },
      { name: "Textarea", href: "/components/textarea" },
      { name: "PinInput", href: "/components/pin-input" },
      { name: "Label", href: "/components/label" },
      { name: "HintText", href: "/components/hint-text" },
      { name: "Checkbox", href: "/components/checkbox" },
      { name: "RadioGroup", href: "/components/radio-group" },
      { name: "Switch", href: "/components/switch" },
      { name: "Select", href: "/components/select" },
      { name: "Slider", href: "/components/slider" },
      { name: "Stepper", href: "/components/stepper" },
      { name: "DateTimePicker", href: "/components/date-time-picker" },
      { name: "FormField", href: "/components/form-field" },
      { name: "SettingsRow", href: "/components/settings-row" },
    ],
  },
  {
    title: "Overlays",
    items: [
      { name: "Dialog", href: "/components/dialog" },
      { name: "BottomSheet", href: "/components/bottom-sheet" },
      { name: "ActionSheet", href: "/components/action-sheet" },
      { name: "Popover", href: "/components/popover" },
      { name: "Tooltip", href: "/components/tooltip" },
      { name: "ContextMenu", href: "/components/context-menu" },
      { name: "Toast", href: "/components/toast" },
      { name: "Banner", href: "/components/banner" },
      { name: "Alert", href: "/components/alert" },
    ],
  },
  {
    title: "Navigation",
    items: [
      { name: "Header", href: "/components/header" },
      { name: "TabBar", href: "/components/tab-bar" },
      { name: "Tabs", href: "/components/tabs" },
      { name: "SegmentedControl", href: "/components/segmented-control" },
      { name: "SearchBar", href: "/components/search-bar" },
    ],
  },
  {
    title: "Content",
    items: [
      { name: "Card", href: "/components/card" },
      { name: "Avatar", href: "/components/avatar" },
      { name: "Badge", href: "/components/badge" },
      { name: "List", href: "/components/list" },
      { name: "Image", href: "/components/image" },
      { name: "Skeleton", href: "/components/skeleton" },
      { name: "ProgressBar", href: "/components/progress-bar" },
      { name: "CircularProgress", href: "/components/circular-progress" },
      { name: "EmptyState", href: "/components/empty-state" },
    ],
  },
  {
    title: "Interaction",
    items: [
      { name: "SwipeableRow", href: "/components/swipeable-row" },
      { name: "PullToRefresh", href: "/components/pull-to-refresh" },
      { name: "KeyboardAvoidingScroll", href: "/components/keyboard-avoiding-scroll" },
      { name: "HapticFeedback", href: "/components/haptic-feedback" },
    ],
  },
  {
    title: "Utility",
    items: [
      { name: "SafeArea", href: "/components/safe-area" },
      { name: "StatusBar", href: "/components/status-bar" },
      { name: "Icon", href: "/components/icon" },
      { name: "Spinner", href: "/components/spinner" },
    ],
  },
]

export const screenItems: NavItem[] = [
  { name: "Bottom Tab Navigation", href: "/screens#bottom-tab-navigation" },
  { name: "Bottom Tabs + FAB", href: "/screens#bottom-tabs-fab" },
  { name: "Onboarding", href: "/screens#onboarding" },
  { name: "Login / Auth", href: "/screens#login-auth" },
  { name: "Profile", href: "/screens#profile" },
  { name: "Settings", href: "/screens#settings" },
  { name: "Feed / Home", href: "/screens#feed-home" },
  { name: "Search / Discover", href: "/screens#search-discover" },
  { name: "Chat / Messaging", href: "/screens#chat-messaging" },
  { name: "Checkout", href: "/screens#checkout" },
  { name: "Notifications", href: "/screens#notifications" },
  { name: "Dashboard", href: "/screens#dashboard" },
]
