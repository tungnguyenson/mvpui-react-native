import { SafeArea } from "@mvp-ui-rn/ui"
import { ScrollView, Text, View } from "react-native"

const items = [
  { title: "Design tokens", meta: "packages/tokens" },
  { title: "Button", meta: "packages/ui" },
  { title: "Input", meta: "packages/ui" },
  { title: "TabBar", meta: "packages/ui" },
  { title: "BottomSheet", meta: "packages/ui" },
  { title: "Dialog", meta: "packages/ui" },
]

export default function ListTab() {
  return (
    <SafeArea edges={["top", "left", "right"]}>
      <ScrollView contentContainerClassName="px-5 py-6 gap-4">
        <View className="gap-1">
          <Text className="text-fg text-2xl font-bold">List</Text>
          <Text className="text-fg-secondary text-md">
            Fourth tab — verifies even-width distribution at 4 items.
          </Text>
        </View>

        <View className="rounded-xl border border-border overflow-hidden">
          {items.map((item, i) => (
            <View
              key={item.title}
              className={`flex-row items-center justify-between px-4 py-3 bg-bg ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              <Text className="text-fg text-md">{item.title}</Text>
              <Text className="text-fg-tertiary text-sm">{item.meta}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeArea>
  )
}
