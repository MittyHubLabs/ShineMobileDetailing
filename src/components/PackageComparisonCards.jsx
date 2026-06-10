import { Check } from 'lucide-react';
import { PACKAGE_COLUMNS, PACKAGE_COMPARISON } from '../data/comparison';
import { VEHICLE_PRICING } from '../data/pricing';
import { getTierStyle } from '../constants/tierStyles';
import PremiumBadge from './ui/PremiumBadge';

function getFullDetailPriceRange(packageId) {
  const amounts = VEHICLE_PRICING.map((vehicle) => vehicle.prices.full[packageId]);
  return `$${Math.min(...amounts)}–$${Math.max(...amounts)}`;
}

function PackageCard({ col }) {
  const tier = getTierStyle(col.key);

  return (
    <article className="overflow-hidden rounded-2xl border-2 border-solid border-[#c0c0c0] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
      <header
        style={tier.headerGradient}
        className={`px-5 py-5 text-center ${tier.borderTop}`}
      >
        <h3 className="font-display text-lg font-bold tracking-tight text-white">
          {col.label}
        </h3>
        {col.badge && (
          <div className="mt-2">
            <PremiumBadge
              label={col.badge}
              className="!bg-[#1a6b3a] !px-4 !py-1.5 !text-sm !font-bold !text-white"
            />
          </div>
        )}
        <p className="mt-2 text-sm font-medium text-white">
          {getFullDetailPriceRange(col.key)}
        </p>
      </header>

      <ul className="space-y-3 px-5 py-6">
        {PACKAGE_COMPARISON.map((row) => {
          const included = row[col.key];

          return (
            <li key={row.service} className="flex items-start gap-3">
              {included ? (
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center">
                  <Check className="h-5 w-5 text-brand" strokeWidth={3.5} />
                </span>
              ) : (
                <span
                  className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-sm font-medium text-[#888]"
                  aria-hidden="true"
                >
                  —
                </span>
              )}
              <span
                className={`text-sm leading-snug ${
                  included ? 'font-medium text-[#1a1a1a]' : 'text-[#888]'
                }`}
              >
                {row.service}
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export default function PackageComparisonCards() {
  return (
    <div className="flex flex-col gap-6">
      {PACKAGE_COLUMNS.map((col) => (
        <PackageCard key={col.id} col={col} />
      ))}
    </div>
  );
}
