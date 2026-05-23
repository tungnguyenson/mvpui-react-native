import { Slider, type SliderValue } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

function Section({
  title,
  hint,
  children,
}: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      {hint ? <Text className="text-fg-tertiary text-sm">{hint}</Text> : null}
      <View className="gap-3">{children}</View>
    </View>
  )
}

export default function SliderShowcase() {
  const [volume, setVolume] = useState<SliderValue>(40)
  const [brightness, setBrightness] = useState<SliderValue>(75)
  const [stepped, setStepped] = useState<SliderValue>(50)
  const [priceRange, setPriceRange] = useState<SliderValue>([20, 80])

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Slider", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Single thumb">
          <View className="gap-1">
            <Text className="text-fg text-md">Volume: {String(volume)}</Text>
            <Slider value={volume} onChange={setVolume} />
          </View>

          <View className="gap-1">
            <Text className="text-fg text-md">
              Brightness: {String(brightness)}%
            </Text>
            <Slider
              value={brightness}
              onChange={setBrightness}
              min={0}
              max={100}
            />
          </View>
        </Section>

        <Section title="Stepped" hint="step=10, snaps to multiples of 10">
          <View className="gap-1">
            <Text className="text-fg text-md">{String(stepped)}</Text>
            <Slider value={stepped} onChange={setStepped} step={10} />
          </View>
        </Section>

        <Section title="Range" hint="value: [number, number] — two thumbs">
          <View className="gap-1">
            <Text className="text-fg text-md">
              Price: ${(priceRange as number[])[0]} - $
              {(priceRange as number[])[1]}
            </Text>
            <Slider value={priceRange} onChange={setPriceRange} />
          </View>
        </Section>

        <Section title="Disabled">
          <Slider value={50} onChange={() => {}} disabled />
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
