import {
  ListSection,
  ListItem,
  SafeArea,
  SwipeableRow,
  type SwipeableRowRef,
} from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { Archive, Mail, Pin, Star, Trash2 } from "lucide-react-native"
import { useRef, useState } from "react"
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

export default function SwipeableRowShowcase() {
  const [log, setLog] = useState<string[]>([])
  const preOpenRef = useRef<SwipeableRowRef>(null)

  const push = (msg: string) =>
    setLog((prev) => [`${new Date().toLocaleTimeString()} · ${msg}`, ...prev].slice(0, 5))

  return (
    <SafeArea>
      <Stack.Screen options={{ title: "SwipeableRow", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Mail-style — left swipe reveals destructive">
          <ListSection>
            <SwipeableRow
              rightActions={[
                {
                  key: "trash",
                  label: "Delete",
                  icon: Trash2,
                  color: "destructive",
                  onPress: () => push("Delete · Olivia"),
                },
              ]}
            >
              <ListItem
                title="Olivia Rhye"
                subtitle="Loved your latest update — happy to chat anytime."
                leading={Mail}
              />
            </SwipeableRow>
            <SwipeableRow
              rightActions={[
                {
                  key: "archive",
                  label: "Archive",
                  icon: Archive,
                  color: "neutral",
                  onPress: () => push("Archive · Phoenix"),
                },
                {
                  key: "trash",
                  label: "Delete",
                  icon: Trash2,
                  color: "destructive",
                  onPress: () => push("Delete · Phoenix"),
                },
              ]}
            >
              <ListItem
                title="Phoenix Baker"
                subtitle="Sent over the spec — let me know what you think."
                leading={Mail}
              />
            </SwipeableRow>
          </ListSection>
        </Section>

        <Section title="Both sides — Pin left, Delete right">
          <ListSection>
            <SwipeableRow
              leftActions={[
                {
                  key: "pin",
                  label: "Pin",
                  icon: Pin,
                  color: "primary",
                  onPress: () => push("Pin · Lana"),
                },
              ]}
              rightActions={[
                {
                  key: "trash",
                  label: "Delete",
                  icon: Trash2,
                  color: "destructive",
                  onPress: () => push("Delete · Lana"),
                },
              ]}
            >
              <ListItem
                title="Lana Steiner"
                subtitle="Catch-up tomorrow at 10?"
                leading={Mail}
              />
            </SwipeableRow>
          </ListSection>
        </Section>

        <Section title="Multiple right actions">
          <ListSection>
            <SwipeableRow
              rightActions={[
                {
                  key: "star",
                  label: "Star",
                  icon: Star,
                  color: "neutral",
                  onPress: () => push("Star · Demi"),
                },
                {
                  key: "archive",
                  label: "Archive",
                  icon: Archive,
                  color: "primary",
                  onPress: () => push("Archive · Demi"),
                },
                {
                  key: "trash",
                  label: "Delete",
                  icon: Trash2,
                  color: "destructive",
                  onPress: () => push("Delete · Demi"),
                },
              ]}
            >
              <ListItem
                title="Demi Wilkinson"
                subtitle="Re: design review — small follow-up."
                leading={Mail}
              />
            </SwipeableRow>
          </ListSection>
        </Section>

        <Section title="Pre-opened (imperative ref)">
          <ListSection>
            <SwipeableRow
              ref={preOpenRef}
              rightActions={[
                {
                  key: "trash",
                  label: "Delete",
                  icon: Trash2,
                  color: "destructive",
                  onPress: () => push("Delete · Alma"),
                },
              ]}
            >
              <ListItem
                title="Alma Thomas"
                subtitle="Use the ref to openRight() / close() programmatically."
                leading={Mail}
                trailing={
                  <Text
                    className="text-fg-brand text-md underline"
                    onPress={() => preOpenRef.current?.openRight()}
                  >
                    Open
                  </Text>
                }
              />
            </SwipeableRow>
          </ListSection>
        </Section>

        <View className="rounded-xl border border-border bg-bg-secondary p-4 gap-1">
          <Text className="text-fg-tertiary text-xs uppercase tracking-wide">
            Recent actions
          </Text>
          {log.length === 0 ? (
            <Text className="text-fg-tertiary text-sm">no actions yet</Text>
          ) : (
            log.map((entry, i) => (
              <Text key={i} className="text-fg-secondary text-sm">
                {entry}
              </Text>
            ))
          )}
        </View>
      </ScrollView>
    </SafeArea>
  )
}
