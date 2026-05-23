import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { components } from "@/lib/components-data"
import { ComponentPreview } from "@/components/docs/ComponentPreview"
import { CodeBlock } from "@/components/docs/CodeBlock"
import { PropsTable } from "@/components/docs/PropsTable"
import { RNNotes } from "@/components/docs/RNNotes"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const component = components.find((c) => c.slug === slug)
  if (!component) return {}
  return { title: component.name }
}

export default async function ComponentPage({ params }: PageProps) {
  const { slug } = await params
  const component = components.find((c) => c.slug === slug)
  if (!component) notFound()

  const imageBase = process.env.IMAGE_HOST ?? ""
  const lightSrc = `${imageBase}/screenshots/${slug}-light.png`
  const darkSrc = `${imageBase}/screenshots/${slug}-dark.png`

  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="rounded-full bg-bg-secondary border border-border px-2.5 py-1 text-xs font-medium text-fg-tertiary">
            {component.category}
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-fg mb-3">{component.name}</h1>
        <p className="text-lg text-fg-secondary leading-relaxed">{component.description}</p>
      </header>

      {/* Preview + Code — two columns on large screens */}
      <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-start">
        <ComponentPreview
          slug={slug}
          lightSrc={lightSrc}
          darkSrc={darkSrc}
          label={component.name}
        />

        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-sm font-semibold text-fg mb-2">Import</h2>
            <CodeBlock
              code={component.importPath}
              language="tsx"
              showCopy
            />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-fg mb-2">Usage</h2>
            <CodeBlock
              code={component.usageCode}
              language="tsx"
              showCopy
            />
          </div>
        </div>
      </div>

      {/* Props */}
      {component.props.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-fg mb-4">Props</h2>
          <PropsTable props={component.props} />
        </section>
      )}

      {/* RN Notes */}
      {component.rnNotes.length > 0 && (
        <section className="mb-10">
          <RNNotes notes={component.rnNotes} />
        </section>
      )}
    </article>
  )
}
