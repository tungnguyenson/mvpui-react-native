import { Badge, type BadgeColor, type BadgeSize, SafeArea } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { Check, Star } from "lucide-react-native"
import { ScrollView, Text, View } from "react-native"

const COLORS: BadgeColor[] = [
  "gray",
  "brand",
  "error",
  "warning",
  "success",
  "slate",
  "sky",
  "blue",
  "indigo",
  "purple",
  "pink",
  "orange",
]

const SIZES: BadgeSize[] = ["sm", "md", "lg"]

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
      <View className="flex-row flex-wrap gap-2 items-center">{children}</View>
    </View>
  )
}

export default function BadgeShowcase() {
  return (
    <SafeArea>
      <Stack.Screen options={{ title: "Badge", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Colors (default size: md, pill shape)">
          {COLORS.map((color) => (
            <Row key={color} label={color}>
              <Badge color={color}>Label</Badge>
              <Badge color={color} iconLeading={Check}>Done</Badge>
            </Row>
          ))}
        </Section>

        <Section title="Sizes (sm / md / lg) — font + icon step with height">
          {SIZES.map((size) => (
            <Row key={size} label={size}>
              <Badge size={size}>Default</Badge>
              <Badge size={size} color="brand">Brand</Badge>
              <Badge size={size} color="success" iconLeading={Check}>Done</Badge>
              <Badge size={size} color="warning" iconLeading={Star}>Featured</Badge>
            </Row>
          ))}
        </Section>

        <Section title="Shape: pill vs rounded">
          <Row label="pill (default)">
            <Badge color="brand">Pill</Badge>
            <Badge color="success">Pill</Badge>
            <Badge color="error">Pill</Badge>
          </Row>
          <Row label="rounded">
            <Badge color="brand" shape="rounded">Rounded</Badge>
            <Badge color="success" shape="rounded">Rounded</Badge>
            <Badge color="error" shape="rounded">Rounded</Badge>
          </Row>
        </Section>
      </ScrollView>
    </SafeArea>
  )
}
