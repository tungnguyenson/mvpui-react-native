import {
  Select,
  SelectItem,
  type SelectOption,
  type SelectSize,
} from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { Building2, Globe, Mail, MapPin, User } from "lucide-react-native"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const SIZES: SelectSize[] = ["sm", "md", "lg"]

const COUNTRIES = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "br", label: "Brazil" },
  { value: "ar", label: "Argentina" },
  { value: "uk", label: "United Kingdom" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "jp", label: "Japan" },
  { value: "kr", label: "South Korea" },
] as const

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

export default function SelectShowcase() {
  const [country, setCountry] = useState<SelectOption>(undefined)
  const [role, setRole] = useState<SelectOption>({
    value: "designer",
    label: "Designer",
  })
  const [city, setCity] = useState<SelectOption>(undefined)

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Select", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Default">
          <Row label="placeholder">
            <Select
              placeholder="Select country"
              value={country}
              onValueChange={setCountry}
            >
              {COUNTRIES.map((c) => (
                <SelectItem key={c.value} value={c.value} label={c.label} />
              ))}
            </Select>
            <Text className="text-fg-tertiary text-sm">
              value: {country?.label ?? "(none)"}
            </Text>
          </Row>
          <Row label="with default value">
            <Select value={role} onValueChange={setRole}>
              <SelectItem value="designer" label="Designer" />
              <SelectItem value="engineer" label="Engineer" />
              <SelectItem value="manager" label="Manager" />
              <SelectItem value="researcher" label="Researcher" />
            </Select>
            <Text className="text-fg-tertiary text-sm">
              value: {role?.label}
            </Text>
          </Row>
        </Section>

        <Section title="Sizes (sm / md default / lg)">
          {SIZES.map((size) => (
            <Row key={size} label={size}>
              <Select size={size} placeholder={`Size ${size}`}>
                <SelectItem value="a" label="Apple" />
                <SelectItem value="b" label="Banana" />
                <SelectItem value="c" label="Cherry" />
              </Select>
            </Row>
          ))}
        </Section>

        <Section title="States">
          <Row label="default">
            <Select placeholder="Choose…">
              <SelectItem value="a" label="Option A" />
              <SelectItem value="b" label="Option B" />
            </Select>
          </Row>
          <Row label="error">
            <Select placeholder="Choose…" isInvalid>
              <SelectItem value="a" label="Option A" />
              <SelectItem value="b" label="Option B" />
            </Select>
          </Row>
          <Row label="disabled">
            <Select placeholder="Choose…" disabled>
              <SelectItem value="a" label="Option A" />
            </Select>
          </Row>
        </Section>

        <Section title="With leading icons">
          <Select
            placeholder="Pick a city"
            value={city}
            onValueChange={setCity}
          >
            <SelectItem value="nyc" label="New York" icon={MapPin} />
            <SelectItem value="sfo" label="San Francisco" icon={MapPin} />
            <SelectItem value="lax" label="Los Angeles" icon={MapPin} />
            <SelectItem
              value="hq"
              label="Brooklyn HQ"
              icon={Building2}
              disabled
            />
          </Select>
        </Section>

        <Section title="Composed — label + hint">
          <Select
            label="Country"
            placeholder="Select country"
            hint="Used for tax + currency defaults."
            value={country}
            onValueChange={setCountry}
            isRequired
          >
            {COUNTRIES.map((c) => (
              <SelectItem key={c.value} value={c.value} label={c.label} icon={Globe} />
            ))}
          </Select>
          <Select
            label="Email frequency"
            placeholder="Choose…"
            hint="You can change this any time in settings."
          >
            <SelectItem value="daily" label="Daily digest" icon={Mail} />
            <SelectItem value="weekly" label="Weekly summary" icon={Mail} />
            <SelectItem value="never" label="Never" icon={Mail} />
          </Select>
          <Select
            label="Role"
            placeholder="Pick a role"
            isInvalid
            hint="Select a role before submitting."
          >
            <SelectItem value="designer" label="Designer" icon={User} />
            <SelectItem value="engineer" label="Engineer" icon={User} />
          </Select>
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
