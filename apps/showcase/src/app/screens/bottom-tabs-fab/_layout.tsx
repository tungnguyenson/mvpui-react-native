import { Stack, Tabs } from "expo-router"
import { Home, Inbox, Search, User } from "lucide-react-native"

import { FabTabBar } from "@/components/FabTabBar"

export default function BottomTabsFabLayout() {
  return (
    <>
      <Stack.Screen options={{ title: "Bottom Tabs — FAB", headerShown: true }} />
      <Tabs tabBar={(props) => <FabTabBar {...props} />} screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
          }}
        />
        <Tabs.Screen
          name="inbox"
          options={{
            title: "Inbox",
            tabBarIcon: ({ color, size }) => <Inbox color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          }}
        />
      </Tabs>
    </>
  )
}
