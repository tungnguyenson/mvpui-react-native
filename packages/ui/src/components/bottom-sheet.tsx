/**
 * Built from Untitled UI Figma reference (PRO license).
 * Structural pattern adapted from shadcn/ui and react-native-reusables,
 * implementation on @gorhom/bottom-sheet.
 *
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { pickShadow, tokens } from "@mvp-ui-rn/tokens"
import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetModal,
  type BottomSheetModalProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet"
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  type ComponentRef,
  type ReactNode,
} from "react"
import { Text, View, useColorScheme } from "react-native"

import { cn } from "../lib/cn"

/* ==========================================================================
   BottomSheet — RN-idiomatic mobile drawer.

   Built on @gorhom/bottom-sheet v5 (BottomSheetModal). Mobile-native pattern
   with no direct web equivalent — closest web analog is Drawer (side panel),
   but mobile users expect bottom-sheet semantics for transient content:
   action menus, picker rows, filter sheets, etc.

   Imperative API:
   - `ref.current.present()` opens to the first snap point
   - `ref.current.dismiss()` closes
   - `ref.current.snapToIndex(i)` moves to snap point at index
   - `ref.current.expand()` opens to the largest snap point
   - `ref.current.close()` alias for dismiss

   Defaults match the Untitled UI / iOS Settings feel:
   - Snap points: ["50%", "90%"] — half-sheet + full-sheet detents
   - Drag handle visible
   - Dim backdrop, tap closes
   - Pull-down past dismiss threshold closes
   - Rounded top corners (2xl), bg-bg surface
   - xl shadow elevation (light + dark token maps)

   Requires `<BottomSheetModalProvider>` wrapping the app at root + a
   `<GestureHandlerRootView>` ancestor.
   ========================================================================== */

export interface BottomSheetRef {
  /** Open the sheet at the first snap point. */
  present: () => void
  /** Close the sheet. */
  dismiss: () => void
  /** Move to a specific snap point by index. */
  snapToIndex: (index: number) => void
  /** Expand to the largest snap point. */
  expand: () => void
  /** Alias for dismiss. */
  close: () => void
}

export interface BottomSheetProps
  extends Omit<
    BottomSheetModalProps,
    "ref" | "snapPoints" | "children" | "backgroundStyle" | "handleIndicatorStyle"
  > {
  /** Snap points as percentages or pixels. @default ["50%", "90%"] */
  snapPoints?: Array<string | number>
  /** Disable the dim backdrop. @default false */
  disableBackdrop?: boolean
  /** Disable pull-down-to-dismiss. @default false */
  disableDismissOnDrag?: boolean
  /** Hide the drag handle. @default false */
  hideHandle?: boolean
  /** Class forwarded to the inner content view. */
  className?: string
  children?: ReactNode
}

const DEFAULT_SNAP_POINTS = ["50%", "90%"] as const

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (
    {
      snapPoints,
      disableBackdrop = false,
      disableDismissOnDrag = false,
      hideHandle = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const modalRef = useRef<BottomSheetModal>(null)
    const scheme = useColorScheme()
    const isDark = scheme === "dark"

    const points = useMemo(
      () => snapPoints ?? DEFAULT_SNAP_POINTS,
      [snapPoints],
    )

    useImperativeHandle(
      ref,
      () => ({
        present: () => modalRef.current?.present(),
        dismiss: () => modalRef.current?.dismiss(),
        snapToIndex: (i: number) => modalRef.current?.snapToIndex(i),
        expand: () => modalRef.current?.expand(),
        close: () => modalRef.current?.dismiss(),
      }),
      [],
    )

    const renderBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.5}
          pressBehavior="close"
        />
      ),
      [],
    )

    // Token-driven shadow + surface. NativeWind v5 maps `dark:` to the same
    // prefers-color-scheme query, but BottomSheetModal's backgroundStyle is a
    // plain RN style prop — resolve raw hex via `useColorScheme()`.
    const surfaceBg = isDark
      ? tokens.color.gray["900"]
      : tokens.color.white
    const handleIndicatorBg = isDark
      ? tokens.color.gray["600"]
      : tokens.color.gray["300"]
    const shadow = pickShadow("xl", isDark ? "dark" : "light")

    return (
      <BottomSheetModal
        ref={modalRef}
        snapPoints={points as Array<string | number>}
        enableDismissOnClose
        enablePanDownToClose={!disableDismissOnDrag}
        handleIndicatorStyle={
          hideHandle
            ? { opacity: 0 }
            : { backgroundColor: handleIndicatorBg, width: 36, height: 4 }
        }
        backgroundStyle={{
          backgroundColor: surfaceBg,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          ...shadow,
        }}
        backdropComponent={disableBackdrop ? undefined : renderBackdrop}
        {...props}
      >
        <BottomSheetView className={cn("flex-1", className)}>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    )
  },
)

BottomSheet.displayName = "BottomSheet"

/* -------------------------------------------------------------------------- */
/*  Section helpers — mirror Dialog sub-components for visual parity           */
/* -------------------------------------------------------------------------- */

export interface BottomSheetSectionProps {
  children?: ReactNode
  className?: string
}

export const BottomSheetHeader = forwardRef<
  ComponentRef<typeof View>,
  BottomSheetSectionProps
>(({ children, className }, ref) => (
  <View ref={ref} className={cn("flex-col gap-1 px-6 pt-4 pb-3", className)}>
    {children}
  </View>
))

BottomSheetHeader.displayName = "BottomSheetHeader"

export const BottomSheetBody = forwardRef<
  ComponentRef<typeof View>,
  BottomSheetSectionProps
>(({ children, className }, ref) => (
  <View ref={ref} className={cn("flex-1 px-6 pb-4", className)}>
    {children}
  </View>
))

BottomSheetBody.displayName = "BottomSheetBody"

export const BottomSheetFooter = forwardRef<
  ComponentRef<typeof View>,
  BottomSheetSectionProps
>(({ children, className }, ref) => (
  <View
    ref={ref}
    className={cn(
      "flex-row items-center justify-end gap-3 border-t border-border px-6 py-4",
      className,
    )}
  >
    {children}
  </View>
))

BottomSheetFooter.displayName = "BottomSheetFooter"

export interface BottomSheetTitleProps {
  children?: ReactNode
  className?: string
}

export const BottomSheetTitle = forwardRef<
  ComponentRef<typeof Text>,
  BottomSheetTitleProps
>(({ children, className }, ref) => (
  <Text ref={ref} className={cn("text-lg font-semibold text-fg", className)}>
    {children}
  </Text>
))

BottomSheetTitle.displayName = "BottomSheetTitle"

export const BottomSheetDescription = forwardRef<
  ComponentRef<typeof Text>,
  BottomSheetTitleProps
>(({ children, className }, ref) => (
  <Text ref={ref} className={cn("text-md text-fg-secondary", className)}>
    {children}
  </Text>
))

BottomSheetDescription.displayName = "BottomSheetDescription"
