import { useSiteSection } from '../lib/siteApi'
import { Reveal } from './Reveal'

type FooterPayload = {
  brand: { before: string; accent: string }
  copyright: string
  reraLine1: string
  reraNumber: string
  reraLine2: string
}

export function SiteFooter() {
  const { data, error } = useSiteSection<FooterPayload>('VITE_FOOTER_API_URL', '/demo-api/footer.json')

  if (error) {
    return (
      <footer className="bg-dark">
        <div className="bg-red-50 px-6 py-3 text-center text-xs text-red-800">Footer: {error}</div>
      </footer>
    )
  }

  if (!data) {
    return <footer className="min-h-20 bg-dark" aria-busy="true" />
  }

  return (
    <footer className="border-t border-white/[0.05] bg-dark px-6 py-10 min-[961px]:px-10 min-[961px]:py-10">
      <div className="flex flex-col items-center justify-between gap-4 min-[961px]:flex-row min-[961px]:text-left">
        <Reveal effect="left" delay={0} className="min-w-0 shrink">
          <div className="text-center font-display text-base font-normal text-sand min-[961px]:text-left">
            {data.brand.before}
            <span className="text-bl">{data.brand.accent}</span>
          </div>
        </Reveal>
        <Reveal effect="up" delay={80} className="min-w-0 shrink">
          <div className="text-center text-[0.68rem] leading-normal text-[#d8d0c6] min-[961px]:text-left">{data.copyright}</div>
        </Reveal>
        <Reveal effect="right" delay={140} className="min-w-0 shrink">
          <div className="text-center text-[0.68rem] leading-snug text-[#cec4b8] min-[961px]:text-right">
            {data.reraLine1}
            <strong className="text-bl">{data.reraNumber}</strong>
            <br />
            {data.reraLine2}
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
