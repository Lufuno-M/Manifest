[README (1).md](https://github.com/user-attachments/files/32778868/README.1.md)
# Manifest

*The archive of attention.*

Manifest is a business built around recognized objects — fashion pieces presented with the care of an archive and offered with the clarity of a store. The archive is our aesthetic and our edge: every object gets room to be looked at, understood, and wanted. It is also a place you can get it, and know exactly what you're getting — the sizes, the price, the piece.

The site itself responds to how you look at it: dwell time and scroll behavior shift the color and mood of the environment, like weather that lingers after you've moved on.

## Philosophy

- **Recognition first, then possession** — an object earns attention before it asks for anything, and when it does ask, it's simple.
- **Everyone deserves to know** — every object shows its price and its sizes up front. No hunting, no guessing.
- **Honest documentation** — no fabricated imagery, no false availability claims. If a size isn't here, it's marked. If a payment method isn't live yet, it says so.
- **One continuous field** — no seams between arrival, browsing, and buying. It all happens in the same space.
- **The archive is a feature, not a limit** — the atmosphere, the wall, the way objects drift: that's what makes Manifest ours. It sits alongside the business, not in place of it.

## Current state

A single-file HTML/CSS/JS prototype (`index.html`). No build step, no dependencies — open it directly in a browser. Assets live in `/assets/`.

- **The field** — the full catalog drifts in one unsorted scatter, with search by name, maker, or category.
- **The record** — click any object for a larger view, angles where they exist, its maker, a short note, sizes, and price (shown in ZAR).
- **Sizes and availability** — sizes are listed for every footwear and apparel object. Any size can be marked unavailable per object (`out: ['S','XL']`), shown struck through.
- **The bag** — Add to Bag, plus Apple Pay as the primary way to pay and a shared blue Google Pay / Samsung Pay button with a dropdown. Each opens a payment sheet.
- **Payments are not live yet** — the bag and payment sheets are a working mock. Checkout needs a real payment backend or hosted checkout before anything can be charged.
- **The wall** — a dark reference wall of images we're looking at, reached through a gate at the end of the catalog. Not part of the catalog, credited where known.
- **Atmosphere** — five color clouds on a sine-wave render loop; attention (dwell time, scroll velocity) blooms and lingers; a rare dusk episode dims the room on its own.
- **Ambient audio** — an optional, off-by-default sound layer behind a small dot.
- Every variant/colorway of an object is its own standalone entry — nothing is grouped or bundled.
- Objects are organized by house lineage (Bloodline): Nike, Off-White, Chrome Hearts, Goyard, BAPE, Supreme, Sicko, Palace, Awake NY, Louis Vuitton, Hermès, and others.

## On the horizon

- Real payments behind Apple Pay, Google Pay, and Samsung Pay
- Real stock: which sizes we actually have, per object
- Bloodline lineage view as a dedicated structural section
- Calibration of hue visibility and attention-radius sizing

## Type

Fraunces, Archivo, JetBrains Mono
