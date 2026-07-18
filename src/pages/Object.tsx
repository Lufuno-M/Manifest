import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getObjectBySlug } from '../lib/catalog';
import type { CatalogObject } from '../types/product';
import { Gallery } from '../components/showroom/Gallery';
import { Ledger } from '../components/showroom/Ledger';

/**
 * Every object in the catalog is capable of becoming this page.
 * There is no separate "featured product" template — a $40 candle and a
 * $40,000 archive coat render through the same showroom, differentiated
 * only by their data (ledger schema, image count, variants).
 */
export function ObjectPage() {
  const { slug } = useParams();
  const [state, setState] = useState<
    { status: 'loading' } | { status: 'notFound' } | { status: 'error'; message: string } | { status: 'ready'; object: CatalogObject }
  >({ status: 'loading' });

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setState({ status: 'loading' });

    getObjectBySlug(slug)
      .then((object) => {
        if (cancelled) return;
        setState(object ? { status: 'ready', object } : { status: 'notFound' });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ status: 'error', message: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (state.status === 'loading') return <main className="showroom mono">loading object…</main>;
  if (state.status === 'notFound')
    return (
      <main className="showroom">
        <p className="mono">No object at this address.</p>
        <Link className="mono" to="/">back to search</Link>
      </main>
    );
  if (state.status === 'error')
    return <main className="showroom mono">couldn't load this object ({state.message})</main>;

  const { object } = state;

  return (
    <main className="showroom">
      <section className="showroom__gallery">
        <Gallery object={object} />
      </section>

      <section className="showroom__panel">
        <span className="eyebrow">{object.brand.name}</span>
        <h1 className="showroom__title display">{object.name}</h1>
        <div className="showroom__price mono">
          {object.price.currency} {object.price.amount.toLocaleString()}
        </div>
        <p className="showroom__desc">{object.description}</p>

        {object.variants.length > 0 && (
          <div className="showroom__variants" role="group" aria-label="Select variant">
            {object.variants.map((v) => (
              <button
                key={v.id}
                className="showroom__variant"
                style={v.swatchHex ? { background: v.swatchHex } : undefined}
                aria-label={v.label}
                title={v.label}
              />
            ))}
          </div>
        )}

        <button className="showroom__add">Add to bag</button>

        <Ledger object={object} />
      </section>
    </main>
  );
}
