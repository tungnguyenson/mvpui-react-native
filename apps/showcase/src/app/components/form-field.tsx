import {
  Checkbox,
  FormField,
  InputBase,
  Select,
  SelectItem,
  Switch,
  TextareaBase,
  type SelectOption,
} from "@mvp-ui-rn/ui"
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

const PLAN_OPTIONS = [
  { value: "free", label: "Free" },
  { value: "starter", label: "Starter" },
  { value: "pro", label: "Pro" },
  { value: "enterprise", label: "Enterprise" },
] as const

export default function FormFieldShowcase() {
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [plan, setPlan] = useState<SelectOption>({
    value: PLAN_OPTIONS[1].value,
    label: PLAN_OPTIONS[1].label,
  })
  const [terms, setTerms] = useState<boolean | "indeterminate">(false)
  const [notifications, setNotifications] = useState(true)

  // Validation: error message appears once user types something invalid.
  const emailError =
    email.length > 0 && !email.includes("@") ? "Enter a valid email." : undefined

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "FormField", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Vertical (default) — Input">
          <FormField
            label="Email"
            hint="We'll never share your email."
            isRequired
          >
            <InputBase
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
            />
          </FormField>
        </Section>

        <Section title="Error state — Input">
          <FormField
            label="Email"
            errorMessage={emailError}
            isRequired
          >
            <InputBase
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              isInvalid={!!emailError}
            />
          </FormField>
        </Section>

        <Section title="Disabled">
          <FormField
            label="Workspace"
            hint="Contact your admin to change."
            isDisabled
          >
            <InputBase value="acme-corp" editable={false} />
          </FormField>
        </Section>

        <Section title="Textarea">
          <FormField
            label="Bio"
            hint="Tell us about yourself."
          >
            <TextareaBase
              placeholder="Engineer based in…"
              value={bio}
              onChangeText={setBio}
              rows={4}
            />
          </FormField>
        </Section>

        <Section title="Select">
          <FormField
            label="Plan"
            hint="Pick a tier — you can upgrade anytime."
            isRequired
          >
            <Select value={plan} onValueChange={setPlan}>
              {PLAN_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} label={opt.label} />
              ))}
            </Select>
          </FormField>
        </Section>

        <Section title="Horizontal — Checkbox">
          <FormField
            label="I agree to the terms and conditions"
            orientation="horizontal"
            isRequired
            errorMessage={terms === true ? undefined : "You must accept to continue."}
          >
            <Checkbox checked={terms} onCheckedChange={setTerms} />
          </FormField>
        </Section>

        <Section title="Horizontal — Switch">
          <FormField
            label="Push notifications"
            hint="Receive alerts when something requires attention."
            orientation="horizontal"
          >
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </FormField>
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
