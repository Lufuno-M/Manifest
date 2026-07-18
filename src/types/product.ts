/**
 * Object-first data model.
 *
 * Design rule carried over from the v0 prototype and generalized here:
 * a value the catalog hasn't confirmed yet is `null`, never a guessed
 * string. Rendering code decides how to show "pending" — the data model
 * never fabricates a plausible-looking value to fill a gap.
 */

export type LedgerField =
  | 'origin'
  | 'material'
  | 'dimensions'
  | 'weight'
  | 'edition'
  | 'condition'
  | 'custody' // provenance / chain of ownership, relevant for resale-grade objects
  | 'introduced'
  | 'updated';

export type Ledger = Partial<Record<LedgerField, string | null>>;

export interface Brand {
  id: string;
  name: string;
  // Brand is secondary in this system — it's metadata on the object,
  // not a section users are expected to browse into.
  tier?: 'house' | 'independent' | 'archive';
}

export interface ObjectImage {
  view: string;        // 'front' | 'side' | 'detail' | 'interior' | category-specific
  label: string;
  asset: string | null; // real image path/URL once photography exists
}

export interface Variant {
  id: string;
  label: string;        // e.g. colourway, size — category decides which
  swatchHex?: string;
  ledgerOverrides?: Ledger; // fields a variant changes (e.g. weight, reference code)
}

export interface CatalogObject {
  id: string;
  slug: string;
  name: string;
  brand: Brand;
  category: string;      // e.g. 'bags', 'jewelry', 'outerwear' — secondary, used for schema selection only
  price: {
    amount: number;
    currency: string;
  };
  description: string;
  images: ObjectImage[];
  variants: Variant[];
  ledger: Ledger;
  reference: string;     // the human-readable SKU/reference shown on the ledger
  searchTags: string[];  // free-text tags AI search can match against
}

/**
 * Which ledger fields render, and in what order, for a given category.
 * This is the generalized version of MANIFEST_SCHEMA from the v0 page —
 * now keyed by category instead of being one hardcoded list, since a
 * ring and a jacket don't share a spec sheet.
 */
export const LEDGER_SCHEMA_BY_CATEGORY: Record<string, LedgerField[]> = {
  default: ['origin', 'material', 'dimensions', 'weight', 'edition', 'condition', 'updated'],
  bags: ['origin', 'material', 'dimensions', 'weight', 'edition', 'updated'],
  jewelry: ['origin', 'material', 'weight', 'edition', 'condition', 'custody', 'updated'],
  outerwear: ['origin', 'material', 'dimensions', 'edition', 'condition', 'updated'],
};

export function ledgerSchemaFor(category: string): LedgerField[] {
  return LEDGER_SCHEMA_BY_CATEGORY[category] ?? LEDGER_SCHEMA_BY_CATEGORY.default;
}
