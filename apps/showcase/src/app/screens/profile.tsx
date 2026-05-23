import {
  Avatar,
  Badge,
  Button,
  EmptyState,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"

const SRC = "https://i.pravatar.cc/200?img=47"

function StatCell({ value, label }: { value: string; label: string }) {
  return (
    <View className="flex-1 items-center gap-0.5">
      <Text className="text-fg text-xl font-bold">{value}</Text>
      <Text className="text-fg-tertiary text-sm">{label}</Text>
    </View>
  )
}

function Divider() {
  return <View className="w-px h-8 bg-border" />
}

export default function ProfileScreen() {
  const [tab, setTab] = useState("posts")

  return (
    <View className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Profile", headerShown: true }} />
      <ScrollView contentContainerClassName="pb-10">
        {/* Hero */}
        <View className="items-center gap-4 px-5 pt-6 pb-4">
          <Avatar src={SRC} alt="Olivia Rhye" size="2xl" border />
          <View className="items-center gap-1">
            <Text className="text-fg text-xl font-bold">Olivia Rhye</Text>
            <Text className="text-fg-secondary text-md">@olivia_rhye</Text>
          </View>
          <Badge color="brand">Pro</Badge>
        </View>

        {/* Stats */}
        <View className="flex-row items-center justify-center px-5 py-4 border-y border-border">
          <StatCell value="248" label="Posts" />
          <Divider />
          <StatCell value="12.4k" label="Followers" />
          <Divider />
          <StatCell value="312" label="Following" />
        </View>

        {/* Edit button */}
        <View className="px-5 pt-4 pb-2">
          <Button color="secondary" onPress={() => {}}>
            Edit Profile
          </Button>
        </View>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mx-5">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-4 px-5">
            <EmptyState
              title="No posts yet"
              description="When Olivia shares something, it'll show up here."
            />
          </TabsContent>

          <TabsContent value="about" className="mt-4 px-5 gap-4">
            <View className="gap-1">
              <Text className="text-fg-tertiary text-sm uppercase tracking-wide">Bio</Text>
              <Text className="text-fg text-md leading-6">
                Product designer at Untitled Inc. Passionate about clean interfaces and
                thoughtful interactions. Based in San Francisco.
              </Text>
            </View>
            <View className="gap-1">
              <Text className="text-fg-tertiary text-sm uppercase tracking-wide">Location</Text>
              <Text className="text-fg text-md">San Francisco, CA</Text>
            </View>
            <View className="gap-1">
              <Text className="text-fg-tertiary text-sm uppercase tracking-wide">Joined</Text>
              <Text className="text-fg text-md">March 2021</Text>
            </View>
          </TabsContent>
        </Tabs>
      </ScrollView>
    </View>
  )
}
