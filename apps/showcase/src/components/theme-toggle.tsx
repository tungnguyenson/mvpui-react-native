import { Button } from "@mvp-ui-rn/ui"
import { Moon, Sun } from "lucide-react-native"
import { Appearance, useColorScheme } from "react-native"

/**
 * Showcase-only utility: app-level light/dark override via RN's `Appearance`
 * API. `null` would return to system pref but we keep the toggle binary for
 * easier Maestro flows — tap = switch, no third state.
 *
 * NativeWind v5 / react-native-css listen to `Appearance` changes and flip
 * `@media (prefers-color-scheme: dark)` CSS vars automatically, so calling
 * `setColorScheme` reflows every utility-driven component in-place.
 */
export function ThemeToggle() {
  const scheme = useColorScheme()
  const isDark = scheme === "dark"
  return (
    <Button
      color="tertiary"
      size="sm"
      iconLeading={isDark ? Sun : Moon}
      onPress={() => Appearance.setColorScheme(isDark ? "light" : "dark")}
      accessibilityLabel={isDark ? "Switch to light mode" : "Switch to dark mode"}
      testID="theme-toggle"
    />
  )
}
