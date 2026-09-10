# Design System: BGN Thermal Label Workstation (SE BGN 2026)

## 1. Visual Theme & Atmosphere
A clinical, high-agency industrial workstation combining Swiss typographic precision with tactile print-shop utility. The interface balances high information density with architectural clarity — dense controls on the left, an elevated, luminous inspection canvas on the right. 

- **Density:** 6 (Balanced Precision Workstation — optimized for rapid operational data entry without visual exhaustion)
- **Variance:** 5 (Offset Studio Asymmetry — distinct separation between configuration console and physical print simulation)
- **Motion:** 5 (Fluid Tactile Feedback — swift spring micro-interactions on button press, smooth canvas scale transitions, zero decorative lag)

The mood evokes a high-end specialized hardware utility (analogous to Teenage Engineering or Leica instruments), where every pixel serves accuracy, readability, and thermal printer fidelity.

---

## 2. Color Palette & Roles

### Base & Surfaces
- **Canvas Chalk** (`#F8FAFC`) — Primary background canvas for light mode, neutral slate tone avoiding blinding optical white.
- **Pure Surface** (`#FFFFFF`) — Card containers, editor panes, input fills, and the physical label surface.
- **Deep Slate Void** (`#090D16`) — Dark mode canvas background, rich ink-grade midnight slate (never `#000000`).
- **Dark Surface** (`#131B2E`) — Dark mode cards, toolbars, and elevation containers.
- **Whisper Border** (`rgba(226, 232, 240, 0.8)` / Dark: `rgba(30, 41, 59, 0.7)`) — Crisp 1px structural dividing lines and subtle card boundaries.

### Typography & Ink
- **Pure White / Charcoal Ink** (`#0F172A` / Dark: `#FFFFFF`) — Primary headings, key metrics, high-contrast labels.
- **Ice Silver & Slate** (`#475569` / Dark: `#E2E8F0`) — Secondary copy, parameter descriptors, form field titles.
- **Luminous Azure & Ice Mist** (`#64748B` / Dark: `#93C5FD` 80% / `#CBD5E1`) — Helper microcopy, dimensions, shortcuts, and descriptive notes. Never muddy or washed-out.

### Accents & Functional
- **BGN Navy Blue** (`#0B2545`) — Primary operational accent and official BGN seal tone (65% saturation, commanding and authoritative).
- **Cobalt Action** (`#2563EB` / Dark: `#3B82F6`) — Interactive highlights, active tab pills, focused input rings, primary CTAs.
- **Emerald Scannable** (`#059669` / Dark: `#10B981`) — QR Code indicator, ready status, success toasts, verified parameters.
- **Amber Advisory** (`#D97706` / Dark: `#F59E0B`) — Crop marks, print specification warnings, paper roll margin notices.
- **Amethyst Violet** (`#7C3AED` / Dark: `#A855F7`) — Food ornaments and special visual accents.
- **Neon Cyan** (`#0891B2` / Dark: `#06B6D4`) — Precision calipers, dimension guidelines, and technical measurements.

**Banned in Palette:**
- Muddy, low-contrast mid-grays (`#6B6B6B`, `#64748B`, `#6B7280`) in dark mode; all secondary elements must be crisp, legible, and luminous.
- Pure black (`#000000`) for app UI surfaces (pure black is reserved exclusively for the physical thermal print sticker `#thermal-print-root`).

---

## 3. Typography Rules

- **Display & Headlines:** Track-tight (`letter-spacing: -0.02em`), geometric sans-serif (`system-ui`, `Verdana`, or `Geist`). Hierarchy is established via font weight (`font-black 900`, `font-bold 700`) and spatial isolation rather than gigantic font sizes.
- **Technical & Metrics:** `font-variant-numeric: tabular-nums; font-mono` for mm measurements, label counts, scale percentages, and time values.
- **Body & Controls:** Relaxed line height (`1.4`), maximum 65 characters per line for instructions.
- **Thermal Label Typography:** Preserves strict sans-serif rendering (`Verdana`, `Tahoma`, `Arial`) to ensure zero anti-aliasing fuzz on 203 DPI and 300 DPI thermal print heads.
- **Banned Typography:** Generic serif fonts (`Times New Roman`, `Georgia`), decorative script fonts, loose letter-spacing on uppercase headings.

