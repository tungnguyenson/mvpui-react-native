import { Card, CardContent, CardDescription, CardHeader, CardTitle, SafeArea } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { ScrollView, Text, View } from "react-native"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      <View className="gap-3">{children}</View>
    </View>
  )
}

export default function SafeAreaShowcase() {
  return (
    <SafeArea>
      <Stack.Screen options={{ title: "SafeArea", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="What this does">
          <Card>
            <CardHeader>
              <CardTitle>SafeArea wrapper</CardTitle>
              <CardDescription>
                Wraps `react-native-safe-area-context`'s SafeAreaView with
                semantic `bg-bg` default + edges array + auto StatusBar
                coordination via `expo-status-bar` + `useColorScheme`.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Text className="text-fg-secondary">
                This very screen is wrapped in SafeArea. Notice the bg fills
                continuously into the inset margin, status bar text flips with
                the system theme automatically.
              </Text>
            </CardContent>
          </Card>
        </Section>

        <Section title="API surface">
          <Card>
            <CardContent className="p-6 gap-1">
              <Text className="text-fg-secondary text-md font-mono">
                edges={"{['top', 'bottom']}"}
              </Text>
              <Text className="text-fg-secondary text-md font-mono">
                statusBar=&quot;auto&quot;
              </Text>
              <Text className="text-fg-secondary text-md font-mono">
                bg-bg default; className appended
              </Text>
            </CardContent>
          </Card>
        </Section>

        <Section title="When NOT to use">
          <Card>
            <CardContent className="p-6 gap-2">
              <Text className="text-fg-secondary text-md">
                - Inside another SafeArea (double-padding stacks).
              </Text>
              <Text className="text-fg-secondary text-md">
                - Below a header with its own safe-area handling (expo-router
                Stack already manages the header inset for native nav).
              </Text>
            </CardContent>
          </Card>
        </Section>
      </ScrollView>
    </SafeArea>
  )
}
