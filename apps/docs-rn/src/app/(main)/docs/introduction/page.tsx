import type { Metadata } from "next"
import { CodeBlock } from "@/components/docs/CodeBlock"

export const metadata: Metadata = { title: "Introduction" }

export default function IntroductionPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-fg mb-3">Introduction</h1>
        <p className="text-lg text-fg-secondary leading-relaxed">
          mvp-ui-rn is a React Native component library built on Expo, NativeWind v5, and Tailwind
          v4. It ports the{" "}
          <a
            href="https://github.com/untitleduico/react"
            className="text-fg-brand hover:underline"
          >
            Untitled UI
          </a>{" "}
          design system to mobile — same token values, same variant API, same developer experience.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-4">What is mvp-ui-rn?</h2>
        <div className="prose-like space-y-4 text-fg-secondary leading-relaxed">
          <p>
            It is the React Native sibling of{" "}
            <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">
              mvp-ui
            </code>{" "}
            (web). Token values are kept in sync across both repos. Components are re-implemented
            against RN primitives — no web wrappers, no{" "}
            <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">
              react-dom
            </code>{" "}
            dependency.
          </p>
          <p>
            Every component ships with full dark mode support driven by system preference (
            <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">
              prefers-color-scheme
            </code>
            ). Semantic token aliases flip automatically — no manual theme class on an ancestor
            required.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-4">Design principles</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Token-first",
              body: "Every color, radius, and spacing value comes from design tokens. Raw hardcoded values are banned in components.",
            },
            {
              title: "Mobile-native",
              body: "Touch targets ≥ 44pt baked into defaults. No hover states — pressed states use active: variant.",
            },
            {
              title: "Dark-safe",
              body: "Semantic aliases (bg-bg, text-fg, border-border) flip automatically. No raw color scale in component classes.",
            },
            {
              title: "Expo-first",
              body: "Built on Expo SDK 56. Integrates with expo-router, expo-haptics, and the Expo ecosystem.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-bg-secondary p-5"
            >
              <h3 className="text-sm font-semibold text-fg mb-1.5">{item.title}</h3>
              <p className="text-xs text-fg-secondary leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-4">Stack</h2>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-bg-secondary border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-semibold text-fg-tertiary uppercase tracking-wider">
                  Technology
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-fg-tertiary uppercase tracking-wider">
                  Version
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-fg-tertiary uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Expo", "SDK 56", "App framework + build tooling"],
                ["React Native", "0.85", "Core runtime"],
                ["React", "19", "UI layer"],
                ["NativeWind", "v5 preview", "Tailwind → StyleSheet bridge"],
                ["Tailwind", "v4", "Token + utility system"],
                ["@rn-primitives/*", "^1.4", "Accessible headless primitives"],
                ["Reanimated", "v4", "Animations"],
                ["@gorhom/bottom-sheet", "^5", "Bottom sheet primitive"],
                ["cva", "^0.7", "Variant management"],
                ["TypeScript", "6", "Type safety"],
                ["Biome", "^2", "Linting + formatting"],
              ].map(([tech, version, role]) => (
                <tr key={tech} className="hover:bg-bg-secondary transition-colors">
                  <td className="px-4 py-2.5">
                    <code className="text-xs font-mono text-fg-brand">{tech}</code>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-fg-secondary">{version}</td>
                  <td className="px-4 py-2.5 text-xs text-fg-tertiary">{role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-fg mb-4">Quick import</h2>
        <CodeBlock
          language="tsx"
          code={`import { Button, Input, Avatar } from "@mvp-ui-rn/ui"
import { tokens } from "@mvp-ui-rn/tokens"

export function LoginScreen() {
  return (
    <View className="flex-1 px-6 pt-12 bg-bg">
      <Avatar src="https://..." size="xl" />
      <Input label="Email" placeholder="you@example.com" />
      <Button variant="primary" onPress={() => {}}>
        Continue
      </Button>
    </View>
  )
}`}
        />
      </section>
    </article>
  )
}
