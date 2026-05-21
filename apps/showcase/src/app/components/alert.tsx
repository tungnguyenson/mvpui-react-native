import {
  Alert,
  AlertDescription,
  AlertTitle,
  SafeArea,
  type AlertVariantKey,
} from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { AlertOctagon, AlertTriangle, CheckCircle2, Info } from "lucide-react-native"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"

const STATUS_ICON: Record<AlertVariantKey, React.ComponentType<{ color?: string; size?: number }>> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertOctagon,
}

const VARIANTS: AlertVariantKey[] = ["info", "success", "warning", "error"]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      <View className="gap-3">{children}</View>
    </View>
  )
}

export default function AlertShowcase() {
  const [visible, setVisible] = useState<Record<AlertVariantKey, boolean>>({
    info: true,
    success: true,
    warning: true,
    error: true,
  })

  const restore = () =>
    setVisible({ info: true, success: true, warning: true, error: true })

  return (
    <SafeArea>
      <Stack.Screen options={{ title: "Alert", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Status variants (with icon)">
          {VARIANTS.map((variant) => (
            <Alert key={variant} variant={variant} icon={STATUS_ICON[variant]}>
              <AlertTitle variant={variant}>
                {variant[0].toUpperCase() + variant.slice(1)} alert
              </AlertTitle>
              <AlertDescription variant={variant}>
                Short supporting copy that wraps onto a second line when content
                runs long.
              </AlertDescription>
            </Alert>
          ))}
        </Section>

        <Section title="No icon (title only)">
          <Alert variant="info">
            <AlertTitle variant="info">Inline notice without an icon</AlertTitle>
          </Alert>
        </Section>

        <Section title="Dismissible (Reanimated FadeOut)">
          {VARIANTS.map((variant) =>
            visible[variant] ? (
              <Alert
                key={variant}
                variant={variant}
                icon={STATUS_ICON[variant]}
                onDismiss={() =>
                  setVisible((v) => ({ ...v, [variant]: false }))
                }
                dismissLabel={`Dismiss ${variant} alert`}
              >
                <AlertTitle variant={variant}>
                  Dismissible {variant}
                </AlertTitle>
                <AlertDescription variant={variant}>
                  Tap the × to fade this one out.
                </AlertDescription>
              </Alert>
            ) : null,
          )}
          {!Object.values(visible).every(Boolean) ? (
            <Text
              onPress={restore}
              className="text-fg-brand underline text-md"
            >
              Restore all
            </Text>
          ) : null}
        </Section>
      </ScrollView>
    </SafeArea>
  )
}
