import {
  Banner,
  Button,
  SafeArea,
  type BannerVariantKey,
} from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Info,
  Wifi,
} from "lucide-react-native"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"

const ICON_MAP = {
  neutral: Wifi,
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertOctagon,
} as const

const VARIANTS: BannerVariantKey[] = ["neutral", "info", "success", "warning", "error"]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold px-5">{title}</Text>
      <View className="gap-3">{children}</View>
    </View>
  )
}

export default function BannerShowcase() {
  const [visible, setVisible] = useState<Record<BannerVariantKey, boolean>>({
    neutral: true,
    info: true,
    success: true,
    warning: true,
    error: true,
  })

  const restore = () =>
    setVisible({ neutral: true, info: true, success: true, warning: true, error: true })

  const allHidden = !Object.values(visible).some(Boolean)

  return (
    <SafeArea>
      <Stack.Screen options={{ title: "Banner", headerShown: true }} />
      <ScrollView contentContainerClassName="py-6 gap-8">
        <Section title="All variants (full-width bar)">
          {VARIANTS.map((variant) => (
            <Banner
              key={variant}
              variant={variant}
              icon={ICON_MAP[variant]}
              title={`${variant[0].toUpperCase()}${variant.slice(1)} banner`}
              description="Persistent system-level notice. Consumer controls visibility via state."
            />
          ))}
        </Section>

        <Section title="Title only (no description)">
          <Banner
            variant="warning"
            icon={AlertTriangle}
            title="Storage is 90% full"
          />
          <Banner variant="error" title="Sync failed — check connection" />
        </Section>

        <Section title="Dismissible (Reanimated FadeOut)">
          {VARIANTS.map((variant) =>
            visible[variant] ? (
              <Banner
                key={variant}
                variant={variant}
                icon={ICON_MAP[variant]}
                title={`Dismissible ${variant}`}
                description="Tap × to fade out."
                onDismiss={() => setVisible((v) => ({ ...v, [variant]: false }))}
                dismissLabel={`Dismiss ${variant} banner`}
              />
            ) : null,
          )}
          {allHidden ? (
            <View className="px-5">
              <Button color="secondary" onPress={restore}>
                Restore all
              </Button>
            </View>
          ) : null}
        </Section>

        <Section title="No icon">
          <Banner
            variant="info"
            title="App version 2.1.0 is available"
            description="Update for the latest features and fixes."
          />
        </Section>
      </ScrollView>
    </SafeArea>
  )
}
