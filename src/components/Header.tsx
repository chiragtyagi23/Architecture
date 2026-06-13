import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/property', label: 'Property' },
  { href: '/blogs', label: 'Blogs' },
]

type Props = {
  onOpenContact?: () => void
}

function Header({ onOpenContact }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  function openContact() {
    setMenuOpen(false)
    onOpenContact?.()
  }

  return (
    <header className="landing-header">
      <div className="landing-container landing-header__inner">
        <div className="landing-header__left">
          <Link href="/" className="landing-header__logo-link" aria-label="Home">
            <img
              className="landing-header__logo"
              src="/assets/header-logo.png"
              alt="Real estate logo"
            />
          </Link>

          <nav className="landing-header__nav" aria-label="Main">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`landing-header__link${pathname === link.href ? ' landing-header__link--active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="landing-header__actions">
          <button type="button" className="landing-btn landing-btn--primary landing-btn--header" onClick={openContact}>
            Contact us
          </button>
        </div>

        <button
          type="button"
          className="landing-header__menu-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div className={`landing-container landing-header__mobile${menuOpen ? ' landing-header__mobile--open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`landing-header__link${pathname === link.href ? ' landing-header__link--active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <div className="landing-header__mobile-actions">
          <button type="button" className="landing-btn landing-btn--primary landing-btn--header" onClick={openContact}>
            Contact us
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
