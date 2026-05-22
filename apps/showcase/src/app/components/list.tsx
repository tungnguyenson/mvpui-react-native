import {
  Avatar,
  Badge,
  List,
  ListItem,
  ListSection,
  SafeArea,
} from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import {
  Bell,
  CreditCard,
  Globe,
  HelpCircle,
  Lock,
  Mail,
  Shield,
  User,
} from "lucide-react-native"
import { ScrollView, Text, View } from "react-native"

export default function ListShowcase() {
  return (
    <SafeArea>
      <Stack.Screen options={{ title: "List", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-6">
        <Text className="text-fg text-lg font-semibold">Settings</Text>

        <List>
          <ListSection title="Account" footer="Manage your sign-in and identity.">
            <ListItem
              leading={User}
              title="Profile"
              subtitle="Olivia Rhye · olivia@untitledui.com"
              onPress={() => {}}
            />
            <ListItem
              leading={Mail}
              title="Email"
              trailing={
                <Text className="text-fg-tertiary text-md">olivia@untitledui.com</Text>
              }
              onPress={() => {}}
            />
            <ListItem
              leading={Lock}
              title="Password"
              subtitle="Last changed 3 months ago"
              onPress={() => {}}
            />
          </ListSection>

          <ListSection title="Notifications">
            <ListItem
              leading={Bell}
              title="Push notifications"
              trailing={<Badge color="brand" size="sm">3 new</Badge>}
              onPress={() => {}}
            />
            <ListItem
              leading={Mail}
              title="Email digest"
              subtitle="Weekly summary every Monday"
              onPress={() => {}}
            />
          </ListSection>

          <ListSection title="Billing">
            <ListItem
              leading={CreditCard}
              title="Payment method"
              trailing={<Badge color="success" size="sm">Active</Badge>}
              onPress={() => {}}
            />
            <ListItem
              leading={Globe}
              title="Language"
              trailing={
                <Text className="text-fg-tertiary text-md">English (US)</Text>
              }
              onPress={() => {}}
            />
          </ListSection>

          <ListSection title="Support">
            <ListItem
              leading={HelpCircle}
              title="Help center"
              onPress={() => {}}
            />
            <ListItem
              leading={Shield}
              title="Privacy policy"
              onPress={() => {}}
            />
            <ListItem
              title="Sign out"
              onPress={() => {}}
            />
          </ListSection>

          <ListSection title="Team">
            <ListItem
              leading={() => <Avatar size="sm" initials="OR" />}
              title="Olivia Rhye"
              subtitle="Admin"
              chevron={false}
            />
            <ListItem
              leading={() => <Avatar size="sm" initials="LP" status="online" />}
              title="Lana Steiner"
              subtitle="Editor · Online"
              chevron={false}
            />
            <ListItem
              leading={() => <Avatar size="sm" initials="DW" status="offline" />}
              title="Demi Wilkinson"
              subtitle="Viewer"
              chevron={false}
              disabled
            />
          </ListSection>

          <ListSection title="Static (non-pressable)">
            <ListItem title="No onPress" subtitle="View-only row" />
            <ListItem title="With trailing text" trailing={<Text className="text-fg-tertiary text-md">v1.2.3</Text>} />
          </ListSection>
        </List>

        <View className="h-12" />
      </ScrollView>
    </SafeArea>
  )
}
