import { FAB, SafeArea, type FabColorKey, type FabSizeKey } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import {
  Edit,
  Heart,
  MessageCircle,
  Plus,
  Share,
} from "lucide-react-native"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"

const COLORS: FabColorKey[] = ["primary", "secondary", "surface"]
const SIZES: FabSizeKey[] = ["md", "lg"]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-4">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      <View className="gap-4">{children}</View>
    </View>
  )
}

export default function FabShowcase() {
  const [isLoading, setIsLoading] = useState(false)

  const toggleLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <SafeArea>
      <Stack.Screen options={{ title: "FAB", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Colors (md)">
          <View className="flex-row gap-4 items-center flex-wrap">
            {COLORS.map((color) => (
              <View key={color} className="items-center gap-2">
                <FAB
                  icon={Plus}
                  color={color}
                  onPress={() => {}}
                  accessibilityLabel={`${color} FAB`}
                />
                <Text className="text-fg-secondary text-xs">{color}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Sizes">
          <View className="flex-row gap-6 items-center">
            {SIZES.map((size) => (
              <View key={size} className="items-center gap-2">
                <FAB
                  icon={Plus}
                  size={size}
                  onPress={() => {}}
                  accessibilityLabel={`${size} FAB`}
                />
                <Text className="text-fg-secondary text-xs">
                  {size} ({size === "md" ? "56" : "64"}px)
                </Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Extended FAB (with label)">
          <View className="gap-3">
            <FAB icon={Edit} label="Compose" onPress={() => {}} />
            <FAB icon={Share} label="Share" color="secondary" onPress={() => {}} />
            <FAB icon={MessageCircle} label="Message" size="lg" onPress={() => {}} />
          </View>
        </Section>

        <Section title="Icon variants">
          <View className="flex-row gap-4 flex-wrap">
            {[Plus, Edit, Heart, Share, MessageCircle].map((Icon, i) => (
              <FAB
                key={i}
                icon={Icon}
                onPress={() => {}}
                accessibilityLabel="Action"
              />
            ))}
          </View>
        </Section>

        <Section title="Loading state (tap to trigger)">
          <View className="flex-row gap-4 items-center">
            <FAB
              icon={Plus}
              isLoading={isLoading}
              onPress={toggleLoading}
              accessibilityLabel="Create — loading demo"
            />
            <FAB
              icon={Edit}
              label="Saving…"
              isLoading={isLoading}
              onPress={toggleLoading}
            />
          </View>
          <Text className="text-fg-tertiary text-sm">
            Tap to trigger 2-second loading state.
          </Text>
        </Section>

        <Section title="Disabled">
          <View className="flex-row gap-4 items-center">
            <FAB
              icon={Plus}
              disabled
              onPress={() => {}}
              accessibilityLabel="Disabled FAB"
            />
            <FAB
              icon={Plus}
              label="Disabled"
              disabled
              onPress={() => {}}
            />
          </View>
        </Section>

        <Section title="Placement note">
          <Text className="text-fg-secondary text-sm">
            FAB is a visual primitive — it has no built-in position:absolute.
            For a floating FAB, wrap in a positioned View:
          </Text>
          <View className="rounded-xl bg-bg-secondary p-4">
            <Text className="text-fg font-mono text-sm">
              {"<View\n"}
              {"  style={{ position: 'absolute',\n"}
              {"    bottom: insets.bottom + 24, right: 24 }}\n"}
              {">\n"}
              {"  <FAB icon={Plus} onPress={fn} />\n"}
              {"</View>"}
            </Text>
          </View>
          <Text className="text-fg-secondary text-sm">
            For the tab-bar cutout pattern, see BottomTabs — FAB center demo.
          </Text>
        </Section>
      </ScrollView>
    </SafeArea>
  )
}
