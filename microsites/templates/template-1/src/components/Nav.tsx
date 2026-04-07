import { type MouseEvent, useEffect, useState } from 'react'
import { scrollToSection, useSiteSection } from '../lib/siteApi'
import { cn } from '../lib/cn'
import { Reveal } from './Reveal'
import { useTemplateBasePath } from '../lib/basePath'

type NavPayload = {
  logo: { textMain: string; textSecondary: string }
  menuItems: { label: string; link: string }[]
  cta: { label: string; link: string }
}

type NavProps = {
  suppressLogo?: boolean
}

export function Nav({ suppressLogo = false }: NavProps) {
  const { data, error } = useSiteSection<NavPayload>('VITE_NAV_API_URL', '/demo-api/nav.json')
  const [menuOpen, setMenuOpen] = useState(false)
  const basePath = useTemplateBasePath()

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 961px)')
    const onChange = () => {
      if (mq.matches) setMenuOpen(false)
    }
    mq.addEventListener('change', onChange)
    onChange()
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const onNavClick = (e: MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault()
    scrollToSection(link)
    setMenuOpen(false)
  }

  const onCta = () => {
    scrollToSection(data?.cta.link ?? '#enquiry')
    setMenuOpen(false)
  }

  if (error) {
    return (
      <div className="fixed top-0 right-0 left-0 z-[300] bg-red-50 px-6 py-3 text-center text-xs text-red-800">
        Navigation: {error}
      </div>
    )
  }

  if (!data) {
    return (
      <nav
        className="fixed top-0 right-0 left-0 z-50 flex flex-col items-stretch border-b border-border bg-cream/95 p-0 backdrop-blur-md"
        aria-busy="true"
      >
        <div className="relative z-[3] grid min-h-[4.75rem] grid-cols-[1fr_auto] items-center gap-x-4 px-5 py-3.5 min-[961px]:grid-cols-[1fr_auto_1fr] min-[961px]:gap-x-6 min-[961px]:px-14 min-[961px]:py-4">
          <a
            href={`${basePath || ''}/`}
            className={cn(
              'justify-self-start font-display text-xl font-medium tracking-[0.04em] text-dark no-underline transition-opacity duration-[520ms] [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)]',
              suppressLogo && 'pointer-events-none opacity-0',
            )}
            onClick={(e) => e.preventDefault()}
            tabIndex={suppressLogo ? -1 : undefined}
            aria-hidden={suppressLogo}
          >
            <span>Project</span>
            <span className="text-bl"> Name</span>
          </a>
        </div>
      </nav>
    )
  }

  return (
    <nav
      className={cn(
        'fixed top-0 right-0 left-0 z-50 flex flex-col items-stretch border-b border-border bg-cream/95 p-0 backdrop-blur-md',
        menuOpen ? '' : '',
      )}
      aria-label="Main navigation"
    >
      {menuOpen ? (
        <button
          type="button"
          className="animate-nav-scrim-in fixed top-[4.75rem] right-0 bottom-0 left-0 z-[1] m-0 cursor-pointer border-0 bg-dark/40 p-0 min-[961px]:hidden"
          aria-label="Close menu"
          tabIndex={-1}
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <div className="relative z-[3] grid min-h-[4.75rem] grid-cols-[1fr_auto] items-center gap-x-4 px-5 py-3.5 min-[961px]:auto-rows-min min-[961px]:min-h-0 min-[961px]:grid-cols-[1fr_auto_1fr] min-[961px]:gap-x-6 min-[961px]:px-14 min-[961px]:py-4">
        <Reveal effect="fade" delay={0} rootMargin="0px 0px 0px 0px" className="justify-self-start min-[961px]:col-span-1">
          <a
            href={`${basePath || ''}/`}
            className={cn(
              'nav-logo cursor-pointer justify-self-start font-display text-xl font-medium tracking-[0.04em] text-dark no-underline transition-opacity duration-[520ms] [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)]',
              suppressLogo && 'pointer-events-none opacity-0',
            )}
            aria-hidden={suppressLogo}
            onClick={(e) => {
              e.preventDefault()
              setMenuOpen(false)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <span className="nav-logo__main">{data.logo.textMain}</span>
            <span className="text-bl"> {data.logo.textSecondary}</span>
          </a>
        </Reveal>

        <ul className="hidden list-none justify-center gap-x-[clamp(1rem,2.2vw,2.25rem)] p-0 min-[961px]:col-start-2 min-[961px]:flex">
          {data.menuItems.map((item, i) => (
            <li key={item.label}>
              <Reveal
                effect={i % 2 === 0 ? 'left' : 'right'}
                delay={60 + i * 50}
                className="block max-[960px]:hidden"
                rootMargin="0px 0px 0px 0px"
              >
                <a
                  href={item.link}
                  className="block font-sans text-[0.72rem] font-medium tracking-[0.12em] text-dark uppercase no-underline whitespace-nowrap transition-colors hover:text-brown"
                  onClick={(e) => onNavClick(e, item.link)}
                >
                  {item.label}
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="hidden min-[961px]:col-start-3 min-[961px]:flex min-[961px]:items-center min-[961px]:justify-end">
          <Reveal effect="left" delay={120} rootMargin="0px 0px 0px 0px" className="flex justify-end">
            <button
              type="button"
              className="cursor-pointer border-0 bg-dark px-7 py-2.5 font-sans text-[0.72rem] font-medium tracking-[0.12em] text-cream uppercase transition-colors hover:bg-brown"
              onClick={onCta}
            >
              {data.cta.label}
            </button>
          </Reveal>
        </div>

        <div className="flex items-center justify-end gap-1.5 justify-self-end min-[961px]:hidden">
          <Reveal effect="left" delay={100} rootMargin="0px 0px 0px 0px" className="flex">
            <button
              type="button"
              className="max-w-[9.5rem] cursor-pointer truncate border-0 bg-dark px-3.5 py-2 font-sans text-[0.62rem] font-medium tracking-[0.1em] text-cream uppercase whitespace-nowrap transition-colors hover:bg-brown"
              onClick={onCta}
            >
              {data.cta.label}
            </button>
          </Reveal>
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-border bg-transparent text-dark transition-[background,border-color] hover:border-[rgba(139,115,85,0.35)] hover:bg-[rgba(196,168,130,0.14)]"
            aria-expanded={menuOpen}
            aria-controls="nav-mobile-drawer"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="flex w-[1.1rem] flex-col gap-[5px]" aria-hidden="true">
              <span
                className={cn(
                  'block h-0.5 rounded-[1px] bg-current transition-[transform,opacity] duration-200 ease-out',
                  menuOpen && 'translate-y-[7px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'block h-0.5 rounded-[1px] bg-current transition-[transform,opacity] duration-200 ease-out',
                  menuOpen && 'opacity-0',
                )}
              />
              <span
                className={cn(
                  'block h-0.5 rounded-[1px] bg-current transition-[transform,opacity] duration-200 ease-out',
                  menuOpen && '-translate-y-[7px] -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="nav-mobile-drawer"
        className={cn(
          'fixed top-[4.75rem] right-0 left-0 z-[2] overflow-hidden border-b border-border bg-[rgba(252,249,244,0.99)] shadow-[0_16px_48px_rgba(46,46,46,0.12)] transition-[max-height,visibility] duration-[380ms] ease-out [-webkit-overflow-scrolling:touch] max-h-0 invisible min-[961px]:hidden',
          menuOpen && 'max-h-[min(78vh,480px)] overflow-y-auto visible',
        )}
        aria-hidden={!menuOpen}
        inert={menuOpen ? undefined : true}
      >
        <ul className="mt-1 flex list-none flex-col items-stretch gap-0 p-0">
          {data.menuItems.map((item) => (
            <li key={item.label} className="border-b border-border last:border-b-0">
              <a
                href={item.link}
                className="block px-5 py-4 font-sans text-[0.78rem] font-medium tracking-[0.12em] text-dark uppercase no-underline transition-colors hover:text-brown max-[960px]:whitespace-normal"
                onClick={(e) => onNavClick(e, item.link)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="mx-5 mb-4 mt-3 block w-[calc(100%-2.5rem)] cursor-pointer border-0 bg-dark py-3 text-center font-sans text-[0.72rem] font-medium tracking-[0.12em] text-cream uppercase transition-colors hover:bg-brown"
          onClick={onCta}
        >
          {data.cta.label}
        </button>
      </div>
    </nav>
  )
}
