import type { Metadata } from "next"
import { CodeBlock } from "@/components/docs/CodeBlock"

export const metadata: Metadata = { title: "Installation" }

export default function InstallationPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-fg mb-3">Installation</h1>
        <p className="text-lg text-fg-secondary leading-relaxed">
          Set up mvp-ui-rn in a new or existing Expo project.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-2">Prerequisites</h2>
        <p className="text-sm text-fg-secondary mb-4 leading-relaxed">
          You need an Expo project running SDK 56+ with expo-router. If starting fresh:
        </p>
        <CodeBlock
          language="bash"
          code={`npx create-expo-app@latest my-app --template tabs
cd my-app`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-2">1. Install packages</h2>
        <CodeBlock
          language="bash"
          code={`npx expo install \\
  @mvp-ui-rn/ui \\
  @mvp-ui-rn/tokens \\
  nativewind \\
  tailwindcss \\
  @rn-primitives/portal \\
  @rn-primitives/slot \\
  react-native-reanimated \\
  @gorhom/bottom-sheet \\
  lucide-react-native \\
  expo-haptics`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-2">2. Configure Metro</h2>
        <p className="text-sm text-fg-secondary mb-4 leading-relaxed">
          NativeWind v5 integrates via Metro (no Babel plugin needed):
        </p>
        <CodeBlock
          language="tsx"
          code={`// metro.config.js
const { getDefaultConfig } = require("expo/metro-config")
const { withNativewind } = require("nativewind/metro")

const config = getDefaultConfig(__dirname)

module.exports = withNativewind(config, {
  input: "./global.css",
})`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-2">3. Add global CSS</h2>
        <CodeBlock
          language="tsx"
          code={`/* global.css */
@import "@mvp-ui-rn/tokens/global.css";`}
        />
        <p className="mt-3 text-xs text-fg-tertiary leading-relaxed">
          This imports the full token system — color scales, semantic aliases, dark mode overrides,
          and NativeWind utility generation.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-2">4. Wire up your root layout</h2>
        <CodeBlock
          language="tsx"
          code={`// app/_layout.tsx
import "@mvp-ui-rn/tokens/global.css"
import { Stack } from "expo-router"
import { PortalHost } from "@rn-primitives/portal"

export default function RootLayout() {
  return (
    <>
      <Stack />
      <PortalHost />
    </>
  )
}`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-2">5. Add type declarations</h2>
        <CodeBlock
          language="tsx"
          code={`// nativewind-env.d.ts (create at project root)
/// <reference types="nativewind/types" />`}
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-fg mb-4">Verify</h2>
        <CodeBlock
          language="tsx"
          code={`// app/index.tsx
import { View } from "react-native"
import { Button } from "@mvp-ui-rn/ui"

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-bg">
      <Button variant="primary" onPress={() => console.log("works!")}>
        Hello mvp-ui-rn
      </Button>
    </View>
  )
}`}
        />
        <p className="mt-4 text-sm text-fg-secondary leading-relaxed">
          Run <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">npx expo start --ios</code>{" "}
          and you should see a purple primary button on a white background (light) or near-black background (dark).
        </p>
      </section>
    </article>
  )
}
