# Manifest

*An archive of attention.*

Manifest is a cultural object archive — fashion pieces documented and presented not as products for sale, but as artifacts in a continuous atmospheric field. The site itself responds to how you look at it: dwell time and scroll behavior shift the color and mood of the environment over time, like weather that lingers after you've moved on.

## Philosophy

- **Discovery before commerce** — objects are presented for attention and context, not transaction.
- **Honest documentation** — no fabricated imagery or false availability claims. Placeholder assets are explicit.
- **One continuous field** — no seams, no separate "entrance" room. Arrival and browsing happen in the same space.

## Current state

This repo currently holds a single-file HTML/CSS/JS prototype (`index.html`). No build step, no dependencies — open it directly in a browser.

Key systems in the current build:
- Five CSS-positioned color clouds driven by a sine-wave JS render loop, forming the atmosphere.
- Attention (dwell time, scroll velocity) triggers slow-building atmosphere bloom with lag and decay — color lingers rather than resetting instantly.
- A floating hero object cross-fades to a new object every 45–75 seconds on a randomized interval.
- Every variant/colorway of an object is its own standalone catalog entry — nothing is grouped or bundled.
- Objects are organized by house lineage (Bloodline): Nike, Off-White, Chrome Hearts, Goyard, BAPE, Supreme, and others.

## On the horizon

- Ambient/audio atmosphere layer
- Bloodline lineage view as a dedicated structural section
- Calibration of hue visibility and attention-radius sizing

## Type

Fraunces, Archivo, JetBrains Mono
