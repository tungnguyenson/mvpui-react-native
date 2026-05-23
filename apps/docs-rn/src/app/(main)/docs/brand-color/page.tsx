import type { Metadata } from "next"
import { CodeBlock } from "@/components/docs/CodeBlock"
import Image from "next/image"

export const metadata: Metadata = { title: "Brand Color" }

const themes = [
  {
    name: "purple",
    label: "Purple",
    description: "Default. Untitled UI's built-in brand color.",
    swatch600: "#7f56d9",
    swatch100: "#f4ebff",
  },
  {
    name: "blue",
    label: "Blue",
    description: "Familiar and trustworthy. Good for SaaS and productivity apps.",
    swatch600: "#2563eb",
    swatch100: "#dbeafe",
  },
  {
    name: "indigo",
    label: "Indigo",
    description: "Between blue and purple. Strong and focused.",
    swatch600: "#4f46e5",
    swatch100: "#e0e7ff",
  },
  {
    name: "violet",
    label: "Violet",
    description: "Creative and expressive. Closer to purple, warmer than indigo.",
    swatch600: "#7c3aed",
    swatch100: "#ede9fe",
  },
  {
    name: "teal",
    label: "Teal",
    description: "Fresh and calm. Health, finance, and wellness apps.",
    swatch600: "#0d9488",
    swatch100: "#ccfbf1",
  },
  {
    name: "green",
    label: "Green",
    description: "Growth and success. Swap --color-success-* to emerald if using green as brand.",
    swatch600: "#16a34a",
    swatch100: "#dcfce7",
  },
  {
    name: "orange",
    label: "Orange",
    description: "Energetic and bold. Swap --color-warning-* to amber if using orange as brand.",
    swatch600: "#ea580c",
    swatch100: "#ffedd5",
  },
  {
    name: "rose",
    label: "Rose",
    description: "Warm and distinctive. Swap --color-error-* to red if using rose as brand.",
    swatch600: "#e11d48",
    swatch100: "#ffe4e6",
  },
]

