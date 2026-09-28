---
name: Vendeme
description: Ecosistema de ticketing y operación de eventos — de la entrada al último trago.
colors:
  carbon-warm: "#141210"
  carbon-warm-alt: "#1b1815"
  surface: "#201c19"
  line: "#34302a"
  text: "#f3eee6"
  muted: "#a79c8e"
  signal-orange: "#ff5723"
  signal-orange-light: "#ffb199"
  signal-orange-dim: "#7a3a26"
  thermal-paper: "#f4efe2"
  thermal-paper-text: "#241f19"
  thermal-paper-muted: "#70675a"
  thermal-paper-accent: "#b53307"
  hardware-black: "#0d0c0b"
  scan-black: "#0b0a09"
  totem-black: "#100c09"
typography:
  display:
    fontFamily: "'Bricolage Grotesque', sans-serif"
    fontSize: "clamp(2.1rem, 4.4vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "normal"
  body:
    fontFamily: "'Nunito Sans', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.05em"
rounded:
  icon: "9px"
  xs: "10px"
  sm: "12px"
  md: "14px"
  lg: "20px"
  bezel: "46px"
  screen: "32px"
  pill: "999px"
spacing:
  xs: "10px"
  sm: "14px"
  md: "20px"
  lg: "28px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.signal-orange}"
    textColor: "#171310"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "14px 26px"
  button-primary-hover:
    backgroundColor: "{colors.signal-orange}"
    textColor: "#171310"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "0"
    padding: "14px 4px"
  link:
    backgroundColor: "transparent"
    textColor: "{colors.signal-orange}"
    typography: "{typography.body}"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  vc-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "20px"
---

# Design System: Vendeme

## Overview

**Creative North Star: "El Ticket Térmico"**

Vendeme's visual language borrows its structure from the product's own physical artifact: the thermal ticket. The paper color, the dashed tear rules, the perforated bottom edge, the monospace type stamped across a receipt — these aren't decoration, they're the literal material the product prints, reused as a structural motif across the hero, POS, and guardarropía.

Everything that isn't paper reads as a control room mid-event: near-black surfaces, a single high-signal orange, tabular numbers that tick up, dots that blink "live." The system is technical and in-the-moment, never corporate-SaaS. Nothing here should feel like a brochure; it should feel like watching an event happen through its own instrumentation, even when the specific numbers on screen are illustrative.

Components behave like they're reporting something real, not decorating a page: a stock counter that counts down, a queue that fills, a payment state that progresses through tap → accepted → ticket. Precise and live, never merely decorative.

**Key Characteristics:**
- Near-black warm ground (never a cool or pure gray/black) with one rare, high-signal accent color.
- A physical ticket/receipt is a recurring literal motif — paper color, torn edge, slight rotation, dashed rules — reserved for things that are actually a ticket or receipt in the product.
- Coded, "live-feeling" product UI (blinking dots, filling bars, ticking counters) stands in for photography until a real screenshot exists for that spot.
- Flat at rest; depth arrives only as a soft ambient shadow or an orange glow on interaction, never a hard drop shadow.
- Monospace type marks anything that reads as data, timestamp, or system status; the display face is reserved for editorial headlines.

## Colors

Two colors carry the entire system — a warm near-black ground and one signal orange — plus the thermal-paper cream reserved for anything that is literally a ticket or receipt.

### Primary
- **Naranja Señal** (`#ff5723`): The one accent. Marks the single active or live thing in a view — a primary CTA, a blinking "en vivo" dot, the active nav item, a filled progress bar. Never used as a background wash.
- **Naranja Señal Claro** (`#ffb199`): Light tint of the signal orange, used only inside gradients (progress bars, spark bars) as the lit end of a fade toward the dim tone below — never applied as flat text or fill on its own.
- **Naranja Señal Tenue** (`#7a3a26`): The muted, low-contrast twin of the signal color. Used for hairline dividers that specifically separate the product tools from the company links (nav, footer, chapter rail), for unlit/inactive states, and for `link`-style underlines. Reads as "orange, resting."

