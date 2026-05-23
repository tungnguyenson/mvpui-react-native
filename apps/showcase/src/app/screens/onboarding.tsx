import { Button } from "@mvp-ui-rn/ui"
import { Stack, useRouter } from "expo-router"
import { ChevronLeft, Sparkles, Star, Zap } from "lucide-react-native"
import { useRef, useState } from "react"
import {
  Dimensions,
  FlatList,
  Text,
  View,
  type ViewToken,
} from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"

const { width: SCREEN_W } = Dimensions.get("window")

type Slide = {
  key: string
  icon: React.ComponentType<{ size?: number; color?: string }>
  iconColor: string
  title: string
  subtitle: string
}

const SLIDES: Slide[] = [
  {
    key: "welcome",
    icon: Sparkles,
    iconColor: "#7f56d9",
    title: "Welcome to Orbit",
    subtitle: "The all-in-one workspace for teams that move fast. Beautiful by default.",
  },
  {
    key: "collaborate",
    icon: Star,
    iconColor: "#7f56d9",
    title: "Collaborate in real time",
    subtitle: "Comment, assign, and ship — from a single place. No more context switching.",
  },
  {
    key: "ship",
    icon: Zap,
    iconColor: "#7f56d9",
    title: "Ship with confidence",
    subtitle: "One-click deploys, live metrics, and automatic rollbacks keep you moving forward.",
  },
]

export default function OnboardingScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [activeIndex, setActiveIndex] = useState(0)
  const listRef = useRef<FlatList>(null)

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0] != null) {
        setActiveIndex(viewableItems[0].index ?? 0)
      }
    },
  )

  const goNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      listRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true })
    } else {
      router.back()
    }
  }

  const isLast = activeIndex === SLIDES.length - 1

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ headerShown: false }} />

      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(s) => s.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={{ width: SCREEN_W }} className="flex-1 items-center justify-center px-8 pt-12 pb-4 gap-6">
            <View className="w-24 h-24 rounded-3xl bg-primary items-center justify-center">
              <item.icon size={40} color="#ffffff" />
            </View>
            <View className="gap-3 items-center">
              <Text className="text-fg text-2xl font-bold text-center">{item.title}</Text>
              <Text className="text-fg-secondary text-md text-center leading-6">{item.subtitle}</Text>
            </View>
          </View>
        )}
      />

      {/* Back button — absolute, offset by safe area so it's below status bar */}
      <View style={{ position: "absolute", top: insets.top + 4, left: 12, zIndex: 10 }}>
        <Button
          color="tertiary"
          size="sm"
          iconLeading={ChevronLeft}
          onPress={() => router.back()}
          accessibilityLabel="Go back"
        />
      </View>

      {/* Dot indicators */}
      <View className="px-8 pb-8 gap-6">
        <View className="flex-row gap-1.5 justify-center">
          {SLIDES.map((s, i) => (
            <View
              key={s.key}
              className={`h-2 rounded-full ${
                i === activeIndex ? "w-6 bg-primary" : "w-2 bg-border"
              }`}
            />
          ))}
        </View>

        <Button onPress={goNext} size="lg" className="w-full">
          {isLast ? "Get Started" : "Next"}
        </Button>

        {!isLast && (
          <Button
            color="tertiary"
            onPress={() => router.back()}
            size="md"
            className="w-full"
          >
            Skip
          </Button>
        )}
      </View>
    </SafeAreaView>
  )
}