export default function BrandColorPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-fg mb-3">Brand Color</h1>
        <p className="text-lg text-fg-secondary leading-relaxed">
          Swap the primary brand color palette at setup time with a single import. All semantic
          aliases — buttons, links, badges, focus rings — update automatically.
        </p>
        <div className="rounded-xl overflow-hidden border border-border">
          <Image
            src="/colors.webp"
            alt="Same app rendered in four brand color themes"
            width={1200}
            height={630}
            className="w-full"
            priority
          />
        </div>

      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-4">How it works</h2>
        <div className="space-y-4 text-sm text-fg-secondary leading-relaxed">
          <p>
            Every semantic alias that carries brand color references{" "}
            <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">
              --color-brand-*
            </code>{" "}
            internally. The theme files in{" "}
            <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">
              @mvp-ui-rn/tokens/themes/
            </code>{" "}
            override that raw scale via a Tailwind v4{" "}
            <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">
              @theme
            </code>{" "}
            block. Because the last{" "}
            <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">
              @theme
            </code>{" "}
            declaration wins, importing a theme file after{" "}
            <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">
              global.css
            </code>{" "}
            replaces the brand scale with no other changes required.
          </p>
          <p>
            Dark mode overrides, status colors, tag/badge surfaces, and all other tokens are
            unaffected.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-4">Setup (one time)</h2>
        <p className="text-sm text-fg-secondary mb-3 leading-relaxed">
          NativeWind v5 compiles each CSS file independently — two separate JS imports cannot
          override <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">@theme</code> declarations from another file.
          Chain the imports inside a single CSS file instead, so Tailwind compiles them as one graph.
        </p>
        <p className="text-sm font-semibold text-fg mb-2">
          1. Create <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">apps/my-app/src/global.css</code>
        </p>
        <CodeBlock
          language="css"
          code={`/* apps/my-app/src/global.css */
@import "@mvp-ui-rn/tokens/global.css";
@import "@mvp-ui-rn/tokens/themes/blue.css";   /* ← pick one, or omit for purple */`}
        />
        <p className="text-sm font-semibold text-fg mt-4 mb-2">
          2. Import the CSS entry point and wire <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">brandPrimary</code> into the React Navigation theme
        </p>
        <CodeBlock
          language="tsx"
          code={`// apps/my-app/src/app/_layout.tsx
import "../global.css"                                          // NativeWind utilities
import { applyTheme } from "@mvp-ui-rn/tokens"
import { brand, brandPrimary } from "@mvp-ui-rn/tokens/themes/blue"
applyTheme(brand) // ← module-level, runs before first render

// ...

const base = scheme === "dark" ? DarkTheme : DefaultTheme
const navTheme = { ...base, colors: { ...base.colors, primary: brandPrimary } }`}
        />
        <p className="mt-3 text-xs text-fg-tertiary leading-relaxed">
          <code className="font-mono">applyTheme</code> mutates the JS token store so components
          that use native color props (Switch, Slider, Spinner, FAB, etc.) read the brand values on
          their first render. The CSS import drives NativeWind utility classes.
          <code className="font-mono"> brandPrimary</code> wires the React Navigation native tint
          (tab icons, header back button).
        </p>

        <div className="mt-4 rounded-xl border border-warning-border bg-warning-bg px-4 py-3 text-xs text-warning-fg leading-relaxed">
          <strong>When switching themes:</strong> update <strong>both</strong> files together —
          {" "}<code className="font-mono">global.css</code> (the CSS <code className="font-mono">@import</code>) and
          {" "}<code className="font-mono">_layout.tsx</code> (the <code className="font-mono">applyTheme</code> /
          {" "}<code className="font-mono">brandPrimary</code> imports). Changing only one leaves
          NativeWind utilities and JS native props out of sync.
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-6">Available themes</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {themes.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-border bg-bg-secondary p-4 flex gap-4 items-start"
            >
              <div className="flex flex-col gap-1.5 shrink-0 mt-0.5">
                <div
                  className="w-8 h-8 rounded-lg shadow-sm"
                  style={{ backgroundColor: t.swatch600 }}
                />
                <div
                  className="w-8 h-3 rounded"
                  style={{ backgroundColor: t.swatch100 }}
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-fg">{t.label}</p>
                <p className="text-xs text-fg-tertiary leading-relaxed mt-0.5">{t.description}</p>
                <code className="mt-1.5 block text-xs font-mono text-fg-brand">
                  themes/{t.name}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-4">Affected semantic tokens</h2>
        <p className="text-sm text-fg-secondary mb-3 leading-relaxed">
          These aliases flip with the brand scale. Everything else stays unchanged.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-border">
              {[
                { token: "bg-primary / bg-primary-hover / bg-primary-active", desc: "Button fills, CTA backgrounds" },
                { token: "text-primary-fg", desc: "Text on filled primary surfaces" },
                { token: "text-fg-brand", desc: "Links, active nav items, inline accents" },
                { token: "border-border-brand", desc: "Focus rings, brand-tinted borders" },
                { token: "bg-info-bg / border-info-border / text-info-fg", desc: "Info alert / banner surfaces" },
                { token: "bg-tag-brand-* / text-tag-brand-* / border-tag-brand-*", desc: "Brand-color badge / tag" },
                { token: "border-ring", desc: "Keyboard focus indicator" },
              ].map((row) => (
                <tr key={row.token} className="hover:bg-bg-secondary transition-colors">
                  <td className="px-4 py-2.5 w-80">
                    <code className="text-xs font-mono text-fg-brand">{row.token}</code>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-fg-secondary">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-4">Collision warnings</h2>
        <p className="text-sm text-fg-secondary mb-3 leading-relaxed">
          Some brand colors share hue with a status color. When that happens, add a status-color
          override after the theme import so the semantic roles stay visually distinct.
        </p>
        <div className="space-y-3">
          {[
            {
              theme: "green",
              conflict: "success (also green)",
              fix: 'swap --color-success-* to emerald',
              code: `/* apps/my-app/src/global.css */
@import "@mvp-ui-rn/tokens/global.css";
@import "@mvp-ui-rn/tokens/themes/green.css";

/* override success to emerald so it stays distinct from the green brand */
@theme {
  --color-success-50:  #ecfdf5;
  --color-success-100: #d1fae5;
  --color-success-200: #a7f3d0;
  --color-success-300: #6ee7b7;
  --color-success-400: #34d399;
  --color-success-500: #10b981;
  --color-success-600: #059669;
  --color-success-700: #047857;
  --color-success-800: #065f46;
  --color-success-950: #022c22;
}`,
            },
            {
              theme: "orange",
              conflict: "warning (also orange-adjacent)",
              fix: 'swap --color-warning-* to amber',
              code: `/* apps/my-app/src/global.css */
@import "@mvp-ui-rn/tokens/global.css";
@import "@mvp-ui-rn/tokens/themes/orange.css";

/* override warning to amber so it stays distinct from the orange brand */
@theme {
  --color-warning-50:  #fffbeb;
  --color-warning-100: #fef3c7;
  --color-warning-200: #fde68a;
  --color-warning-300: #fcd34d;
  --color-warning-500: #f59e0b;
  --color-warning-600: #d97706;
  --color-warning-700: #b45309;
  --color-warning-800: #92400e;
  --color-warning-950: #451a03;
}`,
            },
            {
              theme: "rose",
              conflict: "error (also red-adjacent)",
              fix: 'swap --color-error-* to red',
              code: `/* apps/my-app/src/global.css */
@import "@mvp-ui-rn/tokens/global.css";
@import "@mvp-ui-rn/tokens/themes/rose.css";

/* override error to red so it stays distinct from the rose brand */
@theme {
  --color-error-25:  #fffbfa;
  --color-error-50:  #fef2f2;
  --color-error-100: #fee2e2;
  --color-error-200: #fecaca;
  --color-error-300: #fca5a5;
  --color-error-500: #ef4444;
  --color-error-600: #dc2626;
  --color-error-700: #b91c1c;
  --color-error-800: #991b1b;
  --color-error-950: #450a0a;
}`,
            },
          ].map((w) => (
            <div key={w.theme} className="rounded-xl border border-warning-border bg-warning-bg px-4 py-3 space-y-2">
              <p className="text-xs font-semibold text-warning-fg">
                Theme: <code>{w.theme}</code> — conflicts with {w.conflict}
              </p>
              <p className="text-xs text-warning-fg opacity-80">{w.fix}</p>
              <CodeBlock language="tsx" code={w.code} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-fg mb-4">Custom brand color</h2>
        <p className="text-sm text-fg-secondary mb-3 leading-relaxed">
          No preset matches? Define your own brand scale in your app&apos;s CSS file. Use the same
          12-step structure (25 → 950).
        </p>
        <CodeBlock
          language="css"
          code={`/* apps/my-app/src/app/globals.css */
@theme {
  --color-brand-25:  #fdf2ff;
  --color-brand-50:  #fae8ff;
  --color-brand-100: #f5d0fe;
  --color-brand-200: #f0abfc;
  --color-brand-300: #e879f9;
  --color-brand-400: #d946ef;
  --color-brand-500: #c026d3;
  --color-brand-600: #a21caf;
  --color-brand-700: #86198f;
  --color-brand-800: #701a75;
  --color-brand-900: #4a044e;
  --color-brand-950: #2e1065;
}`}
        />
        <p className="mt-3 text-xs text-fg-tertiary leading-relaxed">
          Import this file after{" "}
          <code className="font-mono">global.css</code> in your root layout. All semantic aliases
          pick up the new scale immediately.
        </p>
      </section>
    </article>
  )
}
