/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { isValidElement, type ComponentType, type ReactNode } from "react"

/**
 * Icon contract (LOCKED — same as mvp-ui web).
 *
 * Either:
 *   - A component that accepts `className` (e.g. `lucide-react-native` icons).
 *   - A pre-rendered React element / node.
 */
export type IconProp = ComponentType<{ className?: string }> | ReactNode

/**
 * Render an `IconProp` into a `ReactNode`.
 *
 * - Functions/component-like values are instantiated with the supplied
 *   className so size/color tokens propagate.
 * - Pre-rendered elements are returned as-is — caller is responsible for
 *   any sizing.
 *
 * `slot` is forwarded as a `data-icon` attribute so downstream styles can
 * target leading vs trailing icons (web compat shim — ignored on RN).
 */
export function renderIcon(
  icon: IconProp,
  slot: "leading" | "trailing",
  className = "size-4",
): ReactNode {
  if (!icon) return null
  if (isValidElement(icon)) return icon
  if (
    typeof icon === "function" ||
    (typeof icon === "object" &&
      icon !== null &&
      "render" in (icon as unknown as Record<string, unknown>))
  ) {
    const Icon = icon as ComponentType<{ className?: string; "data-icon"?: string }>
    return <Icon className={className} data-icon={slot} />
  }
  return icon as ReactNode
}
