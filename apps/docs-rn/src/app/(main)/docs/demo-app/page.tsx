import type { Metadata } from "next"
import { Download, Smartphone, Package } from "lucide-react"

export const metadata: Metadata = { title: "Demo App" }

const APK_URL = "https://files.mvp-ui-rn.imtung.com/apps/showcase.apk"

export default function DemoAppPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-fg mb-3">Demo App</h1>
        <p className="text-lg text-fg-secondary leading-relaxed">
          Download the Showcase app to explore every mvp-ui-rn component live on your Android
          device — all variants, all states, no simulator required.
        </p>
      </header>

      {/* Android download card */}
      <section className="mb-10">
        <div className="rounded-2xl border border-border bg-bg-secondary overflow-hidden">
          <div className="flex items-start gap-5 p-6 border-b border-border">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Smartphone className="size-7 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-fg-tertiary mb-1">
                Android
              </p>
              <h2 className="text-lg font-semibold text-fg mb-0.5">Showcase APK</h2>
              <p className="text-sm text-fg-secondary">
                Sideload directly onto any Android device or emulator running API 24+.
              </p>
            </div>
          </div>

          <div className="p-6">
            <a
              href={APK_URL}
              download
              className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-fg shadow-sm transition-opacity hover:opacity-90 active:opacity-80"
            >
              <Download className="size-4" />
              Download APK
            </a>
            <p className="mt-3 text-xs text-fg-tertiary">
              Enable <span className="font-medium text-fg-secondary">Install unknown apps</span> in
              Settings → Security before installing.
            </p>
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-fg mb-4">What&apos;s inside</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              title: "All components",
              body: "Every ported component with all documented variants and sizes — interactive, not static screenshots.",
            },
            {
              title: "Light + dark mode",
              body: "Follows system preference. Toggle in device settings to see tokens flip.",
            },
            {
              title: "Real interactions",
              body: "Tap, swipe, long-press. Haptics, bottom sheets, toasts — all wired up.",
            },
            {
              title: "Screen templates",
              body: "Full-page layout examples: auth flows, settings, feeds, and more.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-bg p-4">
              <h3 className="text-sm font-semibold text-fg mb-1">{item.title}</h3>
              <p className="text-xs text-fg-secondary leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Install steps */}
      <section>
        <h2 className="text-xl font-semibold text-fg mb-4">Install steps</h2>
        <ol className="flex flex-col gap-3">
          {[
            "Download the APK to your Android device.",
            'Open the downloaded file. If prompted, grant permission to "Install unknown apps" for your browser or file manager.',
            "Tap Install and wait for the package to be verified.",
            "Open Showcase from your app drawer.",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bg-tertiary text-xs font-semibold text-fg-secondary mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-fg-secondary leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-warning-border bg-warning-bg p-4">
          <Package className="size-4 shrink-0 text-warning-fg mt-0.5" />
          <p className="text-sm text-warning-fg leading-relaxed">
            This is a development build signed with a debug key. It is not distributed via the Play
            Store and is intended for evaluation only.
          </p>
        </div>
      </section>
    </article>
  )
}
