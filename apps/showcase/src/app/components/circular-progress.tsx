import {
  CircularProgress,
  SafeArea,
  type CircularProgressColor,
} from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { useEffect, useRef, useState } from "react"
import { ScrollView, Text, View } from "react-native"

const COLORS: CircularProgressColor[] = ["primary", "success", "warning", "error"]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-4">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      <View>{children}</View>
    </View>
  )
}

function LiveDemo() {
  const [value, setValue] = useState(0)
  const dirRef = useRef(1)

  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => {
        const next = v + dirRef.current * 2
        if (next >= 100) {
          dirRef.current = -1
          return 100
        }
        if (next <= 0) {
          dirRef.current = 1
          return 0
        }
        return next
      })
    }, 80)
    return () => clearInterval(id)
  }, [])

  return (
    <View className="items-center gap-3">
      <CircularProgress value={value} size={80} thickness={6} showValue />
      <Text className="text-fg-secondary text-sm">Live — animates between 0 and 100</Text>
    </View>
  )
}

export default function CircularProgressShowcase() {
  return (
    <SafeArea>
      <Stack.Screen options={{ title: "CircularProgress", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Colors (value=75)">
          <View className="flex-row flex-wrap gap-6 justify-center">
            {COLORS.map((color) => (
              <View key={color} className="items-center gap-2">
                <CircularProgress value={75} color={color} size={56} showValue />
                <Text className="text-fg-secondary text-xs">{color}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Sizes (primary, value=60)">
          <View className="flex-row flex-wrap gap-6 items-center justify-center">
            {([32, 48, 64, 80, 96] as const).map((size) => (
              <View key={size} className="items-center gap-2">
                <CircularProgress value={60} size={size} thickness={size / 12} />
                <Text className="text-fg-secondary text-xs">{size}px</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Center label override">
          <View className="flex-row gap-6 justify-center">
            <View className="items-center gap-2">
              <CircularProgress value={85} size={72} label="85%" />
              <Text className="text-fg-secondary text-xs">label prop</Text>
            </View>
            <View className="items-center gap-2">
              <CircularProgress value={42} size={72} showValue />
              <Text className="text-fg-secondary text-xs">showValue</Text>
            </View>
            <View className="items-center gap-2">
              <CircularProgress value={33} size={72} label="1/3" />
              <Text className="text-fg-secondary text-xs">custom text</Text>
            </View>
          </View>
        </Section>

        <Section title="Thickness variants">
          <View className="flex-row gap-6 justify-center items-center">
            {([2, 4, 8, 12] as const).map((t) => (
              <View key={t} className="items-center gap-2">
                <CircularProgress value={70} size={64} thickness={t} />
                <Text className="text-fg-secondary text-xs">{t}px</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Live animation">
          <LiveDemo />
        </Section>

        <Section title="Edge values">
          <View className="flex-row gap-6 justify-center">
            {[0, 25, 50, 75, 100].map((v) => (
              <View key={v} className="items-center gap-2">
                <CircularProgress value={v} size={44} />
                <Text className="text-fg-secondary text-xs">{v}</Text>
              </View>
            ))}
          </View>
        </Section>
      </ScrollView>
    </SafeArea>
  )
}
