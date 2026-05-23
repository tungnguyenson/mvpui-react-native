import { cn } from "@/lib/utils"

export interface PropDef {
  name: string
  type: string
  default?: string
  required?: boolean
  description: string
}

interface PropsTableProps {
  props: PropDef[]
  className?: string
}

export function PropsTable({ props, className }: PropsTableProps) {
  return (
    <div className={cn("w-full overflow-x-auto rounded-xl border border-border", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-bg-secondary">
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-fg-tertiary">
              Prop
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-fg-tertiary">
              Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-fg-tertiary">
              Default
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-fg-tertiary hidden md:table-cell">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-bg">
          {props.map((prop) => (
            <tr key={prop.name} className="hover:bg-bg-secondary transition-colors">
              <td className="px-4 py-3 align-top">
                <div className="flex items-center gap-1.5">
                  <code className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-xs text-fg-brand">
                    {prop.name}
                  </code>
                  {prop.required && (
                    <span className="text-[10px] font-medium text-error-600 bg-error-50 rounded-full px-1.5 py-0.5">
                      required
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 align-top">
                <code className="text-xs text-fg-secondary font-mono">{prop.type}</code>
              </td>
              <td className="px-4 py-3 align-top">
                {prop.default !== undefined ? (
                  <code className="text-xs text-fg-tertiary font-mono">{prop.default}</code>
                ) : (
                  <span className="text-xs text-fg-quaternary">—</span>
                )}
              </td>
              <td className="px-4 py-3 align-top hidden md:table-cell">
                <p className="text-xs text-fg-secondary leading-relaxed">{prop.description}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
