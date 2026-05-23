import { HintText } from "@mvp-ui-rn/ui"
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

export default function HintTextShowcase() {
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "HintText", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Variants">
          <Row label="default (helper)">
            <HintText>We'll never share your email with anyone.</HintText>
          </Row>
          <Row label="error">
            <HintText isInvalid>This field is required.</HintText>
          </Row>
        </Section>

        <Section title="Sizes">
          <Row label="md (default)">
            <HintText>Helper text at default size.</HintText>
          </Row>
          <Row label="sm">
            <HintText size="sm">Helper text at small size.</HintText>
          </Row>
          <Row label="md error">
            <HintText isInvalid>Error message at default size.</HintText>
          </Row>
          <Row label="sm error">
            <HintText size="sm" isInvalid>Error message at small size.</HintText>
          </Row>
        </Section>

        <Section title="In context (field + hint)">
          <View className="gap-1">
            <View className="rounded-xl border border-border bg-bg px-3.5 py-2.5">
              <Text className="text-fg-tertiary text-md">you@example.com</Text>
            </View>
            <HintText>We'll never share your email.</HintText>
          </View>
          <View className="gap-1">
            <View className="rounded-xl border border-error-border bg-bg px-3.5 py-2.5">
              <Text className="text-fg-tertiary text-md">invalid-email</Text>
            </View>
            <HintText isInvalid>Please enter a valid email address.</HintText>
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
