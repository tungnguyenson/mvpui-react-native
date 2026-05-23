import { Label } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

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

export default function LabelShowcase() {
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Label", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Default">
          <Row label="plain">
            <Label>Email address</Label>
          </Row>
          <Row label="required">
            <Label isRequired>Email address</Label>
          </Row>
          <Row label="required + invalid">
            <Label isRequired isInvalid>Email address</Label>
          </Row>
        </Section>

        <Section title="Disabled state">
          <Row label="disabled">
            <Label className="opacity-40">Email address</Label>
          </Row>
          <Row label="disabled + required">
            <Label isRequired className="opacity-40">Email address</Label>
          </Row>
        </Section>

        <Section title="In context (label + field placeholder)">
          <View className="gap-1.5">
            <Label>Full name</Label>
            <View className="rounded-xl border border-border bg-bg px-3.5 py-2.5">
              <Text className="text-fg-tertiary text-md">Jane Cooper</Text>
            </View>
          </View>
          <View className="gap-1.5">
            <Label isRequired>Email</Label>
            <View className="rounded-xl border border-border bg-bg px-3.5 py-2.5">
              <Text className="text-fg-tertiary text-md">you@example.com</Text>
            </View>
          </View>
          <View className="gap-1.5">
            <Label isRequired isInvalid>Password</Label>
            <View className="rounded-xl border border-error-border bg-bg px-3.5 py-2.5">
              <Text className="text-fg-tertiary text-md">••••••••</Text>
            </View>
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
