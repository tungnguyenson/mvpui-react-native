import { Link } from "expo-router"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { ThemeToggle } from "@/components/theme-toggle"

const components = [
  { href: "/components/button", label: "Button" },
  { href: "/components/input", label: "Input" },
  { href: "/components/spinner", label: "Spinner" },
  { href: "/components/safe-area", label: "SafeArea" },
  { href: "/components/card", label: "Card" },
  { href: "/components/alert", label: "Alert" },
  { href: "/components/empty-state", label: "EmptyState" },
  { href: "/components/header", label: "Header" },
  { href: "/components/tab-bar", label: "TabBar" },
  { href: "/components/search-bar", label: "SearchBar" },
  { href: "/components/segmented-control", label: "SegmentedControl" },
  { href: "/components/keyboard-avoiding-scroll", label: "KAS" },
] as const

export default function IndexScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView contentContainerClassName="px-5 py-6 gap-6">
        <View className="flex-row items-start justify-between gap-3">
          <View className="flex-1 gap-1">
            <Text className="text-fg text-2xl font-bold">mvp-ui-rn</Text>
            <Text className="text-fg-secondary text-md">
              Untitled UI · React Native component showcase
            </Text>
          </View>
          <ThemeToggle />
        </View>

        <View className="gap-2">
          <Text className="text-fg-tertiary text-xs uppercase tracking-wide">Components</Text>
          {components.map((c) => (
            // expo-router `<Link>` doesn't merge className into the inner Text
            // node, so wrap an explicit `<Text>` via `asChild` to get
            // text-fg-brand to actually paint.
            <Link key={c.href} href={c.href} asChild>
              <Text className="text-fg-brand text-md py-2 underline">{c.label}</Text>
            </Link>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
