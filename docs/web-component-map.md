# Web ↔ RN component map

Authoritative cross-reference for the RN port. For every component the web
design system exposes, this map gives:

- **Slug** — URL slug + canonical RN component name. RN port lands at
  `packages/ui/src/components/<slug>.tsx` unless noted.
- **Demo URL** — live reference render on the web docs site
  (https://mvpui.imtung.com). Open at iPhone-15 viewport (393 × 852) for the
  closest visual parity to the RN sim.
- **Web source(s)** — file(s) under
  `/Volumes/DATA/dev/projects/mvp-ui/packages/ui/src/components/`. When a demo
  imports multiple components, the **first** entry is the primary subject and
  the rest are auxiliary surfaces shown in the page.
- **RN status** — ✅ ported · 🚧 in progress · ❌ not started · ⚠️ web-only or
  not planned for RN.

Slugs follow the docs route. Route groups (`(buttons)`, `(components)`,
`(inputs)`) are organizational only — they DO NOT appear in URLs.

The map is generated from `apps/docs/app/components/*/*/page.tsx` import
analysis against `packages/ui/src/index.ts`. Regenerate via the script at the
bottom of this file when the web docs change.

Source-of-truth: `/Volumes/DATA/dev/projects/mvp-ui` (read-only). Re-snapshot
on token / API changes per the sync rule in `CLAUDE.md`.

---

## Buttons

| Slug | Demo URL | Web source | RN |
|---|---|---|---|
| `button` | https://mvpui.imtung.com/components/button | `components/buttons/button.tsx` | ✅ |
| `button-group` | https://mvpui.imtung.com/components/button-group | `components/buttons/button-group.tsx` | ❌ |
| `social-button` | https://mvpui.imtung.com/components/social-button | `components/buttons/social-button.tsx` | ❌ |
| `utility-buttons` | https://mvpui.imtung.com/components/utility-buttons | `components/buttons/button-utility.tsx` + `components/buttons/close-button.tsx` | ❌ |
| `app-store-buttons` | https://mvpui.imtung.com/components/app-store-buttons | `components/buttons/app-store-buttons.tsx` + `app-store-buttons-outline.tsx` + `mac-app-store-buttons.tsx` | ⚠️ — web brand assets only |

## Inputs

| Slug | Demo URL | Web source | RN |
|---|---|---|---|
| `input` | https://mvpui.imtung.com/components/input | `components/inputs/input.tsx` (+ `input-group`, `input-date`, `input-file`, `input-number`, `input-payment`, `input-tags`) | ❌ |
| `label` | https://mvpui.imtung.com/components/label | `components/inputs/label.tsx` | ❌ |
| `hint-text` | https://mvpui.imtung.com/components/hint-text | `components/inputs/hint-text.tsx` | ❌ |
| `checkbox` | https://mvpui.imtung.com/components/checkbox | `components/checkbox.tsx` | ❌ |
| `radio` | https://mvpui.imtung.com/components/radio | `components/radio.tsx` | ❌ |
| `toggle` | https://mvpui.imtung.com/components/toggle | `components/toggle.tsx` | ❌ |
| `textarea` | https://mvpui.imtung.com/components/textarea | `components/textarea.tsx` | ❌ |
| `pin-input` | https://mvpui.imtung.com/components/pin-input | `components/inputs/pin-input.tsx` | ❌ |

## Selection & menus

| Slug | Demo URL | Web source | RN |
|---|---|---|---|
| `select` | https://mvpui.imtung.com/components/select | `components/select.tsx` | ❌ |
| `multi-select` | https://mvpui.imtung.com/components/multi-select | `components/multi-select.tsx` | ❌ |
| `combobox` | https://mvpui.imtung.com/components/combobox | `components/combobox.tsx` (+ `select`) | ❌ |
| `dropdown` | https://mvpui.imtung.com/components/dropdown | `components/dropdown.tsx` | ❌ |
| `tag-select` | https://mvpui.imtung.com/components/tag-select | `components/tag-select.tsx` | ❌ |
| `command-menu` | https://mvpui.imtung.com/components/command-menu | `components/command-menu.tsx` | ❌ |
| `slider` | https://mvpui.imtung.com/components/slider | `components/slider.tsx` | ❌ |

## Date & time

| Slug | Demo URL | Web source | RN |
|---|---|---|---|
| `date-picker` | https://mvpui.imtung.com/components/date-picker | (import not detected via barrel — check page source) | ❌ |
| `date-range-picker` | https://mvpui.imtung.com/components/date-range-picker | `components/date-range-picker.tsx` | ❌ |

## Overlays

| Slug | Demo URL | Web source | RN |
|---|---|---|---|
| `modal` | https://mvpui.imtung.com/components/modal | `components/modal.tsx` | ❌ |
| `drawer` | https://mvpui.imtung.com/components/drawer | `components/drawer.tsx` | ❌ — RN use `@gorhom/bottom-sheet` |
| `tooltip` | https://mvpui.imtung.com/components/tooltip | `components/tooltip.tsx` | ❌ |
| `toast` | https://mvpui.imtung.com/components/toast | `components/toast.tsx` (+ `button`) | ❌ |

## Status / messaging

| Slug | Demo URL | Web source | RN |
|---|---|---|---|
| `alert` | https://mvpui.imtung.com/components/alert | `components/alert.tsx` | ❌ |
| `badge` | https://mvpui.imtung.com/components/badge | `components/badges/badge.tsx` (+ `badge-with-{button,dot,flag,icon,image}`) | ❌ |
| `badge-group` | https://mvpui.imtung.com/components/badge-group | `components/badges/badge-group.tsx` | ❌ |
| `rating-badge` | https://mvpui.imtung.com/components/rating-badge | `components/rating-badge.tsx` | ❌ |
| `rating-stars` | https://mvpui.imtung.com/components/rating-stars | `components/rating-stars.tsx` | ❌ |
| `tags` | https://mvpui.imtung.com/components/tags | `components/tags.tsx` | ❌ |
| `dot` | https://mvpui.imtung.com/components/dot | `components/tags.tsx` (exports `Dot`) | ❌ |
| `loading-indicator` | https://mvpui.imtung.com/components/loading-indicator | `components/loading-indicator.tsx` | ❌ |

## Layout / surfaces

| Slug | Demo URL | Web source | RN |
|---|---|---|---|
| `card` | https://mvpui.imtung.com/components/card | `components/card.tsx` (+ `button`, `badge`) | ❌ |
| `section` | https://mvpui.imtung.com/components/section | `components/section.tsx` (+ `button`, `input`, `label`) | ❌ |
| `section-divider` | https://mvpui.imtung.com/components/section-divider | `components/section-divider.tsx` | ❌ |
| `empty-state` | https://mvpui.imtung.com/components/empty-state | `components/empty-state.tsx` (+ `featured-icon`, `button`) | ❌ |
| `featured-icon` | https://mvpui.imtung.com/components/featured-icon | `components/featured-icon.tsx` | ❌ |
| `metric-card` | https://mvpui.imtung.com/components/metric-card | `components/metric-card.tsx` (+ `dropdown`, `button-utility`) | ❌ |
| `credit-card` | https://mvpui.imtung.com/components/credit-card | `components/credit-card.tsx` | ❌ |
| `iphone-mockup` | https://mvpui.imtung.com/components/iphone-mockup | `components/iphone-mockup.tsx` | ⚠️ — meta on RN |
| `background-pattern` | https://mvpui.imtung.com/components/background-pattern | `components/background-patterns/index.tsx` | ❌ |

## Navigation

| Slug | Demo URL | Web source | RN |
|---|---|---|---|
| `tabs` | https://mvpui.imtung.com/components/tabs | `components/tabs.tsx` | ❌ |
| `breadcrumbs` | https://mvpui.imtung.com/components/breadcrumbs | `components/breadcrumbs.tsx` | ❌ |
| `pagination` | https://mvpui.imtung.com/components/pagination | `components/pagination.tsx` | ❌ |
| `sidebar-nav` | https://mvpui.imtung.com/components/sidebar-nav | `components/sidebar-nav/index.tsx` (+ `simple` / `dual-tier` / `slim` / `collapsible` / `section-dividers` / `sections-subheadings` / `account-card`) | ❌ |

## Disclosure

| Slug | Demo URL | Web source | RN |
|---|---|---|---|
| `accordion` | https://mvpui.imtung.com/components/accordion | `components/accordion.tsx` (+ `badge`) | ❌ |
| `progress` | https://mvpui.imtung.com/components/progress | `components/progress/progress-bar.tsx` (+ `progress-bar-circle`, `progress-bar-half-circle`) | ❌ |
| `progress-circle` | https://mvpui.imtung.com/components/progress-circle | (import not detected via barrel — check page source) | ❌ |

## Data

| Slug | Demo URL | Web source | RN |
|---|---|---|---|
| `table` | https://mvpui.imtung.com/components/table | `components/table.tsx` (+ `badge`, `button`, `dropdown`) | ⚠️ — semantics don't transfer 1:1 |
| `form` | https://mvpui.imtung.com/components/form | `components/form.tsx` | ❌ |
| `carousel` | https://mvpui.imtung.com/components/carousel | `components/carousel.tsx` | ❌ |

## Media & file

| Slug | Demo URL | Web source | RN |
|---|---|---|---|
| `avatar` | https://mvpui.imtung.com/components/avatar | `components/avatars/avatar.tsx` (+ `avatar-add-button`, `avatar-company-icon`, `avatar-count`, `avatar-label-group`, `avatar-profile-photo`) | ❌ |
| `file-upload` | https://mvpui.imtung.com/components/file-upload | `components/file-upload.tsx` | ❌ |
| `file-upload-trigger` | https://mvpui.imtung.com/components/file-upload-trigger | `components/file-upload-trigger.tsx` | ❌ |
| `qr-code` | https://mvpui.imtung.com/components/qr-code | `components/qr-code.tsx` | ❌ |

## Charts

| Slug | Demo URL | Web source | RN |
|---|---|---|---|
| `bar-chart` | https://mvpui.imtung.com/components/bar-chart | (import not detected via barrel — check page source) | ⚠️ — needs `victory-native` or equivalent |
| `line-chart` | https://mvpui.imtung.com/components/line-chart | (import not detected via barrel — check page source) | ⚠️ — needs `victory-native` or equivalent |
| `pie-chart` | https://mvpui.imtung.com/components/pie-chart | (import not detected via barrel — check page source) | ⚠️ — needs `victory-native` or equivalent |
| `sparkline` | https://mvpui.imtung.com/components/sparkline | `components/sparkline.tsx` | ⚠️ — needs SVG |

## Logos & icons

| Slug | Demo URL | Web source | RN |
|---|---|---|---|
| `logo` | https://mvpui.imtung.com/components/logo | `components/logo.tsx` | ⚠️ — brand-specific |
| `social-icons` | https://mvpui.imtung.com/components/social-icons | `components/buttons/social-logos.tsx` | ❌ |
| `payment-icons` | https://mvpui.imtung.com/components/payment-icons | `components/inputs/payment-icons.tsx` | ❌ |
| `integration-icons` | https://mvpui.imtung.com/components/integration-icons | `components/integration-icons.tsx` | ❌ |
| `play-button-icon` | https://mvpui.imtung.com/components/play-button-icon | `components/play-button-icon.tsx` | ❌ |
| `illustration` | https://mvpui.imtung.com/components/illustration | `components/illustrations/index.tsx` (+ box, cloud, credit-card, documents) | ❌ |

---

## Web demo site routes

- Live: https://mvpui.imtung.com/
- Source: `/Volumes/DATA/dev/projects/mvp-ui/apps/docs`
- Component pages: `apps/docs/app/components/(<group>)/<slug>/page.tsx`
  → live URL `https://mvpui.imtung.com/components/<slug>/`
- App examples (NOT component refs): `/examples/auth-form`, `/examples/dashboard-lite`, etc.

## Regeneration script

Run from the **web repo root** (`/Volumes/DATA/dev/projects/mvp-ui`) to refresh
the import → source mapping:

```bash
node -e "
const fs = require('fs');
const path = require('path');
const docsRoot = 'apps/docs/app/components';
const barrel = fs.readFileSync('packages/ui/src/index.ts', 'utf8');
const demos = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, {withFileTypes: true})) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'page.tsx') demos.push(p);
  }
})(docsRoot);
function findSourceFor(name) {
  const re = new RegExp('(?:export\\\\s+(?:type\\\\s+)?\\\\{[^}]*\\\\b' + name + '\\\\b[^}]*\\\\})\\\\s+from\\\\s+\"\\\\./components/([^\"]+)\\\\.js\"', 's');
  const m = barrel.match(re);
  return m ? 'components/' + m[1] + '.tsx' : null;
}
for (const f of demos) {
  const segs = f.split('/');
  const slug = segs[segs.length - 2];
  const group = segs[segs.length - 3].replace(/[()]/g, '');
  const src = fs.readFileSync(f, 'utf8');
  const names = new Set();
  let m;
  const re = /import\\s+(?:type\\s+)?\\{([^}]+)\\}\\s+from\\s+\"@mvp-ui\\/ui\"/g;
  while ((m = re.exec(src))) {
    for (const n of m[1].split(',').map(s => s.trim().replace(/^type\\s+/, '').split(/\\s+as\\s+/)[0])) names.add(n);
  }
  const sources = [...new Set([...names].map(findSourceFor).filter(Boolean))];
  console.log([slug, group, [...names].join(', '), sources.join(' | ')].join('\\t'));
}
"
```
