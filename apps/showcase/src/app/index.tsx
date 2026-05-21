import { Link } from "expo-router"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const components = [{ href: "/components/button", label: "Button" }] as const

export default function IndexScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerClassName="px-5 py-6 gap-6">
        <View className="gap-1">
          <Text className="text-fg text-2xl font-bold">mvp-ui-rn</Text>
          <Text className="text-fg-secondary text-md">
            Untitled UI · React Native component showcase
          </Text>
        </View>

        <View className="gap-2">
          <Text className="text-fg-tertiary text-xs uppercase tracking-wide">Components</Text>
          {components.map((c) => (
            <Link key={c.href} href={c.href} className="text-fg-brand text-md py-2 underline">
              {c.label}
            </Link>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
