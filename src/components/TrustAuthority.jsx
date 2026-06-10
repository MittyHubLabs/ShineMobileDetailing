import { Search, Sparkles, Tag } from 'lucide-react';
import { CONTENT_CARD } from '../constants/cardStyles';
import ScrollReveal from './ScrollReveal';

const STATS = [
  { value: '6+', label: 'Years Experience' },
  { value: '200+', label: 'Vehicles Detailed' },
  { value: '5★', label: 'Average Rating' },
];

const POINTS = [
  {
    icon: Search,
    title: 'Attention to Detail',
    description:
      'Every inch of your vehicle gets the same care, from door jambs to dashboards. Nothing gets missed.',
  },
  {
    icon: Sparkles,
    title: 'Professional Grade Products',
    description:
      "We use clean, professional-grade soaps, polishes, and coatings — the same quality you'd find at a high-end detail shop.",
  },
  {
    icon: Tag,
    title: 'Affordable Pricing',
    description:
      'Premium results without the premium price tag. Transparent rates, no hidden fees, no surprises.',
  },
];

export default function TrustAuthority() {
  return (
    <section className="bg-white px-4 py-24 sm:px-6 sm:py-32" id="why-us">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="text-center">
          <p className="section-eyebrow">Why Shine Mobile</p>
          <h2 className="section-heading mt-4">
            Professional results, delivered to your door.
          </h2>
          <p className="section-body mx-auto mt-4 max-w-2xl">
            Six years of experience and a commitment to quality on every single job.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-10 sm:mt-12">
          <div className="mx-auto grid max-w-4xl grid-cols-1 items-start gap-8 sm:grid-cols-3 sm:gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <p className="font-display text-4xl font-bold leading-none text-brand sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium leading-snug text-[#666]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 sm:mt-14 sm:grid-cols-3">
          {POINTS.map(({ icon: Icon, title, description }, index) => (
            <ScrollReveal key={title} delay={index * 80} className="h-full">
              <div className={`flex h-full flex-col p-6 sm:p-8 ${CONTENT_CARD}`}>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black/5 text-[#1a1a1a]">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold leading-snug text-shine-text sm:text-xl">
                  {title}
                </h3>
                <p className="mt-3 flex-1 text-sm font-normal leading-relaxed text-[#5c5c5c]">
                  {description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
