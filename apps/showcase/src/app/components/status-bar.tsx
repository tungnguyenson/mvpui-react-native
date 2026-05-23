import { SafeArea, StatusBar } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { ScrollView, Text, View } from "react-native"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      <View className="gap-2">{children}</View>
    </View>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center gap-2">
      <Text className="text-fg-secondary text-sm w-24">{label}</Text>
      <Text className="text-fg text-sm font-mono">{value}</Text>
    </View>
  )
}

export default function StatusBarShowcase() {
  return (
    <SafeArea statusBar={false}>
      {/* Mount our StatusBar component instead of SafeArea's built-in */}
      <StatusBar style="auto" />
      <Stack.Screen options={{ title: "StatusBar", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="StatusBar props">
          <Row label="style" value='"auto" | "light" | "dark" | "inverted"' />
          <Row label="hidden" value="boolean (default false)" />
          <Row label="animated" value="boolean (default true)" />
        </Section>

        <Section title="auto (default)">
          <Text className="text-fg-secondary text-sm">
            Follows useColorScheme — dark scheme → light content; light scheme
            → dark content. This screen uses <Text className="text-fg font-mono text-sm">style="auto"</Text>.
          </Text>
          <Text className="text-fg-secondary text-sm">
            Switch the system theme to see the status bar tint flip
            automatically.
          </Text>
        </Section>

        <Section title="When to use">
          <Text className="text-fg-secondary text-sm">
            Mount StatusBar on screens that don't use{" "}
            <Text className="text-fg font-mono text-sm">{"<SafeArea>"}</Text>{" "}
            (e.g. full-bleed image headers, transparent overlays). SafeArea
            already renders its own StatusBar internally — don't mount both.
          </Text>
        </Section>

        <Section title="Usage">
          <View className="rounded-xl bg-bg-secondary p-4">
            <Text className="text-fg font-mono text-sm">
              {"// Auto-flip with scheme\n"}
              {"<StatusBar style=\"auto\" />\n\n"}
              {"// Force light icons (for dark hero images)\n"}
              {"<StatusBar style=\"light\" />\n\n"}
              {"// Hide entirely\n"}
              {"<StatusBar hidden />"}
            </Text>
          </View>
        </Section>
      </ScrollView>
    </SafeArea>
  )
}
