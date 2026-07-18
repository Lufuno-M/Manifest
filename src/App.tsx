import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { ObjectPage } from './pages/Object';

/**
 * Routing intentionally has no /brands or /categories as primary sections.
 * They exist only as query filters within /search (see Search.tsx's use of
 * resolveQuery), which is why they're absent here — adding them back as
 * top-level routes would be a step back toward catalog-first navigation.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/object/:slug" element={<ObjectPage />} />
    </Routes>
  );
}
