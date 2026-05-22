/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { tokens } from "@mvp-ui-rn/tokens"
import { useCallback, useMemo, useState } from "react"
import {
  Platform,
  RefreshControl,
  type RefreshControlProps,
  useColorScheme,
} from "react-native"
import type { ReactElement } from "react"

/* ==========================================================================
   usePullToRefresh — hook + props-bag for any RN scrollable.

   Mobile-native pattern with no web equivalent. RN ships `RefreshControl`
   as a primitive; this hook wraps it so consumers don't have to thread
   `refreshing` state through their component, deal with theme-aware tint
   props, or remember iOS (`tintColor`) vs Android (`colors`) prop names.

   Usage:
       const { refreshing, refreshControl } = usePullToRefresh(async () => {
         await reload()
       })

       return <ScrollView refreshControl={refreshControl}>...</ScrollView>

   - `onRefresh` may return a Promise; `refreshing` flips back to `false`
     when it settles. Sync returns flip on the next tick.
   - Tint flips with `useColorScheme()`.
   - `progressViewOffset` lets you nudge the Android spinner below a
     translucent header.
   ========================================================================== */

export interface UsePullToRefreshOptions {
  /** Light/dark tint override. Defaults to `--color-fg-tertiary`. */
  tintColor?: string
  /** Title rendered below the iOS spinner. */
  title?: string
  /** iOS title color. */
  titleColor?: string
  /** Android progress offset (e.g. height of a translucent header). */
  progressViewOffset?: number
}

export interface UsePullToRefreshResult {
  /** Current refreshing state — drive your own visuals from this if needed. */
  refreshing: boolean
  /** Spread onto `<ScrollView>` / `<FlatList>` / etc. as `refreshControl={...}` */
  refreshControl: ReactElement<RefreshControlProps>
  /** Manually flip the state (rare — prefer letting `onRefresh` settle). */
  setRefreshing: (next: boolean) => void
}

export function usePullToRefresh(
  onRefresh: () => void | Promise<void>,
  options: UsePullToRefreshOptions = {},
): UsePullToRefreshResult {
  const { tintColor, title, titleColor, progressViewOffset } = options
  const scheme = useColorScheme()
  const isDark = scheme === "dark"
  const [refreshing, setRefreshing] = useState(false)

  // Token-aligned default tint. Light: gray-500. Dark: gray-400. Matches
  // the `text-fg-tertiary` semantic alias used by other secondary chrome.
  const resolvedTint =
    tintColor ?? (isDark ? tokens.color.gray["400"] : tokens.color.gray["500"])

  const handle = useCallback(async () => {
    setRefreshing(true)
    try {
      await onRefresh()
    } finally {
      setRefreshing(false)
    }
  }, [onRefresh])

  // Build the RefreshControl element once per scheme/state flip. iOS uses
  // `tintColor` + `titleColor`; Android uses `colors` (array) + a separate
  // `progressBackgroundColor`. Platform.select keeps the API a single tint.
  const refreshControl = useMemo<ReactElement<RefreshControlProps>>(
    () => {
      const platformProps = Platform.select({
        ios: {
          tintColor: resolvedTint,
          titleColor: titleColor ?? resolvedTint,
        },
        default: {
          colors: [resolvedTint],
          progressBackgroundColor: isDark
            ? tokens.color.gray["900"]
            : tokens.color.white,
        },
      })

      return (
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handle}
          title={title}
          progressViewOffset={progressViewOffset}
          {...platformProps}
        />
      )
    },
    [refreshing, handle, resolvedTint, title, titleColor, progressViewOffset, isDark],
  )

  return { refreshing, refreshControl, setRefreshing }
}