---

## 4. Component Stylings

### Header & App Bar
- Slim, workstation-style utility bar (`h-14` / `56px`).
- Integrated status chip (`Thermal Engine Ready · 70 × 50 mm`).
- Grouped utility actions on the right: Quick Reset, Backup/JSON, and a prominent tactile Primary CTA (`Cetak Thermal`).

### Segmented Nav & Tabs
- Floating capsule container with crisp 1px border.
- Active pill highlighted with solid cobalt fill or subtle tinted slate background; inactive items retain muted graphite text with hover state.
- Zero layout shift when toggling between tabs.

### Form Inputs & Adjusters
- Label positioned cleanly above inputs with subtle helper metadata right-aligned.
- Input fields use soft rounded corners (`rounded-xl` / `12px`), 1px neutral borders, and a crisp 2px cobalt ring on focus.
- Sliders feature live numerical badges in bold tabular numbers with unit tags (`mm`, `pt`, `%`).
- Quick preset buttons provide instantaneous single-tap configuration with active outline badges.

### Interactive Print Canvas (Right Pane)
- Floating architectural light-table with subtle diffused shadow (`0 20px 40px -15px rgba(0, 0, 0, 0.08)`).
- Visual paper edge simulation with optional cutting guides (crop marks).
- Live measurement calipers displaying physical dimensions (`70 mm` width, `50 mm` height).
- Sticky positioning on desktop viewports (`top-20`) so the canvas remains permanently in view while fine-tuning settings on the left.

### Mobile Experience (< 768px)
- **Floating Preview / View Mode Switcher:** Mobile users can toggle effortlessly between "Pengaturan" and "Pratinjau Langsung", or view a sticky preview chip at the top.
- **Generous Touch Targets:** Every interactive element adheres to a minimum 44 × 44px tap zone.
- **Zero Horizontal Overflow:** All horizontal layouts collapse smoothly into structured vertical stacks.

---

## 5. Layout Principles

- **Desktop (≥ 1024px):** 12-column asymmetric split architecture:
  - **Left 5 Columns:** Configuration Station (Cetak, Identitas SPPG, Kontak & QR, Tipografi).
  - **Right 7 Columns:** Sticky Simulation & Inspection Studio (Canvas, Zoom, Paper Backgrounds, Quick Actions).
- **Mobile (< 1024px):** Single-column stacked layout with quick preview toggle.
- **Spatial Consistency:** Spacing rhythm based on 4px multiples (`p-3`, `p-4`, `p-5`, `p-6`, `gap-4`, `gap-6`).
- **No Absolute Overlaps:** Every element has a dedicated physical boundary and clear spatial allocation.

---

## 6. Motion & Interaction

- **Spring Physics:** Buttons feature a subtle tactile press effect (`active:scale-[0.98] transition-transform duration-100`).
- **Smooth Canvas Scaling:** Canvas zoom uses CSS `transform: scale(...)` with `transform-origin: top center` to ensure hardware-accelerated rendering without DOM reflow.
- **Toast Notifications:** Slide-in from bottom-right with spring damping, auto-dismissing after 3.5s.
- **Performance:** Hardware-accelerated transforms and opacity only; zero CPU-heavy background layout thrashing.

---

## 7. Anti-Patterns (Banned)
- No emojis anywhere in the interface or labels.
- No neon outer glows, floating blurred orbs, or rainbow gradient text.
- No centered hero text or generic marketing fluff.
- No 3-column equal generic card rows.
- No pure black `#000000` on interface surfaces (only on thermal print elements where 100% black ink is technically mandatory).
- No unconstrained layouts; all content is bounded within `max-w-7xl` with intentional whitespace.
