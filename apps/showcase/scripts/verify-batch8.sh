#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT=$(cd "$(dirname "$0")/../../.." && pwd)
FLOW="$REPO_ROOT/apps/showcase/.maestro/batch8-showcase.yaml"
OUT="$REPO_ROOT/.maestro-out"
EXPO_GO_ID="host.exp.Exponent"

mkdir -p "$OUT"

run_mode() {
  local mode="$1"
  echo "==> Setting simulator appearance: $mode"
  xcrun simctl ui booted appearance "$mode"
  # Settle so RN Appearance listener flips before Maestro walks the tree.
  sleep 3

  echo "==> Running Maestro flow ($mode)"
  rm -f "$REPO_ROOT"/[01][0-9]-*.png
  (cd "$REPO_ROOT" && maestro test "$FLOW")

  echo "==> Renaming artifacts to *-$mode.png"
  for f in "$REPO_ROOT"/[01][0-9]-*.png; do
    [ -e "$f" ] || continue
    base=$(basename "$f" .png)
    mv "$f" "$OUT/$base-$mode.png"
  done
}

rm -f "$OUT"/[01][0-9]-*-light.png "$OUT"/[01][0-9]-*-dark.png "$OUT"/[01][0-9]-*.png

run_mode "light"
run_mode "dark"

echo ""
echo "==> Captured:"
ls -1 "$OUT"/[01][0-9]-*-light.png "$OUT"/[01][0-9]-*-dark.png 2>/dev/null || true
