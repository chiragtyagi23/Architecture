import { useSiteSection } from '../lib/siteApi'
import { cn } from '../lib/cn'
import { Reveal } from './Reveal'

type TitleParts = { before: string; italic: string; after: string }

type OverviewPayload = {
  sectionLabel: string
  title: TitleParts
  body: string
  facts: { key: string; value: string; tone?: 'green' | 'brown' }[]
  certificationsTitle: string
  certifications: { label: string; value: string; tone?: 'green' }[]
}

export function Overview() {
  const { data, error } = useSiteSection<OverviewPayload>('VITE_OVERVIEW_API_URL', '/demo-api/overview.json')

  if (error) {
    return (
      <section className="p-16 px-6 min-[961px]:px-12" id="overview">
        <div className="bg-red-50 px-6 py-3 text-center text-xs text-red-800">Overview: {error}</div>
      </section>
    )
  }

  if (!data) {
    return <section className="min-h-[400px] p-16 px-6" id="overview" aria-busy="true" />
  }

  return (
    <section className="p-16 px-6 min-[961px]:px-12 min-[961px]:py-20" id="overview">
      <Reveal effect="fade" delay={0}>
        <div className="mb-3.5 flex items-center gap-3 text-[0.68rem] tracking-[0.2em] text-brown uppercase before:h-px before:w-5 before:bg-brown before:content-['']">
          {data.sectionLabel}
        </div>
      </Reveal>
      <Reveal effect="left" delay={60}>
        <h2 className="font-display mb-4 text-[clamp(1.8rem,3vw,2.8rem)] leading-tight font-normal text-dark">
          {data.title.before}
          <em className="text-brown italic">{data.title.italic}</em>
          {data.title.after}
        </h2>
      </Reveal>
      <Reveal effect="right" delay={120}>
        <p className="mb-12 max-w-[640px] text-[0.88rem] leading-[1.9] text-[#4a4540]">{data.body}</p>
      </Reveal>

      <div className="mt-12 grid max-w-full items-start gap-16 max-[960px]:grid-cols-1 max-[960px]:gap-6 min-[961px]:grid-cols-2">
        <Reveal effect="left" delay={80} className="min-w-0">
          <div className="flex flex-col gap-0">
            {data.facts.map((row, i) => (
              <Reveal key={row.key} effect="up" delay={i * 55}>
                <div className="flex items-center justify-between border-border border-b py-4 text-[0.85rem] first:border-t">
                  <span className="tracking-[0.04em] text-[#5c554c]">{row.key}</span>
                  <span
                    className={cn(
                      'text-right font-medium text-dark',
                      row.tone === 'green' && 'text-green',
                      row.tone === 'brown' && 'text-brown',
                    )}
                  >
                    {row.value}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal effect="right" delay={100} className="min-w-0">
          <div>
            <div className="mt-8 bg-dark p-8 min-[961px]:mt-8">
              <Reveal effect="up" delay={0}>
                <div className="mb-3 text-[0.65rem] tracking-[0.18em] text-bl uppercase">
                  {data.certificationsTitle}
                </div>
              </Reveal>
              <div className="grid grid-cols-2 gap-3 [&>.reveal]:min-w-0">
                {data.certifications.map((c, i) => (
                  <Reveal key={c.label} effect="scale" delay={80 + i * 70}>
                    <div>
                      <p className="mb-1 text-[0.68rem] tracking-[0.06em] text-[#c4b8a8]">{c.label}</p>
                      <span
                        className={cn(
                          'text-[0.88rem] font-medium text-sand',
                          c.tone === 'green' && '!text-green',
                        )}
                      >
                        {c.value}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
