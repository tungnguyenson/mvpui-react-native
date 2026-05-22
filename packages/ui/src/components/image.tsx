/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and react-native-reusables.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { Image as ExpoImage, type ImageProps as ExpoImageProps } from "expo-image"
import { forwardRef, type ComponentRef } from "react"

import { cn } from "../lib/cn"

/* ==========================================================================
   Image — RN-only general-purpose image. Thin wrapper around `expo-image`
   with sensible defaults for app screens.

   Defaults:
   - `transition={200}` — fade in once loaded; cheaper than animating
     opacity manually.
   - `contentFit="cover"` — most app images crop to fill (avatars,
     covers, product cards). Override via prop.
   - `placeholder` accepts a `blurhash` string; expo-image renders the
     hashed placeholder until the source resolves.

   Pass-through: every other `expo-image` prop forwarded as-is. Caller
   supplies width/height via `className` (Tailwind `w-N h-N`) or `style`.

   Complements `Avatar` (which has cascade fallback + status indicators).
   ========================================================================== */

export interface ImageProps extends Omit<ExpoImageProps, "source"> {
  /** Remote URL, local require, or `expo-image` source object. */
  source: ExpoImageProps["source"]
  /** Blurhash string rendered before the source loads. */
  blurhash?: string
  className?: string
}

export const Image = forwardRef<ComponentRef<typeof ExpoImage>, ImageProps>(
  ({ source, blurhash, className, contentFit = "cover", transition = 200, placeholder, ...props }, ref) => (
    <ExpoImage
      ref={ref}
      source={source}
      contentFit={contentFit}
      transition={transition}
      placeholder={placeholder ?? (blurhash ? { blurhash } : undefined)}
      className={cn(className)}
      {...props}
    />
  ),
)

Image.displayName = "Image"
