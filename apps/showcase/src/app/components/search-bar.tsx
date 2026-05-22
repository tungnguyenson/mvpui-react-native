import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  SafeArea,
  SearchBar,
} from "@mvp-ui-rn/ui"
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

export default function SearchBarShowcase() {
  const [q1, setQ1] = useState("")
  const [q2, setQ2] = useState("battery")
  const [q3, setQ3] = useState("")

  return (
    <SafeArea>
      <Stack.Screen options={{ title: "SearchBar", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Empty">
          <SearchBar value={q1} onChangeText={setQ1} />
        </Section>

        <Section title="With value (clear button appears)">
          <SearchBar value={q2} onChangeText={setQ2} />
          <Text className="text-fg-tertiary text-md">
            Tap × to clear the value.
          </Text>
        </Section>

        <Section title="With Cancel button (iOS pattern)">
          <SearchBar
            value={q3}
            onChangeText={setQ3}
            showCancel
            placeholder="Search inbox"
          />
          <Text className="text-fg-tertiary text-md">
            Focus the field — the Cancel button slides in. Tap it to
            blur + clear.
          </Text>
        </Section>

        <Section title="Native iOS UISearchBar (header helper)">
          <Card>
            <CardHeader>
              <CardTitle>searchBarScreenOptions()</CardTitle>
              <CardDescription>
                Returns Stack.Screen options.headerSearchBarOptions for the
                native iOS UISearchBar embedded in the header. On Android,
                falls back to no native search — use the standalone
                primitive for cross-platform parity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Text className="text-fg-secondary text-md font-mono">
                Stack.Screen options.headerSearchBarOptions
              </Text>
              <Text className="text-fg-secondary text-md font-mono">
                = searchBarScreenOptions
              </Text>
            </CardContent>
          </Card>
        </Section>
      </ScrollView>
    </SafeArea>
  )
}
