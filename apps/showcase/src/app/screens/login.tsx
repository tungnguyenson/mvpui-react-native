import { Button, FormField, Input } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { Lock, Mail } from "lucide-react-native"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <View className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Login / Auth", headerShown: true }} />
      <ScrollView
        contentContainerClassName="px-5 py-8 gap-8"
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo + title */}
        <View className="items-center gap-3">
          <View className="w-16 h-16 rounded-2xl bg-primary items-center justify-center">
            <Lock size={28} color="#ffffff" />
          </View>
          <View className="gap-1 items-center">
            <Text className="text-fg text-2xl font-bold">Sign in to Orbit</Text>
            <Text className="text-fg-secondary text-md text-center">
              Welcome back — enter your details below.
            </Text>
          </View>
        </View>

        {/* Form */}
        <View className="gap-4">
          <FormField label="Email">
            <Input
              placeholder="olivia@untitledui.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              iconLeading={Mail}
              value={email}
              onChangeText={setEmail}
            />
          </FormField>

          <FormField label="Password">
            <Input
              placeholder="Enter your password"
              secureTextEntry
              autoComplete="current-password"
              iconLeading={Lock}
              value={password}
              onChangeText={setPassword}
            />
          </FormField>

          <Button onPress={() => {}} size="md">
            Sign in
          </Button>

          <Button color="tertiary" onPress={() => {}}>
            Forgot password?
          </Button>
        </View>

        {/* Divider */}
        <View className="flex-row items-center gap-3">
          <View className="flex-1 h-px bg-border" />
          <Text className="text-fg-tertiary text-sm">or continue with</Text>
          <View className="flex-1 h-px bg-border" />
        </View>

        {/* Social buttons */}
        <View className="gap-3">
          <Button color="secondary" onPress={() => {}}>
            Continue with Google
          </Button>
          <Button color="secondary" onPress={() => {}}>
            Continue with Apple
          </Button>
        </View>

        {/* Sign up nudge */}
        <View className="flex-row items-center justify-center gap-1">
          <Text className="text-fg-secondary text-md">Don't have an account?</Text>
          <Button color="link-color" onPress={() => {}}>
            Sign up
          </Button>
        </View>
      </ScrollView>
    </View>
  )
}
