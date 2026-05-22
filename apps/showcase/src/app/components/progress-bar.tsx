import { Button, ProgressBar } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { useEffect, useState } from "react"
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
      <View className="gap-3">{children}</View>
    </View>
  )
}

export default function ProgressBarShowcase() {
  const [value, setValue] = useState(35)

  // Animated demo — bounces between 10 and 90 on a 1.2s cadence.
  const [bounce, setBounce] = useState(10)
  useEffect(() => {
    const id = setInterval(() => {
      setBounce((v) => (v >= 90 ? 10 : v + 20))
    }, 1200)
    return () => clearInterval(id)
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "ProgressBar", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Sizes">
          <Row label="sm · md (default) · lg — 60%">
            <ProgressBar value={60} size="sm" />
            <ProgressBar value={60} size="md" />
            <ProgressBar value={60} size="lg" />
          </Row>
        </Section>

        <Section title="Colors">
          <Row label="primary · success · warning · error — 50%">
            <ProgressBar value={50} color="primary" />
            <ProgressBar value={50} color="success" />
            <ProgressBar value={50} color="warning" />
            <ProgressBar value={50} color="error" />
          </Row>
        </Section>

        <Section title="With caption + value">
          <Row label="label + showValue">
            <ProgressBar value={value} label="Upload" showValue />
            <ProgressBar
              value={75}
              color="success"
              label="Sync complete"
              showValue
            />
            <ProgressBar
              value={20}
              color="error"
              label="Storage usage"
              showValue
            />
          </Row>
        </Section>

        <Section title="Interactive">
          <Row label="tap to adjust">
            <ProgressBar value={value} label="Demo" showValue />
            <View className="flex-row gap-2">
              <Button
                size="sm"
                color="secondary"
                onPress={() => setValue((v) => Math.max(0, v - 25))}
              >
                -25
              </Button>
              <Button
                size="sm"
                color="secondary"
                onPress={() => setValue((v) => Math.min(100, v + 25))}
              >
                +25
              </Button>
              <Button size="sm" color="tertiary" onPress={() => setValue(0)}>
                Reset
              </Button>
            </View>
          </Row>
        </Section>

        <Section title="Animated (auto-bounce 10 → 90)">
          <Row label="watch the fill ease between values">
            <ProgressBar value={bounce} label="Streaming" showValue />
          </Row>
        </Section>

        <Section title="Boundary clamp">
          <Row label="value below 0 / above 100">
            <ProgressBar value={-30} label="Clamped to 0" showValue />
            <ProgressBar value={150} label="Clamped to 100" showValue />
          </Row>
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
