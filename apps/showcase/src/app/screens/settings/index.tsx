import {
  Avatar,
  Button,
  List,
  ListItem,
  ListSection,
  Switch,
} from "@mvp-ui-rn/ui"
import { Stack, useRouter } from "expo-router"
import {
  Bell,
  ChevronLeft,
  Globe,
  HelpCircle,
  Lock,
  MessageSquare,
  Moon,
  User,
} from "lucide-react-native"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"

const SRC = "https://i.pravatar.cc/200?img=47"

export default function SettingsScreen() {
  const router = useRouter()
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  return (
    <View className="flex-1 bg-bg">
      <Stack.Screen
        options={{
          title: "Settings",
          headerShown: true,
          headerLeft: () => (
            <Button
              color="tertiary"
              size="sm"
              iconLeading={ChevronLeft}
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <ScrollView contentContainerClassName="px-5 py-6 gap-6">
        {/* Profile row */}
        <View className="flex-row items-center gap-4 py-2">
          <Avatar src={SRC} alt="Olivia" size="lg" />
          <View className="flex-1 gap-0.5">
            <Text className="text-fg text-md font-semibold">Olivia Rhye</Text>
            <Text className="text-fg-secondary text-sm">olivia@untitledui.com</Text>
          </View>
        </View>

        <List>
          <ListSection title="Account">
            <ListItem
              leading={User}
              title="Profile"
              subtitle="Edit your name and photo"
              onPress={() => router.push("/screens/settings/account")}
            />
            <ListItem
              leading={Bell}
              title="Notifications"
              trailing={
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              }
            />
            <ListItem
              leading={Lock}
              title="Privacy"
              onPress={() => {}}
            />
          </ListSection>

          <ListSection title="Preferences">
            <ListItem
              leading={Moon}
              title="Dark Mode"
              trailing={
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              }
            />
            <ListItem
              leading={Globe}
              title="Language"
              trailing={<Text className="text-fg-tertiary text-md">English (US)</Text>}
              onPress={() => {}}
            />
          </ListSection>

          <ListSection title="Support">
            <ListItem
              leading={HelpCircle}
              title="Help Center"
              onPress={() => {}}
            />
            <ListItem
              leading={MessageSquare}
              title="Send Feedback"
              onPress={() => {}}
            />
          </ListSection>
        </List>

        {/* Danger zone */}
        <Button color="primary-destructive" onPress={() => {}}>
          Log Out
        </Button>
      </ScrollView>
    </View>
  )
}
