"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { docsSections, componentSections, screenItems, type NavSection } from "@/lib/nav"

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
