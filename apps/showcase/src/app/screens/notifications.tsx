import {
  Avatar,
  EmptyState,
  SegmentedControl,
  SwipeableRow,
  type SegmentedControlOption,
  usePullToRefresh,
} from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { Bell, Check, Trash2 } from "lucide-react-native"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"

type FilterValue = "all" | "unread" | "mentions"

const FILTERS: SegmentedControlOption<FilterValue>[] = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "mentions", label: "Mentions" },
]

type Notification = {
  id: string
  avatar: string
  author: string
  text: string
  time: string
  unread: boolean
  mention: boolean
}

const NOTIFICATIONS: Notification[] = [
  { id: "1", avatar: "https://i.pravatar.cc/200?img=47", author: "Olivia Rhye", text: "liked your post about design systems.", time: "2m", unread: true, mention: false },
  { id: "2", avatar: "https://i.pravatar.cc/200?img=23", author: "Lana Steiner", text: "mentioned you in a comment.", time: "8m", unread: true, mention: true },
  { id: "3", avatar: "https://i.pravatar.cc/200?img=11", author: "Phoenix Baker", text: "started following you.", time: "1h", unread: true, mention: false },
  { id: "4", avatar: "https://i.pravatar.cc/200?img=5", author: "Candice Wu", text: "replied to your comment.", time: "3h", unread: false, mention: false },
  { id: "5", avatar: "https://i.pravatar.cc/200?img=33", author: "Drew Cano", text: "mentioned you in their post.", time: "5h", unread: false, mention: true },
  { id: "6", avatar: "https://i.pravatar.cc/200?img=15", author: "Orlando Diggs", text: "liked your comment.", time: "1d", unread: false, mention: false },
  { id: "7", avatar: "https://i.pravatar.cc/200?img=9", author: "Ava Wright", text: "shared your post.", time: "2d", unread: false, mention: false },
  { id: "8", avatar: "https://i.pravatar.cc/200?img=12", author: "Nathan Fox", text: "mentioned you in a thread.", time: "3d", unread: false, mention: true },
]

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export default function NotificationsScreen() {
  const [filter, setFilter] = useState<FilterValue>("all")
  const [items, setItems] = useState(NOTIFICATIONS)

  const visible = items.filter((n) => {
    if (filter === "unread") return n.unread
    if (filter === "mentions") return n.mention
    return true
  })

  const { refreshControl } = usePullToRefresh(async () => {
    await delay(800)
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })))
  })

  return (
    <View className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Notifications", headerShown: true }} />

      <View className="px-5 pt-3 pb-2">
        <SegmentedControl
          value={filter}
          onChange={setFilter}
          options={FILTERS}
          accessibilityLabel="Filter notifications"
        />
      </View>

      <ScrollView refreshControl={refreshControl}>
        {visible.length === 0 ? (
          <View className="pt-16 px-8">
            <EmptyState
              icon={<Bell size={32} />}
              title="All caught up"
              description="No notifications match this filter."
            />
          </View>
        ) : (
          visible.map((n) => (
            <SwipeableRow
              key={n.id}
              leftActions={[
                {
                  key: "read",
                  label: "Mark read",
                  icon: Check,
                  color: "primary",
                  onPress: () =>
                    setItems((prev) =>
                      prev.map((item) => item.id === n.id ? { ...item, unread: false } : item),
                    ),
                },
              ]}
              rightActions={[
                {
                  key: "delete",
                  label: "Delete",
                  icon: Trash2,
                  color: "destructive",
                  onPress: () =>
                    setItems((prev) => prev.filter((item) => item.id !== n.id)),
                },
              ]}
            >
              <View className="flex-row items-start gap-3 px-5 py-4 bg-bg border-b border-border">
                <Avatar src={n.avatar} alt={n.author} size="md" />
                <View className="flex-1 gap-0.5">
                  <View className="flex-row items-center gap-2 flex-wrap">
                    <Text className="text-fg text-md font-semibold">{n.author}</Text>
                    {n.unread && <View className="w-2 h-2 rounded-full bg-primary" />}
                  </View>
                  <Text className="text-fg-secondary text-md">{n.text}</Text>
                  <Text className="text-fg-tertiary text-sm">{n.time}</Text>
                </View>
              </View>
            </SwipeableRow>
          ))
        )}
      </ScrollView>
    </View>
  )
}
