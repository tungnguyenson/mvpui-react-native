import { SafeArea } from "@mvp-ui-rn/ui"
import { ChevronRight } from "lucide-react-native"
import { ScrollView, Text, View } from "react-native"

const rows = [
  { label: "Account", hint: "imtungmvp@gmail.com" },
  { label: "Notifications", hint: "On" },
  { label: "Appearance", hint: "System" },
  { label: "About", hint: "v0.0.0" },
]

export default function SettingsTab() {
  return (
    <SafeArea edges={["top", "left", "right"]}>
      <ScrollView contentContainerClassName="px-5 py-6 gap-4">
        <View className="gap-1">
          <Text className="text-fg text-2xl font-bold">Settings</Text>
          <Text className="text-fg-secondary text-md">
            Third tab — proves the bar paints with 3+ items and stays balanced.
          </Text>
        </View>

        <View className="rounded-xl border border-border overflow-hidden">
          {rows.map((r, i) => (
            <View
              key={r.label}
              className={`flex-row items-center justify-between px-4 py-3 bg-bg ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              <Text className="text-fg text-md">{r.label}</Text>
              <View className="flex-row items-center gap-2">
                <Text className="text-fg-tertiary text-md">{r.hint}</Text>
                <ChevronRight size={16} className="text-fg-quaternary" />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeArea>
  )
}