### Neutral
- **Carbón Cálido** (`#141210`): The page ground. A near-black with a warm (not cool, not pure) undertone — the base every surface sits on.
- **Carbón Cálido Alterno** (`#1b1815`): One step up from the ground; used for input fields, device screens, and anywhere that needs to sit visibly on top of the page background without becoming a full "surface."
- **Superficie** (`#201c19`): The panel/card ground — contact cards, calendars, modals, and the top of the `.vc` card gradient.
- **Línea** (`#34302a`): The only border/divider color at rest. Always 1px, always a hairline — this system has no heavy borders.
- **Texto** (`#f3eee6`): Primary text on dark surfaces. Warm off-white, never pure white.
- **Apagado** (`#a79c8e`): Secondary/muted text — body copy, captions, inactive labels.

### Thermal Paper (reserved for literal tickets/receipts)
- **Papel Térmico** (`#f4efe2`): The paper color for anything that is actually a printed ticket or receipt in the product — the hero receipt, the guardarropía claim ticket, the POS receipt. Not a general "light mode" background.
- **Texto sobre Papel** (`#241f19`): Text on thermal paper.
- **Apagado sobre Papel** (`#70675a`): Secondary text on thermal paper.
- **Naranja sobre Papel** (`#b53307`): The signal orange as *ink printed on paper* — used only for the guardarropía "ENTREGADO" stamp. Naranja Señal itself is 2.8:1 on Papel Térmico and fails contrast; this deeper orange reads ~4.7:1.

### Hardware Black (device mockups only)
Three deliberately distinct near-blacks, each tuned to one physical surface, never interchanged:
- **Negro Hardware** (`#0d0c0b`): The iPhone-style `.device-frame` body and its notch, and the legacy `.cube` screen — the "phone chassis" black, reused wherever that exact device mockup appears.
- **Negro Escáner** (`#0b0a09`): The Check `.scan-viewfinder` glass — slightly darker, reads as a camera lens rather than a phone body.
- **Negro Tótem** (`#100c09`): The `.totem-screen-frame` kiosk screen — slightly warmer, matched to the totem product photo it sits inside.
These are not interchangeable with Carbón Cálido; they exist only to render hardware in mockups, never as a page or panel background.

### Named Rules
**The One Signal Rule.** Naranja Señal appears once per view as the thing demanding attention — a CTA, a live indicator, an active state. If two elements compete for it, one of them is wrong.

**The Amber-on-Dark-Text Rule.** Any solid Naranja Señal fill (buttons, active pills, the "on" state of a tier or route chip) always pairs with `#171310` near-black text — never white, never gray. Contrast comes from darkness, not brightness.

## Typography

**Display Font:** Bricolage Grotesque (with sans-serif fallback)
**Body Font:** Nunito Sans (with sans-serif fallback)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace fallback)

**Character:** A confident, slightly rounded grotesque for headlines against a plain, legible humanist sans for reading copy — with monospace doing the "instrumentation" work everywhere a number, timestamp, kicker, or system label appears.

### Hierarchy
- **Display** (700, `clamp(1.4rem, 4.4vw, 3.5rem)`, 1.05 line-height): Hero and section headlines. Bricolage Grotesque only; never used below H3 size.
- **Title** (700-800, 20–28px): Card headings, stat numbers inside `.vc` cards (tabular numerals), modal titles.
- **Body** (400, 16px, 1.5 line-height): Paragraph copy, capped informally around 60–65ch by each section's own max-width.
- **Label** (500–700, 10.5–13px, letter-spacing 0.05–0.06em, uppercase): Kickers, `.vc-label`, timestamps, chip text, the "spec" line under a hero headline. Always JetBrains Mono. Color is either Apagado (neutral label) or Naranja Señal (active/live label).

### Named Rules
**The Instrumentation Rule.** If it's a number, a timestamp, a status word, or an all-caps kicker, it's JetBrains Mono. Bricolage Grotesque never carries data; Nunito Sans never carries a system label.

## Layout

Content lives in a single shared `.wrap` container, `max-width: 1120px`, `28px` side padding at every breakpoint — the side gutter never collapses to zero. Section rhythm is generous: content blocks pad `96px` top/bottom on desktop, tightening to `64px` on phones (`≤860px`).

Product detail pages use a scroll-pinned story pattern on desktop: a `100vh` sticky panel steps through 2–5 stages as the visitor scrolls, with the copy on one side and a device mockup or screen on the other. **This pin is desktop-only and load-bearing to the brand's "watch it happen" feel** — on phones (`≤860px`) the same content becomes a normal stacked flow whose stages auto-advance on a timer or respond to a horizontal swipe, never a second nested scroll inside the page scroll.

