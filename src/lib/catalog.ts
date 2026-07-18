import type { CatalogObject } from '../types/product';

/**
 * Data access boundary for the whole app.
 *
 * Nothing above this file should know or care whether an object came from
 * a real backend, a headless CMS, or (during early development) a local
 * fixture. Per the architecture pivot, this project does not ship with
 * hardcoded showroom demo products — there is no seeded catalog here.
 *
 * TODO(v1 backend): point BASE_URL at the real catalog API once it exists.
 * Until then these calls will 404/reject, which is the correct behavior —
 * no fallback fabricated data.
 */

const BASE_URL = import.meta.env.VITE_CATALOG_API_URL ?? '/api';

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`Catalog request failed: ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

export async function searchObjects(query: string): Promise<CatalogObject[]> {
  const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
  return json<CatalogObject[]>(res);
}

export async function getObjectBySlug(slug: string): Promise<CatalogObject | null> {
  const res = await fetch(`${BASE_URL}/objects/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  return json<CatalogObject>(res);
}

export async function getFeaturedObjects(): Promise<CatalogObject[]> {
  const res = await fetch(`${BASE_URL}/objects/featured`);
  return json<CatalogObject[]>(res);
}
