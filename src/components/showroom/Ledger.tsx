import { CatalogObject, ledgerSchemaFor } from '../../types/product';

const FIELD_LABELS: Record<string, string> = {
  origin: 'origin',
  material: 'material',
  dimensions: 'dimensions',
  weight: 'weight',
  edition: 'edition',
  condition: 'condition',
  custody: 'custody',
  introduced: 'introduced',
  updated: 'updated',
};

/**
 * The one signature element carried forward from the v0 prototype,
 * generalized across brands and categories. It keeps the same honesty
 * rule: a field with no confirmed value renders as "pending", visually
 * distinct — never filled with a plausible guess.
 */
export function Ledger({ object }: { object: CatalogObject }) {
  const schema = ledgerSchemaFor(object.category);

  return (
    <div className="ledger">
      <div className="ledger__head mono">
        <span>OBJECT.LEDGER</span>
        <span>{object.reference}</span>
      </div>
      <div className="ledger__body">
        {schema.map((key) => {
          const value = object.ledger[key];
          const isPending = value === null || value === undefined;
          return (
            <div className="ledger__row mono" key={key}>
              <span className="ledger__k">{FIELD_LABELS[key] ?? key}</span>
              <span className={`ledger__v${isPending ? ' ledger__v--pending' : ''}`}>
                {isPending ? 'pending' : value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
