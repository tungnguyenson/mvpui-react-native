import { Button, EmptyState, SafeArea } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { FileText, Inbox, Plus, Search } from "lucide-react-native"
import { ScrollView, Text, View } from "react-native"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      <View className="gap-3">{children}</View>
    </View>
  )
}

export default function EmptyStateShowcase() {
  return (
    <SafeArea>
      <Stack.Screen options={{ title: "EmptyState", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Title only">
          <EmptyState title="No results" />
        </Section>

        <Section title="Title + description">
          <EmptyState
            title="No notifications"
            description="You're all caught up — we'll let you know when something new arrives."
          />
        </Section>

        <Section title="Icon + title + description">
          <EmptyState
            icon={<Inbox size={32} color="#a3a3a3" />}
            title="Inbox zero"
            description="Inhale. Exhale. Enjoy the empty inbox while it lasts."
          />
        </Section>

        <Section title="Full — icon + title + description + actions">
          <EmptyState
            icon={<FileText size={32} color="#a3a3a3" />}
            title="No documents yet"
            description="Create your first document to get started. We'll save your progress as you type."
            actions={
              <>
                <Button size="sm" iconLeading={Plus}>
                  New document
                </Button>
                <Button size="sm" color="secondary">
                  Import
                </Button>
              </>
            }
          />
        </Section>

        <Section title="Search — no results">
          <EmptyState
            icon={<Search size={32} color="#a3a3a3" />}
            title="No matches"
            description="Try a different keyword or clear the filters."
            actions={
              <Button size="sm" color="secondary">
                Clear filters
              </Button>
            }
          />
        </Section>
      </ScrollView>
    </SafeArea>
  )
}
