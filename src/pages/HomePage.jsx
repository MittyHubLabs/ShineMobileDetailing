import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustAuthority from '../components/TrustAuthority';
import PricingSection from '../components/PricingSection';
import BeforeAfterGallery from '../components/BeforeAfterGallery';
import ServiceArea from '../components/ServiceArea';
import StickyCTA from '../components/StickyCTA';
import PromoBanner from '../components/PromoBanner';
import ClickToText from '../components/ClickToText';
import ScrollReveal from '../components/ScrollReveal';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-transparent pb-[4.5rem] md:pb-0">
      <PromoBanner />
      <Header />

      <main>
        <Hero />
        <PricingSection />
        <TrustAuthority />
        <BeforeAfterGallery />
        <ServiceArea />

        <section className="bg-white px-4 py-24 sm:px-6 sm:py-32">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <h2 className="section-heading">
              Your car is ready for its reset
            </h2>
            <p className="section-body mt-5">
              Start your booking in minutes. We confirm within hours.
            </p>
          </ScrollReveal>
        </section>
      </main>

      <footer className="bg-[#0f0f0f] px-4 py-14 text-center text-sm text-white/60 sm:px-6">
        <p className="font-display text-base font-semibold text-white">Shine Mobile Detailing</p>
        <p className="mt-2">Orlando, FL · © {new Date().getFullYear()} All rights reserved.</p>
      </footer>

      <StickyCTA />
      <ClickToText />
    </div>
  );
}
