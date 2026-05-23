import {
  ListSection,
  RadioGroup,
  RadioGroupItem,
  SettingsRow,
  Slider,
  Switch,
  type SliderValue,
} from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import {
  Bell,
  Globe,
  Lock,
  Moon,
  ShieldCheck,
  User,
  Volume2,
} from "lucide-react-native"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

function Section({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      <View className="gap-3">{children}</View>
    </View>
  )
}

export default function SettingsRowShowcase() {
  const [notifications, setNotifications] = useState(true)
  const [biometric, setBiometric] = useState(false)
  const [volume, setVolume] = useState<SliderValue>(60)
  const [theme, setTheme] = useState("system")

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "SettingsRow", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Inline (default) — switch + value text + chevron">
          <ListSection title="General">
            <SettingsRow
              leading={Bell}
              title="Notifications"
              subtitle="Push, email, SMS"
            >
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </SettingsRow>
            <SettingsRow
              leading={Lock}
              title="Biometric unlock"
              subtitle="Face ID / Touch ID"
            >
              <Switch checked={biometric} onCheckedChange={setBiometric} />
            </SettingsRow>
            <SettingsRow leading={Globe} title="Language">
              <Text className="text-fg-tertiary text-md">English (US)</Text>
            </SettingsRow>
            <SettingsRow
              leading={User}
              title="Account"
              subtitle="Profile, billing"
              onPress={() => {}}
            />
            <SettingsRow
              leading={ShieldCheck}
              title="Privacy"
              onPress={() => {}}
            />
          </ListSection>
        </Section>

        <Section title="Stacked — full-width control below title">
          <ListSection title="Audio">
            <SettingsRow
              leading={Volume2}
              title="Volume"
              subtitle={`${(volume as number).toFixed(0)}%`}
              orientation="stacked"
            >
              <Slider value={volume} onChange={setVolume} />
            </SettingsRow>
          </ListSection>

          <ListSection title="Appearance">
            <SettingsRow
              leading={Moon}
              title="Theme"
              orientation="stacked"
            >
              <RadioGroup value={theme} onValueChange={setTheme}>
                <RadioGroupItem value="light" label="Light" />
                <RadioGroupItem value="dark" label="Dark" />
                <RadioGroupItem value="system" label="System" />
              </RadioGroup>
            </SettingsRow>
          </ListSection>
        </Section>

        <Section title="Disabled state">
          <ListSection>
            <SettingsRow
              leading={Bell}
              title="Sound alerts"
              subtitle="Coming soon"
              disabled
            >
              <Switch checked={false} onCheckedChange={() => {}} />
            </SettingsRow>
          </ListSection>
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
