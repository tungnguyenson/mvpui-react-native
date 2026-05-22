import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Header,
  SafeArea,
} from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { MoreHorizontal, Share2 } from "lucide-react-native"
import { ScrollView, Text, View } from "react-native"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      <View className="gap-3">{children}</View>
    </View>
  )
}

export default function HeaderShowcase() {
  return (
    <SafeArea>
      <Stack.Screen options={{ title: "Header", headerShown: true }} />

      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Title only (with back button)">
          <View className="overflow-hidden rounded-xl border border-border">
            <Header title="Custom Header" />
          </View>
        </Section>

        <Section title="With trailing actions">
          <View className="overflow-hidden rounded-xl border border-border">
            <Header
              title="Notifications"
              trailing={
                <View className="flex-row gap-1">
                  <Button
                    color="tertiary"
                    size="sm"
                    iconLeading={Share2}
                    accessibilityLabel="Share"
                  />
                  <Button
                    color="tertiary"
                    size="sm"
                    iconLeading={MoreHorizontal}
                    accessibilityLabel="More"
                  />
                </View>
              }
            />
          </View>
        </Section>

        <Section title="No back button (root screens)">
          <View className="overflow-hidden rounded-xl border border-border">
            <Header title="Home" showBack={false} />
          </View>
        </Section>

        <Section title="Long title (truncates with ellipsis)">
          <View className="overflow-hidden rounded-xl border border-border">
            <Header title="A really long title that overflows the center slot" />
          </View>
        </Section>

        <Section title="Theming the native header (helper)">
          <Card>
            <CardHeader>
              <CardTitle>headerScreenOptions()</CardTitle>
              <CardDescription>
                For screens that keep expo-router's native nav header, the
                helper returns Stack.Screen options that color the bar to
                match the design system. Pair with useColorScheme.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Text className="text-fg-secondary text-md font-mono">
                Stack.Screen options=headerScreenOptions
              </Text>
              <Text className="text-fg-secondary text-md font-mono">
                isDark from useColorScheme
              </Text>
            </CardContent>
          </Card>
        </Section>
      </ScrollView>
    </SafeArea>
  )
}
