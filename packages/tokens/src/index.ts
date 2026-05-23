/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

export { tokens, applyTheme } from "./tokens"
export type { Tokens, BrandColor, GrayColor, BrandScale } from "./tokens"

export { textSize, fontWeight } from "./typography"
export type { TextSizeKey, FontWeightKey } from "./typography"

export {
  touchTarget,
  controlHeight,
  controlPaddingX,
  iconSize,
} from "./size"
export type { TouchTargetKey, ControlSize, IconSizeKey } from "./size"

export { shadow, shadowDark, pickShadow } from "./shadow"
export type { ShadowStyle, ShadowKey } from "./shadow"

export { duration, easing } from "./motion"
export type { DurationKey, EasingKey } from "./motion"
