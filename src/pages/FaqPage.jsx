import { Mail, Phone } from 'lucide-react';
import Header from '../components/Header';
import PromoBanner from '../components/PromoBanner';
import FaqAccordion from '../components/FaqAccordion';
import StickyCTA from '../components/StickyCTA';
import ClickToText from '../components/ClickToText';
import ScrollReveal from '../components/ScrollReveal';
import { CONTENT_CARD } from '../constants/cardStyles';
import { EMAIL, EMAIL_MAILTO, PHONE_DISPLAY, PHONE_TEL } from '../constants/contact';

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-transparent pb-[4.5rem] md:pb-0">
      <PromoBanner />
      <Header />

      <main className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="mb-12 text-center sm:mb-16">
            <p className="section-eyebrow">FAQ</p>
            <h1 className="section-heading mt-4">Frequently Asked Questions</h1>
            <p className="section-body mx-auto mt-4 max-w-2xl">
              Everything you need to know about booking mobile detailing with Shine Mobile in Orlando.
            </p>
          </ScrollReveal>

          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
            <ScrollReveal>
              <div className={`p-8 sm:p-10 ${CONTENT_CARD} lg:sticky lg:top-28`}>
                <h2 className="font-display text-2xl font-extrabold text-shine-text sm:text-3xl">
                  Still Have Questions?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#5c5c5c]">
                  We&apos;re happy to help. Reach out anytime and we&apos;ll get back to you as soon as
                  possible.
                </p>
                <div className="mt-8 space-y-4">
                  <a
                    href={PHONE_TEL}
                    className="flex items-center gap-3 text-shine-text transition hover:text-brand"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Phone className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <span className="font-semibold">{PHONE_DISPLAY}</span>
                  </a>
                  <a
                    href={EMAIL_MAILTO}
                    className="flex items-center gap-3 text-shine-text transition hover:text-brand"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Mail className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <span className="font-semibold break-all">{EMAIL}</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <FaqAccordion />
            </ScrollReveal>
          </div>
        </div>
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
