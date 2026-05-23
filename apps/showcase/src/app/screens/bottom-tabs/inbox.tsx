import { SafeArea } from "@mvp-ui-rn/ui"
import { ScrollView, Text, View } from "react-native"

const messages = [
  { from: "Alex", subject: "Design review feedback", time: "9:14 AM" },
  { from: "Sam", subject: "Token sync — ship today?", time: "8:02 AM" },
  { from: "Pat", subject: "Re: Bottom tabs demo", time: "Yesterday" },
]

export default function InboxTab() {
  return (
    <SafeArea edges={["top", "left", "right"]}>
      <ScrollView contentContainerClassName="px-5 py-6 gap-4">
        <View className="gap-1">
          <Text className="text-fg text-2xl font-bold">Inbox</Text>
          <Text className="text-fg-secondary text-md">
            Badge on the tab icon comes from `tabBarBadge: 3`.
          </Text>
        </View>

        <View className="rounded-xl border border-border overflow-hidden">
          {messages.map((m, i) => (
            <View
              key={m.subject}
              className={`px-4 py-3 gap-1 bg-bg ${i > 0 ? "border-t border-border" : ""}`}
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-fg text-md font-semibold">{m.from}</Text>
                <Text className="text-fg-tertiary text-xs">{m.time}</Text>
              </View>
              <Text className="text-fg-secondary text-md">{m.subject}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeArea>
  )
}
