/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and react-native-reusables.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { iconSize as tokenIconSize, tokens } from "@mvp-ui-rn/tokens"
import { useColorScheme } from "react-native"

import { renderIcon, type IconProp } from "../lib/render-icon"

/* ==========================================================================
   Icon — token-aware wrapper around `IconProp`.

   Lucide + react-native-svg icons take raw `color` + `size` props, not
   Tailwind classes. Consumers that want a tint-aware glyph normally have
   to repeat the light/dark hex map locally (Button, Spinner, Input all
   do). `Icon` centralises that: pass a semantic `tint` alias and a
   token-keyed `size` and the wrapper resolves both.

   Mirrors the `IconProp` contract (LOCKED) — accepts any FC<{color, size}>
   or pre-rendered ReactNode. Identical to Spinner's tint API so the two
   compose cleanly inside a button / chip / row.
   ========================================================================== */

type IconSizeKey = "sm" | "md" | "lg" | "xl"

const ICON_PX: Record<IconSizeKey, number> = {
  sm: tokenIconSize.sm,
  md: tokenIconSize.md,
  lg: tokenIconSize.lg,
  xl: tokenIconSize.xl,
}

export type IconTint =
  | "fg"
  | "fg-secondary"
  | "fg-tertiary"
  | "fg-brand"
  | "fg-error"
  | "fg-warning"
  | "fg-success"
  | "primary-fg"

const tintLight: Record<IconTint, string> = {
  fg: tokens.color.gray["900"],
  "fg-secondary": tokens.color.gray["700"],
  "fg-tertiary": tokens.color.gray["500"],
  "fg-brand": tokens.color.brand["600"],
  "fg-error": tokens.color.error["600"],
  "fg-warning": tokens.color.warning["600"],
  "fg-success": tokens.color.success["600"],
  "primary-fg": "#ffffff", // dark-ok: white on brand fill, light + dark
}

const tintDark: Record<IconTint, string> = {
  fg: tokens.color.gray["25"],
  "fg-secondary": tokens.color.gray["300"],
  "fg-tertiary": tokens.color.gray["400"],
  "fg-brand": tokens.color.brand["400"],
  "fg-error": tokens.color.error["500"],
  "fg-warning": tokens.color.warning["500"],
  "fg-success": tokens.color.success["500"],
  "primary-fg": "#ffffff", // dark-ok
}

export interface IconProps {
  /** Lucide component, react-native-svg factory, or pre-rendered node. */
  as: IconProp
  /**
   * Token-keyed size (`sm`=16 / `md`=20 / `lg`=24 / `xl`=28) or raw px
   * number when context dictates a non-standard glyph dimension.
   * @default "md"
   */
  size?: IconSizeKey | number
  /**
   * Semantic tint — flips light/dark via `useColorScheme()`. Ignored
   * when `color` is set.
   * @default "fg"
   */
  tint?: IconTint
  /** Raw color (RN color string). Overrides `tint` when set. */
  color?: string
}

export function Icon({ as, size = "md", tint = "fg", color }: IconProps) {
  const scheme = useColorScheme()
  const isDark = scheme === "dark"
  const resolvedSize = typeof size === "number" ? size : ICON_PX[size]
  const resolvedColor =
    color ?? (isDark ? tintDark[tint] : tintLight[tint])

  return renderIcon(as, "leading", {
    size: resolvedSize,
    color: resolvedColor,
  })
}
