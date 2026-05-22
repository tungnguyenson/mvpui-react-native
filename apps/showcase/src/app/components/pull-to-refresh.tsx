import { SafeArea, usePullToRefresh } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export default function PullToRefreshShowcase() {
  const [counter, setCounter] = useState(0)
  const [lastAt, setLastAt] = useState<string | null>(null)

  const { refreshing, refreshControl } = usePullToRefresh(async () => {
    await delay(1200)
    setCounter((n) => n + 1)
    setLastAt(new Date().toLocaleTimeString())
  }, { title: "Pull to refresh" })

  return (
    <SafeArea>
      <Stack.Screen options={{ title: "PullToRefresh", headerShown: true }} />
      <ScrollView
        refreshControl={refreshControl}
        contentContainerClassName="px-5 py-6 gap-6"
      >
        <View className="gap-2 rounded-xl border border-border bg-bg-secondary p-5">
          <Text className="text-fg text-lg font-semibold">Pull down from the top</Text>
          <Text className="text-fg-secondary text-md">
            Refreshing state: {refreshing ? "yes" : "no"}
          </Text>
          <Text className="text-fg-secondary text-md">
            Refresh count: {counter}
          </Text>
          {lastAt ? (
            <Text className="text-fg-tertiary text-sm">last at {lastAt}</Text>
          ) : (
            <Text className="text-fg-tertiary text-sm">no refresh yet</Text>
          )}
        </View>

        <View className="gap-2">
          <Text className="text-fg-tertiary text-xs uppercase tracking-wide">
            Filler content
          </Text>
          {Array.from({ length: 12 }).map((_, i) => (
            <View
              key={i}
              className="flex-row items-center gap-3 rounded-lg border border-border bg-bg p-4"
            >
              <View className="h-10 w-10 rounded-full bg-bg-tertiary" />
              <View className="flex-1 gap-1">
                <Text className="text-fg text-md font-medium">Item {i + 1}</Text>
                <Text className="text-fg-tertiary text-sm">
                  Pull from top to refresh.
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeArea>
  )
}
