# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: event producers, venue operators, and bar owners in Chile deciding whether to adopt Vendeme's ticketing/operations ecosystem for an upcoming event. This site is a B2B sales tool — the person it's written for is the one who would contract Vendeme, not the person who ends up buying a ticket. Ticket buyers are a separate audience reached only through the standalone consumer app (linked from the nav CTA and footer), not through this site's content or pages.

Secondary: once contracted, the client's own door/bar/wardrobe staff who operate the tools night-of.

## Product Purpose

Vendeme is an integrated ecosystem covering an event end-to-end, from the first ticket sale to the last drink at the bar:

- **Ticketing** — online ticket sales, price tiers, presale, quotas.
- **Check** — door/access validation, manual attendee headcount (synced live), incident/lost-item reports, and coat-check validation.
- **POS** — bar/point-of-sale terminals for staff-assisted sales.
- **Tótems** — self-service ordering/payment kiosks.
- **Guardarropía** — coat/bag check-in and claim.
- **Clientes** — a live dashboard covering the event before, during, and after it happens (sales, access, consumption, payments, reports).

Success looks like: an operator can adopt just one tool for one real need, and grow into the rest of the ecosystem later without switching platforms or losing continuity of data.

## Positioning

Built from 11+ years actually operating events in the field in Chile (legal entity Bazo SpA), not designed from an office and then sold into events. The site's own framing: "cada función existe porque una noche hizo falta" (every feature exists because some night made it necessary) — e.g. an entry that had to validate fast became Check; a bar slammed at peak hour became POS + Tótems. A neighboring ticketing-only or POS-only vendor could not truthfully claim the same operational pedigree across all six tools, or the same continuity between them (one shared record of truth in Vendeme Clientes).

Modular by design: no mandatory order between the six tools — a client can enter through Ticketing, POS, or Tótems and add the rest later.

## Operating Context

Real event nights in Chile: door lines, bar rushes at peak hours, wardrobe check-in/out, on-the-spot incident or lost-item reporting, and same-night cash/till reconciliation. Staff work from a phone or a dedicated hardware scanner ("quemador"). Both digital tickets (QR, in-app) and physical paper claim tickets (guardarropía) are in play, sometimes for the same person in the same night.

## Capabilities and Constraints

- Vendeme provides both the software **and** the physical hardware (tótems, POS terminals, quemadores) as part of the contracted service — this is not a bring-your-own-device product.
- Three native consumer/staff apps exist and are live on iOS App Store and Google Play: **Vendeme App** (ticket buyers), **Vendeme Check** (door/bar staff), **Vendeme Clientes** (operators/managers).
- **Vendeme Pay** is the built-in payment rail used across the ecosystem (Ticketing checkout, POS, Tótems), but by explicit decision it has no dedicated page on this site — it only appears as a mention inside the other tools' pages.
- The site itself is a static, buildless HTML/CSS/JS project: 9 pages (index, ticketing, check, pos, totems, guardarropia, clientes, nosotros, contacto) sharing `assets/css/style.css` and `assets/js/main.js`. No framework, no bundler.
- Spanish-language site, targeting the Chilean market specifically (phone/WhatsApp with +56 country code, "RUT" as the national ID term, prices in CLP).

## Brand Commitments

- Name: **Vendeme** (the wordmark is styled lowercase, with a receipt/ticket glyph replacing part of the "m").
- Color identity: amber/orange accent `#ff5723` on a near-black ground `#141210` — this pairing is the brand, not a placeholder.
- Typography: Bricolage Grotesque (display/headings), Nunito Sans (body), JetBrains Mono (labels, mono/technical accents).
- Contact: Pablo Sajnovich, WhatsApp/phone +56 9 7540 4201, based in Santiago, Chile. Legal entity Bazo SpA.
- Visual style preference already established this project: coded/CSS-built product mockups (device frames, animated UI states) are preferred over stock photography wherever a real product screenshot isn't available yet.

## Evidence on Hand

- **All sample data in the site's visual cards is illustrative, not real** — sales figures, attendance counts, named "embajadores" like "Camila," etc. are invented to demonstrate what each tool looks like in use. This is not real customer data, not a real testimonial, and not a verified metric. Future work must not expand on these numbers as if they were factual, and must not fabricate new customer testimonials, case studies, or press mentions — none exist yet.
- Real, working App Store and Google Play links exist for all three apps (confirmed live).
- Real product screenshots exist for: Ticketing (cartelera/selección/pago/entrada screens, both web and mobile), and one POS unit photo (front-facing cutout, transparent background).
- Check, Tótems, Guardarropía, and Clientes currently use coded/CSS mockups instead of real screenshots — the client plans to grant access to the official platforms later so these can be replaced with real screens using generic/non-sensitive data.
- The hero background video is an AI-generated (PixVerse) clip; it currently carries a visible "PixVerse.ai" watermark and a visible loop-seam cut, both still pending a decision.

## Product Principles

1. Enter through one real need, grow into the rest — never force a mandatory order across the six tools.
2. Built from operating real events, not office assumptions — every feature should trace back to a concrete operational moment.
3. One record of truth: whatever happens across Ticketing/Check/POS/Tótems/Guardarropía surfaces live in Vendeme Clientes.
4. Prefer coded, CSS-built visuals over stock photography until a real product screen exists for that spot.
5. Never fabricate metrics, testimonials, or case studies to fill a visual or credibility gap — mark placeholders as placeholders.
