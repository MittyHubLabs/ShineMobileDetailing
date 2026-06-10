import { Check } from 'lucide-react';
import { PACKAGE_COLUMNS, PACKAGE_COMPARISON } from '../data/comparison';
import { VEHICLE_PRICING } from '../data/pricing';
import { getTierStyle } from '../constants/tierStyles';
import PackageComparisonCards from './PackageComparisonCards';
import PremiumBadge from './ui/PremiumBadge';
import ScrollReveal from './ScrollReveal';

function getFullDetailPriceRange(packageId) {
  const amounts = VEHICLE_PRICING.map((vehicle) => vehicle.prices.full[packageId]);
  return `$${Math.min(...amounts)}–$${Math.max(...amounts)}`;
}

const HEADER_LABEL =
  'font-display text-base font-bold tracking-tight text-white sm:text-lg';

const BODY_CELL_PAD = 'px-4 py-[10px] sm:px-5';
const HEADER_CELL_PAD = 'px-4 py-2.5 sm:px-5';
const TABLE_GRID =
  'border-collapse [&_th]:border-b [&_th]:border-r [&_th]:border-solid [&_th]:border-[#c0c0c0] [&_td]:border-b [&_td]:border-r [&_td]:border-solid [&_td]:border-[#c0c0c0] [&_th:last-child]:border-r-0 [&_td:last-child]:border-r-0 [&_tbody_tr:last-child_td]:border-b-0';

const CHECK_COLORS = {
  basic: 'text-[#3b82f6]',
  standard: 'text-[#1a6b3a]',
  premium: 'text-[#d4af37]',
};

function CheckCell({ included, colKey, rowBg }) {
  const checkColor = CHECK_COLORS[colKey] ?? CHECK_COLORS.basic;

  return (
    <td className={`text-center ${rowBg} ${BODY_CELL_PAD}`}>
      {included ? (
        <span className="inline-flex h-5 w-5 items-center justify-center">
          <Check className={`h-5 w-5 ${checkColor}`} strokeWidth={3.5} />
        </span>
      ) : (
        <span className="text-[14px] font-medium text-[#888]" aria-hidden="true">
          —
        </span>
      )}
    </td>
  );
}

export default function PricingSection() {
  return (
    <section className="bg-silver px-4 py-28 sm:px-6 sm:py-36" id="packages">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal className="mb-16 text-center sm:mb-20">
          <p className="section-eyebrow">Compare Our Packages</p>
          <h2 className="section-heading mx-auto mt-4 max-w-md">
            What&apos;s Included.
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="md:hidden">
            <PackageComparisonCards />
          </div>

          <div className="hidden md:block">
            <div className="rounded-2xl border-2 border-solid border-[#c0c0c0] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
            <table className={`w-full min-w-[640px] ${TABLE_GRID}`}>
              <thead>
                <tr>
                  <th
                    className={`w-[40%] bg-white text-left text-xs font-bold uppercase tracking-[0.15em] text-[#1a1a1a] ${HEADER_CELL_PAD}`}
                  >
                    Service
                  </th>
                  {PACKAGE_COLUMNS.map((col) => {
                    const tier = getTierStyle(col.key);

                    return (
                      <th
                        key={col.id}
                        style={tier.headerGradient}
                        className={`text-center ${HEADER_CELL_PAD} ${tier.borderTop}`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <span className={HEADER_LABEL}>
                            {col.label}
                          </span>
                          {col.badge && (
                            <PremiumBadge
                              label={col.badge}
                              className="!bg-[#1a6b3a] !px-4 !py-1.5 !text-sm !font-bold !text-white"
                            />
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
                <tr>
                  <th className={`bg-white ${HEADER_CELL_PAD}`} />
                  {PACKAGE_COLUMNS.map((col) => {
                    const tier = getTierStyle(col.key);

                    return (
                      <th
                        key={`${col.id}-price`}
                        style={tier.headerGradient}
                        className={`text-center ${HEADER_CELL_PAD}`}
                      >
                        <span className="text-xs font-medium text-white sm:text-sm">
                          {getFullDetailPriceRange(col.key)}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {PACKAGE_COMPARISON.map((row, rowIndex) => {
                  const rowBg = rowIndex % 2 === 0 ? 'bg-[#ffffff]' : 'bg-[#f5f5f5]';

                  return (
                    <tr key={row.service} className={rowBg}>
                      <td
                        className={`text-[14px] font-semibold text-[#1a1a1a] ${rowBg} ${BODY_CELL_PAD}`}
                      >
                        {row.service}
                      </td>
                      <CheckCell included={row.basic} colKey="basic" rowBg={rowBg} />
                      <CheckCell included={row.standard} colKey="standard" rowBg={rowBg} />
                      <CheckCell included={row.premium} colKey="premium" rowBg={rowBg} />
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-16 text-center">
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-shine-text">
            Need more? Customize your detail with optional add-ons when you book.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
