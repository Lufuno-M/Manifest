import { SearchRail } from '../components/SearchRail';

/**
 * Deliberately not a catalog homepage and not a single hero product.
 * The entire job of this page is to get out of the way of search.
 */
export function Home() {
  return (
    <main className="home">
      <div className="home__mark eyebrow">MANIFEST</div>
      <h1 className="home__prompt display">What are you looking for?</h1>
      <SearchRail autoFocus />
      <p className="home__hint mono">
        describe it, name it, or paste a reference — we route straight to the object
      </p>
    </main>
  );
}
