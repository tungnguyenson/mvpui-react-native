import { HintText, Input, InputBase, Label, type InputSizeKey } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { Mail, Search, User } from "lucide-react-native"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const SIZES: InputSizeKey[] = ["sm", "md", "lg"]

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

export default function InputShowcase() {
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Input", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Default">
          <Row label="placeholder">
            <Input placeholder="Enter text…" />
          </Row>
          <Row label="with value">
            <Input defaultValue="olivia@acme.co" />
          </Row>
        </Section>

        <Section title="Sizes (sm / md default / lg)">
          {SIZES.map((size) => (
            <Row key={size} label={size}>
              <Input size={size} placeholder={`Size ${size}`} />
            </Row>
          ))}
        </Section>

        <Section title="States">
          <Row label="default">
            <Input placeholder="Default" />
          </Row>
          <Row label="error">
            <Input isInvalid defaultValue="invalid-email" />
          </Row>
          <Row label="success">
            <Input isSuccess defaultValue="valid@example.com" />
          </Row>
          <Row label="disabled">
            <Input placeholder="Disabled" disabled />
          </Row>
          <Row label="read-only">
            <Input defaultValue="Read-only value" readOnly />
          </Row>
        </Section>

        <Section title="With icons">
          <Row label="leading">
            <Input iconLeading={Search} placeholder="Search" />
            <Input iconLeading={Mail} placeholder="you@example.com" keyboardType="email-address" />
          </Row>
          <Row label="trailing">
            <Input iconTrailing={User} placeholder="Profile" />
          </Row>
        </Section>

        <Section title="Inline prefix / suffix">
          <Row label="prefix">
            <Input prefix="$" placeholder="0.00" keyboardType="decimal-pad" />
            <Input prefix="https://" placeholder="yoursite.com" autoCapitalize="none" />
          </Row>
          <Row label="suffix">
            <Input suffix="USD" defaultValue="100.00" keyboardType="decimal-pad" />
            <Input suffix=".com" placeholder="yoursite" autoCapitalize="none" />
          </Row>
        </Section>

        <Section title="Password (always-on for visual reference)">
          <Row label="empty">
            <Input secureTextEntry placeholder="Enter password" />
          </Row>
          <Row label="filled (tap the field to render bullets — iOS native quirk)">
            <Input secureTextEntry value="hunter2" />
          </Row>
        </Section>

        <Section title="Composed — label + hint">
          <Input label="Email" placeholder="you@example.com" hint="We'll never share your email." />
          <Input
            label="Full name"
            placeholder="Jane Cooper"
            isRequired
            hint="Required for verification."
          />
          <Input
            label="Email"
            defaultValue="invalid-email"
            isInvalid
            hint="Please enter a valid email address."
          />
          <Input
            label="Email with leading icon"
            iconLeading={Mail}
            defaultValue="invalid"
            isInvalid
            hint="Leading icon must coexist with the error indicator."
          />
          <Input
            label="Password"
            secureTextEntry
            placeholder="At least 8 characters"
            isRequired
          />
        </Section>

        <Section title="Standalone Label + HintText (visual reference)">
          <View className="gap-1.5">
            <Label>Plain label</Label>
            <InputBase placeholder="Bare InputBase" />
            <HintText>Helper text below the field.</HintText>
          </View>
          <View className="gap-1.5">
            <Label isRequired>Required label</Label>
            <InputBase placeholder="Required" isInvalid />
            <HintText isInvalid>This field is required.</HintText>
          </View>
          <View className="gap-1.5">
            <Label isRequired isInvalid>
              Required + invalid label
            </Label>
            <HintText size="sm">Hint at small size.</HintText>
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
