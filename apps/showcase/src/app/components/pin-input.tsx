import { Button, PinInput, SafeArea } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { useRef, useState } from "react"
import { ScrollView, Text, View } from "react-native"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      <View className="gap-4">{children}</View>
    </View>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <Text className="text-fg-secondary text-sm">{children}</Text>
}

export default function PinInputShowcase() {
  // 6-digit OTP
  const [otp, setOtp] = useState("")
  const otpRef = useRef(null)

  // 4-digit PIN
  const [pin, setPin] = useState("")

  // Invalid state demo
  const [verifyCode, setVerifyCode] = useState("")
  const [isInvalid, setIsInvalid] = useState(false)

  // Secure (masked)
  const [securePin, setSecurePin] = useState("")

  const handleVerify = () => {
    if (verifyCode !== "123456") {
      setIsInvalid(true)
      setVerifyCode("")
    } else {
      setIsInvalid(false)
    }
  }

  return (
    <SafeArea>
      <Stack.Screen options={{ title: "PinInput", headerShown: true }} />
      <ScrollView
        contentContainerClassName="px-5 py-6 gap-8"
        keyboardShouldPersistTaps="handled"
      >
        <Section title="6-digit OTP (default)">
          <Label>Tap cells to focus. Auto-advances on each digit.</Label>
          <PinInput
            value={otp}
            onChangeText={setOtp}
            onComplete={(code) => console.log("OTP complete:", code)}
          />
          <Text className="text-fg-tertiary text-sm">
            Value: <Text className="text-fg font-mono">{otp || "—"}</Text>
          </Text>
        </Section>

        <Section title="4-digit PIN">
          <PinInput
            length={4}
            value={pin}
            onChangeText={setPin}
            onComplete={(code) => console.log("PIN:", code)}
          />
          <Text className="text-fg-tertiary text-sm">
            Value: <Text className="text-fg font-mono">{pin || "—"}</Text>
          </Text>
        </Section>

        <Section title="Invalid state (try code other than 123456)">
          <PinInput
            value={verifyCode}
            onChangeText={(v) => {
              setVerifyCode(v)
              if (isInvalid) setIsInvalid(false)
            }}
            isInvalid={isInvalid}
            hint={isInvalid ? "Incorrect code. Try again." : "Enter the 6-digit code we sent."}
            onComplete={handleVerify}
          />
          <Button
            color={isInvalid ? "primary-destructive" : "secondary"}
            onPress={handleVerify}
          >
            {isInvalid ? "Wrong — tap to retry" : "Verify"}
          </Button>
        </Section>

        <Section title="Secure (masked PIN)">
          <Label>Digits masked with •</Label>
          <PinInput
            length={4}
            value={securePin}
            onChangeText={setSecurePin}
            secureTextEntry
            hint="Enter your 4-digit passcode"
          />
        </Section>

        <Section title="Imperative ref — focus / clear">
          <PinInput
            ref={otpRef}
            value={otp}
            onChangeText={setOtp}
            hint="Controlled via ref below"
          />
          <View className="flex-row gap-3">
            <Button
              color="secondary"
              onPress={() => (otpRef.current as any)?.focus()}
            >
              Focus
            </Button>
            <Button
              color="secondary"
              onPress={() => {
                ;(otpRef.current as any)?.clear()
                setOtp("")
              }}
            >
              Clear
            </Button>
          </View>
        </Section>
      </ScrollView>
    </SafeArea>
  )
}