Text-plus-visual sections (`.split-block`) alternate sides going down a page rather than repeating the same left/right assignment, and collapse to a single stacked column under 900px.

## Elevation & Depth

Flat by default, with depth arriving only as a response to interaction — never a resting drop shadow. Two exceptions exist and are deliberate, not structural: the `.vc` card family and thermal-paper elements both carry one soft, large-radius ambient shadow at rest, standing in for "this is a physical object sitting slightly above the page," not for stacking hierarchy.

### Shadow Vocabulary
- **Ambient float** (`0 40px 70px -40px rgba(0,0,0,.7)`): Under every `.vc` card and thermal-paper ticket/receipt. Large, soft, negative-spread — reads as "resting slightly above the surface," not as a hard edge.
- **Signal glow** (`0 0 24px 2px rgba(255,87,35,.35)` on hover): The interactive response for `.btn-primary`. Depth as light, not as shadow.

### Named Rules
**The Flat-Until-Touched Rule.** Nothing gets a resting drop shadow to imply stacking order. Depth shows up only as the ambient float under paper/`.vc` objects, or as the signal glow on hover/focus.

## Shapes

Corners are consistently rounded and grouped into four steps, never mixed within one component: `10px` (buttons, inputs, outlined nav pills), `12–14px` (icons, small chips, the interior rows/tiers inside a `.vc` card), `20px` (the outer frame of any large panel — `.vc` cards, modals, the contact card, the map), and fully-rounded pills (`999px`, or `20px` against a short enough height to read as a pill) for tags, status chips, and route badges. Borders are always the single `1px solid var(--line)` hairline; there is no second, heavier border weight anywhere in the system.

