import { Card, SafeArea, Skeleton } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { ScrollView, Text, View } from "react-native"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-8">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      <View className="gap-3">{children}</View>
    </View>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View className="gap-2">
      <Text className="text-fg-tertiary text-xs uppercase tracking-wide">{label}</Text>
      <View className="flex-row items-center gap-4">{children}</View>
    </View>
  )
}

export default function SkeletonShowcase() {
  return (
    <SafeArea>
      <Stack.Screen options={{ title: "Skeleton", headerShown: true }} />
      <ScrollView
        contentContainerClassName="px-5 py-6 gap-8"
        contentInsetAdjustmentBehavior="never"
      >
        <Section title="Shapes — rect / circle / text">
          <Row label="rect (width 100%, height 80)">
            <Skeleton width="100%" height={80} />
          </Row>
          <Row label="rect (custom radius)">
            <Skeleton width={120} height={40} rounded={12} />
            <Skeleton width={120} height={40} rounded={2} />
          </Row>
          <Row label="circle (40 / 56 / 80)">
            <Skeleton shape="circle" size={40} />
            <Skeleton shape="circle" size={56} />
            <Skeleton shape="circle" size={80} />
          </Row>
          <Row label="text (single line)">
            <Skeleton shape="text" />
          </Row>
        </Section>

        <Section title="Composed — list item placeholder">
          <Card>
            <View className="p-4 gap-4">
              <View className="flex-row items-center gap-3">
                <Skeleton shape="circle" size={40} />
                <View className="flex-1 gap-2">
                  <Skeleton shape="text" width="60%" />
                  <Skeleton shape="text" width="40%" />
                </View>
              </View>
              <View className="flex-row items-center gap-3">
                <Skeleton shape="circle" size={40} />
                <View className="flex-1 gap-2">
                  <Skeleton shape="text" width="75%" />
                  <Skeleton shape="text" width="50%" />
                </View>
              </View>
              <View className="flex-row items-center gap-3">
                <Skeleton shape="circle" size={40} />
                <View className="flex-1 gap-2">
                  <Skeleton shape="text" width="55%" />
                  <Skeleton shape="text" width="35%" />
                </View>
              </View>
            </View>
          </Card>
        </Section>

        <Section title="Composed — feed card placeholder">
          <Card>
            <View className="p-4 gap-3">
              <Skeleton width="100%" height={180} rounded={10} />
              <Skeleton shape="text" width="80%" />
              <Skeleton shape="text" width="55%" />
              <View className="flex-row items-center gap-3 mt-2">
                <Skeleton shape="circle" size={32} />
                <Skeleton shape="text" width="40%" />
              </View>
            </View>
          </Card>
        </Section>
      </ScrollView>
    </SafeArea>
  )
}
