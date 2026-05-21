import { SafeArea, Spinner, type SpinnerSize, type SpinnerTintKey } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { ScrollView, Text, View } from "react-native"

const SIZES: SpinnerSize[] = ["sm", "md", "lg"]

const TINTS: SpinnerTintKey[] = [
  "fg",
  "fg-secondary",
  "fg-tertiary",
  "fg-brand",
  "fg-error",
  "primary-fg",
]

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
      <View className="flex-row items-center gap-4">{children}</View>
    </View>
  )
}

export default function SpinnerShowcase() {
  return (
    <SafeArea>
      <Stack.Screen options={{ title: "Spinner", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Sizes (token-keyed)">
          <Row label="sm / md / lg">
            {SIZES.map((size) => (
              <Spinner key={size} size={size} />
            ))}
          </Row>
        </Section>

        <Section title="Sizes (raw number override)">
          <Row label="16 / 24 / 32 / 48">
            <Spinner size={16} />
            <Spinner size={24} />
            <Spinner size={32} />
            <Spinner size={48} />
          </Row>
        </Section>

        <Section title="Semantic tints (auto-flip light/dark)">
          {TINTS.filter((t) => t !== "primary-fg").map((tint) => (
            <Row key={tint} label={tint}>
              <Spinner size="md" tint={tint} />
              <Spinner size="lg" tint={tint} />
            </Row>
          ))}
          {/*
           * `primary-fg` is white on both modes — designed for a spinner
           * sitting on a brand-filled surface (e.g. inside a primary
           * Button). Demo against `bg-primary` so the contrast reads.
           */}
          <Row label="primary-fg (on bg-primary)">
            <View className="bg-primary rounded-md p-3 flex-row items-center gap-4">
              <Spinner size="md" tint="primary-fg" />
              <Spinner size="lg" tint="primary-fg" />
            </View>
          </Row>
        </Section>

        <Section title="Raw color override (Button's pattern)">
          <Row label="#7f56d9 (brand-600)">
            <Spinner size="md" color="#7f56d9" />
            <Spinner size="lg" color="#7f56d9" />
          </Row>
        </Section>
      </ScrollView>
    </SafeArea>
  )
}
