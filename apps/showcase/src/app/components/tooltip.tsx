import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { Heart, Info, Settings } from "lucide-react-native"
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
      {hint ? (
        <Text className="text-fg-tertiary text-sm">{hint}</Text>
      ) : null}
      <View className="gap-4">{children}</View>
    </View>
  )
}

export default function TooltipShowcase() {
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Tooltip", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section
          title="Long-press to show"
          hint="Hold any button for 500ms. Release closes the tooltip."
        >
          <View className="flex-row flex-wrap gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button color="primary" size="md" iconLeading={Heart}>
                  Save to favorites
                </Button>
              </TooltipTrigger>
              <TooltipContent>Adds to your saved list</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button color="secondary" size="md" iconLeading={Settings}>
                  Preferences
                </Button>
              </TooltipTrigger>
              <TooltipContent>Configure your workspace</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  color="tertiary"
                  size="md"
                  iconLeading={Info}
                />
              </TooltipTrigger>
              <TooltipContent>About this app</TooltipContent>
            </Tooltip>
          </View>
        </Section>

        <Section title="Sides">
          <View className="flex-row flex-wrap gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button color="secondary" size="sm">Top</Button>
              </TooltipTrigger>
              <TooltipContent side="top">Tooltip above</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button color="secondary" size="sm">Bottom</Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Tooltip below</TooltipContent>
            </Tooltip>
          </View>
        </Section>

        <Section title="Long text wraps">
          <View className="items-start">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button color="secondary" size="md">
                  Long tooltip
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Some longer text that needs to wrap across multiple lines so we
                can verify the max-width constraint
              </TooltipContent>
            </Tooltip>
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
