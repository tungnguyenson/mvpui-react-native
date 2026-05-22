import { Button, SafeArea, actionSheet } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import {
  Camera,
  Image as ImageIcon,
  Star,
  Trash2,
} from "lucide-react-native"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"

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

export default function ActionSheetShowcase() {
  const [last, setLast] = useState<string | null>(null)

  return (
    <SafeArea>
      <Stack.Screen options={{ title: "ActionSheet", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Default — photo source">
          <Button
            onPress={async () => {
              const i = await actionSheet.present({
                title: "Choose a photo source",
                options: [
                  { label: "Take photo", icon: Camera },
                  { label: "Choose from library", icon: ImageIcon },
                  { label: "Cancel", style: "cancel" },
                ],
              })
              setLast(i === null ? "dismissed" : `tapped index ${i}`)
            }}
          >
            Photo source
          </Button>
        </Section>

        <Section title="With destructive">
          <Button
            color="secondary"
            onPress={async () => {
              const i = await actionSheet.present({
                title: "Delete file?",
                message: "This action cannot be undone.",
                options: [
                  {
                    label: "Delete forever",
                    icon: Trash2,
                    style: "destructive",
                  },
                  { label: "Cancel", style: "cancel" },
                ],
              })
              setLast(i === null ? "dismissed" : `tapped index ${i}`)
            }}
          >
            Delete file…
          </Button>
        </Section>

        <Section title="Rich options (icon + description)">
          <Button
            onPress={() =>
              actionSheet.present({
                title: "Quick actions",
                options: [
                  {
                    label: "Star",
                    description: "Pin to top of inbox",
                    icon: Star,
                    onPress: () => setLast("Star tapped"),
                  },
                  {
                    label: "Share",
                    description: "Send to other apps",
                    icon: ImageIcon,
                    onPress: () => setLast("Share tapped"),
                  },
                  {
                    label: "Delete",
                    description: "Move to trash forever",
                    icon: Trash2,
                    style: "destructive",
                    onPress: () => setLast("Delete tapped"),
                  },
                  {
                    label: "Cancel",
                    style: "cancel",
                  },
                ],
              })
            }
          >
            Show rich options
          </Button>
          <Text className="text-fg-tertiary text-sm">
            Each option accepts `icon` + `description`. Native variants
            (UIAlertController) only render plain strings.
          </Text>
        </Section>

        <Section title="No cancel option">
          <Button
            color="secondary"
            onPress={async () => {
              const i = await actionSheet.present({
                title: "Sort by",
                options: [
                  { label: "Name" },
                  { label: "Date" },
                  { label: "Size" },
                ],
              })
              setLast(i === null ? "dismissed" : `tapped index ${i}`)
            }}
          >
            Sort by…
          </Button>
        </Section>

        <View className="rounded-xl border border-border bg-bg-secondary p-4">
          <Text className="text-fg-tertiary text-sm">
            last action: {last ?? "—"}
          </Text>
        </View>
      </ScrollView>
    </SafeArea>
  )
}
