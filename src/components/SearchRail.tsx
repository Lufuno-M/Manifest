import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * This is not a search box that sits above a catalog grid — it IS the
 * primary navigation for the app. Submitting can route straight into a
 * showroom page (see App.tsx -> Search.tsx -> resolveQuery) rather than
 * always landing on a results list.
 */
export function SearchRail({ autoFocus = false }: { autoFocus?: boolean }) {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form className="search-rail" onSubmit={onSubmit} role="search">
      <span className="search-rail__eyebrow eyebrow">Find the object</span>
      <input
        className="search-rail__input display"
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="a black leather tote, hand-folded handles…"
        aria-label="Describe or name what you're looking for"
      />
      <button className="search-rail__submit mono" type="submit" aria-label="Search">
        →
      </button>
    </form>
  );
}
