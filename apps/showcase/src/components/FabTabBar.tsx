import { tokens } from "@mvp-ui-rn/tokens"
import { Tabs } from "expo-router"
import { Plus } from "lucide-react-native"
import type { ComponentProps } from "react"
import { Pressable, Text, View, useColorScheme } from "react-native"

type FabTabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>["tabBar"]>>[0]

const FAB_ROUTE = "create"
const TAB_HEIGHT = 64

export function FabTabBar({ state, descriptors, navigation, insets }: FabTabBarProps) {
  const scheme = useColorScheme()
  const isDark = scheme === "dark"

  const bg = isDark ? tokens.color.gray["950"] : "#ffffff"
  const border = isDark ? tokens.color.gray["800"] : tokens.color.gray["200"]
  const activeTint = isDark ? tokens.color.brand["400"] : tokens.color.brand["600"]
  const inactiveTint = isDark ? tokens.color.gray["400"] : tokens.color.gray["500"]

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: bg,
        borderTopColor: border,
        borderTopWidth: 0.5,
        height: TAB_HEIGHT + insets.bottom,
        paddingBottom: insets.bottom,
        alignItems: "center",
      }}
    >
      {state.routes.map((route, index) => {
        const isFab = route.name === FAB_ROUTE
        const isFocused = state.index === index
        const { options } = descriptors[route.key]
        const label = options.title ?? route.name
        const tint = isFocused ? activeTint : inactiveTint

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, undefined)
          }
        }

        if (isFab) {
          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
              accessibilityRole="button"
              accessibilityLabel={label}
              accessibilityState={{ selected: isFocused }}
            >
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: tokens.color.brand["600"],
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: -24,
                  shadowColor: tokens.color.brand["600"],
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.45,
                  shadowRadius: 10,
                  elevation: 8,
                }}
              >
                <Plus size={28} color="#ffffff" strokeWidth={2.5} />
              </View>
            </Pressable>
          )
        }

        const icon = options.tabBarIcon?.({ focused: isFocused, color: tint, size: 22 })

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 3 }}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ selected: isFocused }}
          >
            {icon}
            <Text style={{ color: tint, fontSize: 11, fontWeight: "500" }}>{label}</Text>
          </Pressable>
        )
      })}
    </View>
  )
}
