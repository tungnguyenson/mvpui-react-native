import {
  Avatar,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CircularProgress,
  List,
  ListItem,
  ProgressBar,
} from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { ScrollView, Text, View } from "react-native"

type MetricCard = {
  label: string
  value: string
  progress: number
  color: "primary" | "success" | "warning"
}

const METRICS: MetricCard[] = [
  { label: "Tasks Done", value: "73%", progress: 73, color: "primary" },
  { label: "Revenue", value: "91%", progress: 91, color: "success" },
  { label: "Churn Risk", value: "18%", progress: 18, color: "warning" },
]

type DayActivity = { day: string; value: number }

const ACTIVITY: DayActivity[] = [
  { day: "Mon", value: 62 },
  { day: "Tue", value: 81 },
  { day: "Wed", value: 55 },
  { day: "Thu", value: 94 },
  { day: "Fri", value: 78 },
  { day: "Sat", value: 30 },
  { day: "Sun", value: 12 },
]

type RecentItem = {
  id: string
  name: string
  handle: string
  avatar: string
  badge: string
  badgeColor: "success" | "warning" | "brand" | "error"
}

const RECENT: RecentItem[] = [
  { id: "1", name: "Olivia Rhye", handle: "Updated design specs", avatar: "https://i.pravatar.cc/200?img=47", badge: "Done", badgeColor: "success" },
  { id: "2", name: "Lana Steiner", handle: "Reviewed pull request", avatar: "https://i.pravatar.cc/200?img=23", badge: "Done", badgeColor: "success" },
  { id: "3", name: "Phoenix Baker", handle: "Wrote test coverage", avatar: "https://i.pravatar.cc/200?img=11", badge: "In Review", badgeColor: "warning" },
  { id: "4", name: "Candice Wu", handle: "Fixed login bug", avatar: "https://i.pravatar.cc/200?img=5", badge: "Merged", badgeColor: "brand" },
  { id: "5", name: "Drew Cano", handle: "Deployed to staging", avatar: "https://i.pravatar.cc/200?img=33", badge: "Blocked", badgeColor: "error" },
]

export default function DashboardScreen() {
  return (
    <View className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Dashboard", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-6">
        {/* Greeting */}
        <View className="gap-0.5">
          <Text className="text-fg-tertiary text-sm">Good morning ✦</Text>
          <Text className="text-fg text-2xl font-bold">Welcome back, Olivia</Text>
        </View>

        {/* Metrics strip */}
        <View className="flex-row gap-3">
          {METRICS.map((m) => (
            <Card key={m.label} className="flex-1 items-center py-4 gap-2">
              <CircularProgress
                value={m.progress}
                size={56}
                thickness={5}
                color={m.color}
                label={m.value}
              />
              <Text className="text-fg-secondary text-xs text-center" numberOfLines={1}>
                {m.label}
              </Text>
            </Card>
          ))}
        </View>

        {/* Activity */}
        <Card>
          <CardHeader>
            <CardTitle>7-day Activity</CardTitle>
          </CardHeader>
          <CardContent className="gap-2">
            {ACTIVITY.map((a) => (
              <ProgressBar
                key={a.day}
                value={a.value}
                label={a.day}
                showValue
                size="sm"
              />
            ))}
          </CardContent>
        </Card>

        {/* Recent */}
        <View className="gap-3">
          <Text className="text-fg text-lg font-semibold">Recent Activity</Text>
          <List>
            {RECENT.map((item) => (
              <ListItem
                key={item.id}
                leading={
                  <Avatar src={item.avatar} alt={item.name} size="sm" />
                }
                title={item.name}
                subtitle={item.handle}
                trailing={
                  <Badge color={item.badgeColor} size="sm">{item.badge}</Badge>
                }
                onPress={() => {}}
              />
            ))}
          </List>
        </View>
      </ScrollView>
    </View>
  )
}
