import { Check, Minus } from 'lucide-react';
import { PACKAGES} from '../data/packages';
import ScrollReveal from './ScrollReveal';

const FEATURES = [
 { label: 'Exterior hand wash', basic: true, standard: true, premium: true},
 { label: 'Wheels + tires cleaned', basic: true, standard: true, premium: true},
 { label: 'Interior vacuum', basic: true, standard: true, premium: true},
 { label: 'Full interior wipe-down', basic: false, standard: true, premium: true},
 { label: 'Door jamb cleaning', basic: false, standard: true, premium: true},
 { label: 'Tire shine', basic: false, standard: true, premium: true},
 { label: 'Deep interior + seat cleaning', basic: false, standard: false, premium: true},
 { label: 'Odor neutralization', basic: false, standard: false, premium: true},
];

function Cell({ included}) {
 return included ? (
 <Check className="mx-auto h-5 w-5 text-shine-text" />
 ) : (
 <Minus className="mx-auto h-5 w-5 text-shine-text/40" />
 );
}

export default function PricingComparison() {
 return (
 <section className="bg-transparent px-4 py-16 sm:px-6 sm:py-24" id="compare">
 <div className="mx-auto max-w-6xl">
 <ScrollReveal className="mb-10 text-center">
 <p className="text-sm font-semibold uppercase tracking-widest text-shine-text">Compare</p>
 <h2 className="mt-3 font-display text-3xl font-bold text-shine-text sm:text-4xl">Package comparison</h2>
 <p className="mt-3 text-shine-text">Simple pricing. Standard Shine fits most vehicles.</p>
 </ScrollReveal>

 <ScrollReveal>
 <div className="overflow-x-auto rounded-2xl">
 <table className="w-full min-w-[540px] text-left text-sm">
 <thead>
 <tr className="bg-white border border-[#d0d0d0] shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
 <th className="p-4 font-medium text-shine-text">Feature</th>
 {PACKAGES.map((pkg) => (
 <th key={pkg.id} className="p-4 text-center">
 <span className="font-display font-bold text-shine-text">{pkg.tier}</span>
 <span className="mt-0.5 block text-xs text-shine-text">{pkg.title}</span>
 <span className="mt-1 block text-shine-text">{pkg.priceRange}</span>
 {pkg.popular && (
 <span className="mt-1 inline-block rounded-full bg-brand/20 px-2 py-0.5 text-[10px] font-bold uppercase text-shine-text">
 Most Popular
 </span>
 )}
 </th>
 ))}
 </tr>
 </thead>
 <tbody>
 {FEATURES.map((row) => (
 <tr key={row.label} className="transition hover:bg-white border border-[#d0d0d0] shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
 <td className="p-4 text-shine-text">{row.label}</td>
 <td className="p-4"><Cell included={row.basic} /></td>
 <td className="p-4"><Cell included={row.standard} /></td>
 <td className="p-4"><Cell included={row.premium} /></td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </ScrollReveal>
 </div>
 </section>
 );
}
