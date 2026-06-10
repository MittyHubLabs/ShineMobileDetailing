import { Car, Crown, Sparkles, Star } from 'lucide-react';

const ICONS = {
 basic: Sparkles,
 standard: Star,
 premium: Crown,
};

export default function PackageCard({ pkg }) {
 const Icon = ICONS[pkg.id] ?? Car;

 return (
 <article
 className={`group relative flex flex-col rounded-2xl bg-white border border-[#d0d0d0] shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover ${
 pkg.popular ? '' : ''
}`}
 >
 {pkg.popular && (
 <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
 Most Popular
 </span>
 )}

 <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-black/5 text-[#1a1a1a] transition group-hover:scale-110 group-hover:bg-black/10">
 <Icon className="h-6 w-6" />
 </div>

 <p className="text-xs font-semibold uppercase tracking-widest text-shine-text">{pkg.tier}</p>
 <h3 className="mt-1 font-display text-xl font-bold text-shine-text">{pkg.title}</h3>
 <p className="mt-1 text-2xl font-semibold text-shine-text">{pkg.priceRange}</p>
 <p className="mt-3 text-sm leading-relaxed text-shine-text">{pkg.description}</p>

 <ul className="mt-5 flex-1 space-y-2 text-sm text-shine-text">
 {pkg.services.map((service) => (
 <li key={service} className="flex items-start gap-2">
 <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1a1a1a]/40" />
 {service}
 </li>
 ))}
 </ul>

 </article>
 );
}
