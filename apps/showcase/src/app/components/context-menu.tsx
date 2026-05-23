import { ContextMenu, ListItem, ListSection } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import {
  Archive,
  Copy,
  FileText,
  Pin,
  Share2,
  Trash2,
} from "lucide-react-native"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

function Section({
  title,
  hint,
  children,
}: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      {hint ? <Text className="text-fg-tertiary text-sm">{hint}</Text> : null}
      <View className="gap-3">{children}</View>
    </View>
  )
}

export default function ContextMenuShowcase() {
  const [lastAction, setLastAction] = useState<string | null>(null)

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "ContextMenu", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section
          title="Long-press a row"
          hint="500ms hold opens a native action sheet. Tap = open the row."
        >
          <ListSection title="Notes">
            <ContextMenu
              testID="ctx-trip"
              accessibilityLabel="Trip planning"
              title="Quick actions"
              items={[
                { key: "pin", label: "Pin", icon: Pin },
                { key: "duplicate", label: "Duplicate", icon: Copy },
                { key: "share", label: "Share…", icon: Share2 },
                { key: "archive", label: "Archive", icon: Archive },
                {
                  key: "delete",
                  label: "Delete",
                  icon: Trash2,
                  style: "destructive",
                },
              ]}
              onSelect={(k) => setLastAction(k)}
              onPress={() => setLastAction("opened-row")}
            >
              <ListItem
                leading={FileText}
                title="Trip planning"
                subtitle="Last edited 2 days ago"
              />
            </ContextMenu>

            <ContextMenu
              testID="ctx-meeting"
              accessibilityLabel="Meeting notes"
              title="Quick actions"
              items={[
                { key: "pin", label: "Pin", icon: Pin },
                { key: "share", label: "Share…", icon: Share2 },
              ]}
              onSelect={(k) => setLastAction(k)}
              onPress={() => setLastAction("opened-row")}
            >
              <ListItem
                leading={FileText}
                title="Meeting notes"
                subtitle="Edited yesterday"
              />
            </ContextMenu>
          </ListSection>

          <Text className="text-fg-tertiary text-sm">
            Last: {lastAction ?? "—"}
          </Text>
        </Section>

        <Section title="Custom trigger">
          <View className="items-start">
            <ContextMenu
              title="More"
              items={[
                { key: "rename", label: "Rename" },
                { key: "move", label: "Move…" },
                {
                  key: "remove",
                  label: "Remove",
                  style: "destructive",
                },
              ]}
              onSelect={setLastAction}
            >
              <View className="rounded-xl border border-border bg-bg-secondary px-4 py-3">
                <Text className="text-fg text-md">Hold me</Text>
              </View>
            </ContextMenu>
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
