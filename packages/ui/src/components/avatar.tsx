/**
 * Adapted from Untitled UI React (MIT) via mvp-ui (web)
 * https://github.com/untitleduico/react @ b857a83afef2ca52649d658b26b985eed8c9658b
 * Path: components/avatars/avatar.tsx
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Image as ExpoImage } from "expo-image"
import { User } from "lucide-react-native"
import {
  forwardRef,
  useState,
  type ComponentRef,
  type ReactNode,
} from "react"
import { Text, View, useColorScheme, type ViewProps } from "react-native"

import { cn } from "../lib/cn"

/* ==========================================================================
   Avatar — RN port of mvp-ui (web) Avatar.

   Cascade: `src` (expo-image) → `initials` → `placeholderIcon` → default
   lucide `<User />`. Adds a status dot at bottom-right when `status` is set.

   RN deltas vs. web:
   - Remote `<img>` → `expo-image` from `expo-image`. Supports blurhash
     and cached caching by default.
   - On image load failure → falls back to the next cascade item.
   - Status dot supports 4 colors: online (success), offline (gray),
     away (warning), busy (error). Web shipped only online/offline.
   - Drops `state="verified"|"blocked"`, `count` notification badge, and
     focusable-ring (no RN equivalent). Re-add when consumer needs them.
   ========================================================================== */

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type AvatarStatus = "online" | "offline" | "away" | "busy"

interface AvatarSizeData {
  root: string
  initials: string
  iconPx: number
  indicator: string
}

// Per trap #13: each size step bumps initials font AND placeholder
// icon px alongside the root dimension. Web's avatar.tsx shared
// `text-sm` between `sm` and `md` — on RN that reads as no font step.
const SIZE_DATA: Record<AvatarSize, AvatarSizeData> = {
  xs: { root: "h-6 w-6", initials: "text-xs font-semibold", iconPx: 14, indicator: "h-1.5 w-1.5" },
  sm: { root: "h-8 w-8", initials: "text-sm font-semibold", iconPx: 18, indicator: "h-2 w-2" },
  md: { root: "h-10 w-10", initials: "text-md font-semibold", iconPx: 22, indicator: "h-2.5 w-2.5" },
  lg: { root: "h-12 w-12", initials: "text-lg font-semibold", iconPx: 26, indicator: "h-3 w-3" },
  xl: { root: "h-14 w-14", initials: "text-xl font-semibold", iconPx: 30, indicator: "h-3.5 w-3.5" },
  "2xl": { root: "h-16 w-16", initials: "text-2xl font-semibold", iconPx: 34, indicator: "h-4 w-4" },
}

const STATUS_BG: Record<AvatarStatus, string> = {
  online: "bg-success",
  offline: "bg-fg-quaternary",
  away: "bg-warning",
  busy: "bg-error",
}

export interface AvatarProps extends Omit<ViewProps, "children"> {
  size?: AvatarSize
  /** Remote image URL. Falls back through the cascade on load failure. */
  src?: string | null
  /** Accessibility label / alt text for the image. */
  alt?: string
  /** 1-2 character initials shown when `src` is unavailable. */
  initials?: string
  /** Custom placeholder element shown when src + initials are absent. */
  placeholder?: ReactNode
  /** Status indicator at bottom-right. */
  status?: AvatarStatus
  /** Render with a `border-border` ring around the surface. */
  border?: boolean
  /** Square (rounded) avatar instead of circle. @default false */
  square?: boolean
  className?: string
}

export const Avatar = forwardRef<ComponentRef<typeof View>, AvatarProps>(
  (
    {
      size = "md",
      src,
      alt,
      initials,
      placeholder,
      status,
      border = false,
      square = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [failed, setFailed] = useState(false)
    const scheme = useColorScheme()
    const s = SIZE_DATA[size]
    const showImage = Boolean(src) && !failed
    const radius = square ? "rounded-md" : "rounded-full"
    const placeholderTint =
      scheme === "dark" ? "#a3a3a3" /* gray-400 */ : "#737373" /* gray-500 */

    const inner = (() => {
      if (showImage) {
        return (
          <ExpoImage
            source={src ? { uri: src } : null}
            accessibilityLabel={alt}
            onError={() => setFailed(true)}
            transition={200}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
          />
        )
      }
      if (initials) {
        return (
          <Text className={cn("text-fg-tertiary", s.initials)}>{initials}</Text>
        )
      }
      if (placeholder) {
        return placeholder
      }
      return <User size={s.iconPx} color={placeholderTint} />
    })()

    return (
      <View
        ref={ref}
        accessibilityRole="image"
        accessibilityLabel={alt}
        className={cn(
          "relative shrink-0",
          s.root,
          radius,
          border && "border border-border",
          className,
        )}
        {...props}
      >
        <View
          className={cn(
            "h-full w-full items-center justify-center overflow-hidden bg-bg-tertiary",
            radius,
          )}
        >
          {inner}
        </View>

        {status ? (
          <View
            accessibilityLabel={`Status: ${status}`}
            className={cn(
              "absolute bottom-0 right-0 rounded-full border-2 border-bg",
              s.indicator,
              STATUS_BG[status],
            )}
          />
        ) : null}
      </View>
    )
  },
)

Avatar.displayName = "Avatar"
