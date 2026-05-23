import { Button, haptics, useHaptics } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

function Section({
  title,
  hint,
  children,
}: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      {hint ? <Text className="text-fg-tertiary text-sm">{hint}</Text> : null}
      <View className="gap-3">{children}</View>
    </View>
  )
}

export default function HapticsShowcase() {
  const h = useHaptics()

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Haptics", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section
          title="Imperative API"
          hint="haptics.* — call from anywhere (event handlers, stores, etc)."
        >
          <View className="flex-row flex-wrap gap-3">
            <Button color="secondary" size="md" onPress={() => haptics.selection()}>
              selection()
            </Button>
            <Button
              color="secondary"
              size="md"
              onPress={() => haptics.impact("light")}
            >
              impact(light)
            </Button>
            <Button
              color="secondary"
              size="md"
              onPress={() => haptics.impact("medium")}
            >
              impact(medium)
            </Button>
            <Button
              color="secondary"
              size="md"
              onPress={() => haptics.impact("heavy")}
            >
              impact(heavy)
            </Button>
          </View>
        </Section>

        <Section title="Notify (success / warning / error)">
          <View className="flex-row flex-wrap gap-3">
            <Button
              color="primary"
              size="md"
              onPress={() => haptics.notify("success")}
            >
              success
            </Button>
            <Button
              color="secondary"
              size="md"
              onPress={() => haptics.notify("warning")}
            >
              warning
            </Button>
            <Button
              color="primary-destructive"
              size="md"
              onPress={() => haptics.notify("error")}
            >
              error
            </Button>
          </View>
        </Section>

        <Section
          title="Hook form"
          hint="useHaptics() returns the same API. Use in components that may add pref-gating later."
        >
          <View className="flex-row flex-wrap gap-3">
            <Button color="tertiary" size="md" onPress={() => h.selection()}>
              h.selection()
            </Button>
            <Button color="tertiary" size="md" onPress={() => h.impact("soft")}>
              h.impact(soft)
            </Button>
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
