import type { CatalogObject } from '../types/product';
import { searchObjects } from './catalog';

export type AiSearchResult =
  | { kind: 'direct'; object: CatalogObject }
  | { kind: 'candidates'; objects: CatalogObject[]; note?: string }
  | { kind: 'empty'; note: string };

/**
 * Entry point for "AI is primary navigation."
 *
 * A query here is not a filter applied to a grid — it's expected to
 * frequently resolve straight to a single object's showroom page. The
 * ranking/understanding logic (embeddings, an LLM call, whatever the
 * real backend uses) lives server-side; this function's job is just to
 * shape that response into something the UI can route on directly.
 *
 * TODO(v1 backend): replace the plain-text `searchObjects` call with a
 * dedicated AI-search endpoint that returns confidence, so `direct` vs
 * `candidates` is a real backend decision rather than "exactly one result".
 */
export async function resolveQuery(query: string): Promise<AiSearchResult> {
  const trimmed = query.trim();
  if (!trimmed) return { kind: 'empty', note: 'Type what you\u2019re looking for, or describe it.' };

  const results = await searchObjects(trimmed);

  if (results.length === 0) {
    return { kind: 'empty', note: `Nothing matched "${trimmed}" yet.` };
  }
  if (results.length === 1) {
    return { kind: 'direct', object: results[0] };
  }
  return { kind: 'candidates', objects: results };
}
