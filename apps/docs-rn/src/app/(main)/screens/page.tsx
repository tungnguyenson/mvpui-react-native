import type { Metadata } from "next"
import { screens } from "@/lib/screens-data"
import { PlaceholderFrame, ScreenshotFrame } from "@/components/docs/IPhoneFrame"

export const metadata: Metadata = { title: "Screens" }

export default function ScreensPage() {
  return (
    <article className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-fg mb-3">Screens</h1>
        <p className="text-lg text-fg-secondary leading-relaxed">
          Full-screen composition examples. Each screen demonstrates how mvp-ui-rn components combine
          into real application patterns. Screenshots are captured from the{" "}
          <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">
            apps/showcase
          </code>{" "}
          app running in the iOS simulator.
        </p>
      </header>

      <div className="space-y-16">
        {screens.map((screen) => (
          <section key={screen.slug} id={screen.slug} className="scroll-mt-20">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-fg mb-1.5">{screen.name}</h2>
              <p className="text-sm text-fg-secondary leading-relaxed mb-3">{screen.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {screen.components.map((name) => (
                  <span
                    key={name}
                    className="rounded-full bg-bg-secondary border border-border px-2.5 py-0.5 text-xs font-medium text-fg-secondary"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Side-by-side light + dark mockups */}
            <div className="flex flex-wrap gap-8 justify-start">
              <div className="flex flex-col items-center gap-2">
                <ScreenMockup slug={screen.slug} theme="light" name={screen.name} hasScreenshots={screen.hasScreenshots} />
                <span className="text-xs text-fg-tertiary">Light</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <ScreenMockup slug={screen.slug} theme="dark" name={screen.name} hasScreenshots={screen.hasScreenshots} />
                <span className="text-xs text-fg-tertiary">Dark</span>
              </div>
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}

function ScreenMockup({
  slug,
  theme,
  name,
  hasScreenshots,
}: {
  slug: string
  theme: "light" | "dark"
  name: string
  hasScreenshots?: boolean
}) {
  if (hasScreenshots) {
    const imageBase = process.env.IMAGE_HOST ?? ""
    return (
      <ScreenshotFrame
        src={`${imageBase}/screenshots/${slug}-${theme}.png`}
        alt={`${name} — ${theme} mode`}
      />
    )
  }
  return <PlaceholderFrame label={`${name} — ${theme}`} />
}
