import { tokens } from "@mvp-ui-rn/tokens"
import { Check, Layers, Palette, Zap } from "lucide-react-native"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const STATS = [
  { label: "Components", value: "50+" },
  { label: "Screens", value: "12" },
  { label: "SDK", value: "56" },
]

const STACK = [
  { label: "React Native", detail: "0.78" },
  { label: "Expo SDK", detail: "56" },
  { label: "NativeWind", detail: "v5" },
  { label: "Tailwind CSS", detail: "v4" },
  { label: "React", detail: "19" },
  { label: "TypeScript", detail: "6" },
]

const FEATURES = [
  {
    Icon: Palette,
    title: "Untitled UI design language",
    description: "Every component matches the Untitled UI Figma kit — same spacing, radius, and variants.",
  },
  {
    Icon: Layers,
    title: "Semantic color tokens",
    description: "Light and dark modes handled by semantic aliases. Raw scale values are banned.",
  },
  {
    Icon: Zap,
    title: "Production-ready",
    description: "44pt touch targets, accessible roles, and Reanimated-powered interactions baked in.",
  },
]

export default function IntroTab() {
  const iconWhite = tokens.color.gray["25"]

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["top"]}>
      <ScrollView contentContainerClassName="px-5 py-8 gap-8">

        {/* Hero */}
        <View className="gap-4">
          <View className="w-16 h-16 rounded-2xl bg-primary items-center justify-center">
            <Layers size={28} color={iconWhite} />
          </View>
          <View className="gap-1">
            <Text className="text-fg text-3xl font-bold">mvp-ui-rn</Text>
            <Text className="text-fg-secondary text-md">Untitled UI · React Native</Text>
          </View>
          <Text className="text-fg-secondary text-md leading-6">
            A production-ready React Native design system built on the Untitled UI design language — same variants, same tokens, same feel as the web.
          </Text>
        </View>

        {/* Stats */}
        <View className="flex-row gap-3">
          {STATS.map((s) => (
            <View key={s.label} className="flex-1 bg-bg-secondary rounded-xl p-4 gap-0.5">
              <Text className="text-fg text-2xl font-bold">{s.value}</Text>
              <Text className="text-fg-tertiary text-sm">{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Features */}
        <View className="gap-3">
          <Text className="text-fg-tertiary text-xs uppercase tracking-wide font-medium px-1">
            Highlights
          </Text>
          {FEATURES.map(({ Icon, title, description }) => (
            <View key={title} className="flex-row gap-4 bg-bg-secondary rounded-xl p-4">
              <View className="w-10 h-10 rounded-xl bg-bg-tertiary items-center justify-center shrink-0">
                <Icon size={20} color={tokens.color.brand["600"]} />
              </View>
              <View className="flex-1 gap-0.5">
                <Text className="text-fg text-md font-semibold">{title}</Text>
                <Text className="text-fg-secondary text-sm leading-5">{description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Tech stack */}
        <View className="gap-3">
          <Text className="text-fg-tertiary text-xs uppercase tracking-wide font-medium px-1">
            Tech Stack
          </Text>
          <View className="bg-bg-secondary rounded-xl overflow-hidden">
            {STACK.map((item, i) => (
              <View key={item.label}>
                {i > 0 && <View className="ml-4 h-px bg-border" />}
                <View className="flex-row items-center justify-between px-4 py-3">
                  <View className="flex-row items-center gap-2">
                    <Check size={14} color={tokens.color.brand["600"]} />
                    <Text className="text-fg text-md">{item.label}</Text>
                  </View>
                  <Text className="text-fg-tertiary text-sm">{item.detail}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}
