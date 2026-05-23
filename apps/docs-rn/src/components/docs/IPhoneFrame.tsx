import { cn } from "@/lib/utils"

interface IPhoneFrameProps {
  children: React.ReactNode
  className?: string
}

export function IPhoneFrame({ children, className }: IPhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-[280px] shrink-0",
        className
      )}
    >
      {/* Outer shell */}
      <div className="relative rounded-[2.75rem] bg-gray-900 p-[3px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_25px_60px_-12px_rgba(0,0,0,0.45)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_25px_60px_-12px_rgba(0,0,0,0.8)]">
        {/* Side buttons */}
        <div className="absolute -left-[3px] top-20 h-8 w-[3px] rounded-l-full bg-gray-700" />
        <div className="absolute -left-[3px] top-32 h-12 w-[3px] rounded-l-full bg-gray-700" />
        <div className="absolute -left-[3px] top-48 h-12 w-[3px] rounded-l-full bg-gray-700" />
        <div className="absolute -right-[3px] top-28 h-16 w-[3px] rounded-r-full bg-gray-700" />

        {/* Screen bezel */}
        <div className="overflow-hidden rounded-[2.5rem] bg-black">
          {/* Dynamic Island */}
          <div className="relative flex justify-center pt-3 pb-1 bg-black">
            <div className="h-7 w-24 rounded-full bg-black border border-gray-800 flex items-center justify-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gray-700" />
              <div className="h-2.5 w-2.5 rounded-full bg-gray-700 border border-gray-600" />
            </div>
          </div>

          {/* Screen content */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "390/844" }}>
            {children}
          </div>

          {/* Home indicator */}
          <div className="flex justify-center py-2 bg-black">
            <div className="h-1 w-28 rounded-full bg-gray-600" />
          </div>
        </div>
      </div>
    </div>
  )
}

interface ScreenshotFrameProps {
  src: string
  alt: string
  className?: string
}

export function ScreenshotFrame({ src, alt, className }: ScreenshotFrameProps) {
  return (
    <IPhoneFrame className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </IPhoneFrame>
  )
}

interface PlaceholderFrameProps {
  label: string
  className?: string
}

export function PlaceholderFrame({ label, className }: PlaceholderFrameProps) {
  return (
    <IPhoneFrame className={className}>
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <div className="text-center px-4">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</p>
          <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">screenshot pending</p>
        </div>
      </div>
    </IPhoneFrame>
  )
}
