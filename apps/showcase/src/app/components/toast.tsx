import { Button, toast } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      <View className="gap-3">{children}</View>
    </View>
  )
}

export default function ToastShowcase() {
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Toast", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Variants">
          <Button onPress={() => toast.info("New message received")}>
            toast.info
          </Button>
          <Button
            color="secondary"
            onPress={() =>
              toast.success("Settings saved", {
                description: "Your preferences have been updated.",
              })
            }
          >
            toast.success (with description)
          </Button>
          <Button
            color="secondary"
            onPress={() =>
              toast.warning("Storage almost full", {
                description: "Only 200MB remaining on this device.",
              })
            }
          >
            toast.warning
          </Button>
          <Button
            color="primary-destructive"
            onPress={() =>
              toast.error("Upload failed", {
                description: "Network error. Tap to retry.",
              })
            }
          >
            toast.error
          </Button>
        </Section>

        <Section title="Duration">
          <Button
            color="secondary"
            onPress={() => toast("Short — 1.5s", { duration: 1500 })}
          >
            duration 1.5s
          </Button>
          <Button
            color="secondary"
            onPress={() =>
              toast.info("Sticky — manual dismiss", {
                duration: Number.POSITIVE_INFINITY,
              })
            }
          >
            sticky (manual dismiss)
          </Button>
        </Section>

        <Section title="Stack behavior">
          <Button
            color="secondary"
            onPress={() => {
              toast.info("First toast")
              setTimeout(() => toast.success("Second toast"), 250)
              setTimeout(() => toast.warning("Third toast"), 500)
              setTimeout(() => toast.error("Fourth — pushes first off"), 750)
            }}
          >
            Fire 4 in a row (maxVisible=3)
          </Button>
          <Button color="secondary" onPress={() => toast.dismiss()}>
            Dismiss all
          </Button>
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
