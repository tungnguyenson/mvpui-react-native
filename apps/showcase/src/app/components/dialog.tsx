import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  type DialogSize,
} from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const SIZES: DialogSize[] = ["sm", "md", "lg"]

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

export default function DialogShowcase() {
  const [controlledOpen, setControlledOpen] = useState(false)
  const [email, setEmail] = useState("")

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Dialog", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Default — confirm">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This will permanently delete the project and remove all
                  associated data. This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button color="secondary">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button color="primary-destructive">Delete</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        <Section title="Sizes">
          {SIZES.map((size) => (
            <Dialog key={size}>
              <DialogTrigger asChild>
                <Button color="secondary">size={size}</Button>
              </DialogTrigger>
              <DialogContent size={size}>
                <DialogHeader>
                  <DialogTitle>Size {size}</DialogTitle>
                  <DialogDescription>
                    Panel max-width steps: sm 320 · md 384 (default) · lg 448.
                    Body content scrolls when it overflows.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button>Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </Section>

        <Section title="With form body">
          <Dialog>
            <DialogTrigger asChild>
              <Button color="secondary">Invite teammate</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite teammate</DialogTitle>
                <DialogDescription>
                  Send an invite by email. They&apos;ll get instructions to join
                  the workspace.
                </DialogDescription>
              </DialogHeader>
              <DialogBody>
                <Input
                  label="Email"
                  placeholder="you@example.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </DialogBody>
              <DialogFooter>
                <DialogClose asChild>
                  <Button color="secondary">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button>Send invite</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        <Section title="Controlled state">
          <Button color="secondary" onPress={() => setControlledOpen(true)}>
            Open controlled
          </Button>
          <Text className="text-fg-tertiary text-sm">
            isOpen: {controlledOpen ? "true" : "false"}
          </Text>
          <Dialog open={controlledOpen} onOpenChange={setControlledOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Controlled dialog</DialogTitle>
                <DialogDescription>
                  Open state lifted to the parent — useful when the dialog is
                  driven by external events (network success, undo prompt).
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onPress={() => setControlledOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
