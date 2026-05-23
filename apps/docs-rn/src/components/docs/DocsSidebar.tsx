"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { docsSections, componentSections, screenItems, type NavSection } from "@/lib/nav"
import { ThemeToggle } from "./ThemeToggle"

function SidebarLink({ href, name }: { href: string; name: string }) {
  const pathname = usePathname()
  const isActive = pathname === href || (href.includes("#") && pathname === href.split("#")[0])

  return (
    <Link
      href={href}
      className={cn(
        "block rounded-md px-3 py-1.5 text-sm transition-colors",
        isActive
          ? "bg-brand-50 text-fg-brand font-medium"
          : "text-fg-secondary hover:bg-bg-secondary hover:text-fg"
      )}
    >
      {name}
    </Link>
  )
}

function SidebarSection({ section }: { section: NavSection }) {
  const pathname = usePathname()
  const isExpanded = section.items.some(
    (item) => pathname === item.href || pathname.startsWith(item.href)
  )
  const [open, setOpen] = React.useState(isExpanded)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-fg-tertiary hover:text-fg transition-colors">
        {section.title}
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            open ? "rotate-0" : "-rotate-90"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-none">
        <div className="mt-0.5 flex flex-col gap-0.5">
          {section.items.map((item) => (
            <SidebarLink key={item.href} {...item} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-0 hidden lg:flex h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-border bg-bg">
      <div className="flex h-16 shrink-0 items-center gap-2.5 px-5 border-b border-border">
        <Link
          href="/"
          className="text-sm font-semibold text-fg tracking-tight hover:text-fg-brand transition-colors"
        >
          mvp-ui-rn
        </Link>
        <span className="rounded-full bg-brand-100 px-1.5 py-0.5 text-[10px] font-medium text-brand-700">
          docs
        </span>
        <a
          href="https://github.com/tungnguyenson/mvpui-react-native"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-fg-tertiary hover:text-fg transition-colors"
          aria-label="GitHub repository"
        >
          <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
        <ThemeToggle />
      </div>

      <div className="flex flex-col gap-6 overflow-y-auto px-3 py-4">
        {/* Getting Started */}
        <div className="flex flex-col gap-0.5">
          <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-fg-tertiary">
            Getting Started
          </p>
          {docsSections[0].items.map((item) => (
            <SidebarLink key={item.href} {...item} />
          ))}
        </div>

        {/* Components */}
        <div className="flex flex-col gap-1">
          <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-fg-tertiary">
            Components
          </p>
          {componentSections.map((section) => (
            <SidebarSection key={section.title} section={section} />
          ))}
        </div>

        {/* Screens */}
        <div className="flex flex-col gap-0.5">
          <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-fg-tertiary">
            Screens
          </p>
          {screenItems.map((item) => (
            <SidebarLink key={item.href} {...item} />
          ))}
        </div>
      </div>
    </aside>
  )
}
