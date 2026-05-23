import {
  Avatar,
  Badge,
  Button,
  Input,
  KeyboardAvoidingScroll,
} from "@mvp-ui-rn/ui"
import { Stack, useRouter } from "expo-router"
import { ChevronLeft, Send } from "lucide-react-native"
import { useState } from "react"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

type Message = {
  id: string
  text: string
  sent: boolean
  time: string
}

const INITIAL_MESSAGES: Message[] = [
  { id: "1", text: "Hey! Just wanted to check in on the design review.", sent: false, time: "9:01 AM" },
  { id: "2", text: "Hi! Yes, I've finished the mockups for the new onboarding flow.", sent: true, time: "9:02 AM" },
  { id: "3", text: "Awesome — can you share the Figma link?", sent: false, time: "9:03 AM" },
  { id: "4", text: "Sure, dropping it here now. Let me know if you need anything else.", sent: true, time: "9:03 AM" },
  { id: "5", text: "Got it. One thing — the step indicator on slide 2 feels a bit too small on mobile.", sent: false, time: "9:05 AM" },
  { id: "6", text: "Good catch. I'll bump it to 8px dots and increase the spacing.", sent: true, time: "9:06 AM" },
  { id: "7", text: "Perfect. Also, do you have an estimate on when you can update the prototype?", sent: false, time: "9:08 AM" },
  { id: "8", text: "I should have it ready by EOD today.", sent: true, time: "9:09 AM" },
  { id: "9", text: "Great, I'll plan the team review for tomorrow morning then.", sent: false, time: "9:10 AM" },
  { id: "10", text: "Works for me! Talk soon.", sent: true, time: "9:11 AM" },
]

function Bubble({ message }: { message: Message }) {
  return (
    <View
      className={`max-w-[75%] px-4 py-2.5 rounded-2xl mb-2 ${
        message.sent
          ? "self-end bg-primary rounded-br-sm"
          : "self-start bg-bg-secondary border border-border rounded-bl-sm"
      }`}
    >
      <Text
        className={`text-md ${message.sent ? "text-white" : "text-fg"}`} // dark-ok: white on solid primary bg
      >
        {message.text}
      </Text>
      <Text
        className={`text-xs mt-1 ${
          message.sent ? "text-white/70" : "text-fg-tertiary" // dark-ok: white/70 on solid primary
        }`}
      >
        {message.time}
      </Text>
    </View>
  )
}

export default function ChatScreen() {
  const router = useRouter()
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [draft, setDraft] = useState("")

  const send = () => {
    const text = draft.trim()
    if (!text) return
    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        text,
        sent: true,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ])
    setDraft("")
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Custom header */}
      <View className="flex-row items-center gap-1 px-3 py-3 border-b border-border">
        <Button
          color="tertiary"
          size="sm"
          iconLeading={ChevronLeft}
          onPress={() => router.back()}
          accessibilityLabel="Go back"
        />
        <Avatar
          src="https://i.pravatar.cc/200?img=23"
          alt="Lana Steiner"
          size="md"
          status="online"
        />
        <View className="flex-1 gap-0.5">
          <Text className="text-fg text-md font-semibold">Lana Steiner</Text>
          <Badge color="success" size="sm">Online</Badge>
        </View>
      </View>

      <KeyboardAvoidingScroll contentContainerClassName="flex-grow justify-end">
        {/* Message thread */}
        <View className="px-4 pt-4">
          {messages.map((m) => (
            <Bubble key={m.id} message={m} />
          ))}
        </View>

        {/* Compose bar */}
        <View className="flex-row items-center gap-2 px-4 py-3 border-t border-border">
          <Input
            wrapperClassName="flex-1"
            placeholder="Message…"
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={send}
            returnKeyType="send"
            blurOnSubmit={false}
          />
          <Button
            onPress={send}
            iconLeading={Send}
            accessibilityLabel="Send message"
          />
        </View>
      </KeyboardAvoidingScroll>
    </SafeAreaView>
  )
}
