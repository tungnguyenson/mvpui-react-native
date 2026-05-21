import { Button, type ButtonColor, type ButtonSize } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { ArrowRight, Plus, Trash2 } from "lucide-react-native"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const COLORS: ButtonColor[] = [
  "primary",
  "secondary",
  "tertiary",
  "primary-destructive",
  "secondary-destructive",
  "tertiary-destructive",
  "link-color",
  "link-gray",
  "link-destructive",
]

const SIZES: ButtonSize[] = ["sm", "md", "lg", "xl"]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      <View className="gap-2">{children}</View>
    </View>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View className="gap-2">
      <Text className="text-fg-tertiary text-xs uppercase tracking-wide">{label}</Text>
      <View className="flex-row flex-wrap gap-2 items-center">{children}</View>
    </View>
  )
}

export default function ButtonShowcase() {
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const triggerLoading = (id: string) => {
    setLoadingId(id)
    setTimeout(() => setLoadingId(null), 1500)
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Button", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Colors (default size: md)">
          {COLORS.map((color) => (
            <Row key={color} label={color}>
              <Button color={color}>Label</Button>
              <Button color={color} disabled>
                Disabled
              </Button>
            </Row>
          ))}
        </Section>

        <Section title="Sizes (primary, sm → xl)">
          <Row label="default">
            {SIZES.map((size) => (
              <Button key={size} size={size}>
                {size.toUpperCase()}
              </Button>
            ))}
          </Row>
        </Section>

        <Section title="With icons">
          <Row label="iconLeading">
            <Button iconLeading={Plus}>Add item</Button>
            <Button color="secondary" iconLeading={Plus}>
              Add item
            </Button>
            <Button color="primary-destructive" iconLeading={Trash2}>
              Delete
            </Button>
          </Row>
          <Row label="iconTrailing">
            <Button iconTrailing={ArrowRight}>Continue</Button>
            <Button color="tertiary" iconTrailing={ArrowRight}>
              Continue
            </Button>
          </Row>
          <Row label="iconOnly (square, 44pt+)">
            {SIZES.map((size) => (
              <Button key={size} size={size} iconLeading={Plus} accessibilityLabel="Add" />
            ))}
            <Button color="secondary" iconLeading={Plus} accessibilityLabel="Add" />
            <Button color="primary-destructive" iconLeading={Trash2} accessibilityLabel="Delete" />
          </Row>
        </Section>

        <Section title="Loading">
          <Row label="always-loading (visual reference)">
            <Button isLoading>Primary</Button>
            <Button color="secondary" isLoading>
              Secondary
            </Button>
            <Button color="primary-destructive" isLoading>
              Destructive
            </Button>
            <Button color="link-color" isLoading>
              Link
            </Button>
          </Row>
          <Row label="default (spinner replaces label)">
            <Button
              isLoading={loadingId === "primary"}
              onPress={() => triggerLoading("primary")}
            >
              Save
            </Button>
            <Button
              color="secondary"
              isLoading={loadingId === "secondary"}
              onPress={() => triggerLoading("secondary")}
            >
              Save
            </Button>
            <Button
              color="primary-destructive"
              isLoading={loadingId === "destructive"}
              onPress={() => triggerLoading("destructive")}
            >
              Delete
            </Button>
          </Row>
          <Row label="showTextWhileLoading">
            <Button
              isLoading={loadingId === "primary-text"}
              showTextWhileLoading
              onPress={() => triggerLoading("primary-text")}
            >
              Saving
            </Button>
            <Button
              color="secondary"
              isLoading={loadingId === "secondary-text"}
              showTextWhileLoading
              onPress={() => triggerLoading("secondary-text")}
            >
              Saving
            </Button>
          </Row>
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
