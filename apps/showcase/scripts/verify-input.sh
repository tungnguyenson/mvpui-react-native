#!/usr/bin/env bash
set -euo pipefail

# Runs the Maestro input-showcase flow twice — once in light appearance,
# once in dark — and renames artifacts so both modes survive in
# .maestro-out/. Driven by the booted iOS simulator + Expo Go.
#
# Why a script (not multi-yaml): Maestro YAML cannot shell out to set the
# simulator appearance. Forcing appearance via `xcrun simctl ui` is more
# reliable than driving an in-app toggle.

REPO_ROOT=$(cd "$(dirname "$0")/../../.." && pwd)
FLOW="$REPO_ROOT/apps/showcase/.maestro/input-showcase.yaml"
OUT="$REPO_ROOT/.maestro-out"
EXPO_GO_ID="host.exp.Exponent"
EXPO_URL="exp://localhost:8081"

mkdir -p "$OUT"

run_mode() {
  local mode="$1"
  echo "==> Setting simulator appearance: $mode"
  xcrun simctl ui booted appearance "$mode"

  echo "==> Restarting Expo Go to pick up the new appearance"
  xcrun simctl terminate booted "$EXPO_GO_ID" >/dev/null 2>&1 || true
  sleep 1
  xcrun simctl openurl booted "$EXPO_URL"

  # Give Expo Go time to relaunch and Metro to hand off the bundle.
  sleep 8

  echo "==> Running Maestro flow ($mode)"
  rm -f "$REPO_ROOT"/0?-*.png
  (cd "$REPO_ROOT" && maestro test "$FLOW")

  echo "==> Renaming artifacts to *-$mode.png"
  for f in "$REPO_ROOT"/0?-*.png; do
    [ -e "$f" ] || continue
    base=$(basename "$f" .png)
    mv "$f" "$OUT/$base-$mode.png"
  done
}

# Wipe prior captures so the diff between runs is clean.
rm -f "$OUT"/0?-*-light.png "$OUT"/0?-*-dark.png "$OUT"/0?-*.png

run_mode "light"
run_mode "dark"

echo ""
echo "==> Captured:"
ls -1 "$OUT"/0?-*-light.png "$OUT"/0?-*-dark.png 2>/dev/null || true
