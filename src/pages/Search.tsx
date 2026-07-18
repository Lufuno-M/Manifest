import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resolveQuery, AiSearchResult } from '../lib/aiSearch';
import { ObjectCard } from '../components/ObjectCard';
import { SearchRail } from '../components/SearchRail';

export function Search() {
  const [params] = useSearchParams();
  const query = params.get('q') ?? '';
  const navigate = useNavigate();

  const [state, setState] = useState<
    { status: 'loading' } | { status: 'done'; result: AiSearchResult } | { status: 'error'; message: string }
  >({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });

    resolveQuery(query)
      .then((result) => {
        if (cancelled) return;
        if (result.kind === 'direct') {
          navigate(`/object/${result.object.slug}`, { replace: true });
          return;
        }
        setState({ status: 'done', result });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ status: 'error', message: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [query, navigate]);

  return (
    <main className="search-page">
      <SearchRail />

      {state.status === 'loading' && <p className="mono search-page__status">searching…</p>}

      {state.status === 'error' && (
        <p className="mono search-page__status">
          couldn't reach the catalog ({state.message}) — this page expects a live catalog API.
        </p>
      )}

      {state.status === 'done' && state.result.kind === 'empty' && (
        <p className="mono search-page__status">{state.result.note}</p>
      )}

      {state.status === 'done' && state.result.kind === 'candidates' && (
        <div className="object-grid">
          {state.result.objects.map((o) => (
            <ObjectCard key={o.id} object={o} />
          ))}
        </div>
      )}
    </main>
  );
}
