import { CalendarCheck, Car, MapPin, ShieldCheck, Sparkles} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const POINTS = [
 {
 icon: MapPin,
 title: 'We come to you',
 text: 'Save hours every month. No drop offs, no waiting rooms — we detail at your location.',
},
 {
 icon: Sparkles,
 title: 'Professional grade products',
 text: 'Premium soaps, coatings, and tools used by experienced mobile detailers.',
},
 {
 icon: Car,
 title: 'Interior + exterior transformation',
 text: 'Full vehicle reset from wheels to headliner. Every package covers inside and out.',
},
 {
 icon: CalendarCheck,
 title: 'Fast booking process',
 text: 'Choose your package, pick a time, and confirm in under two minutes.',
},
 {
 icon: ShieldCheck,
 title: 'Satisfaction guaranteed',
 text: 'Not thrilled with the results? We make it right. Your shine is our reputation.',
},
];

export default function WhyChooseUs() {
 return (
 <section className="bg-transparent px-4 py-16 sm:px-6 sm:py-24" id="why-us">
 <div className="mx-auto max-w-6xl">
 <ScrollReveal className="mb-12 text-center">
 <p className="text-sm font-semibold uppercase tracking-widest text-shine-text">Why choose us</p>
 <h2 className="mt-3 font-display text-3xl font-bold text-shine-text sm:text-4xl">
 Premium service, zero hassle
 </h2>
 <p className="mx-auto mt-3 max-w-lg text-shine-text">
 Local, trusted, and built around your schedule.
 </p>
 </ScrollReveal>

 <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
 {POINTS.map((point, i) => (
 <ScrollReveal key={point.title} delay={i * 60}>
 <div className="group h-full rounded-2xl bg-white border border-[#d0d0d0] shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-card-hover">
 <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-black/5 text-[#1a1a1a] transition group-hover:scale-110 group-hover:bg-black/10">
 <point.icon className="h-5 w-5" />
 </div>
 <h3 className="font-display text-lg font-bold text-shine-text">{point.title}</h3>
 <p className="mt-2 text-sm leading-relaxed text-shine-text">{point.text}</p>
 </div>
 </ScrollReveal>
 ))}
 </div>
 </div>
 </section>
 );
}
