import type { Metadata } from "next"
import { CodeBlock } from "@/components/docs/CodeBlock"

export const metadata: Metadata = { title: "Theming" }

export default function ThemingPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-fg mb-3">Theming</h1>
        <p className="text-lg text-fg-secondary leading-relaxed mb-6">
          Design tokens, dark mode, and how to extend or override the default palette.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-4">Token architecture</h2>
        <div className="space-y-4 text-sm text-fg-secondary leading-relaxed">
          <p>
            Tokens live in <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">packages/tokens/src/global.css</code>.
            They are organized in two layers:
          </p>
          <ol className="space-y-3 pl-4 list-decimal">
            <li>
              <strong className="text-fg">Raw scales</strong> — fixed values that never flip:
              {" "}<code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">--color-brand-600</code>,
              {" "}<code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">--color-gray-300</code>, etc.
              Use these only when a value must be mode-independent (e.g., a brand logo background).
            </li>
            <li>
              <strong className="text-fg">Semantic aliases</strong> — flip automatically between light and dark:
              {" "}<code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">bg-bg</code>,
              {" "}<code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">text-fg</code>,
              {" "}<code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">border-border</code>.
              Use these everywhere in components.
            </li>
          </ol>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-4">Semantic token reference</h2>
        <div className="space-y-6">
          {[
            {
              group: "Surfaces",
              tokens: [
                { token: "bg-bg", desc: "Page / screen background" },
                { token: "bg-bg-secondary", desc: "Elevated surface (cards, sidebar)" },
                { token: "bg-bg-tertiary", desc: "Double-elevated surface" },
              ],
            },
            {
              group: "Text",
              tokens: [
                { token: "text-fg", desc: "Primary body copy" },
                { token: "text-fg-secondary", desc: "Supporting text" },
                { token: "text-fg-tertiary", desc: "Captions, labels" },
                { token: "text-fg-brand", desc: "Links, active nav items" },
                { token: "text-fg-disabled", desc: "Disabled state" },
              ],
            },
            {
              group: "Borders",
              tokens: [
                { token: "border-border", desc: "Default dividers and outlines" },
                { token: "border-border-secondary", desc: "Subtle dividers" },
                { token: "border-border-brand", desc: "Focus rings, brand accents" },
              ],
            },
            {
              group: "Actions",
              tokens: [
                { token: "bg-primary", desc: "Primary button / CTA background" },
                { token: "bg-primary-hover", desc: "Pressed/hover primary" },
                { token: "text-primary-fg", desc: "Text on primary fill" },
              ],
            },
          ].map((group) => (
            <div key={group.group}>
              <h3 className="text-sm font-semibold text-fg mb-2">{group.group}</h3>
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-border">
                    {group.tokens.map((t) => (
                      <tr key={t.token} className="hover:bg-bg-secondary transition-colors">
                        <td className="px-4 py-2.5 w-56">
                          <code className="text-xs font-mono text-fg-brand">{t.token}</code>
                        </td>
                        <td className="px-4 py-2.5 text-xs text-fg-secondary">{t.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-2">Dark mode</h2>
        <p className="text-sm text-fg-secondary mb-4 leading-relaxed">
          Dark mode is driven by <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">prefers-color-scheme</code>.
          NativeWind v5 maps the <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">dark:</code> variant to
          the same media query, so semantic-alias utilities flip automatically — no ancestor{" "}
          <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">.dark</code> class needed.
        </p>
        <div className="rounded-xl border border-warning-200 bg-warning-50 px-4 py-3 text-xs text-warning-700 leading-relaxed">
          <strong>Important:</strong> Never use raw color scales in component classes (e.g.,{" "}
          <code>bg-gray-100</code>, <code>text-brand-600</code>). They resolve to fixed values and
          won't flip in dark mode. Use semantic aliases only.
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-2">Brand color</h2>
        <p className="text-sm text-fg-secondary mb-4 leading-relaxed">
          The default brand color is purple. Swap it at app setup time by chaining a theme file
          in your app&apos;s CSS entry point and calling{" "}
          <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">applyTheme</code>{" "}
          before the first render.
        </p>
        <CodeBlock
          language="css"
          code={`/* apps/my-app/src/global.css */
@import "@mvp-ui-rn/tokens/global.css";
@import "@mvp-ui-rn/tokens/themes/teal.css";  /* purple | blue | indigo | violet | teal | green | orange | rose */`}
        />
        <CodeBlock
          language="tsx"
          code={`// apps/my-app/src/app/_layout.tsx
import "../global.css"
import { applyTheme } from "@mvp-ui-rn/tokens"
import { brand, brandPrimary } from "@mvp-ui-rn/tokens/themes/teal"
applyTheme(brand) // runs before first render — updates JS native color props

// ...
const base = scheme === "dark" ? DarkTheme : DefaultTheme
const navTheme = { ...base, colors: { ...base.colors, primary: brandPrimary } }`}
        />
        <p className="mt-3 text-xs text-fg-tertiary leading-relaxed">
          See{" "}
          <a href="/docs/brand-color" className="text-fg-brand hover:underline">Brand Color</a>
          {" "}for available themes, collision warnings (green/orange/rose), and custom brand scales.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-fg mb-2">Extending tokens</h2>
        <p className="text-sm text-fg-secondary mb-4 leading-relaxed">
          Add a new semantic alias in <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">packages/tokens/src/global.css</code>:
        </p>
        <CodeBlock
          language="tsx"
          code={`/* packages/tokens/src/global.css */

@theme {
  /* ... existing tokens ... */

  /* New semantic alias — light default */
  --color-surface-elevated: var(--color-gray-50);
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark override */
    --color-surface-elevated: var(--color-gray-800);
  }
}`}
        />
        <p className="mt-3 text-xs text-fg-tertiary leading-relaxed">
          NativeWind v5 generates <code className="font-mono">bg-surface-elevated</code>,{" "}
          <code className="font-mono">text-surface-elevated</code>, etc. automatically from the{" "}
          <code className="font-mono">--color-</code> prefix.
        </p>
      </section>
    </article>
  )
}
