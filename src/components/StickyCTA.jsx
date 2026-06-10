import { Phone } from 'lucide-react';
import { PHONE_TEL } from '../constants/contact';

export default function StickyCTA({ hidden }) {
  if (hidden) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-black/10 bg-white/80 px-2 py-2 shadow-[0_-4px_24px_rgba(0,0,0,0.1)] backdrop-blur-md md:hidden">
      <div className="mx-auto max-w-lg">
        <a
          href={PHONE_TEL}
          className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-shine-text transition active:scale-[0.98]"
        >
          <Phone className="h-5 w-5" />
          Call
        </a>
      </div>
    </div>
  );
}
