import { useMemo, useState } from 'react'
import { useSiteSection } from '../lib/siteApi'
import { cn } from '../lib/cn'
import { Reveal } from './Reveal'

type TitleParts = { before: string; italic: string; after: string }

type MinuteLine = { label: string; minutes: string }
type NamedPlace = { name: string; minutes: string }

type LocationPayload = {
  sectionLabel: string
  title: TitleParts
  intro?: string
  transportation: {
    title: string
    lines: MinuteLine[]
  }
  education: {
    title: string
    schools: { title: string; places: NamedPlace[] }
    colleges: { title: string; places: NamedPlace[] }
  }
  conveniences: {
    title: string
    hospitals: { title: string; places: NamedPlace[] }
    shoppingMalls: { title: string; places: NamedPlace[] }
  }
}

function formatMins(minutes: string): string {
  const t = minutes.trim()
  if (!t || t === '—') return '— min'
  if (t === '__') return '__ mins'
  if (/\bmin/i.test(t)) return t
  return `${t} min`
}

export function LocationMap() {
  const { data, error } = useSiteSection<LocationPayload>('VITE_LOCATION_API_URL', '/demo-api/location.json')
  const [openId, setOpenId] = useState<'transport' | 'education' | 'conveniences' | null>('transport')

  const subTitle = 'mb-2.5 mt-6 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brown first:mt-0'
  const listCls = 'm-0 list-none space-y-2 p-0'
  const lineCls =
    'relative pl-4 text-[0.88rem] leading-relaxed text-[#3d3832] before:absolute before:left-0 before:text-brown before:content-["–"]'

  // Important: keep hook order stable even while data is loading.
  const cards = useMemo(() => {
    if (!data) return [] as const

    const transportation = data.transportation ?? { title: 'Transportation', lines: [] }
    const education = data.education ?? {
      title: 'Nearby Educational institutes',
      schools: { title: 'Schools', places: [] },
      colleges: { title: 'Colleges', places: [] },
    }
    const conveniences = data.conveniences ?? {
      title: 'Nearby Conveniences',
      hospitals: { title: 'Hospitals', places: [] },
      shoppingMalls: { title: 'Shopping malls', places: [] },
    }

    return [
      {
        id: 'transport' as const,
        title: transportation.title,
        preview: (transportation.lines ?? []).slice(0, 2).map((r) => `${r.label} · ${formatMins(r.minutes)}`),
        content: (
          <ul className={listCls}>
            {(transportation.lines ?? []).map((row, i) => (
              <li key={`t-${i}`} className={lineCls}>
                <span className="font-medium text-[#322c26]">{row.label}</span>
                <span className="text-brown"> - {formatMins(row.minutes)}</span>
              </li>
            ))}
          </ul>
        ),
      },
      {
        id: 'education' as const,
        title: education.title,
        preview: [
          ...((education.schools.places ?? []).slice(0, 1).map((p) => `${p.name} · ${formatMins(p.minutes)}`)),
          ...((education.colleges.places ?? []).slice(0, 1).map((p) => `${p.name} · ${formatMins(p.minutes)}`)),
        ],
        content: (
          <>
            <p className={subTitle}>{education.schools.title}</p>
            <ul className={cn(listCls, 'mb-6')}>
              {(education.schools.places ?? []).map((p, i) => (
                <li key={`school-${i}`} className={lineCls}>
                  <span className="font-medium text-[#322c26]">{p.name}</span>
                  <span className="text-brown"> - {formatMins(p.minutes)}</span>
                </li>
              ))}
            </ul>
            <p className={subTitle}>{education.colleges.title}</p>
            <ul className={listCls}>
              {(education.colleges.places ?? []).map((p, i) => (
                <li key={`college-${i}`} className={lineCls}>
                  <span className="font-medium text-[#322c26]">{p.name}</span>
                  <span className="text-brown"> - {formatMins(p.minutes)}</span>
                </li>
              ))}
            </ul>
          </>
        ),
      },
      {
        id: 'conveniences' as const,
        title: conveniences.title,
        preview: [
          ...((conveniences.hospitals.places ?? []).slice(0, 1).map((p) => `${p.name} · ${formatMins(p.minutes)}`)),
          ...((conveniences.shoppingMalls.places ?? []).slice(0, 1).map((p) => `${p.name} · ${formatMins(p.minutes)}`)),
        ],
        content: (
          <div className="grid gap-8 min-[640px]:grid-cols-2 min-[961px]:gap-12">
            <div>
              <p className={subTitle}>{conveniences.hospitals.title}</p>
              <ul className={listCls}>
                {(conveniences.hospitals.places ?? []).map((p, i) => (
                  <li key={`hospital-${i}`} className={lineCls}>
                    <span className="font-medium text-[#322c26]">{p.name}</span>
                    <span className="text-brown"> - {formatMins(p.minutes)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={subTitle}>{conveniences.shoppingMalls.title}</p>
              <ul className={listCls}>
                {(conveniences.shoppingMalls.places ?? []).map((p, i) => (
                  <li key={`mall-${i}`} className={lineCls}>
                    <span className="font-medium text-[#322c26]">{p.name}</span>
                    <span className="text-brown"> - {formatMins(p.minutes)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ),
      },
    ] as const
  }, [data, listCls, lineCls, subTitle])

  if (error) {
    return (
      <section className="bg-sand px-6 py-16 min-[961px]:px-12" id="location">
        <div className="bg-red-50 px-6 py-3 text-center text-xs text-red-800">Location: {error}</div>
      </section>
    )
  }

  if (!data) {
    return <section className="min-h-[240px] bg-sand px-6" id="location" aria-busy="true" />
  }

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
      {data.intro?.trim() ? (
        <Reveal effect="up" delay={100}>
          <p className="mb-10 max-w-[680px] text-[0.88rem] leading-[1.9] text-[#4a4540]">{data.intro.trim()}</p>
        </Reveal>
      ) : (
        <div className="mb-10" />
      )}

      <div className="grid w-full max-w-3xl grid-cols-1 justify-items-stretch gap-4 text-left min-[961px]:gap-5">
        {cards.map((card, idx) => {
          const expanded = openId === card.id
          const panelId = `location-card-${card.id}-panel`
          const btnId = `location-card-${card.id}-btn`

          return (
            <Reveal key={card.id} effect="up" delay={80 + idx * 60} className="min-w-0">
              <div
                className={cn(
                  'rounded-2xl border border-border bg-cream/80 shadow-[0_16px_40px_rgba(46,46,46,0.08)] backdrop-blur-sm transition-[box-shadow,transform,border-color] duration-200 ease-out',
                  expanded && 'border-brown/25 shadow-[0_28px_70px_rgba(46,46,46,0.14)]',
                )}
              >
                <button
                  id={btnId}
                  type="button"
                  className={cn(
                    'w-full cursor-pointer border-0 bg-transparent p-5 text-left min-[961px]:p-6',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown/60',
                  )}
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpenId((cur) => (cur === card.id ? null : card.id))}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="font-display text-[1.15rem] font-normal leading-tight text-dark min-[961px]:text-[1.25rem]">
                        {card.title}
                      </div>
                      {card.preview.length > 0 ? (
                        <div className="mt-2 text-[0.8rem] leading-relaxed text-[#4a4540]">
                          {card.preview.join(' • ')}
                        </div>
                      ) : null}
                    </div>
                    <div
                      className={cn(
                        'mt-0.5 shrink-0 rounded-full border border-border bg-cream px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-brown transition-colors',
                        expanded && 'border-brown/30 bg-[rgba(196,168,130,0.16)]',
                      )}
                      aria-hidden="true"
                    >
                      {expanded ? 'Hide' : 'View'}
                    </div>
                  </div>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className={cn(
                    'grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.32,1)]',
                    expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="min-h-0">
                    <div className="border-t border-border px-5 pb-5 pt-4">{card.content}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
