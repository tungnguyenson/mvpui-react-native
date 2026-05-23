import { tabBarScreenOptions } from "@mvp-ui-rn/ui"
import { Stack, Tabs } from "expo-router"
import { Home, Inbox, List, Settings } from "lucide-react-native"
import { useColorScheme } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function BottomTabsLayout() {
  const scheme = useColorScheme()
  const insets = useSafeAreaInsets()
  const opts = tabBarScreenOptions({
    isDark: scheme === "dark",
    bottomInset: insets.bottom,
  })

  return (
    <>
      <Stack.Screen options={{ title: "Bottom Tabs", headerShown: true }} />
      <Tabs screenOptions={opts}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="inbox"
          options={{
            title: "Inbox",
            tabBarIcon: ({ color, size }) => <Inbox color={color} size={size} />,
            tabBarBadge: 3,
          }}
        />
        <Tabs.Screen
          name="list"
          options={{
            title: "List",
            tabBarIcon: ({ color, size }) => <List color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
          }}
        />
      </Tabs>
    </>
  )
}
