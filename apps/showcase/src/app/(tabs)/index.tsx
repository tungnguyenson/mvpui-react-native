import { Card, CardContent } from "@mvp-ui-rn/ui"
import { tokens } from "@mvp-ui-rn/tokens"
import { useRouter } from "expo-router"
import {
  BarChart2,
  Bell,
  LayoutGrid,
  LogIn,
  MessageCircle,
  PlusCircle,
  Rss,
  Search,
  Settings,
  ShoppingCart,
  Sparkles,
  User,
} from "lucide-react-native"
import { Pressable, ScrollView, Text, View, useColorScheme } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

type ScreenEntry = {
  href: string
  label: string
  bg: string
  Icon: React.ComponentType<{ size?: number; color?: string }>
}

const SCREENS: ScreenEntry[] = [
  { href: "/screens/bottom-tabs", label: "Bottom Tabs", bg: "bg-bg-secondary", Icon: LayoutGrid },
  { href: "/screens/bottom-tabs-fab", label: "Bottom Tabs + FAB", bg: "bg-bg-secondary", Icon: PlusCircle },
  { href: "/screens/onboarding", label: "Onboarding", bg: "bg-success-bg", Icon: Sparkles },
  { href: "/screens/login", label: "Login / Auth", bg: "bg-bg-tertiary", Icon: LogIn },
  { href: "/screens/profile", label: "Profile", bg: "bg-warning-bg", Icon: User },
  { href: "/screens/settings", label: "Settings", bg: "bg-bg-secondary", Icon: Settings },
  { href: "/screens/feed", label: "Feed / Home", bg: "bg-info-bg", Icon: Rss },
  { href: "/screens/search", label: "Search / Discover", bg: "bg-bg-tertiary", Icon: Search },
  { href: "/screens/chat-list", label: "Chat / Messaging", bg: "bg-success-bg", Icon: MessageCircle },
  { href: "/screens/checkout", label: "Checkout", bg: "bg-error-bg", Icon: ShoppingCart },
  { href: "/screens/notifications", label: "Notifications", bg: "bg-warning-bg", Icon: Bell },
  { href: "/screens/dashboard", label: "Dashboard", bg: "bg-info-bg", Icon: BarChart2 },
]

export default function ScreensTab() {
  const router = useRouter()
  const scheme = useColorScheme()
  const isDark = scheme === "dark"
  const fgColor = isDark ? tokens.color.gray["25"] : tokens.color.gray["900"]

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerClassName="px-5 py-6">
        <View className="gap-4">
          <Text className="text-fg-tertiary text-xs uppercase tracking-wide font-medium">
            Application Screens
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {SCREENS.map((s) => (
              <Pressable
                key={s.href}
                style={{ width: "48%" }}
                onPress={() => router.push(s.href as never)}
              >
                <Card className="overflow-hidden">
                  <View className={`h-24 items-center justify-center ${s.bg}`}>
                    <s.Icon size={28} color={fgColor} />
                  </View>
                  <CardContent className="py-3 px-4">
                    <Text className="text-fg text-sm font-semibold" numberOfLines={1}>
                      {s.label}
                    </Text>
                  </CardContent>
                </Card>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
