import { Icon, type IconTint } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Heart,
  Search,
  Settings,
  XCircle,
} from "lucide-react-native"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const SIZES = ["sm", "md", "lg", "xl"] as const
const TINTS: IconTint[] = [
  "fg",
  "fg-secondary",
  "fg-tertiary",
  "fg-brand",
  "fg-error",
  "fg-warning",
  "fg-success",
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
      <View className="flex-row flex-wrap items-center gap-4">{children}</View>
    </View>
  )
}

export default function IconShowcase() {
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Icon", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Sizes (sm 16 · md 20 · lg 24 · xl 28)">
          <Row label="lucide Search">
            {SIZES.map((s) => (
              <Icon key={s} as={Search} size={s} />
            ))}
          </Row>
        </Section>

        <Section title="Semantic tints (auto light/dark)">
          {TINTS.map((tint) => (
            <Row key={tint} label={tint}>
              <Icon as={Heart} tint={tint} />
              <Icon as={Settings} tint={tint} />
              <Icon as={ArrowRight} tint={tint} />
            </Row>
          ))}
        </Section>

        <Section title="Status icons">
          <Row label="status set">
            <Icon as={CheckCircle2} tint="fg-success" />
            <Icon as={AlertTriangle} tint="fg-warning" />
            <Icon as={XCircle} tint="fg-error" />
          </Row>
        </Section>

        <Section title="Raw color override">
          <Row label="color={'#7f56d9'}">
            <Icon as={Heart} color="#7f56d9" />
            <Icon as={Heart} color="#f59e0b" />
            <Icon as={Heart} color="#16a34a" />
          </Row>
        </Section>

        <Section title="Raw pixel size">
          <Row label="size={32 / 40 / 48}">
            <Icon as={Settings} size={32} tint="fg-brand" />
            <Icon as={Settings} size={40} tint="fg-brand" />
            <Icon as={Settings} size={48} tint="fg-brand" />
          </Row>
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
