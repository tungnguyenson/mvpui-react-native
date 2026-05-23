#!/usr/bin/env bash
set -euo pipefail
#
# Usage:
#   update-screenshot.sh <slug>    — recapture one component or screen
#   update-screenshot.sh --all     — recapture every component and screen
#
# Preconditions:
#   1. pnpm showcase is running (Metro bundled, Expo Go loaded)
#   2. iOS simulator is booted
#
# How it works:
#   Generates a single Maestro YAML that navigates to each slug via deep link
#   and takes one screenshot named after the slug. Runs twice (light + dark)
#   and writes <slug>-{light,dark}.png directly to apps/docs-rn/public/screenshots/.

REPO_ROOT=$(cd "$(dirname "$0")/../../.." && pwd)
DOCS_SCREENSHOTS="$REPO_ROOT/apps/docs-rn/public/screenshots"
EXPO_GO_ID="host.exp.Exponent"
EXPO_URL="exp://localhost:8081"
TMP_YAML="/tmp/maestro-update-screenshot.yaml"
COMPONENTS_DATA="$REPO_ROOT/apps/docs-rn/src/lib/components-data.ts"
SCREENS_DATA="$REPO_ROOT/apps/docs-rn/src/lib/screens-data.ts"

mkdir -p "$DOCS_SCREENSHOTS"

# --------------------------------------------------------------------------
# Collect slugs
# --------------------------------------------------------------------------
ALL_COMPONENT_SLUGS=$(grep 'slug:' "$COMPONENTS_DATA" | grep -o '"[a-z-]*"' | tr -d '"')
ALL_SCREEN_SLUGS=$(grep 'slug:' "$SCREENS_DATA" | grep -o '"[a-z-]*"' | tr -d '"')

if [[ "${1:-}" == "--all" ]]; then
  COMPONENT_SLUGS="$ALL_COMPONENT_SLUGS"
  SCREEN_SLUGS="$ALL_SCREEN_SLUGS"
elif [[ -n "${1:-}" ]]; then
  SLUG="$1"
  if echo "$ALL_COMPONENT_SLUGS" | grep -qx "$SLUG"; then
    COMPONENT_SLUGS="$SLUG"
    SCREEN_SLUGS=""
  elif echo "$ALL_SCREEN_SLUGS" | grep -qx "$SLUG"; then
    COMPONENT_SLUGS=""
    SCREEN_SLUGS="$SLUG"
  else
    echo "ERROR: '$SLUG' not found in components-data.ts or screens-data.ts"
    echo ""
    echo "Available component slugs:"
    echo "$ALL_COMPONENT_SLUGS" | sed 's/^/  /'
    echo ""
    echo "Available screen slugs:"
    echo "$ALL_SCREEN_SLUGS" | sed 's/^/  /'
    exit 1
  fi
else
  echo "Usage: $0 <slug> | --all"
  exit 1
fi

ALL_SLUGS="$COMPONENT_SLUGS $SCREEN_SLUGS"

# --------------------------------------------------------------------------
# Generate Maestro YAML
# --------------------------------------------------------------------------
generate_yaml() {
  cat > "$TMP_YAML" <<YAML
appId: host.exp.Exponent
---
- launchApp:
    appId: host.exp.Exponent
    stopApp: true
- openLink: "${EXPO_URL}/--/"
- extendedWaitUntil:
    visible: "Application Screens"
    timeout: 60000
YAML

  for slug in $COMPONENT_SLUGS; do
    cat >> "$TMP_YAML" <<YAML
- openLink: "${EXPO_URL}/--/components/${slug}"
- waitForAnimationToEnd
- takeScreenshot: ${slug}
YAML
  done

  for slug in $SCREEN_SLUGS; do
    cat >> "$TMP_YAML" <<YAML
- openLink: "${EXPO_URL}/--/screens/${slug}"
- waitForAnimationToEnd
- takeScreenshot: ${slug}
YAML
  done
}

# --------------------------------------------------------------------------
# Run one appearance mode
# --------------------------------------------------------------------------
run_mode() {
  local mode="$1"
  echo ""
  echo "==> Setting simulator appearance: $mode"
  xcrun simctl ui booted appearance "$mode"

  echo "==> Restarting Expo Go"
  xcrun simctl terminate booted "$EXPO_GO_ID" >/dev/null 2>&1 || true
  sleep 1
  xcrun simctl openurl booted "$EXPO_URL"
  sleep 8

  # Clean any leftover slug PNGs from a previous run
  for slug in $ALL_SLUGS; do
    rm -f "$REPO_ROOT/${slug}.png"
  done

  echo "==> Running Maestro flow ($mode)"
  (cd "$REPO_ROOT" && maestro test "$TMP_YAML")

  echo "==> Copying screenshots ($mode)"
  local ok=0 fail=0
  for slug in $ALL_SLUGS; do
    if [[ -f "$REPO_ROOT/${slug}.png" ]]; then
      mv "$REPO_ROOT/${slug}.png" "$DOCS_SCREENSHOTS/${slug}-${mode}.png"
      echo "    ✓ ${slug}-${mode}.png"
      ((ok++)) || true
    else
      echo "    ✗ MISSING: ${slug}.png"
      ((fail++)) || true
    fi
  done
  echo "    $ok ok, $fail missing"
}

# --------------------------------------------------------------------------
# Main
# --------------------------------------------------------------------------
generate_yaml

COUNT=$(echo "$ALL_SLUGS" | wc -w | tr -d ' ')
echo "==> Updating $COUNT slug(s): $ALL_SLUGS"

run_mode "light"
run_mode "dark"

echo ""
echo "==> Done. Screenshots in $DOCS_SCREENSHOTS"
