# CLAUDE.md — apps/docs-rn

Documentation website for the mvp-ui-rn React Native component library.
Built with Next.js 15 (App Router) + Tailwind v4 + the same token system as the RN package.

## What this project is

A static docs site. It is **not** a React Native / Expo app.
It imports `@mvp-ui-rn/tokens/global.css` for shared tokens but uses web-standard
Next.js components, not `@mvp-ui-rn/ui`.

## Agent context files to read first

Before writing any code for this project:

1. `../../packages/skill/agent-guide.md` — setup, theming, dark mode, semantic token rules.
   Applies to the token layer this site shares with the RN package.
2. `../../packages/skill/components-rn.md` — per-component API reference.
   Read when writing or updating component documentation pages.
3. `../../docs/component-status.md` — which RN components are ported (✅ / 🚧 / ❌).
   Check before documenting a component to confirm it actually exists.

## Architecture

```
src/
├── app/
│   ├── layout.tsx                    root layout — fonts, ThemeProvider
│   ├── globals.css                   Tailwind entry; imports @mvp-ui-rn/tokens/global.css
│   ├── (main)/
│   │   ├── layout.tsx                sidebar + mobile header shell
│   │   ├── docs/[topic]/page.tsx     prose documentation pages
│   │   ├── components/[slug]/page.tsx  component API pages (data-driven)
│   │   └── screens/page.tsx          screen showcase
├── components/docs/
│   ├── CodeBlock.tsx                 syntax-highlighted code snippet
│   ├── PropsTable.tsx                props reference table
│   ├── ComponentPreview.tsx          screenshot pair (light + dark)
│   ├── RNNotes.tsx                   RN-delta callout list
│   ├── DocsSidebar.tsx               desktop nav sidebar
│   └── MobileHeader.tsx              mobile top nav
└── lib/
    ├── nav.ts                        sidebar navigation structure
    ├── components-data.ts            all component definitions (slug, props, usage)
    └── screens-data.ts               screen showcase data
```

## Adding a docs page

1. Create `src/app/(main)/docs/<topic>/page.tsx`.
2. Add `export const metadata: Metadata = { title: "..." }`.
3. Use the existing article layout — `<article className="mx-auto max-w-3xl px-6 py-12">`.
4. Add entry to `src/lib/nav.ts` under the right `docsSections` item.

Pattern (copy from any existing page under `src/app/(main)/docs/`):

```tsx
import type { Metadata } from "next"
import { CodeBlock } from "@/components/docs/CodeBlock"

export const metadata: Metadata = { title: "My Topic" }

export default function MyTopicPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-fg mb-3">My Topic</h1>
        <p className="text-lg text-fg-secondary leading-relaxed">Description.</p>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-4">Section</h2>
        <CodeBlock language="tsx" code={`...`} />
      </section>
    </article>
  )
}
```

## Adding a component page

Component pages are **data-driven** — all content lives in `src/lib/components-data.ts`.
There is one route: `src/app/(main)/components/[slug]/page.tsx` (do not touch it).

1. Add a `ComponentDef` object to `src/lib/components-data.ts`:

```ts
{
  slug: "my-component",          // URL segment
  name: "MyComponent",           // display name
  category: "Actions",           // matches a componentSections title in nav.ts
  description: "One sentence.",
  importPath: `import { MyComponent } from "@mvp-ui-rn/ui"`,
  usageCode: `...`,              // minimal working snippet
  props: [
    {
      name: "size",
      type: `"sm" | "md" | "lg"`,
      default: `"md"`,
      description: "Height and padding scale.",
    },
  ],
  rnNotes: [
    "No hover: states — use active: instead.",
    "Touch target is ≥ 44pt baked in.",
  ],
}
```

2. Add an entry to `src/lib/nav.ts` under `componentSections` in the matching category.
3. Add screenshots at `public/screenshots/<slug>-light.png` and `<slug>-dark.png`
   (1170 × 2532 @ 3× — iPhone 15 Pro scale). If screenshots don't exist yet, the
   placeholder renders gracefully.

## Styling rules

Uses the same **semantic token aliases** as the RN package. The same dark-safe rules apply:

- **Use**: `bg-bg`, `text-fg`, `text-fg-secondary`, `border-border`, `bg-primary`, etc.
- **Never use**: raw scales like `gray-300`, `brand-600`, `bg-white`, `text-black` in component
  class strings (they won't flip in dark mode).
- Dark mode is driven by the `dark:` Tailwind variant (CSS class `.dark` on `<html>`), toggled
  by `ThemeProvider.tsx`. This differs from the RN side which uses `prefers-color-scheme`.

Prose / article layout conventions (copy from existing pages — do not invent new patterns):

```
article            mx-auto max-w-3xl px-6 py-12
h1                 text-3xl font-bold tracking-tight text-fg mb-3
h2                 text-xl font-semibold text-fg mb-4
h3                 text-sm font-semibold text-fg mb-2
body text          text-sm text-fg-secondary leading-relaxed
caption            text-xs text-fg-tertiary leading-relaxed
inline code        rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand
section spacing    mb-10 (between h2 sections), mb-6 (between sub-sections)
table wrapper      rounded-xl border border-border overflow-hidden
table header row   bg-bg-secondary border-b border-border
table body rows    divide-y divide-border + hover:bg-bg-secondary transition-colors
```

## Key components available

| Component | Import | When to use |
|---|---|---|
| `CodeBlock` | `@/components/docs/CodeBlock` | Any code snippet. Props: `code`, `language`, `showCopy`. |
| `PropsTable` | `@/components/docs/PropsTable` | Props reference inside component pages. |
| `ComponentPreview` | `@/components/docs/ComponentPreview` | Screenshot pair. Data-driven — no manual use needed. |
| `RNNotes` | `@/components/docs/RNNotes` | RN-delta callout list. Accepts `notes: string[]`. |

## Hard rules

- Do not import from `@mvp-ui-rn/ui` — this is a web app; those components are RN-only.
- Do not create new routes under `components/[slug]/` — the single dynamic route handles all.
- All component data goes in `components-data.ts`, not inline in page files.
- Every new component entry in `components-data.ts` must have a matching nav entry in `nav.ts`.
- Do not skip `metadata` exports — Next.js uses them for the page `<title>`.
