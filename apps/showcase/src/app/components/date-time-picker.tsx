import { DateTimePicker } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

function Section({
  title,
  hint,
  children,
}: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      {hint ? <Text className="text-fg-tertiary text-sm">{hint}</Text> : null}
      <View className="gap-3">{children}</View>
    </View>
  )
}

export default function DateTimePickerShowcase() {
  const [date, setDate] = useState<Date>(new Date())
  const [time, setTime] = useState<Date>(new Date())
  const [dateTime, setDateTime] = useState<Date>(new Date())

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "DateTimePicker", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Date" hint="iOS: compact pill (tap to expand). Android: dialog.">
          <View className="items-start">
            <DateTimePicker mode="date" value={date} onValueChange={setDate} />
          </View>
          <Text className="text-fg-tertiary text-sm">
            Picked: {date.toLocaleDateString()}
          </Text>
        </Section>

        <Section title="Time">
          <View className="items-start">
            <DateTimePicker mode="time" value={time} onValueChange={setTime} />
          </View>
          <Text className="text-fg-tertiary text-sm">
            Picked: {time.toLocaleTimeString()}
          </Text>
        </Section>

        <Section
          title="Datetime"
          hint="Android: chains date → time dialogs in sequence."
        >
          <View className="items-start">
            <DateTimePicker
              mode="datetime"
              value={dateTime}
              onValueChange={setDateTime}
            />
          </View>
          <Text className="text-fg-tertiary text-sm">
            Picked: {dateTime.toLocaleString()}
          </Text>
        </Section>

        <Section
          title="Constrained range"
          hint="Min = today, Max = +30 days. Past dates disabled."
        >
          <View className="items-start">
            <DateTimePicker
              mode="date"
              value={date}
              onValueChange={setDate}
              minimumDate={new Date()}
              maximumDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
            />
          </View>
        </Section>

        <Section title="Disabled">
          <View className="items-start">
            <DateTimePicker
              mode="date"
              value={date}
              onValueChange={setDate}
              disabled
            />
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
