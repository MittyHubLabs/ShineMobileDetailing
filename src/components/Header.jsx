import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Phone, X } from 'lucide-react';
import Logo from './Logo';
import { PHONE_DISPLAY, PHONE_TEL } from '../constants/contact';

const NAV = [
  { label: 'Packages', href: '/#packages', hash: true },
  { label: 'Why Us', href: '/#why-us', hash: true },
  { label: 'Our Work', href: '/#gallery', hash: true },
  { label: 'FAQ', to: '/faq' },
];

const navLinkClass =
  'flex min-h-[44px] items-center rounded-lg px-4 py-3 text-base text-shine-text transition hover:bg-black/5 hover:text-brand lg:px-3 lg:py-2 lg:text-sm';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3" onClick={closeMenu}>
          <Logo size="sm" className="shrink-0" />
          <span className="hidden truncate font-display text-sm font-bold leading-tight tracking-tight text-shine-text min-[420px]:inline sm:text-base lg:text-lg">
            Shine Mobile Detailing
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) =>
            item.to ? (
              <Link key={item.to} to={item.to} className={navLinkClass}>
                {item.label}
              </Link>
            ) : (
              <a key={item.href} href={item.href} className={navLinkClass}>
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={PHONE_TEL}
            className="hidden min-h-[44px] items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-shine-text transition hover:text-brand md:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <Link
            to="/packages"
            className="btn-primary min-h-[44px] !px-3 !py-2.5 text-sm sm:!px-4"
          >
            Book Now
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-shine-text transition hover:bg-black/5 lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-black/10 bg-white px-4 py-2 lg:hidden">
          {NAV.map((item) =>
            item.to ? (
              <Link key={item.to} to={item.to} className={navLinkClass} onClick={closeMenu}>
                {item.label}
              </Link>
            ) : (
              <a key={item.href} href={item.href} className={navLinkClass} onClick={closeMenu}>
                {item.label}
              </a>
            ),
          )}
          <a href={PHONE_TEL} className={navLinkClass} onClick={closeMenu}>
            <Phone className="mr-2 h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
        </nav>
      )}
    </header>
  );
}
