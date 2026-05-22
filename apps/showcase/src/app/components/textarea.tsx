import {
  HintText,
  Label,
  Textarea,
  TextareaBase,
  type TextareaSizeKey,
} from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const SIZES: TextareaSizeKey[] = ["sm", "md", "lg"]

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

export default function TextareaShowcase() {
  const [bio, setBio] = useState(
    "I'm a product designer based in Brooklyn. Currently building tools for indie founders and writing about creative process on weekends.",
  )

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Textarea", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Default">
          <Row label="placeholder">
            <Textarea placeholder="Tell us about yourself…" />
          </Row>
          <Row label="with value (controlled)">
            <Textarea value={bio} onChangeText={setBio} />
          </Row>
        </Section>

        <Section title="Sizes (sm / md default / lg)">
          {SIZES.map((size) => (
            <Row key={size} label={size}>
              <Textarea size={size} placeholder={`Size ${size}`} rows={3} />
            </Row>
          ))}
        </Section>

        <Section title="Rows (min visible)">
          <Row label="rows=2">
            <Textarea rows={2} placeholder="Two-line minimum." />
          </Row>
          <Row label="rows=4 (default)">
            <Textarea placeholder="Four-line minimum." />
          </Row>
          <Row label="rows=6">
            <Textarea rows={6} placeholder="Six-line minimum." />
          </Row>
        </Section>

        <Section title="States">
          <Row label="default">
            <Textarea placeholder="Default" />
          </Row>
          <Row label="error">
            <Textarea
              isInvalid
              defaultValue="Bio must be at least 50 characters."
            />
          </Row>
          <Row label="success">
            <Textarea isSuccess defaultValue="This bio looks good!" />
          </Row>
          <Row label="disabled">
            <Textarea placeholder="Disabled" disabled />
          </Row>
          <Row label="read-only">
            <Textarea defaultValue="Read-only content cannot be edited." readOnly />
          </Row>
        </Section>

        <Section title="Composed — label + hint">
          <Textarea
            label="Bio"
            placeholder="Tell us about yourself"
            hint="Markdown supported. 280 character limit."
          />
          <Textarea
            label="Description"
            placeholder="Describe your project"
            isRequired
            hint="Required for submission review."
          />
          <Textarea
            label="Feedback"
            defaultValue="too short"
            isInvalid
            hint="Feedback must be at least 20 characters."
          />
          <Textarea
            label="Comment"
            defaultValue="Looking great so far!"
            isSuccess
            hint="Submitted."
            rows={3}
          />
        </Section>

        <Section title="Standalone Label + Base + HintText">
          <View className="gap-1.5">
            <Label>Plain label</Label>
            <TextareaBase placeholder="Bare TextareaBase" />
            <HintText>Helper text below the field.</HintText>
          </View>
          <View className="gap-1.5">
            <Label isRequired>Required label</Label>
            <TextareaBase placeholder="Required" isInvalid rows={2} />
            <HintText isInvalid>This field is required.</HintText>
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
