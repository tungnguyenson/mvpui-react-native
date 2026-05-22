import { Checkbox, CheckboxBase, type CheckboxState } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      <View className="gap-3">{children}</View>
    </View>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View className="gap-2">
      <Text className="text-fg-tertiary text-xs uppercase tracking-wide">{label}</Text>
      <View className="gap-2">{children}</View>
    </View>
  )
}

export default function CheckboxShowcase() {
  const [single, setSingle] = useState<CheckboxState>(false)
  const [tristate, setTristate] = useState<CheckboxState>("indeterminate")

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Checkbox", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="States (always-on visual reference)">
          <Row label="unchecked / checked / indeterminate (sm)">
            <View className="flex-row gap-4">
              <CheckboxBase checked={false} size="sm" />
              <CheckboxBase checked={true} size="sm" />
              <CheckboxBase checked="indeterminate" size="sm" />
            </View>
          </Row>
          <Row label="unchecked / checked / indeterminate (md)">
            <View className="flex-row gap-4">
              <CheckboxBase checked={false} size="md" />
              <CheckboxBase checked={true} size="md" />
              <CheckboxBase checked="indeterminate" size="md" />
            </View>
          </Row>
          <Row label="disabled (unchecked / checked / indeterminate)">
            <View className="flex-row gap-4">
              <CheckboxBase checked={false} size="md" isDisabled />
              <CheckboxBase checked={true} size="md" isDisabled />
              <CheckboxBase checked="indeterminate" size="md" isDisabled />
            </View>
          </Row>
          <Row label="invalid (unchecked)">
            <View className="flex-row gap-4">
              <CheckboxBase checked={false} size="sm" isInvalid />
              <CheckboxBase checked={false} size="md" isInvalid />
            </View>
          </Row>
        </Section>

        <Section title="Interactive (controlled)">
          <Row label="single — tap to toggle">
            <Checkbox
              checked={single}
              onCheckedChange={setSingle}
              label="Accept the terms"
              hint="Required to continue."
            />
            <Text className="text-fg-tertiary text-sm">value: {String(single)}</Text>
          </Row>
          <Row label="tristate — starts indeterminate, tap → checked → unchecked">
            <Checkbox
              checked={tristate}
              onCheckedChange={setTristate}
              size="md"
              label="Select all"
              hint="Click cycles through the three states."
            />
            <Text className="text-fg-tertiary text-sm">value: {String(tristate)}</Text>
          </Row>
        </Section>

        <Section title="Composed — label + hint">
          <Checkbox
            checked={false}
            label="Email me product updates"
          />
          <Checkbox
            checked={true}
            label="Subscribe to the newsletter"
            hint="One email per week, no spam."
          />
          <Checkbox
            checked="indeterminate"
            size="md"
            label="Select all rows"
            hint="3 of 12 currently selected."
          />
          <Checkbox
            checked={false}
            disabled
            label="Disabled option"
            hint="Locked while another setting is on."
          />
          <Checkbox
            checked={false}
            isInvalid
            label="I have read the terms"
            hint="You must accept to continue."
          />
        </Section>

        <Section title="Sizes (sm default / md)">
          <Row label="sm">
            <Checkbox checked={true} label="Small checkbox" hint="text-sm + 20px box" />
          </Row>
          <Row label="md">
            <Checkbox
              checked={true}
              size="md"
              label="Medium checkbox"
              hint="text-md + 24px box"
            />
          </Row>
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
