import { Switch, SwitchBase, type SwitchSize } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const SIZES: SwitchSize[] = ["sm", "md"]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      <View className="gap-3">{children}</View>
    </View>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View className="gap-2">
      <Text className="text-fg-tertiary text-xs uppercase tracking-wide">{label}</Text>
      <View className="gap-2">{children}</View>
    </View>
  )
}

export default function SwitchShowcase() {
  const [notifications, setNotifications] = useState(true)
  const [airplane, setAirplane] = useState(false)
  const [trackProgress, setTrackProgress] = useState(true)

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Switch", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="States (always-on visual reference)">
          {SIZES.map((size) => (
            <Row key={size} label={`${size} — off / on / disabled-off / disabled-on`}>
              <View className="flex-row items-center gap-4">
                <SwitchBase checked={false} size={size} />
                <SwitchBase checked={true} size={size} />
                <View className="opacity-50">
                  <SwitchBase checked={false} size={size} />
                </View>
                <View className="opacity-50">
                  <SwitchBase checked={true} size={size} />
                </View>
              </View>
            </Row>
          ))}
        </Section>

        <Section title="Interactive (controlled)">
          <Row label="bare pill — tap to toggle">
            <View className="flex-row items-center gap-4">
              <Switch
                checked={airplane}
                onCheckedChange={setAirplane}
                size="sm"
              />
              <Switch
                checked={trackProgress}
                onCheckedChange={setTrackProgress}
                size="md"
              />
            </View>
            <Text className="text-fg-tertiary text-sm">
              sm: {String(airplane)} · md: {String(trackProgress)}
            </Text>
          </Row>
          <Row label="row — tap label or pill toggles">
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
              label="Push notifications"
              hint="Receive alerts when something requires your attention."
            />
            <Switch
              checked={airplane}
              onCheckedChange={setAirplane}
              size="md"
              label="Airplane mode"
              hint="Disable wireless connectivity."
            />
          </Row>
        </Section>

        <Section title="Composed — label + hint">
          <Switch checked={true} label="Email updates" />
          <Switch
            checked={true}
            label="Marketing emails"
            hint="Tips, product news, and occasional surveys."
          />
          <Switch
            checked={false}
            size="md"
            label="Auto-renew subscription"
            hint="Charge the saved card before the period ends."
          />
          <Switch
            checked={false}
            disabled
            label="Disabled (off)"
            hint="Locked while another setting is on."
          />
          <Switch
            checked={true}
            disabled
            label="Disabled (on)"
            hint="Locked in the enabled position."
          />
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
