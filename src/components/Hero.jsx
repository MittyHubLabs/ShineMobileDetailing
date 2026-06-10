import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Car, MapPin } from 'lucide-react';
import Logo from './Logo';
import ScrollReveal from './ScrollReveal';

const TRUST_BADGES = [
  { icon: MapPin, label: 'Orlando Local' },
  { icon: Car, label: 'Mobile service' },
  { icon: BadgeCheck, label: 'Satisfaction guaranteed' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-silver">
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 pb-14 pt-10 text-center sm:px-6 sm:pb-16 sm:pt-12">
        <ScrollReveal>
          <div className="flex w-full flex-col items-center gap-4 sm:gap-5">
            <div className="flex flex-col items-center gap-1 sm:gap-1.5">
              <Logo
                size="none"
                className="mx-auto h-auto w-[240px] max-w-full border-0 bg-transparent object-contain shadow-none"
              />
              <p className="section-eyebrow flex items-center justify-center gap-2 tracking-[0.25em]">
                <span>Shine Mobile Detailing</span>
                <span className="h-3 w-px shrink-0 bg-brand" aria-hidden="true" />
                <span>Orlando</span>
              </p>
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-[1.06] tracking-tight text-shine-text sm:text-5xl lg:text-6xl">
              Bring Your Car Back to Shine
            </h1>
            <div
              className="h-[2px] w-20 rounded-full bg-brand"
              aria-hidden="true"
            />
            <p className="section-body max-w-xl text-base sm:text-lg">
              Book online in minutes. We show up fully equipped and handle everything. You just enjoy a
              cleaner car.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120} className="mt-8 sm:mt-10">
          <Link
            to="/packages"
            className="btn-primary btn-primary-hero group inline-flex items-center justify-center gap-2.5"
          >
            Book Now
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5 sm:h-6 sm:w-6" />
          </Link>
        </ScrollReveal>

        <ScrollReveal
          delay={180}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:mt-10"
        >
          {TRUST_BADGES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 text-sm font-medium text-[#5c5c5c]">
              <Icon className="h-4 w-4 text-brand" strokeWidth={2} />
              {label}
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
