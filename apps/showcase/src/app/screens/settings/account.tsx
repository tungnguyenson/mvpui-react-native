import { Button, FormField, Input } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { useState } from "react"
import { ScrollView, View } from "react-native"

export default function AccountScreen() {
  const [name, setName] = useState("Olivia Rhye")
  const [email, setEmail] = useState("olivia@untitledui.com")

  return (
    <View className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Account", headerShown: true }} />
      <ScrollView
        contentContainerClassName="px-5 py-6 gap-6"
        keyboardShouldPersistTaps="handled"
      >
        <View className="gap-4">
          <FormField label="Full name">
            <Input
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              autoComplete="name"
            />
          </FormField>

          <FormField label="Email">
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </FormField>
        </View>

        <Button onPress={() => {}}>Save Changes</Button>
      </ScrollView>
    </View>
  )
}
