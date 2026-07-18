import { useState } from 'react';
import type { CatalogObject } from '../../types/product';

export function Gallery({ object }: { object: CatalogObject }) {
  const [view, setView] = useState(object.images[0]?.view);
  const active = object.images.find((i) => i.view === view) ?? object.images[0];

  return (
    <div className="gallery">
      <div className="gallery__stage">
        {active?.asset ? (
          <img src={active.asset} alt={`${object.name} — ${active.label}`} />
        ) : (
          <div className="gallery__placeholder mono">
            {active ? `${active.label} — image pending` : 'no imagery yet'}
          </div>
        )}
      </div>
      {object.images.length > 1 && (
        <div className="gallery__thumbs" role="group" aria-label="Select image">
          {object.images.map((img) => (
            <button
              key={img.view}
              className="gallery__thumb"
              aria-pressed={img.view === view}
              onClick={() => setView(img.view)}
            >
              <span className="mono">{img.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
