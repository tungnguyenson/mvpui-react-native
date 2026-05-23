import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { Bell, MoreHorizontal, Settings } from "lucide-react-native"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

function Section({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      <View className="gap-4">{children}</View>
    </View>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View className="gap-2">
      <Text className="text-fg-tertiary text-xs uppercase tracking-wide">
        {label}
      </Text>
      {children}
    </View>
  )
}

export default function PopoverShowcase() {
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Popover", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Sides">
          <Row label="bottom (default)">
            <View className="items-start">
              <Popover>
                <PopoverTrigger asChild>
                  <Button color="secondary" size="md" iconLeading={Settings}>
                    Open below
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="bottom" align="start">
                  <View className="gap-1 p-2">
                    <Text className="text-fg text-md font-medium">
                      Edit preferences
                    </Text>
                    <Text className="text-fg-tertiary text-sm">
                      Configure your workspace
                    </Text>
                  </View>
                </PopoverContent>
              </Popover>
            </View>
          </Row>

          <Row label="top">
            <View className="items-start">
              <Popover>
                <PopoverTrigger asChild>
                  <Button color="secondary" size="md" iconLeading={Bell}>
                    Open above
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="top" align="center">
                  <Text className="px-2 py-1 text-fg text-md">
                    Notifications enabled
                  </Text>
                </PopoverContent>
              </Popover>
            </View>
          </Row>
        </Section>

        <Section title="Alignment">
          <Row label="start / center / end">
            <View className="flex-row gap-3">
              {(["start", "center", "end"] as const).map((align) => (
                <Popover key={align}>
                  <PopoverTrigger asChild>
                    <Button color="secondary" size="sm">
                      {align}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="bottom" align={align}>
                    <Text className="px-2 py-1 text-fg text-md">
                      align="{align}"
                    </Text>
                  </PopoverContent>
                </Popover>
              ))}
            </View>
          </Row>
        </Section>

        <Section title="Compact menu">
          <Row label="icon trigger + rows">
            <View className="items-start">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    color="tertiary"
                    size="md"
                    iconLeading={MoreHorizontal}
                  />
                </PopoverTrigger>
                <PopoverContent side="bottom" align="end" className="p-0">
                  <View className="py-1">
                    <View className="px-3 py-2">
                      <Text className="text-fg text-md">Duplicate</Text>
                    </View>
                    <View className="px-3 py-2">
                      <Text className="text-fg text-md">Archive</Text>
                    </View>
                    <View className="h-px bg-border" />
                    <View className="px-3 py-2">
                      <Text className="text-error-600 text-md">Delete</Text>
                    </View>
                  </View>
                </PopoverContent>
              </Popover>
            </View>
          </Row>
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
