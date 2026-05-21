/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { cloneElement, isValidElement, type ComponentType, type ReactNode } from "react"

/**
 * Icon contract (LOCKED — same as mvp-ui web).
 *
 * Either:
 *   - A component that accepts `color` + `size` props (e.g. `lucide-react-native`
 *     icons; also matches `react-native-svg` `Svg`-based icon factories).
 *   - A pre-rendered React element / node.
 *
 * Web's `className` channel does not work for RN icon libraries — lucide icons
 * take raw `color` strings, not Tailwind classes. NativeWind v5 cssInterop
 * could be wired but it would have to be registered per icon module. Passing
 * `color` + `size` props directly is the portable path.
 */
export type IconProp = ComponentType<{ color?: string; size?: number }> | ReactNode

export interface RenderIconOptions {
  /** Hex / RN color string passed to lucide as `color`. */
  color?: string
  /** Lucide `size` prop (pixels). */
  size?: number
}

/**
 * Render an `IconProp` into a `ReactNode`, propagating `color` + `size` so
 * lucide-react-native icons inherit the surrounding label's intent.
 *
 * - Functions/component-like values are instantiated with the supplied props.
 * - Pre-rendered elements get `color` / `size` injected via `cloneElement`
 *   unless the caller already set them on the element.
 *
 * `slot` is forwarded as `data-icon` on Component-form icons so debug
 * tooling can target leading vs trailing icons.
 */
export function renderIcon(
  icon: IconProp,
  slot: "leading" | "trailing",
  { color, size }: RenderIconOptions = {},
): ReactNode {
  if (icon === null || icon === undefined || icon === false) return null

  if (isValidElement(icon)) {
    const elProps = icon.props as { color?: string; size?: number }
    return cloneElement(icon, {
      color: elProps.color ?? color,
      size: elProps.size ?? size,
    } as { color?: string; size?: number })
  }

  if (typeof icon === "function" ||
    (typeof icon === "object" &&
      icon !== null &&
      "render" in (icon as unknown as Record<string, unknown>))
  ) {
    const Icon = icon as ComponentType<{
      color?: string
      size?: number
      "data-icon"?: string
    }>
    return <Icon color={color} size={size} data-icon={slot} />
  }

  return icon as ReactNode
}
