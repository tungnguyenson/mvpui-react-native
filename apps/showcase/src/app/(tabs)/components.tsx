import { List, ListItem, ListSection } from "@mvp-ui-rn/ui"
import { useRouter } from "expo-router"
import {
  AlignLeft,
  AlertTriangle,
  ArrowLeftRight,
  BarChart2,
  Bell,
  Calendar,
  CheckSquare,
  ChevronDown,
  CircleDot,
  CreditCard,
  FormInput,
  Gauge,
  Hash,
  HelpCircle,
  Image,
  Info,
  Inbox,
  Keyboard,
  Layers,
  LayoutGrid,
  LayoutList,
  List as ListIcon,
  Loader,
  Loader2,
  Megaphone,
  MessageSquare,
  Minus,
  MoreHorizontal,
  LogIn,
  MousePointerClick,
  Navigation,
  PanelBottom,
  PanelTop,
  Plus,
  Pointer,
  RefreshCw,
  Search,
  Settings2,
  Shapes,
  Shield,
  SlidersHorizontal,
  Square,
  Tag,
  Columns as TabsIcon,
  ToggleLeft,
  Type,
  UserCircle,
  Vibrate,
  Wrench,
  Zap,
} from "lucide-react-native"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

type ComponentEntry = {
  href: string
  label: string
  Icon: React.ComponentType<{ size?: number; color?: string }>
}

type CategoryEntry = {
  title: string
  items: ComponentEntry[]
}

const CATEGORIES: CategoryEntry[] = [
  {
    title: "Actions",
    items: [
      { href: "/components/button", label: "Button", Icon: MousePointerClick },
      { href: "/components/social-button", label: "SocialButton", Icon: LogIn },
      { href: "/components/fab", label: "FAB", Icon: Plus },
    ],
  },
  {
    title: "Form",
    items: [
      { href: "/components/input", label: "Input", Icon: Type },
      { href: "/components/textarea", label: "Textarea", Icon: AlignLeft },
      { href: "/components/pin-input", label: "PinInput", Icon: Hash },
      { href: "/components/checkbox", label: "Checkbox", Icon: CheckSquare },
      { href: "/components/radio-group", label: "RadioGroup", Icon: CircleDot },
      { href: "/components/switch", label: "Switch", Icon: ToggleLeft },
      { href: "/components/select", label: "Select", Icon: ChevronDown },
      { href: "/components/slider", label: "Slider", Icon: SlidersHorizontal },
      { href: "/components/stepper", label: "Stepper", Icon: Minus },
      { href: "/components/date-time-picker", label: "DateTimePicker", Icon: Calendar },
      { href: "/components/form-field", label: "FormField", Icon: LayoutGrid },
      { href: "/components/settings-row", label: "SettingsRow", Icon: Settings2 },
    ],
  },
  {
    title: "Overlays",
    items: [
      { href: "/components/dialog", label: "Dialog", Icon: Square },
      { href: "/components/bottom-sheet", label: "BottomSheet", Icon: PanelBottom },
      { href: "/components/action-sheet", label: "ActionSheet", Icon: ListIcon },
      { href: "/components/popover", label: "Popover", Icon: MessageSquare },
      { href: "/components/tooltip", label: "Tooltip", Icon: HelpCircle },
      { href: "/components/context-menu", label: "ContextMenu", Icon: MoreHorizontal },
      { href: "/components/toast", label: "Toast", Icon: Bell },
      { href: "/components/banner", label: "Banner", Icon: Megaphone },
      { href: "/components/alert", label: "Alert", Icon: AlertTriangle },
    ],
  },
  {
    title: "Navigation",
    items: [
      { href: "/components/header", label: "Header", Icon: PanelTop },
      { href: "/components/tab-bar", label: "TabBar", Icon: PanelBottom },
      { href: "/components/tabs", label: "Tabs", Icon: TabsIcon },
      { href: "/components/segmented-control", label: "SegmentedControl", Icon: ToggleLeft },
      { href: "/components/search-bar", label: "SearchBar", Icon: Search },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/components/card", label: "Card", Icon: CreditCard },
      { href: "/components/avatar", label: "Avatar", Icon: UserCircle },
      { href: "/components/badge", label: "Badge", Icon: Tag },
      { href: "/components/list", label: "List", Icon: ListIcon },
      { href: "/components/image", label: "Image", Icon: Image },
      { href: "/components/skeleton", label: "Skeleton", Icon: Loader },
      { href: "/components/progress-bar", label: "ProgressBar", Icon: Gauge },
      { href: "/components/circular-progress", label: "CircularProgress", Icon: RefreshCw },
      { href: "/components/empty-state", label: "EmptyState", Icon: Inbox },
    ],
  },
  {
    title: "Interaction",
    items: [
      { href: "/components/swipeable-row", label: "SwipeableRow", Icon: ArrowLeftRight },
      { href: "/components/pull-to-refresh", label: "PullToRefresh", Icon: RefreshCw },
      { href: "/components/haptics", label: "Haptics", Icon: Vibrate },
      { href: "/components/keyboard-avoiding-scroll", label: "KeyboardAvoidingScroll", Icon: Keyboard },
    ],
  },
  {
    title: "Utility",
    items: [
      { href: "/components/safe-area", label: "SafeArea", Icon: Shield },
      { href: "/components/status-bar", label: "StatusBar", Icon: Minus },
      { href: "/components/icon", label: "Icon", Icon: Shapes },
      { href: "/components/spinner", label: "Spinner", Icon: Loader2 },
    ],
  },
]

export default function ComponentsTab() {
  const router = useRouter()

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <ScrollView contentContainerClassName="px-5 py-6 gap-4">
        <Text className="text-fg text-2xl font-bold">Components</Text>
        <List>
          {CATEGORIES.map((cat) => (
            <ListSection key={cat.title} title={cat.title}>
              {cat.items.map((item) => (
                <ListItem
                  key={item.href}
                  leading={item.Icon}
                  title={item.label}
                  onPress={() => router.push(item.href as never)}
                  chevron
                />
              ))}
            </ListSection>
          ))}
        </List>
      </ScrollView>
    </SafeAreaView>
  )
}
