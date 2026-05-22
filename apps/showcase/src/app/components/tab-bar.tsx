import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  SafeArea,
  tabBarScreenOptions,
} from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { Home, Inbox, Settings } from "lucide-react-native"
import { ScrollView, Text, useColorScheme, View } from "react-native"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      <View className="gap-3">{children}</View>
    </View>
  )
}

/**
 * Static preview of how a real `<Tabs>` layout looks once skinned via
 * `tabBarScreenOptions`. The actual routing primitive is `<Tabs>` from
 * `expo-router` — this demo renders the visual outcome inline so it can
 * be inspected from a `<Stack>` route without rearranging the showcase
 * router tree.
 */
function TabBarPreview() {
  const scheme = useColorScheme()
  const opts = tabBarScreenOptions({ isDark: scheme === "dark" })
  const tabBarStyle = opts.tabBarStyle as {
    backgroundColor: string
    borderTopColor: string
    height: number
    paddingTop: number
    paddingBottom: number
    borderTopWidth: number
  }
  const activeTint = opts.tabBarActiveTintColor as string
  const inactiveTint = opts.tabBarInactiveTintColor as string
  const items = [
    { Icon: Home, label: "Home", active: true },
    { Icon: Inbox, label: "Inbox", active: false },
    { Icon: Settings, label: "Settings", active: false },
  ]

  return (
    <View
      style={{
        backgroundColor: tabBarStyle.backgroundColor,
        borderTopColor: tabBarStyle.borderTopColor,
        borderTopWidth: tabBarStyle.borderTopWidth,
        height: tabBarStyle.height,
        paddingTop: tabBarStyle.paddingTop,
        paddingBottom: tabBarStyle.paddingBottom,
        flexDirection: "row",
      }}
    >
      {items.map((item) => (
        <View
          key={item.label}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <item.Icon
            size={22}
            color={item.active ? activeTint : inactiveTint}
          />
          <Text
            style={{
              color: item.active ? activeTint : inactiveTint,
              fontSize: 12,
              fontWeight: "500",
              marginTop: 2,
            }}
          >
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  )
}

export default function TabBarShowcase() {
  return (
    <SafeArea edges={["top", "left", "right"]}>
      <Stack.Screen options={{ title: "TabBar", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="What it does">
          <Card>
            <CardHeader>
              <CardTitle>tabBarScreenOptions()</CardTitle>
              <CardDescription>
                Returns `screenOptions` for expo-router `Tabs`. Native routing,
                accessibility, and safe-area handling stay native — tokens
                drive surface, border, active/inactive tints, label
                typography.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Text className="text-fg-secondary text-md font-mono">
                Tabs screenOptions=tabBarScreenOptions
              </Text>
              <Text className="text-fg-secondary text-md font-mono">
                isDark from useColorScheme
              </Text>
            </CardContent>
          </Card>
        </Section>

        <Section title="Static preview">
          <View className="overflow-hidden rounded-xl border border-border">
            <TabBarPreview />
          </View>
          <Text className="text-fg-tertiary text-md">
            Inactive tints use fg-tertiary; active tints use brand-600
            (brand-400 in dark). 0.5pt hairline on top border.
          </Text>
          <Text className="text-fg-secondary text-md">
            See `/components/bottom-tabs` for a live `&lt;Tabs&gt;` demo with
            real routing + badge.
          </Text>
        </Section>

        <Section title="When NOT to use">
          <Card>
            <CardContent className="p-6 gap-2">
              <Text className="text-fg-secondary text-md">
                - For content tabs inside a screen → use Tabs primitive
                (not yet ported).
              </Text>
              <Text className="text-fg-secondary text-md">
                - When you need a fully custom tab bar (blur, badges, FAB
                slot) → pass a custom `tabBar` component to Tabs instead.
              </Text>
            </CardContent>
          </Card>
        </Section>
      </ScrollView>
    </SafeArea>
  )
}
