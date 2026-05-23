import type { Metadata } from "next"
import { CodeBlock } from "@/components/docs/CodeBlock"

export const metadata: Metadata = { title: "Contributing" }

export default function ContributingPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-fg mb-3">Contributing</h1>
        <p className="text-lg text-fg-secondary leading-relaxed">
          How to add a new component to mvp-ui-rn.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-4">Checklist</h2>
        <div className="space-y-3">
          {[
            "Build component in packages/ui/src/components/<name>.tsx",
            "Export from packages/ui/src/index.ts",
            "Add demo screen at apps/showcase/app/components/<name>.tsx with all variants",
            "Document in packages/skill/components-rn.md (import, variants, anti-patterns)",
            "Verify visually on iOS + Android in apps/showcase",
            "Add changeset: pnpm changeset (minor for new component, patch for fixes)",
          ].map((step, i) => (
            <div key={i} className="flex gap-3 rounded-xl border border-border p-4 bg-bg">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                {i + 1}
              </div>
              <p className="text-sm text-fg-secondary leading-relaxed pt-0.5">
                <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">
                  {step}
                </code>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-2">Component file template</h2>
        <CodeBlock
          language="tsx"
          code={`/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import * as React from "react"
import { Pressable, Text, View } from "react-native"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@mvp-ui-rn/ui/utils"

// 1. Define variants with cva — only semantic color tokens
const myComponentVariants = cva("base-classes-here", {
  variants: {
    variant: {
      primary: "bg-primary",
      secondary: "border border-border bg-bg",
    },
    size: {
      sm: "h-control-sm",
      md: "h-control-md",
      lg: "h-control-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
})

export interface MyComponentProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof myComponentVariants> {
  isDisabled?: boolean
}

// 2. Use forwardRef for components wrapping RN primitives
export const MyComponent = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  MyComponentProps
>(({ className, variant, size, isDisabled, children, ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      disabled={isDisabled}
      className={cn(myComponentVariants({ variant, size }), className)}
      {...props}
    >
      {/* Text MUST be wrapped in <Text> — RN crashes on bare strings */}
      <Text className="text-primary-fg text-md">{children}</Text>
    </Pressable>
  )
})

MyComponent.displayName = "MyComponent"`}
        />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-4">Hard rules</h2>
        <div className="space-y-2">
          {[
            { rule: "Never hardcode color/spacing", note: "Always use tokens" },
            { rule: "Semantic tokens only in component classes", note: "No raw scales (bg-gray-100, text-brand-600)" },
            { rule: "Touch targets ≥ 44pt", note: "Bake into variant defaults — users expect it" },
            { rule: "No :hover states", note: "RN has no hover. Use active: for pressed state" },
            { rule: "Text in <Text>", note: "RN crashes on bare strings inside <View>" },
            { rule: "forwardRef for all primitives", note: "Ref passthrough is expected by consumers" },
            { rule: "Use @rn-primitives/* for complex interactions", note: "Dialog, Popover, Tabs, ContextMenu" },
            { rule: "Icons from lucide-react-native", note: "Not lucide-react — that's the web package" },
          ].map((item) => (
            <div
              key={item.rule}
              className="flex items-start gap-3 rounded-lg border border-border px-4 py-3 bg-bg"
            >
              <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
              <div>
                <span className="text-sm font-medium text-fg">{item.rule}</span>
                <span className="text-sm text-fg-tertiary"> — {item.note}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-fg mb-2">Running the showcase</h2>
        <CodeBlock
          language="bash"
          code={`# From repo root
pnpm showcase:ios      # Start on iOS simulator
pnpm showcase:android  # Start on Android emulator

# Verify a specific component with Maestro
pnpm verify:button`}
        />
      </section>
    </article>
  )
}
