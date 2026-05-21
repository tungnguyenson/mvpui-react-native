import "@mvp-ui-rn/tokens/global.css"

import { useFonts } from "expo-font"
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import { useColorScheme, View } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"

// Hold the splash screen until Inter is loaded so the first paint already
// uses the brand font (avoids the "platform default → Inter" FOUT flash).
SplashScreen.preventAutoHideAsync().catch(() => {
  // No-op on hot reloads where the splash is already gone.
})

export default function RootLayout() {
  const scheme = useColorScheme()
  // Native iOS nav header lives outside the NativeWind tree, so it cannot
  // pick up `bg-bg` via className. Hand it the React Navigation theme that
  // matches the current Appearance so the header bg + label flip in lockstep
  // with our token-driven content area.
  const navTheme = scheme === "dark" ? DarkTheme : DefaultTheme

  // Inter Variable — single TTF covers every weight (RN handles axes natively
  // on iOS 14+ / modern Android). Family name maps 1:1 to the `--font-sans`
  // declaration in `packages/tokens/src/global.css`.
  const [fontsLoaded] = useFonts({
    Inter: require("../../assets/fonts/Inter.ttf"),
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {})
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <SafeAreaProvider>
      <ThemeProvider value={navTheme}>
        <StatusBar style="auto" />
        {/* bg-bg flips via @media (prefers-color-scheme: dark). Stack screens
         * sit on top with transparent content so the token-driven background
         * is what actually paints — Stack's default white screen bg would
         * mask the dark token in dark mode. */}
        <View className="flex-1 bg-bg">
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "transparent" },
            }}
          />
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
