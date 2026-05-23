import { tabBarScreenOptions } from "@mvp-ui-rn/ui"
import { Tabs } from "expo-router"
import { LayoutGrid, Puzzle, Settings, Sparkles } from "lucide-react-native"
import { useColorScheme } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function TabsLayout() {
  const scheme = useColorScheme()
  const insets = useSafeAreaInsets()
  const opts = tabBarScreenOptions({
    isDark: scheme === "dark",
    bottomInset: insets.bottom,
  })

  return (
    <Tabs screenOptions={{ ...opts, headerShown: false }}>
      <Tabs.Screen
        name="intro"
        options={{
          title: "Intro",
          tabBarIcon: ({ color, size }) => <Sparkles color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Screens",
          tabBarIcon: ({ color, size }) => <LayoutGrid color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="components"
        options={{
          title: "Components",
          tabBarIcon: ({ color, size }) => <Puzzle color={color} size={size} />,
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
  )
}
