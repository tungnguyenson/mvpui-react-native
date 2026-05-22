import { SafeArea } from "@mvp-ui-rn/ui"
import { Text, View } from "react-native"

export default function SearchTab() {
  return (
    <SafeArea edges={["top", "left", "right"]}>
      <View className="flex-1 px-5 py-6 gap-1">
        <Text className="text-fg text-2xl font-bold">Search</Text>
        <Text className="text-fg-secondary text-md">Second tab.</Text>
      </View>
    </SafeArea>
  )
}
