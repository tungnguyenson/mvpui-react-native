import { Avatar, type AvatarSize, type AvatarStatus, SafeArea } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { ScrollView, Text, View } from "react-native"

const SIZES: AvatarSize[] = ["xs", "sm", "md", "lg", "xl", "2xl"]
const STATUSES: AvatarStatus[] = ["online", "offline", "away", "busy"]

const SRC = "https://i.pravatar.cc/200?img=12"
const SRC_BROKEN = "https://example.invalid/avatar.png"

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
      <View className="flex-row flex-wrap gap-3 items-center">{children}</View>
    </View>
  )
}

export default function AvatarShowcase() {
  return (
    <SafeArea>
      <Stack.Screen options={{ title: "Avatar", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Sizes — initials cascade (no src)">
          <Row label="xs / sm / md / lg / xl / 2xl">
            {SIZES.map((size) => (
              <Avatar key={size} size={size} initials="JC" />
            ))}
          </Row>
        </Section>

        <Section title="Sizes — remote image">
          <Row label="xs / sm / md / lg / xl / 2xl">
            {SIZES.map((size) => (
              <Avatar key={size} size={size} src={SRC} alt="Olivia" />
            ))}
          </Row>
        </Section>

        <Section title="Cascade (broken src → initials → default User icon)">
          <Row label="broken src with initials">
            <Avatar src={SRC_BROKEN} initials="JC" />
            <Avatar src={SRC_BROKEN} initials="JC" size="lg" />
          </Row>
          <Row label="no src, no initials → lucide User">
            <Avatar />
            <Avatar size="lg" />
          </Row>
        </Section>

        <Section title="Status indicators (md size)">
          <Row label="online / offline / away / busy">
            {STATUSES.map((status) => (
              <Avatar key={status} src={SRC} alt={status} status={status} />
            ))}
          </Row>
          <Row label="status + initials cascade">
            {STATUSES.map((status) => (
              <Avatar key={status} initials="JC" status={status} />
            ))}
          </Row>
        </Section>

        <Section title="Border + square">
          <Row label="border">
            <Avatar src={SRC} border />
            <Avatar initials="JC" border />
            <Avatar src={SRC} size="lg" border />
          </Row>
          <Row label="square (rounded)">
            <Avatar src={SRC} square />
            <Avatar initials="JC" square />
            <Avatar src={SRC} size="lg" square />
          </Row>
        </Section>
      </ScrollView>
    </SafeArea>
  )
}
