import { Tabs, TabsContent, TabsList, TabsTrigger } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      <View className="gap-3">{children}</View>
    </View>
  )
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <View className="rounded-lg border border-border-secondary bg-bg-secondary p-4">
      <Text className="text-fg-secondary text-md">{children}</Text>
    </View>
  )
}

export default function TabsShowcase() {
  const [underline, setUnderline] = useState("overview")
  const [buttonGray, setButtonGray] = useState("invoices")
  const [buttonBorder, setButtonBorder] = useState("design")
  const [scrollable, setScrollable] = useState("inbox")
  const [fullWidth, setFullWidth] = useState("monthly")

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Tabs", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Variant: underline (default)">
          <Tabs value={underline} onValueChange={setUnderline}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Body>Overview tab body.</Body>
            </TabsContent>
            <TabsContent value="activity">
              <Body>Recent activity.</Body>
            </TabsContent>
            <TabsContent value="settings">
              <Body>Settings panel.</Body>
            </TabsContent>
          </Tabs>
        </Section>

        <Section title="Variant: button-gray">
          <Tabs value={buttonGray} onValueChange={setButtonGray} variant="button-gray">
            <TabsList>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
            </TabsList>
            <TabsContent value="invoices">
              <Body>Outstanding invoices.</Body>
            </TabsContent>
            <TabsContent value="customers">
              <Body>Customer directory.</Body>
            </TabsContent>
            <TabsContent value="products">
              <Body>Product catalog.</Body>
            </TabsContent>
          </Tabs>
        </Section>

        <Section title="Variant: button-border">
          <Tabs value={buttonBorder} onValueChange={setButtonBorder} variant="button-border">
            <TabsList>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="dev">Dev</TabsTrigger>
              <TabsTrigger value="ops">Ops</TabsTrigger>
            </TabsList>
            <TabsContent value="design">
              <Body>Design backlog.</Body>
            </TabsContent>
            <TabsContent value="dev">
              <Body>Development sprint.</Body>
            </TabsContent>
            <TabsContent value="ops">
              <Body>Operations queue.</Body>
            </TabsContent>
          </Tabs>
        </Section>

        <Section title="With badge counts">
          <Tabs value={scrollable} onValueChange={setScrollable}>
            <TabsList>
              <TabsTrigger value="inbox" badgeCount={12}>Inbox</TabsTrigger>
              <TabsTrigger value="drafts" badgeCount={3}>Drafts</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="spam" badgeCount={147}>Spam</TabsTrigger>
              <TabsTrigger value="trash">Trash</TabsTrigger>
              <TabsTrigger value="archive">Archive</TabsTrigger>
              <TabsTrigger value="snoozed" badgeCount={5}>Snoozed</TabsTrigger>
            </TabsList>
            <TabsContent value={scrollable}>
              <Body>{scrollable} folder body.</Body>
            </TabsContent>
          </Tabs>
        </Section>

        <Section title="fullWidth (no scroll, flex-1 triggers)">
          <Tabs value={fullWidth} onValueChange={setFullWidth} fullWidth>
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
            <TabsContent value={fullWidth}>
              <Body>{fullWidth} stats panel.</Body>
            </TabsContent>
          </Tabs>
        </Section>

        <Section title="Size sm">
          <Tabs value={underline} onValueChange={setUnderline} size="sm">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </Section>

        <Section title="Disabled trigger">
          <Tabs value={underline} onValueChange={setUnderline}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="locked" disabled>Locked</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </Section>
      </ScrollView>
    </SafeAreaView>
  )
}
