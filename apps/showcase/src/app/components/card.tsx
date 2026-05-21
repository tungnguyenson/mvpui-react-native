import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  SafeArea,
} from "@mvp-ui-rn/ui"
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

export default function CardShowcase() {
  return (
    <SafeArea>
      <Stack.Screen options={{ title: "Card", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Minimal">
          <Card>
            <CardContent className="p-6">
              <Text className="text-fg">Bare card body. Just the surface chrome.</Text>
            </CardContent>
          </Card>
        </Section>

        <Section title="Header + body">
          <Card>
            <CardHeader>
              <CardTitle>Notification settings</CardTitle>
              <CardDescription>
                Choose how and when we should reach out.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Text className="text-fg">
                Card content goes here. Free-form children inside CardContent.
              </Text>
            </CardContent>
          </Card>
        </Section>

        <Section title="Header + body + footer">
          <Card>
            <CardHeader>
              <CardTitle>Confirm changes</CardTitle>
              <CardDescription>
                You're about to update notification preferences for your team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Text className="text-fg-secondary">
                This will affect 12 members. They'll see a banner the next time
                they open the app.
              </Text>
            </CardContent>
            <CardFooter>
              <Button color="secondary" size="sm">
                Cancel
              </Button>
              <Button size="sm">Confirm</Button>
            </CardFooter>
          </Card>
        </Section>

        <Section title="Compact (no Header/Footer wrappers)">
          <Card className="p-4">
            <Text className="text-fg-secondary">
              When you don't need the full 24pt rhythm, drop straight into the
              Card with a className padding override.
            </Text>
          </Card>
        </Section>
      </ScrollView>
    </SafeArea>
  )
}
