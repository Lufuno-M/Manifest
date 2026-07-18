import { Link } from 'react-router-dom';
import type { CatalogObject } from '../types/product';

export function ObjectCard({ object }: { object: CatalogObject }) {
  const image = object.images.find((i) => i.asset) ?? object.images[0];

  return (
    <Link to={`/object/${object.slug}`} className="object-card">
      <div className="object-card__frame">
        {image?.asset ? (
          <img src={image.asset} alt={`${object.name} — ${image.label}`} />
        ) : (
          <div className="object-card__placeholder mono">image pending</div>
        )}
      </div>
      <div className="object-card__meta">
        <span className="object-card__brand eyebrow">{object.brand.name}</span>
        <span className="object-card__name display">{object.name}</span>
        <span className="object-card__price mono">
          {object.price.currency} {object.price.amount.toLocaleString()}
        </span>
      </div>
    </Link>
  );
}
