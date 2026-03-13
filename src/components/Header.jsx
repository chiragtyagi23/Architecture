import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/locations', label: 'Locations' },
  { href: '/projects', label: 'Projects' },
  { href: '/commercial', label: 'Commercial' },
  { href: '/listings', label: 'Listings' },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200/80">
      <div className="max-w-[min(1600px,96vw)] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4 min-h-14 sm:min-h-18 w-full box-border">
        <a
          href="/"
          className="inline-flex flex-col items-start justify-center py-1 px-2 sm:py-1.5 sm:px-3 rounded-lg bg-[#f0ebe3] shrink-0 text-inherit no-underline shadow-[0_1px_2px_rgba(0,0,0,0.06)] border border-gray-200/60"
          aria-label="MAX Life Real Estate - Home"
        >
          <span className="font-sans text-[0.5rem] sm:text-[0.6rem] font-semibold tracking-wider text-[#b8543a] leading-tight uppercase">
            CODE NAME
          </span>
          <span className="flex items-baseline flex-wrap gap-x-0.5 leading-tight">
            <span
              className="font-sans text-[1.1rem] sm:text-[1.35rem] font-bold text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #e8a84a 0%, #5a9fd4 50%, #b86b9b 100%)' }}
            >
              MAX
            </span>
            <span
              className="text-[1rem] sm:text-[1.25rem] ml-[-2px] relative top-0.5 text-[#9a9a9a]"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              {' '}Life
            </span>
          </span>
          <span className="font-sans text-[0.5rem] sm:text-[0.6rem] font-medium text-[#b8a035] leading-tight mt-0.5">
            REAL ESTATE
          </span>
        </a>

        {/* Desktop: central nav pill */}
        <nav className="hidden lg:flex flex-1 justify-center max-w-xl mx-2" aria-label="Main">
          <div className="w-max max-w-full bg-[#E8E8E8] rounded-full py-2 pl-5 pr-3 flex items-center justify-between gap-3">
            <ul className="flex items-center gap-0.5 m-0 p-0 list-none flex-wrap">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="inline-flex items-center py-1.5 px-3 rounded-full text-sm font-medium text-[#1a1a1a] hover:bg-white/50">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <button type="button" className="p-1.5 rounded-full text-[#1a1a1a] hover:bg-white/60 shrink-0" aria-label="Search">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Desktop: right links */}
        <div className="hidden lg:flex items-center gap-5 shrink-0">
          <a href="/other-services" className="text-sm font-medium text-[#1a1a1a] hover:text-gray-600 no-underline">
            Other services
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center py-2 px-6 text-sm font-medium text-[#1a1a1a] bg-white border border-gray-300 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:bg-gray-50 hover:border-gray-400 no-underline"
          >
            Contact us
          </a>
        </div>

        {/* Mobile: menu button */}
        <button
          type="button"
          className="lg:hidden p-2 rounded-lg text-[#1a1a1a] hover:bg-gray-100"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ease-out border-t border-gray-100 ${menuOpen ? 'max-h-[80vh]' : 'max-h-0'}`}
        aria-hidden={!menuOpen}
      >
        <nav className="px-4 py-4 bg-gray-50/80" aria-label="Main">
          <ul className="m-0 p-0 list-none flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-3 px-3 rounded-lg text-base font-medium text-[#1a1a1a] hover:bg-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
            <button type="button" className="p-2 rounded-full text-[#1a1a1a] hover:bg-white shrink-0" aria-label="Search">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <a href="/other-services" className="py-2 px-3 text-sm font-medium text-[#1a1a1a] no-underline" onClick={() => setMenuOpen(false)}>
              Other services
            </a>
            <a
              href="/contact"
              className="ml-auto inline-flex items-center justify-center py-2 px-5 text-sm font-medium text-[#1a1a1a] bg-white border border-gray-300 rounded-full no-underline"
              onClick={() => setMenuOpen(false)}
            >
              Contact us
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
