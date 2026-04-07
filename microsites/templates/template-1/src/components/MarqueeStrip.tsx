import { useSiteSection } from '../lib/siteApi'

type MarqueePayload = { items: string[] }

export function MarqueeStrip() {
  const { data, error } = useSiteSection<MarqueePayload>('VITE_MARQUEE_API_URL', '/demo-api/marquee.json')

  if (error || !data?.items?.length) {
    return error ? (
      <div className="bg-brown py-2.5">
        <div className="bg-red-50 px-6 py-2 text-center text-xs text-red-800">Marquee: {error}</div>
      </div>
    ) : null
  }

  const doubled = [...data.items, ...data.items]

  return (
    <div className="overflow-hidden whitespace-nowrap bg-brown py-2.5">
      <div className="inline-flex animate-marquee gap-10">
        {doubled.map((text, i) => (
          <span
            key={`${text}-${i}`}
            className="inline-flex items-center gap-8 font-sans text-[0.68rem] tracking-[0.16em] text-cream uppercase after:text-[0.45rem] after:text-bl after:content-['◆']"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
