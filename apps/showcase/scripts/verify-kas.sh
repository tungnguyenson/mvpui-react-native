#!/usr/bin/env bash
set -euo pipefail

# Focused KAS verify. Runs the kas-only Maestro flow twice (light + dark)
# without re-screenshotting already-verified batch2 pages.

REPO_ROOT=$(cd "$(dirname "$0")/../../.." && pwd)
FLOW="$REPO_ROOT/apps/showcase/.maestro/kas-only.yaml"
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
  sleep 8

  echo "==> Running Maestro flow ($mode)"
  rm -f "$REPO_ROOT"/0[0-9]-*.png
  (cd "$REPO_ROOT" && maestro test "$FLOW")

  echo "==> Renaming artifacts to *-$mode.png"
  for f in "$REPO_ROOT"/0[0-9]-*.png; do
    [ -e "$f" ] || continue
    base=$(basename "$f" .png)
    mv "$f" "$OUT/$base-$mode.png"
  done
}

# Wipe prior KAS-only captures only — leave batch2 light/dark in place.
rm -f "$OUT"/0[0-9]-kas-*-light.png "$OUT"/0[0-9]-kas-*-dark.png

run_mode "light"
run_mode "dark"

echo ""
echo "==> Captured:"
ls -1 "$OUT"/0[0-9]-kas-*-light.png "$OUT"/0[0-9]-kas-*-dark.png 2>/dev/null || true
