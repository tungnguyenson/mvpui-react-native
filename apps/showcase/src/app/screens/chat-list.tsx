import { Avatar, Badge, EmptyState, SearchBar } from "@mvp-ui-rn/ui"
import { Stack, useRouter } from "expo-router"
import { MessageCircle } from "lucide-react-native"
import { useState } from "react"
import { Pressable, ScrollView, Text, View } from "react-native"

type Conversation = {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
}

const CONVERSATIONS: Conversation[] = [
  { id: "1", name: "Lana Steiner", avatar: "https://i.pravatar.cc/200?img=23", lastMessage: "Great, I'll plan the team review for tomorrow morning then.", time: "9:11 AM", unread: 0, online: true },
  { id: "2", name: "Olivia Rhye", avatar: "https://i.pravatar.cc/200?img=47", lastMessage: "Just shipped the new design system update 🎉", time: "8:45 AM", unread: 2, online: true },
  { id: "3", name: "Phoenix Baker", avatar: "https://i.pravatar.cc/200?img=11", lastMessage: "Accessibility isn't a checkbox. Build it in from day one.", time: "Yesterday", unread: 0, online: false },
  { id: "4", name: "Candice Wu", avatar: "https://i.pravatar.cc/200?img=5", lastMessage: "After 6 months of async-first work, I can't imagine going back.", time: "Yesterday", unread: 5, online: false },
  { id: "5", name: "Drew Cano", avatar: "https://i.pravatar.cc/200?img=33", lastMessage: "React Native in 2025 is genuinely great.", time: "Mon", unread: 0, online: true },
  { id: "6", name: "Orlando Diggs", avatar: "https://i.pravatar.cc/200?img=15", lastMessage: "Let's sync up on the onboarding flow.", time: "Sun", unread: 0, online: false },
]

export default function ChatListScreen() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  const filtered = query.length > 0
    ? CONVERSATIONS.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.lastMessage.toLowerCase().includes(query.toLowerCase()),
      )
    : CONVERSATIONS

  return (
    <View className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Messages", headerShown: true }} />

      <View className="px-4 pt-3 pb-2">
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search messages…"
          showCancel={query.length > 0}
          onCancel={() => setQuery("")}
        />
      </View>

      <ScrollView keyboardShouldPersistTaps="handled">
        {filtered.length === 0 ? (
          <View className="pt-16 px-8">
            <EmptyState
              icon={<MessageCircle size={32} />}
              title="No conversations"
              description={`Nothing matched "${query}".`}
            />
          </View>
        ) : (
          filtered.map((conv) => (
            <Pressable
              key={conv.id}
              onPress={() => router.push("/screens/chat" as never)}
              className="flex-row items-center gap-3 px-5 py-3 border-b border-border active:bg-bg-secondary"
            >
              <Avatar
                src={conv.avatar}
                alt={conv.name}
                size="md"
                status={conv.online ? "online" : undefined}
              />
              <View className="flex-1 gap-0.5">
                <View className="flex-row items-center justify-between">
                  <Text className="text-fg text-md font-semibold">{conv.name}</Text>
                  <Text className="text-fg-tertiary text-sm">{conv.time}</Text>
                </View>
                <View className="flex-row items-center justify-between gap-2">
                  <Text
                    className="text-fg-secondary text-sm flex-1"
                    numberOfLines={1}
                  >
                    {conv.lastMessage}
                  </Text>
                  {conv.unread > 0 && (
                    <Badge color="brand" size="sm">{String(conv.unread)}</Badge>
                  )}
                </View>
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>
    </View>
  )
}
