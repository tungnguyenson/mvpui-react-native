import { SafeArea, Stepper } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      <View className="gap-3">{children}</View>
    </View>
  )
}

function Row({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <View className="flex-row items-center justify-between gap-4">
      <Text className="text-fg-secondary text-md flex-1">{label}</Text>
      {children}
    </View>
  )
}

export default function StepperShowcase() {
  const [qty, setQty] = useState(1)
  const [smQty, setSmQty] = useState(3)
  const [clampHigh, setClampHigh] = useState(10)
  const [clampLow, setClampLow] = useState(0)
  const [stepBy5, setStepBy5] = useState(15)
  const [holdDemo, setHoldDemo] = useState(50)

  return (
    <SafeArea>
      <Stack.Screen options={{ title: "Stepper", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Default — size md, min 0 max ∞">
          <Row label={`qty = ${qty}`}>
            <Stepper value={qty} onChange={setQty} />
          </Row>
        </Section>

        <Section title="Small — dense rows">
          <Row label={`qty = ${smQty}`}>
            <Stepper value={smQty} onChange={setSmQty} size="sm" />
          </Row>
        </Section>

        <Section title="Clamp at max (10)">
          <Row label={`value = ${clampHigh}`}>
            <Stepper
              value={clampHigh}
              onChange={setClampHigh}
              min={0}
              max={10}
            />
          </Row>
          <Text className="text-fg-tertiary text-sm">
            `+` dims at the ceiling. Hold-to-repeat stops on clamp.
          </Text>
        </Section>

        <Section title="Clamp at min (0)">
          <Row label={`value = ${clampLow}`}>
            <Stepper value={clampLow} onChange={setClampLow} min={0} max={5} />
          </Row>
        </Section>

        <Section title="step=5">
          <Row label={`value = ${stepBy5}`}>
            <Stepper
              value={stepBy5}
              onChange={setStepBy5}
              step={5}
              min={0}
              max={100}
            />
          </Row>
        </Section>

        <Section title="Hold-to-repeat (try press + hold)">
          <Row label={`value = ${holdDemo}`}>
            <Stepper
              value={holdDemo}
              onChange={setHoldDemo}
              min={0}
              max={999}
            />
          </Row>
          <Text className="text-fg-tertiary text-sm">
            500ms delay → 100ms repeat. Release to stop.
          </Text>
        </Section>

        <Section title="Disabled">
          <Row label={`value = ${qty}`}>
            <Stepper value={qty} onChange={setQty} disabled />
          </Row>
        </Section>

        <Section title="Custom format (currency)">
          <Row label={`price`}>
            <Stepper
              value={qty}
              onChange={setQty}
              format={(v) => `$${v.toFixed(2)}`}
              step={1}
              min={0}
              max={99}
            />
          </Row>
        </Section>
      </ScrollView>
    </SafeArea>
  )
}
