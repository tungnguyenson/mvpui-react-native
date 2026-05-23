"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { PlaceholderFrame, ScreenshotFrame } from "./IPhoneFrame"

interface ComponentPreviewProps {
  slug: string
  lightSrc?: string
  darkSrc?: string
  label: string
  className?: string
}

export function ComponentPreview({
  slug,
  lightSrc,
  darkSrc,
  label,
  className,
}: ComponentPreviewProps) {
  const { resolvedTheme } = useTheme()
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    if (resolvedTheme === "dark" || resolvedTheme === "light") {
      setTheme(resolvedTheme)
    }
  }, [resolvedTheme])

  const hasScreenshots = lightSrc || darkSrc
  const src = theme === "light" ? lightSrc : darkSrc

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Theme toggle */}
      <div className="flex items-center gap-1 self-end rounded-lg border border-border bg-bg-secondary p-0.5">
        <button
          type="button"
          onClick={() => setTheme("light")}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            theme === "light"
              ? "bg-bg text-fg shadow-sm"
              : "text-fg-tertiary hover:text-fg"
          )}
        >
          <Sun className="size-3" />
          Light
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            theme === "dark"
              ? "bg-bg text-fg shadow-sm"
              : "text-fg-tertiary hover:text-fg"
          )}
        >
          <Moon className="size-3" />
          Dark
        </button>
      </div>

      {/* Device frame */}
      <div className="flex justify-center rounded-2xl bg-bg-secondary py-10 px-8 border border-border">
        {hasScreenshots && src ? (
          <ScreenshotFrame
            src={src}
            alt={`${label} — ${theme} mode screenshot`}
          />
        ) : (
          <PlaceholderFrame label={`${label} — ${theme}`} />
        )}
      </div>
    </div>
  )
}
