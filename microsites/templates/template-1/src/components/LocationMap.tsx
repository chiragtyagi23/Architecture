import { Fragment, useState } from 'react'
import { useSiteSection } from '../lib/siteApi'
import { cn } from '../lib/cn'
import { Reveal } from './Reveal'

type TitleParts = { before: string; italic: string; after: string }

type LocationPayload = {
  sectionLabel: string
  title: TitleParts
  body: string
  landmarks: { top: string; left: string; line1: string; line2: string }[]
  pinLabel: string
  distances: { label: string; value: string }[]
  legend: { label: string; variant: 'project' | 'roads' | 'green' }[]
}

export function LocationMap() {
  const { data, error } = useSiteSection<LocationPayload>('VITE_LOCATION_API_URL', '/demo-api/location.json')
  const [showDistances, setShowDistances] = useState(false)

  if (error) {
    return (
      <section className="bg-sand px-6 py-16 min-[961px]:px-12" id="location">
        <div className="bg-red-50 px-6 py-3 text-center text-xs text-red-800">Location: {error}</div>
      </section>
    )
  }

  if (!data) {
    return <section className="min-h-[400px] bg-sand px-6" id="location" aria-busy="true" />
  }

  const distancesTitle = (() => {
    const label = data.pinLabel?.trim()
    return label ? `${label} — Connectivity` : 'Connectivity'
  })()

  return (
    <section className="bg-sand px-6 py-16 min-[961px]:px-12 min-[961px]:py-20" id="location">
      <Reveal effect="left" delay={0}>
        <div className="mb-3.5 flex items-center gap-3 text-[0.68rem] tracking-[0.2em] text-brown uppercase before:h-px before:w-5 before:bg-brown before:content-['']">
          {data.sectionLabel}
        </div>
      </Reveal>
      <Reveal effect="right" delay={60}>
        <h2 className="font-display mb-4 text-[clamp(1.8rem,3vw,2.8rem)] leading-tight font-normal text-dark">
          {data.title.before}
          <em className="text-brown italic">{data.title.italic}</em>
          {data.title.after}
        </h2>
      </Reveal>
      <Reveal effect="up" delay={120}>
        <p className="mb-12 max-w-[640px] text-[0.88rem] leading-[1.9] text-[#4a4540]">{data.body}</p>
      </Reveal>

      <Reveal effect="scale" delay={80} className="block w-full">
        <div className="relative mt-12 flex h-[420px] items-center justify-center overflow-hidden bg-dark">
          <div
            className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_49px,rgba(139,115,85,0.07)_50px),repeating-linear-gradient(90deg,transparent,transparent_49px,rgba(139,115,85,0.07)_50px)]"
            aria-hidden
          />

          <div className="map-road absolute top-[35%] h-[3px] w-full bg-[rgba(139,115,85,0.15)]" />
          <div className="map-road absolute top-[60%] h-0.5 w-full bg-[rgba(139,115,85,0.15)]" />
          <div className="map-road absolute top-[75%] h-0.5 w-full bg-[rgba(139,115,85,0.15)]" />
          <div className="map-road absolute bottom-0 left-[30%] top-0 w-0.5 bg-[rgba(139,115,85,0.15)]" />
          <div className="map-road absolute bottom-0 left-[55%] top-0 w-[3px] bg-[rgba(139,115,85,0.15)]" />
          <div className="map-road absolute bottom-0 left-[75%] top-0 w-0.5 bg-[rgba(139,115,85,0.15)]" />

          {data.landmarks.map((lm) => (
            <div
              key={lm.line1}
              className="absolute text-center text-[0.6rem] tracking-[0.08em] text-[#c9bfb2] uppercase"
              style={{ top: lm.top, left: lm.left }}
            >
              {lm.line1}
              <span className="mt-1 block text-[0.55rem] text-[#a89e92] normal-case">{lm.line2}</span>
            </div>
          ))}

          <div className="absolute top-[34%] left-[53.5%] z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1">
            <div className="h-3.5 w-3.5 animate-pulse-pin rounded-full bg-brown" />
            <div className="bg-brown px-3.5 py-1 text-[0.65rem] font-medium tracking-[0.08em] text-cream uppercase whitespace-nowrap">
              {data.pinLabel}
            </div>
          </div>

          <div className="absolute top-6 right-6 z-10">
            <button
              type="button"
              className={cn(
                'rounded-full border border-white/12 bg-dark/80 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-sand shadow-sm backdrop-blur-sm transition-colors',
                'hover:bg-dark/90 hover:border-white/18',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream/70',
              )}
              aria-expanded={showDistances}
              aria-controls="location-connectivity"
              onClick={() => setShowDistances((v) => !v)}
            >
              {showDistances ? 'Hide Connectivity' : 'Show Connectivity'}
            </button>
          </div>

          <div className="absolute bottom-6 left-6 flex flex-col gap-2.5 bg-dark/90 p-4 backdrop-blur-sm">
            {data.legend.map((leg) => (
              <div
                key={leg.label}
                className="flex items-center gap-3 text-[0.8125rem] font-semibold leading-snug text-[#c9c0b6]"
              >
                <div
                  className={cn(
                    'h-2 w-2 shrink-0 rounded-full',
                    leg.variant === 'project' && 'bg-brown',
                    leg.variant === 'roads' && 'bg-[rgba(139,115,85,0.4)]',
                    leg.variant === 'green' && 'bg-green',
                  )}
                />
                {leg.label}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div
        id="location-connectivity"
        className={cn(
          'mt-6 overflow-hidden rounded-2xl border border-border bg-cream/70 shadow-sm backdrop-blur-sm transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.32,1)]',
          showDistances ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0',
        )}
        aria-hidden={!showDistances}
      >
        <div className="flex flex-col gap-3 px-5 py-5 min-[961px]:px-6">
          <div className="flex items-baseline justify-between gap-4">
            <div className="font-display text-[1.2rem] font-normal text-dark">{distancesTitle}</div>
            <div className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-brown">Drive time</div>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-2 text-[0.9rem] leading-snug">
            {data.distances.map((d) => (
              <Fragment key={d.label}>
                <span className="min-w-0 font-semibold text-[#3d3832]">{d.label}</span>
                <span className="text-right font-bold tabular-nums tracking-wide text-brown">{d.value}</span>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
