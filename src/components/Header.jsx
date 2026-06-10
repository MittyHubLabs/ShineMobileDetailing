import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import Logo from './Logo';
import { PHONE_DISPLAY, PHONE_TEL } from '../constants/contact';

const NAV = [
  { label: 'Packages', href: '/#packages', hash: true },
  { label: 'Why Us', href: '/#why-us', hash: true },
  { label: 'Our Work', href: '/#gallery', hash: true },
  { label: 'FAQ', to: '/faq' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <Logo size="sm" className="shrink-0" />
          <span className="hidden truncate font-display text-sm font-bold leading-tight tracking-tight text-shine-text min-[420px]:inline sm:text-base lg:text-lg">
            Shine Mobile Detailing
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) =>
            item.to ? (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-lg px-3 py-2 text-sm text-shine-text transition hover:bg-black/5 hover:text-brand"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-shine-text transition hover:bg-black/5 hover:text-brand"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={PHONE_TEL}
            className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-shine-text transition hover:text-brand md:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <Link to="/packages" className="btn-primary !px-3 !py-2 text-sm sm:!px-4">
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
