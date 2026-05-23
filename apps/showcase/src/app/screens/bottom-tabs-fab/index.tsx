import { SafeArea } from "@mvp-ui-rn/ui"
import { Text, View } from "react-native"

export default function HomeTab() {
  return (
    <SafeArea edges={["top", "left", "right"]}>
      <View className="flex-1 px-5 py-6 gap-1">
        <Text className="text-fg text-2xl font-bold">Home</Text>
        <Text className="text-fg-secondary text-md">
          Custom `tabBar` prop replaces the native bar. FAB circle floats above
          the surface via negative `marginTop` + shadow.
        </Text>
      </View>
    </SafeArea>
  )
}
