"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { docsSections, componentSections, screenItems, type NavSection } from "@/lib/nav"
import { ThemeToggle } from "./ThemeToggle"

function DrawerLink({ href, name, onClose }: { href: string; name: string; onClose: () => void }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={onClose}
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

function DrawerSection({ section, onClose }: { section: NavSection; onClose: () => void }) {
  const pathname = usePathname()
  const isExpanded = section.items.some((item) => pathname === item.href)
  const [open, setOpen] = React.useState(isExpanded)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-fg-tertiary hover:text-fg transition-colors">
        {section.title}
        <ChevronDown className={cn("size-3.5 transition-transform", open ? "rotate-0" : "-rotate-90")} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-0.5 flex flex-col gap-0.5">
          {section.items.map((item) => (
            <DrawerLink key={item.href} {...item} onClose={onClose} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export function MobileHeader() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="lg:hidden flex h-16 shrink-0 items-center gap-3 border-b border-border bg-bg px-4">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Open navigation"
            className="flex h-9 w-9 items-center justify-center rounded-md text-fg-tertiary hover:text-fg hover:bg-bg-secondary transition-colors"
          >
            <Menu className="size-5" />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>mvp-ui-rn docs</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-6 px-3 py-4">
            <div className="flex flex-col gap-0.5">
              <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-fg-tertiary">
                Getting Started
              </p>
              {docsSections[0].items.map((item) => (
                <DrawerLink key={item.href} {...item} onClose={() => setOpen(false)} />
              ))}
            </div>

            <div className="flex flex-col gap-1">
              <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-fg-tertiary">
                Components
              </p>
              {componentSections.map((section) => (
                <DrawerSection key={section.title} section={section} onClose={() => setOpen(false)} />
              ))}
            </div>

            <div className="flex flex-col gap-0.5">
              <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-fg-tertiary">
                Screens
              </p>
              {screenItems.map((item) => (
                <DrawerLink key={item.href} {...item} onClose={() => setOpen(false)} />
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Link
        href="/"
        className="text-sm font-semibold text-fg tracking-tight hover:text-fg-brand transition-colors"
      >
        mvp-ui-rn
      </Link>

      <ThemeToggle className="ml-auto" />
    </header>
  )
}
