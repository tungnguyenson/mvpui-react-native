import { Card, CardContent, CardDescription, CardHeader, CardTitle, SafeArea } from "@mvp-ui-rn/ui"
import { ScrollView, Text, View } from "react-native"

export default function HomeTab() {
  return (
    <SafeArea edges={["top", "left", "right"]}>
      <ScrollView contentContainerClassName="px-5 py-6 gap-4">
        <View className="gap-1">
          <Text className="text-fg text-2xl font-bold">Home</Text>
          <Text className="text-fg-secondary text-md">
            Live `&lt;Tabs&gt;` from expo-router skinned via `tabBarScreenOptions`.
          </Text>
        </View>

        <Card>
          <CardHeader>
            <CardTitle>What you see</CardTitle>
            <CardDescription>
              Real native bottom tab bar. Active tint = `--color-primary`. Inactive
              tint = `--color-fg-tertiary`. Surface + hairline border flip with
              system color scheme.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Text className="text-fg-secondary text-md">
              Tap Inbox to see the badge. Tap Settings for the third tab. The
              Stack header above is from the parent route.
            </Text>
          </CardContent>
        </Card>
      </ScrollView>
    </SafeArea>
  )
}
