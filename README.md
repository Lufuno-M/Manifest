# Manifest

An object-first marketplace. Search and AI are the navigation; brand and
category are metadata on the object, not sections of the site. Every
object in the catalog is capable of rendering as a full immersive
showroom page — there is no separate "hero product" template and no
catalog homepage.

This replaces the earlier single-SKU prototype (`vallon-product-page`,
Maison Vallon / "The Aldric"). That prototype proved the interaction
model and the schema-driven data panel; this repo generalizes both across
brands and categories and puts search in front of everything.

## What changed, and why

- **No catalog homepage.** `Home` is a search prompt, nothing else. Landing
  on a grid of "everything we sell" is the wrong first moment for a system
  where AI is supposed to route you straight to the object.
- **No hero SKU.** There's no product that gets special-cased. Any object
  — any brand, any category — renders through the same `ObjectPage` /
  `Gallery` / `Ledger` components.
- **Search resolves, it doesn't just filter.** `resolveQuery()` in
  `lib/aiSearch.ts` can send a query straight to a single object's
  showroom (`kind: 'direct'`) instead of always producing a results grid.
  That's the "AI is primary navigation" principle made concrete: right
  now it's driven by the catalog API returning exactly one match, and is
  meant to be replaced by a real ranked/understood query once the backend
  exists.
- **Brand and category are secondary by construction.** `Brand` and
  `category` are fields on `CatalogObject`, not routes. `category` is used
  only to pick a `Ledger` schema (a ring's spec sheet isn't a jacket's).
  There is deliberately no `/brands` or `/categories` top-level route —
  see the comment in `App.tsx` before adding one back.
- **The Ledger, generalized.** The old `OBJECT.MANIFEST` panel from the
  Vallon page is now `components/showroom/Ledger.tsx`, driven by
  `LEDGER_SCHEMA_BY_CATEGORY` in `types/product.ts` instead of one
  hardcoded field list. The honesty rule carries over exactly: a field
  with no confirmed value renders as `pending`, visibly distinct, never a
  fabricated plausible-looking value.
- **No hardcoded demo products.** `lib/catalog.ts` is a real API adapter
  (`/api/search`, `/api/objects/:slug`, `/api/objects/featured`) with no
  seeded fixture data. Running the app today against no backend will
  correctly show "couldn't reach the catalog" rather than a fake SKU —
  that's intentional per the pivot brief, not an oversight to patch later.

## Data model

```ts
CatalogObject {
  id, slug, name, brand: Brand, category, price,
  description, images: ObjectImage[], variants: Variant[],
  ledger: Ledger, reference, searchTags: string[]
}
```

`images[].asset` is `null` until real photography exists — `Gallery`
already checks for it and falls back to a labeled placeholder frame, the
same pattern the v0 prototype used for its placeholder SVGs.

## Design system

Dark, editorial, one restrained accent — see `src/styles/tokens.css`.
`Fraunces` italic carries object names and headlines; `Inter` is UI/body;
`JetBrains Mono` is reserved for anything that's *data* (price, SKU,
ledger fields) so that convention stays legible across every brand's own
aesthetic. `--oxide` is the only accent color and is used for interactive
state, never decoration.

## Run locally

```
npm install
npm run dev
```

Point `VITE_CATALOG_API_URL` at a real catalog API (defaults to `/api`).
Without one, `/search` and `/object/:slug` will show a "couldn't reach the
catalog" state — expected, see above.

## Repository structure

```
src/
  types/product.ts        # CatalogObject, Ledger, category schema map
  lib/catalog.ts           # API adapter — search / get-by-slug / featured
  lib/aiSearch.ts          # query -> direct object OR candidate list
  components/
    SearchRail.tsx          # primary navigation
    ObjectCard.tsx          # listing-surface unit
    showroom/
      Gallery.tsx
      Ledger.tsx            # signature element
  pages/
    Home.tsx                # search-first landing
    Search.tsx               # candidate list OR redirect to a direct match
    Object.tsx               # the showroom — center of the system
  App.tsx                    # routes: / , /search , /object/:slug (only)
```

## Open questions for the next session

1. What does the real AI-search backend look like — embeddings + rerank,
   an LLM tool-calling over the catalog, or both? `resolveQuery()` is
   written to be agnostic to this, but the `direct` vs `candidates` split
   should come from the backend's confidence, not result count.
2. First real multi-brand data source: is there an existing supplier feed,
   or does the catalog start from manual entry per object?
3. Variant-driven ledger overrides (`Variant.ledgerOverrides`) are typed
   but not yet merged into `Ledger`'s render — needs a decision on
   precedence before the first object with real colour/size variants
   ships.
4. Checkout, accounts, and multi-object cart remain explicitly out of
   scope, same as the v0 prototype's roadmap — this phase is about the
   navigation model and the showroom, not commerce plumbing.
