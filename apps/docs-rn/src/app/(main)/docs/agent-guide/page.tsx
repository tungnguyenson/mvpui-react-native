import type { Metadata } from "next"
import { CodeBlock } from "@/components/docs/CodeBlock"

export const metadata: Metadata = { title: "AI Coding Assistant Guide" }

const claudeMdContent = `# mvp-ui-rn context

## Library
React Native component library. All components import from \`@mvp-ui-rn/ui\`.
All tokens import from \`@mvp-ui-rn/tokens\`.

## Dark-safe styling (critical)
NEVER use raw color scales in className (gray-300, brand-600, bg-white, text-black).
ALWAYS use semantic aliases that flip automatically with dark mode:
- Surfaces: bg-bg / bg-bg-secondary / bg-bg-tertiary
- Text:     text-fg / text-fg-secondary / text-fg-tertiary / text-fg-brand
- Borders:  border-border / border-border-brand
- Actions:  bg-primary / text-primary-fg

## Touch targets
All interactive components bake in the 44pt HIG minimum. Never shrink below it.

## Text wrapping
Text MUST be inside <Text>. Bare strings inside <View> crash React Native.

## No hover states
Use active: not hover: — RN has no cursor hover.

## Icons
Lucide icons do not accept className for color. Use the Icon wrapper:
  <Icon as={Search} size="md" tint="fg-secondary" />
Or read the scheme manually:
  const scheme = useColorScheme()

## Required root layout providers
GestureHandlerRootView > SafeAreaProvider > BottomSheetModalProvider
  + <PortalHost /> (for Select / Dialog / Popover / Tooltip)
  + <Toaster />   (for toast.* API)
  + <ActionSheetHost /> (for actionSheet.* API)

## Theme color (one-time setup)
Three steps — all must match the same theme slug:

1. apps/my-app/src/global.css (single CSS entry point):
   @import "@mvp-ui-rn/tokens/global.css";
   @import "@mvp-ui-rn/tokens/themes/blue.css";

2. apps/my-app/src/app/_layout.tsx (module level, before any render):
   import "../global.css"
   import { applyTheme } from "@mvp-ui-rn/tokens"
   import { brand, brandPrimary } from "@mvp-ui-rn/tokens/themes/blue"
   applyTheme(brand)

3. navTheme in RootLayout:
   const base = scheme === "dark" ? DarkTheme : DefaultTheme
   const navTheme = { ...base, colors: { ...base.colors, primary: brandPrimary } }

Available themes: purple | blue | indigo | violet | teal | green | orange | rose
When switching: update global.css @import AND _layout.tsx imports to the same slug.

## Metro config (NativeWind v5 — no Babel plugin)
const { withNativewind } = require("nativewind/metro")
module.exports = withNativewind(getDefaultConfig(__dirname))

## Component index (all from @mvp-ui-rn/ui)
Button, Input, InputBase, Textarea, TextareaBase, Select, SelectItem,
Checkbox, CheckboxBase, RadioGroup, RadioGroupItem, Switch, SwitchBase,
Label, HintText, FormField, Avatar, Badge, Icon, Spinner, Skeleton,
Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
Alert, AlertTitle, AlertDescription, EmptyState, List, ListItem, ListSection,
Dialog, DialogContent, DialogTrigger, DialogHeader, DialogBody, DialogFooter,
DialogTitle, DialogDescription, DialogClose, BottomSheet, BottomSheetHeader,
BottomSheetBody, BottomSheetFooter, BottomSheetTitle, BottomSheetDescription,
Popover, PopoverTrigger, PopoverContent, Tooltip, TooltipTrigger, TooltipContent,
Tabs, TabsList, TabsTrigger, TabsContent, SegmentedControl, toast, Toaster,
Header, headerScreenOptions, tabBarScreenOptions, SafeArea, SearchBar,
KeyboardAvoidingScroll, Image, ProgressBar, Stepper, PinInput, usePullToRefresh`

const cursorrules = `# mvp-ui-rn rules

You are working with @mvp-ui-rn/ui, a React Native component library.

DARK MODE: Never use raw Tailwind color scales (gray-300, brand-600, bg-white).
Always use semantic aliases: bg-bg, text-fg, border-border, bg-primary, etc.

TOUCH: All interactive components need ≥ 44pt touch target (baked into defaults).

TEXT: Wrap all strings in <Text>. Bare strings inside <View> crash React Native.

ICONS: Lucide icons don't accept className for color.
  Use: <Icon as={Search} size="md" tint="fg-secondary" />

PROVIDERS required in root layout:
  GestureHandlerRootView > SafeAreaProvider > BottomSheetModalProvider
  <PortalHost /> <Toaster /> <ActionSheetHost />

THEME (one-time setup — all three must match the same slug):
  global.css:    @import "@mvp-ui-rn/tokens/global.css"; @import "@mvp-ui-rn/tokens/themes/blue.css";
  _layout.tsx:   import { applyTheme } from "@mvp-ui-rn/tokens"
                 import { brand, brandPrimary } from "@mvp-ui-rn/tokens/themes/blue"
                 applyTheme(brand)  // module-level, before first render
  navTheme:      { ...base, colors: { ...base.colors, primary: brandPrimary } }
  Available: purple | blue | indigo | violet | teal | green | orange | rose

All components: import { Button, Input, ... } from "@mvp-ui-rn/ui"`

