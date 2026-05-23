import { DocsSidebar } from "@/components/docs/DocsSidebar"
import { MobileHeader } from "@/components/docs/MobileHeader"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-bg">
      <DocsSidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <MobileHeader />
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