Three categories sit outside that four-step card/button scale on purpose, each scaled to what it renders rather than to the panel scale:
- **Icon controls** (`9px`): small square/circular icon-buttons that are themselves smaller than any card — the hamburger toggle, the calendar's nav arrows and day cells, the availability modal's close button. Sized to the control, not the panel.
- **Device mockups** (`46px` outer / `32px` inner, or the equivalent `%`-based radius on a photo-matched totem/POS screen cutout): phone- and kiosk-bezel corners, matched to real hardware proportions — these scale with the mockup's own width, not with the UI scale.
- **Material micro-radii** (`2–7px`): a handful of component-specific corners smaller than even the icon-control step, each reflecting the thin material it renders rather than a stray value — the receipt's torn-paper slots and tape (`3px`), a receipt row highlight or QR/stamp corner (`6px`), the paper claim-ticket's own sharper-than-UI corner (`4px`, deliberately less rounded than a card — real receipt paper doesn't soften like a UI surface), the app-icon lockup glyphs (`5–7px`, scaled to their own small icon box), and hairline chart-bar/legend caps (`2–3px`). The Check visual-mode toggle's active pill (`16px`) is a computed relationship, not an invented value: the outer toggle track is `20px` radius with `4px` padding, so the inner pill is `20 − 4 = 16px` to stay concentric.

One recurring non-rectangular silhouette: the thermal-ticket edge — a repeating diagonal-gradient background that renders a torn/perforated bottom edge, paired with a slight (`-1° to -1.6°`) rotation, as if the paper had just been set down. This shape is reserved for literal tickets and receipts.

## Components

### Buttons
- **Shape:** `14px` radius for filled buttons, `10px` for outlined pill-style nav buttons; ghost/link buttons carry no box at all.
- **Primary** (`.btn-primary`): Solid Naranja Señal fill, `#171310` text, `700` weight, `14px 26px` padding. Hover adds the Signal Glow shadow plus a `1px` lift — no color change.
- **Ghost** (`.btn-ghost`): Transparent, `600` weight text, a single `1px` bottom border in Línea. Hover turns both the border and the text Naranja Señal. No fill at any state.
- **Nav CTA** (`.nav-cta` / `.nav-cta-primary`): Small pill-shaped buttons (`10px` radius) in the header, both outlined (Línea border) — client login shown first, buy-tickets second (demoted from a solid fill per the One Signal Rule: the hero already carries the page's one filled CTA).
- **Inline link** (`.link`): Naranja Señal text, bold, with a Naranja Señal Tenue underline that brightens to full Naranja Señal on hover. Used for "conoce más"-style secondary actions.

### Chips / Tags (if used)
- **Style:** Transparent background, `1px` border (Línea or Naranja Señal Tenue), fully rounded, muted text at rest.
- **State:** An "on"/active chip (a selected price tier, an active route step) flips to a solid Naranja Señal fill with `#171310` text — the same amber-on-dark-text pairing as buttons, never a separate active color.

### Cards / Containers
- **Corner Style:** `20px` on the outer frame; any interior row or sub-card drops to `12–14px` — never the same radius on a card and its own children.
- **Background:** A subtle top-to-bottom gradient from Superficie to Carbón Cálido Alterno, not a flat fill.
- **Shadow Strategy:** Ambient Float only (see Elevation & Depth); no border-and-shadow combination.
- **Border:** `1px solid` Línea.
- **Internal Padding:** `20px`, with `10–14px` gaps between interior rows.

### Inputs / Fields
- **Style:** Carbón Cálido Alterno background, `1px` Línea border, `10px` radius.
- **Focus:** Border shifts to Naranja Señal; no glow, no outline ring (the button/link focus-visible ring is reserved for keyboard focus specifically).

### Navigation
- Sticky header, translucent Carbón Cálido background with an `8px` backdrop blur and a single `1px` Línea bottom border. Holds only the six product-tool links (Ticketing → Clientes) plus the two nav-CTA buttons — company pages (Nosotros, Contacto) are not in the header; they live in the footer's own "Empresa" column instead, keeping the persistent bar to task-critical navigation only. Collapses to a hamburger menu at `≤1099px`, where "Acceso clientes" stays visible in the compact bar (the one action worth surfacing without opening the menu) while "Compra tus entradas" moves inside it alongside the full link list.
- The home page's left-hand chapter rail is a separate mechanism (page-internal wayfinding for the scroll-through story) and keeps its own `1px` Naranja Señal Tenue divider between the tool dots and the Nosotros/Contacto dots — that divider convention is unrelated to the header now that the header no longer needs one.

### The Thermal Ticket (signature component)
The recurring paper element (hero receipt, guardarropía claim ticket, POS receipt): Papel Térmico background, Texto sobre Papel, JetBrains Mono type throughout, a `-1° to -1.6°` rotation, dashed horizontal rules between line items, and the torn-edge silhouette (see Shapes) along whichever edge represents where the paper would tear off a printer. This is the one place in the system where warm cream, not Carbón Cálido, is correct.

### The Live Card (`.vc`, signature component)
The coded, animated stand-in for a real product screenshot. Always: Superficie→Alterno gradient, `20px` radius, Ambient Float shadow, a barely-visible radial Naranja Señal glow bleeding in from one edge, and a mono `.vc-label` header (often paired with a blinking "en vivo" dot in Naranja Señal). Internally it shows the product *doing something* — a counter ticking, a bar filling, a payment state progressing — never a static illustration standing in for the real UI.

## Do's and Don'ts

### Do:
- **Do** treat Naranja Señal as a rare, single-purpose signal (The One Signal Rule) — spend it on one CTA or live indicator per view, not as a wash.
- **Do** pair every solid-amber fill with `#171310` text (The Amber-on-Dark-Text Rule); never white or gray text on Naranja Señal.
- **Do** build product UI as a coded `.vc` Live Card with real-feeling motion (ticking counters, filling bars, blinking dots) instead of a static photo, until a genuine product screenshot exists for that spot.
- **Do** keep the thermal-ticket paper motif (Papel Térmico, torn edge, rotation, dashed rules, mono type) reserved for things that are literally a ticket or receipt in the product — not as decoration elsewhere.
- **Do** keep the product-detail pages' scroll-pinned story on desktop; only phones get the auto-advancing/swipeable variant of the same content.
- **Do** use JetBrains Mono for anything that reads as data, a timestamp, or a system label (The Instrumentation Rule).

### Don't:
- **Don't** add a resting drop shadow to a card or button (The Flat-Until-Touched Rule) — depth is Ambient Float at rest or Signal Glow on interaction, nothing else.
- **Don't** present the illustrative numbers inside `.vc` cards as real customer data, metrics, or testimonials — none are confirmed real yet (see PRODUCT.md).
- **Don't** give Vendeme Pay its own page or its own top-level nav entry; it only appears mentioned inside the tool pages that use it.
- **Don't** mix radius steps within one component — a `20px` outer card with `12–14px` inner rows is correct; a `20px` card with `20px` inner rows, or a mid-value radius invented between the four steps, is not.