export default function AgentGuidePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-fg mb-3">
          AI Coding Assistant Guide
        </h1>
        <p className="text-lg text-fg-secondary leading-relaxed">
          Add mvp-ui-rn context to your project so any AI coding assistant — Claude Code,
          Cursor, Copilot, Windsurf, or others — can generate correct components, follow
          dark-mode rules, and use the right providers out of the box.
        </p>
      </header>

      {/* Why */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-4">Why this matters</h2>
        <p className="text-sm text-fg-secondary mb-4 leading-relaxed">
          Without context, AI assistants make the same mistakes every time: raw color
          scales that break dark mode, missing provider wrappers, bare strings inside{" "}
          <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">
            {"<View>"}
          </code>{" "}
          that crash the app, Lucide icons passed the wrong color prop. A single context
          file added to your project fixes all of this permanently.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { problem: "Raw color scales", fix: "Semantic aliases in context file" },
            { problem: "Missing providers", fix: "Full layout template included" },
            { problem: "Wrong icon API", fix: "Icon wrapper pattern documented" },
          ].map((item) => (
            <div
              key={item.problem}
              className="rounded-xl border border-border bg-bg-secondary p-4"
            >
              <p className="text-xs font-semibold text-error-fg mb-1">✗ {item.problem}</p>
              <p className="text-xs text-fg-secondary">{item.fix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Claude Code */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-2">Claude Code</h2>
        <p className="text-sm text-fg-secondary mb-4 leading-relaxed">
          Create a{" "}
          <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">
            CLAUDE.md
          </code>{" "}
          file in your project root. Claude Code reads this automatically at the start of
          every session.
        </p>
        <CodeBlock language="bash" code="touch CLAUDE.md" />
        <div className="mt-4">
          <CodeBlock language="markdown" code={claudeMdContent} showCopy />
        </div>
      </section>

      {/* Cursor */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-2">Cursor</h2>
        <p className="text-sm text-fg-secondary mb-4 leading-relaxed">
          Create a{" "}
          <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">
            .cursorrules
          </code>{" "}
          file in your project root, or add the content to{" "}
          <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">
            .cursor/rules/mvp-ui-rn.mdc
          </code>{" "}
          for Cursor v0.45+.
        </p>
        <CodeBlock language="markdown" code={cursorrules} showCopy />
      </section>

      {/* GitHub Copilot */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-2">GitHub Copilot</h2>
        <p className="text-sm text-fg-secondary mb-4 leading-relaxed">
          Create{" "}
          <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">
            .github/copilot-instructions.md
          </code>{" "}
          in your repo. Copilot reads this for workspace-scoped custom instructions.
        </p>
        <CodeBlock
          language="bash"
          code={`mkdir -p .github
# paste the same content as CLAUDE.md into .github/copilot-instructions.md`}
        />
        <p className="mt-3 text-xs text-fg-tertiary leading-relaxed">
          The content is identical to the{" "}
          <code className="font-mono">CLAUDE.md</code> block above — copy it verbatim.
        </p>
      </section>

      {/* Windsurf / others */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-2">Windsurf / other tools</h2>
        <p className="text-sm text-fg-secondary mb-4 leading-relaxed">
          Most AI coding tools that support project-level context files accept plain
          Markdown. Check your tool&apos;s docs for the file name, then paste the same
          content as the{" "}
          <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">
            CLAUDE.md
          </code>{" "}
          block above.
        </p>
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-bg-secondary border-b border-border">
                <th className="px-4 py-2.5 text-left font-semibold text-fg">Tool</th>
                <th className="px-4 py-2.5 text-left font-semibold text-fg">Context file</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { tool: "Claude Code", file: "CLAUDE.md" },
                { tool: "Cursor (legacy)", file: ".cursorrules" },
                { tool: "Cursor v0.45+", file: ".cursor/rules/*.mdc" },
                { tool: "GitHub Copilot", file: ".github/copilot-instructions.md" },
                { tool: "Windsurf", file: ".windsurfrules" },
                { tool: "Zed", file: ".rules" },
                { tool: "Aider", file: "CONVENTIONS.md (--conventions flag)" },
              ].map((row) => (
                <tr key={row.tool} className="hover:bg-bg-secondary transition-colors">
                  <td className="px-4 py-2.5 text-fg-secondary">{row.tool}</td>
                  <td className="px-4 py-2.5">
                    <code className="font-mono text-fg-brand">{row.file}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* What's covered */}
      <section>
        <h2 className="text-xl font-semibold text-fg mb-4">What the context file covers</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              title: "Dark-safe styling",
              body: "Banned raw scales, required semantic aliases — the most common source of dark-mode breakage.",
            },
            {
              title: "Provider tree",
              body: "Full root layout with all required providers: GestureHandlerRootView, BottomSheetModalProvider, PortalHost, Toaster, ActionSheetHost.",
            },
            {
              title: "Icon API",
              body: "Lucide icons need raw color prop, not className. Icon wrapper pattern documented.",
            },
            {
              title: "Theme color",
              body: "Full 3-step setup: CSS @import chain, applyTheme() for JS native props, brandPrimary for React Navigation tint. All 8 themes listed.",
            },
            {
              title: "Touch targets",
              body: "44pt HIG minimum baked into defaults. Do not override sizes below the floor.",
            },
            {
              title: "Component index",
              body: "Every exported component listed so the assistant doesn't hallucinate non-existent imports.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-bg-secondary p-4"
            >
              <h3 className="text-sm font-semibold text-fg mb-1">{item.title}</h3>
              <p className="text-xs text-fg-secondary leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}
