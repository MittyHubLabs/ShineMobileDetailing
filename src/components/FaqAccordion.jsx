import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/faq';

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="space-y-3">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.question}
            className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
              isOpen
                ? 'border-brand bg-brand/[0.06] shadow-[0_4px_20px_rgba(26,107,58,0.12)]'
                : 'border-[#d0d0d0] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
            >
              <span
                className={`font-display text-base font-bold leading-snug sm:text-lg ${
                  isOpen ? 'text-brand' : 'text-shine-text'
                }`}
              >
                {item.question}
              </span>
              <ChevronDown
                className={`mt-0.5 h-5 w-5 shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-brand' : 'text-[#5c5c5c]'
                }`}
                strokeWidth={2}
              />
            </button>
            {isOpen && (
              <div className="border-t border-brand/15 px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
                <p className="pt-4 text-sm leading-relaxed text-[#5c5c5c] sm:text-base">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
