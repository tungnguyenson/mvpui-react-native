import { Card, CardContent, SafeArea, SegmentedControl } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      <View className="gap-3">{children}</View>
    </View>
  )
}

export default function SegmentedControlShowcase() {
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all")
  const [view, setView] = useState<"day" | "week" | "month" | "year">("week")
  const [tier, setTier] = useState<"free" | "pro">("free")

  return (
    <SafeArea>
      <Stack.Screen options={{ title: "SegmentedControl", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Three segments — filter">
          <SegmentedControl
            value={filter}
            onChange={setFilter}
            accessibilityLabel="Filter inbox"
            options={[
              { value: "all", label: "All" },
              { value: "unread", label: "Unread" },
              { value: "starred", label: "Starred" },
            ]}
          />
          <Text className="text-fg-tertiary text-md">
            Selected: {filter}
          </Text>
        </Section>

        <Section title="Four segments — date range">
          <SegmentedControl
            value={view}
            onChange={setView}
            accessibilityLabel="Time range"
            options={[
              { value: "day", label: "Day" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
              { value: "year", label: "Year" },
            ]}
          />
          <Text className="text-fg-tertiary text-md">Selected: {view}</Text>
        </Section>

        <Section title="Two segments — tier toggle">
          <SegmentedControl
            value={tier}
            onChange={setTier}
            accessibilityLabel="Subscription tier"
            options={[
              { value: "free", label: "Free" },
              { value: "pro", label: "Pro" },
            ]}
          />
          <Text className="text-fg-tertiary text-md">Selected: {tier}</Text>
        </Section>

        <Section title="When NOT to use">
          <Card>
            <CardContent className="p-6 gap-2">
              <Text className="text-fg-secondary text-md">
                - Content section navigation → use Tabs (not yet ported).
              </Text>
              <Text className="text-fg-secondary text-md">
                - More than 4 options → switch to a Select / dropdown.
              </Text>
              <Text className="text-fg-secondary text-md">
                - On/off boolean → use Switch.
              </Text>
            </CardContent>
          </Card>
        </Section>
      </ScrollView>
    </SafeArea>
  )
}
