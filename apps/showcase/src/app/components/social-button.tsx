import { SocialButton } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      <View className="gap-2">{children}</View>
    </View>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View className="gap-2">
      <Text className="text-fg-tertiary text-xs uppercase tracking-wide">{label}</Text>
      <View className="flex-row flex-wrap gap-2 items-center">{children}</View>
    </View>
  )
}

export default function SocialButtonShowcase() {
  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <Stack.Screen options={{ title: "SocialButton", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Providers">
          <Row label="google">
            <SocialButton provider="google">Continue with Google</SocialButton>
          </Row>
          <Row label="apple">
            <SocialButton provider="apple">Continue with Apple</SocialButton>
          </Row>
        </Section>

        <Section title="Sizes">
          <Row label="md">
            <SocialButton provider="google" size="md">Continue with Google</SocialButton>
            <SocialButton provider="apple" size="md">Continue with Apple</SocialButton>
          </Row>
          <Row label="lg (default)">
            <SocialButton provider="google" size="lg">Continue with Google</SocialButton>
            <SocialButton provider="apple" size="lg">Continue with Apple</SocialButton>
          </Row>
        </Section>

        <Section title="Icon only">
          <Row label="no label">
            <SocialButton provider="google" size="md" />
            <SocialButton provider="apple" size="md" />
            <SocialButton provider="google" size="lg" />
            <SocialButton provider="apple" size="lg" />
          </Row>
        </Section>

        <Section title="Disabled">
          <Row label="disabled">
            <SocialButton provider="google" disabled>Continue with Google</SocialButton>
            <SocialButton provider="apple" disabled>Continue with Apple</SocialButton>
          </Row>
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
