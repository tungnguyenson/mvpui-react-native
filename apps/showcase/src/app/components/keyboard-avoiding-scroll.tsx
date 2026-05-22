import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  KeyboardAvoidingScroll,
  SafeArea,
} from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { useState } from "react"
import { Text, View } from "react-native"

export default function KeyboardAvoidingScrollShowcase() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")

  return (
    <SafeArea>
      <Stack.Screen options={{ title: "KAS", headerShown: true }} />
      <KeyboardAvoidingScroll
        contentContainerClassName="px-5 py-6 gap-6"
      >
        <View className="gap-3">
          <Text className="text-fg text-lg font-semibold">Edit profile</Text>
          <Card>
            <CardHeader>
              <CardTitle>Keyboard handling</CardTitle>
              <CardDescription>
                Focus a field near the bottom of the form. iOS shrinks the
                content area to keep the focused field above the keyboard;
                Android lets the OS resize the viewport. Tap outside any
                field to dismiss.
              </CardDescription>
            </CardHeader>
          </Card>
        </View>

        <View className="gap-4">
          <Input
            label="Full name"
            value={name}
            onChangeText={setName}
            placeholder="Jane Cooper"
            autoCapitalize="words"
          />
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            label="Bio"
            value={bio}
            onChangeText={setBio}
            placeholder="Tell us about yourself"
            multiline
            numberOfLines={3}
          />
          <Input
            label="Phone"
            value=""
            onChangeText={() => {}}
            placeholder="(555) 000-0000"
            keyboardType="phone-pad"
          />
          <Input
            label="Website"
            value=""
            onChangeText={() => {}}
            placeholder="yoursite.com"
            keyboardType="url"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View className="gap-2">
          <Button>Save changes</Button>
          <Button color="secondary">Cancel</Button>
        </View>
      </KeyboardAvoidingScroll>
    </SafeArea>
  )
}
