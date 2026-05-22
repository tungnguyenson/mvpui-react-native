import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
  Button,
  List,
  ListItem,
  ListSection,
  type BottomSheetRef,
} from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { Bell, FileText, Star, Trash2 } from "lucide-react-native"
import { useRef, useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

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

export default function BottomSheetShowcase() {
  const defaultRef = useRef<BottomSheetRef>(null)
  const detentRef = useRef<BottomSheetRef>(null)
  const actionRef = useRef<BottomSheetRef>(null)
  const fullRef = useRef<BottomSheetRef>(null)
  const [lastAction, setLastAction] = useState<string | null>(null)

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "BottomSheet", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Default — half + full detents">
          <Button onPress={() => defaultRef.current?.present()}>
            Open default
          </Button>
          <BottomSheet ref={defaultRef}>
            <BottomSheetHeader>
              <BottomSheetTitle>Default sheet</BottomSheetTitle>
              <BottomSheetDescription>
                Snap points 50% + 90%. Drag the handle or pull down to
                dismiss. Tap the backdrop to close.
              </BottomSheetDescription>
            </BottomSheetHeader>
            <BottomSheetBody>
              <Text className="text-fg-secondary text-md">
                Bottom sheets surface transient content without leaving the
                current screen. Use them for filters, action menus, picker
                rows, and contextual forms.
              </Text>
            </BottomSheetBody>
            <BottomSheetFooter>
              <Button
                color="secondary"
                onPress={() => defaultRef.current?.dismiss()}
              >
                Close
              </Button>
              <Button onPress={() => defaultRef.current?.expand()}>
                Expand
              </Button>
            </BottomSheetFooter>
          </BottomSheet>
        </Section>

        <Section title="Multiple detents — 30% / 60% / 95%">
          <Button
            color="secondary"
            onPress={() => detentRef.current?.present()}
          >
            Open multi-detent
          </Button>
          <BottomSheet ref={detentRef} snapPoints={["30%", "60%", "95%"]}>
            <BottomSheetHeader>
              <BottomSheetTitle>Multi-detent sheet</BottomSheetTitle>
              <BottomSheetDescription>
                Drag to snap between three heights. Useful for maps,
                search, anywhere users need progressive disclosure.
              </BottomSheetDescription>
            </BottomSheetHeader>
            <BottomSheetBody>
              <View className="gap-2">
                <Button
                  color="secondary"
                  onPress={() => detentRef.current?.snapToIndex(0)}
                >
                  Snap 30%
                </Button>
                <Button
                  color="secondary"
                  onPress={() => detentRef.current?.snapToIndex(1)}
                >
                  Snap 60%
                </Button>
                <Button
                  color="secondary"
                  onPress={() => detentRef.current?.snapToIndex(2)}
                >
                  Snap 95%
                </Button>
              </View>
            </BottomSheetBody>
          </BottomSheet>
        </Section>

        <Section title="Action sheet — single detent">
          <Button
            color="secondary"
            onPress={() => actionRef.current?.present()}
          >
            Open actions
          </Button>
          {lastAction ? (
            <Text className="text-fg-tertiary text-sm">
              last action: {lastAction}
            </Text>
          ) : null}
          <BottomSheet ref={actionRef} snapPoints={["40%"]}>
            <BottomSheetBody className="pt-2">
              <ListSection>
                <ListItem
                  leading={Star}
                  title="Star"
                  onPress={() => {
                    setLastAction("Star")
                    actionRef.current?.dismiss()
                  }}
                />
                <ListItem
                  leading={Bell}
                  title="Notify me"
                  onPress={() => {
                    setLastAction("Notify me")
                    actionRef.current?.dismiss()
                  }}
                />
                <ListItem
                  leading={FileText}
                  title="Duplicate"
                  onPress={() => {
                    setLastAction("Duplicate")
                    actionRef.current?.dismiss()
                  }}
                />
                <ListItem
                  leading={Trash2}
                  title="Delete"
                  onPress={() => {
                    setLastAction("Delete")
                    actionRef.current?.dismiss()
                  }}
                />
              </ListSection>
            </BottomSheetBody>
          </BottomSheet>
        </Section>

        <Section title="Near-full screen">
          <Button color="secondary" onPress={() => fullRef.current?.present()}>
            Open near-full
          </Button>
          <BottomSheet ref={fullRef} snapPoints={["95%"]} hideHandle={false}>
            <BottomSheetHeader>
              <BottomSheetTitle>Near-full sheet</BottomSheetTitle>
              <BottomSheetDescription>
                Single 95% detent for long forms or rich content that wants
                most of the screen without becoming its own route.
              </BottomSheetDescription>
            </BottomSheetHeader>
            <BottomSheetBody>
              <Text className="text-fg-secondary text-md">
                Drag the handle down or tap the backdrop to dismiss. Use a
                dedicated route via expo-router when the content has its own
                navigation stack (e.g. multi-step flows, settings groups).
              </Text>
            </BottomSheetBody>
          </BottomSheet>
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
