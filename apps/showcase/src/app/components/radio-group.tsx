import { RadioGroup, RadioGroupItem } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { useState } from "react"
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

export default function RadioGroupShowcase() {
  const [theme, setTheme] = useState<string>("system")
  const [planSm, setPlanSm] = useState<string | undefined>("free")
  const [planMd, setPlanMd] = useState<string | undefined>("pro")
  const [invalid, setInvalid] = useState<string | undefined>(undefined)

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "RadioGroup", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Default sm">
          <RadioGroup value={planSm} onValueChange={setPlanSm} size="sm">
            <RadioGroupItem value="free" label="Free" hint="Basic features" />
            <RadioGroupItem value="pro" label="Pro" hint="$12 / month" />
            <RadioGroupItem
              value="team"
              label="Team"
              hint="$32 / month per seat"
            />
          </RadioGroup>
          <Text className="text-fg-tertiary text-sm">
            Selected: {planSm ?? "none"}
          </Text>
        </Section>

        <Section title="Size md (no hint)">
          <RadioGroup value={planMd} onValueChange={setPlanMd} size="md">
            <RadioGroupItem value="hobby" label="Hobby" />
            <RadioGroupItem value="pro" label="Pro" />
            <RadioGroupItem value="enterprise" label="Enterprise" />
          </RadioGroup>
        </Section>

        <Section title="With description (theme picker)">
          <RadioGroup value={theme} onValueChange={setTheme}>
            <RadioGroupItem
              value="light"
              label="Light"
              hint="Always light, regardless of system"
            />
            <RadioGroupItem
              value="dark"
              label="Dark"
              hint="Always dark, regardless of system"
            />
            <RadioGroupItem
              value="system"
              label="System"
              hint="Match the OS preference"
            />
          </RadioGroup>
        </Section>

        <Section title="Disabled row + group disabled">
          <RadioGroup value="a" onValueChange={() => {}}>
            <RadioGroupItem value="a" label="Option A" />
            <RadioGroupItem
              value="b"
              label="Option B (disabled)"
              hint="Coming soon"
              disabled
            />
            <RadioGroupItem value="c" label="Option C" />
          </RadioGroup>

          <RadioGroup value="x" onValueChange={() => {}} disabled>
            <RadioGroupItem value="x" label="Group disabled" />
            <RadioGroupItem value="y" label="All rows inactive" />
          </RadioGroup>
        </Section>

        <Section title="Invalid state">
          <RadioGroup value={invalid} onValueChange={setInvalid}>
            <RadioGroupItem value="agree" label="Agree" isInvalid />
            <RadioGroupItem value="disagree" label="Disagree" isInvalid />
          </RadioGroup>
          <Text className="text-error-600 text-sm">
            Please pick one to continue
          </Text>
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
