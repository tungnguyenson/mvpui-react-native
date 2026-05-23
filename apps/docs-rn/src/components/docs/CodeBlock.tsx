"use client"

import * as React from "react"
import hljs from "highlight.js/lib/core"
import typescript from "highlight.js/lib/languages/typescript"
import xml from "highlight.js/lib/languages/xml"
import bash from "highlight.js/lib/languages/bash"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

hljs.registerLanguage("typescript", typescript)
hljs.registerLanguage("tsx", typescript)
hljs.registerLanguage("xml", xml)
hljs.registerLanguage("bash", bash)

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
  showCopy?: boolean
}

export function CodeBlock({ code, language = "tsx", className, showCopy = true }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const highlighted = React.useMemo(() => {
    try {
      return hljs.highlight(code.trim(), { language }).value
    } catch {
      return code.trim()
    }
  }, [code, language])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("relative rounded-xl border border-border bg-bg-secondary overflow-hidden", className)}>
      {/* Language badge */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <span className="text-xs font-mono text-fg-tertiary">{language}</span>
        {showCopy && (
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy code"}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-fg-tertiary hover:text-fg hover:bg-bg-tertiary transition-colors"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-success-600" />
                <span className="text-success-600">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>

      <pre className="overflow-x-auto p-4 text-sm leading-6 font-mono">
        <code
          className={`hljs language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  )
}
