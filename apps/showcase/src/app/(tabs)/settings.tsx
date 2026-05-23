import { List, ListItem, ListSection } from "@mvp-ui-rn/ui"
import { Moon, Sun } from "lucide-react-native"
import { Appearance, ScrollView, Text, useColorScheme } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function SettingsTab() {
  const scheme = useColorScheme()
  const isDark = scheme === "dark"

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <ScrollView contentContainerClassName="px-5 py-6 gap-6">
        <Text className="text-fg text-2xl font-bold">Settings</Text>

        <List>
          <ListSection title="Appearance">
            <ListItem
              leading={isDark ? Sun : Moon}
              title={isDark ? "Light mode" : "Dark mode"}
              subtitle={isDark ? "Switch to light theme" : "Switch to dark theme"}
              onPress={() => Appearance.setColorScheme(isDark ? "light" : "dark")}
              chevron={false}
            />
          </ListSection>

          <ListSection title="About">
            <ListItem
              title="mvp-ui-rn"
              subtitle="Untitled UI · React Native design system"
            />
            <ListItem
              title="Expo SDK"
              trailing={<Text className="text-fg-tertiary text-md">56</Text>}
            />
            <ListItem
              title="NativeWind"
              trailing={<Text className="text-fg-tertiary text-md">v5</Text>}
            />
            <ListItem
              title="Tailwind CSS"
              trailing={<Text className="text-fg-tertiary text-md">v4</Text>}
            />
          </ListSection>
        </List>
      </ScrollView>
    </SafeAreaView>
  )
}
