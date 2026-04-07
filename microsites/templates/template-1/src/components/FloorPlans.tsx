import { useEffect, useMemo, useState } from 'react'
import { cn } from '../lib/cn'
import { useSiteSection } from '../lib/siteApi'
import { Reveal } from './Reveal'
import { useTemplateBasePath, withTemplateBasePath } from '../lib/basePath'

type TitleParts = { before: string; italic: string; after: string }

type Panel = {
  columns: string[]
  rows: string[][]
  /** Per-row floor plan image paths (same order as `rows`). Empty/missing entry falls back to section `blueprintImage`. */
  floorPlanImages?: (string | null | undefined)[]
  priceLabel: string
  price: string
  priceNote: string
  planTag: string
  /** @deprecated Layout now uses a shared blueprint image; kept for API compatibility. */
  planInnerModifier?: '' | '75' | '80'
}

type FloorPlansPayload = {
  sectionLabel: string
  title: TitleParts
  /** Root-relative path served from `public/` (same pattern as gallery `images[].src`), or `https://…`. */
  blueprintImage?: string
  defaultTabId: string
  tabs: { id: string; label: string }[]
  panels: Record<string, Panel>
}

/** `public/blueprints/cocoparisienne-blueprint-354233.jpg` — override via `blueprintImage` in floor plans JSON. */
const DEFAULT_FLOOR_PLAN_BLUEPRINT = '/blueprints/cocoparisienne-blueprint-354233.jpg'

/** Short label for plan tabs (e.g. "3 BHK — Type A" → "Type A"). */
function planTabLabel(configurationCell: string): string {
  const trimmed = configurationCell.trim()
  const dash = trimmed.match(/[—–]\s*(.+)$/)
  if (dash?.[1]) return dash[1].trim()
  return trimmed
}

function resolvePlanImageSrc(
  basePath: string,
  panel: Panel,
  rowIndex: number,
  fallbackBlueprint: string,
): string {
  const raw = panel.floorPlanImages?.[rowIndex]
  const path = typeof raw === 'string' ? raw.trim() : ''
  if (path) return withTemplateBasePath(basePath, path)
  return withTemplateBasePath(basePath, fallbackBlueprint)
}

export function FloorPlans() {
  const { data, error } = useSiteSection<FloorPlansPayload>('VITE_FLOORPLANS_API_URL', '/demo-api/floorplans.json')
  const basePath = useTemplateBasePath()
  const [active, setActive] = useState<string | null>(null)
  const [planRowIndex, setPlanRowIndex] = useState(0)

  useEffect(() => {
    if (!data) return
    setActive((prev) => {
      if (prev && data.panels[prev]) return prev
      if (data.defaultTabId && data.panels[data.defaultTabId]) return data.defaultTabId
      return data.tabs[0]?.id ?? null
    })
  }, [data])

  useEffect(() => {
    setPlanRowIndex(0)
  }, [active])

  if (error) {
    return (
      <section id="residences" className="px-6 py-16 min-[961px]:px-12">
        <div className="bg-red-50 px-6 py-3 text-center text-xs text-red-800">Floor plans: {error}</div>
      </section>
    )
  }

  if (!data || !active || !data.panels[active]) {
    return <section id="residences" className="min-h-[400px] px-6 py-16" aria-busy="true" />
  }

  const sectionBlueprint = data.blueprintImage?.trim() || DEFAULT_FLOOR_PLAN_BLUEPRINT

  const tableClassName = cn(
    'w-full border-collapse text-[0.84rem] text-dark',
    '[&_tbody_tr]:min-h-[3.75rem] [&_td]:border [&_td]:border-border [&_td]:px-4 [&_td]:py-4',
    '[&_th]:border [&_th]:border-border [&_th]:bg-sand [&_th]:px-4 [&_th]:py-3.5',
    '[&_th]:text-left [&_th]:text-[0.7rem] [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-[0.08em] [&_th]:text-brown',
  )

  return (
    <section id="residences" className="bg-cream px-6 py-16 min-[961px]:px-12 min-[961px]:py-20">
      <Reveal effect="fade" delay={0}>
        <div className="mb-3.5 flex items-center gap-3 text-[0.68rem] tracking-[0.2em] text-brown uppercase before:h-px before:w-5 before:bg-brown before:content-['']">
          {data.sectionLabel}
        </div>
      </Reveal>
      <Reveal effect="right" delay={60}>
        <h2 className="font-display mb-10 text-[clamp(1.8rem,3vw,2.8rem)] leading-tight font-normal text-dark">
          {data.title.before}
          <em className="text-brown italic">{data.title.italic}</em>
          {data.title.after}
        </h2>
      </Reveal>

      {/* Desktop-only BHK tabs (mobile shows these below Starting Price) */}
      <div className="-mx-1 mb-0 hidden flex-wrap gap-0.5 pb-4 min-[961px]:flex">
        {data.tabs.map((tab, i) => (
          <Reveal key={tab.id} effect="up" delay={i * 55}>
            <button
              type="button"
              className={cn(
                'min-w-0 flex-1 px-4 py-3 text-center font-sans text-[0.65rem] font-semibold uppercase tracking-[0.12em] transition-colors',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark',
                active === tab.id
                  ? 'border border-dark bg-dark text-cream shadow-sm'
                  : 'border border-beige bg-sand text-dark hover:border-brown/25 hover:bg-bxl',
              )}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          </Reveal>
        ))}
      </div>

      {data.tabs.map((tab) => {
        const panel = data.panels[tab.id]
        if (!panel) return null
        const isActive = active === tab.id
        const rowCount = panel.rows.length
        const safeRow = Math.min(planRowIndex, Math.max(0, rowCount - 1))

        return (
          <FloorPlanPanelContent
            key={tab.id}
            isActive={isActive}
            tabId={tab.id}
            panel={panel}
            tableClassName={tableClassName}
            planRowIndex={safeRow}
            onSelectRow={setPlanRowIndex}
            sectionBlueprint={sectionBlueprint}
            planTag={panel.planTag}
            allTabs={data.tabs}
            activeTabId={active}
            onSelectTab={setActive}
          />
        )
      })}
    </section>
  )
}

type PanelContentProps = {
  isActive: boolean
  tabId: string
  panel: Panel
  tableClassName: string
  planRowIndex: number
  onSelectRow: (index: number) => void
  sectionBlueprint: string
  planTag: string
  allTabs: { id: string; label: string }[]
  activeTabId: string
  onSelectTab: (tabId: string) => void
}

function FloorPlanPanelContent({
  isActive,
  tabId,
  panel,
  tableClassName,
  planRowIndex,
  onSelectRow,
  sectionBlueprint,
  planTag,
  allTabs,
  activeTabId,
  onSelectTab,
}: PanelContentProps) {
  const rowLabels = useMemo(() => panel.rows.map((row) => planTabLabel(row[0] ?? '')), [panel.rows])
  const basePath = useTemplateBasePath()
  const displaySrc = resolvePlanImageSrc(basePath, panel, planRowIndex, sectionBlueprint)
  const activeRow = panel.rows[planRowIndex]
  const selectedTitle = activeRow?.[0] ?? planTag
  const planAlt = `${selectedTitle} floor plan`

  return (
    <div
      className={cn(!isActive && 'hidden')}
      id={tabId}
      aria-hidden={!isActive}
      data-floor-plan-panel={tabId}
    >
      {/* Mobile: plan type tabs → image → selected row card → price */}
      <div className="flex min-h-0 flex-col gap-6 min-[961px]:hidden">
        <div className="rounded-2xl border border-border bg-[rgba(255,255,255,0.72)] px-4 py-4 shadow-sm backdrop-blur-sm">
          <div className="mb-1 text-[0.65rem] tracking-[0.14em] text-brown uppercase">{panel.priceLabel}</div>
          <div className="font-display text-2xl font-normal text-dark">{panel.price}</div>
          <div className="mt-1 text-[0.78rem] leading-snug text-[#5c554c]">{panel.priceNote}</div>
        </div>

        {/* BHK tabs (3/4/5) below Starting Price on mobile */}
        <div className="-mx-6 grid grid-cols-3 gap-px px-6" role="tablist" aria-label="BHK selection">
          {allTabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={activeTabId === t.id}
              className={cn(
                'min-w-0 px-3 py-3 text-center font-sans text-[0.62rem] font-semibold uppercase tracking-[0.12em] transition-colors',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark',
                activeTabId === t.id
                  ? 'bg-dark text-cream'
                  : 'bg-[rgba(255,255,255,0.75)] text-dark hover:bg-[rgba(255,255,255,0.92)]',
              )}
              onClick={() => onSelectTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Floor plan types"
        >
          {panel.rows.map((_, ri) => (
            <button
              key={ri}
              type="button"
              role="tab"
              aria-selected={planRowIndex === ri}
              className={cn(
                'shrink-0 rounded-full border px-4 py-2.5 text-center font-sans text-[0.62rem] font-semibold uppercase tracking-widest transition-colors',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark',
                planRowIndex === ri
                  ? 'border-dark bg-dark text-cream shadow-sm'
                  : 'border-border bg-[rgba(255,255,255,0.75)] text-dark hover:border-brown/30 hover:bg-[rgba(255,255,255,0.9)]',
              )}
              onClick={() => onSelectRow(ri)}
            >
              {rowLabels[ri]}
            </button>
          ))}
        </div>

        <FloorPlanImageBlock displaySrc={displaySrc} planAlt={planAlt} badgeLabel={selectedTitle} compactBadge />

        {panel.rows[planRowIndex] ? (
          <div className="rounded-xl border border-border bg-[rgba(255,255,255,0.75)] px-4 py-4 shadow-sm backdrop-blur-sm">
            <div className="mb-3 font-sans text-[0.88rem] font-semibold leading-snug text-dark">
              {panel.rows[planRowIndex][0]}
            </div>
            {panel.columns.slice(1).map((col, ci) => (
              <div
                key={col}
                className="flex items-baseline justify-between gap-3 border-t border-border/80 py-2.5 first:border-t-0 first:pt-0"
              >
                <span className="text-[0.74rem] uppercase tracking-[0.06em] text-brown">{col}</span>
                <span className="text-right text-[0.84rem] font-medium tabular-nums text-dark">
                  {panel.rows[planRowIndex][ci + 1] ?? '—'}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Desktop: table + price | image */}
      <div className="hidden min-h-0 min-[961px]:grid min-[961px]:grid-cols-2 min-[961px]:items-start min-[961px]:gap-12">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="rounded-2xl border border-border bg-[rgba(255,255,255,0.7)] px-5 py-5 shadow-sm backdrop-blur-sm">
            <div className="mb-1 text-[0.65rem] tracking-[0.14em] text-brown uppercase">{panel.priceLabel}</div>
            <div className="font-display text-2xl font-normal text-dark">{panel.price}</div>
            <div className="mt-1 text-[0.78rem] leading-snug text-[#5c554c]">{panel.priceNote}</div>
          </div>

          <div className="overflow-x-auto">
            <table className={tableClassName}>
              <thead>
                <tr>
                  {panel.columns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {panel.rows.map((row, ri) => (
                  <tr
                    key={ri}
                    className={cn(
                      'cursor-pointer transition-colors',
                      planRowIndex === ri ? 'bg-[rgba(139,115,85,0.12)]' : 'hover:bg-sand/80',
                    )}
                    onClick={() => onSelectRow(ri)}
                  >
                    {row.map((cell, ci) => (
                      <td key={ci}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="relative flex min-h-[min(52vh,440px)] flex-col items-stretch min-[961px]:min-h-[min(60vh,520px)] min-[961px]:min-w-0">
          <FloorPlanImageBlock displaySrc={displaySrc} planAlt={planAlt} badgeLabel={selectedTitle} compactBadge={false} />
        </div>
      </div>
    </div>
  )
}

function FloorPlanImageBlock({
  displaySrc,
  planAlt,
  badgeLabel,
  compactBadge,
}: {
  displaySrc: string
  planAlt: string
  badgeLabel: string
  compactBadge: boolean
}) {
  return (
    <div className="relative flex min-h-[min(48vh,360px)] flex-1 flex-col items-stretch sm:min-h-[min(50vh,400px)]">
      <div
        className={cn(
          'absolute left-3 top-3 z-2 max-w-[calc(100%-1.5rem)] rounded-full border border-border bg-cream/95 px-3.5 py-1.5 font-semibold uppercase tracking-widest text-dark shadow-sm backdrop-blur-sm min-[961px]:left-6 min-[961px]:top-6',
          compactBadge ? 'text-[0.62rem] leading-tight' : 'text-[0.68rem]',
        )}
      >
        {badgeLabel}
      </div>
      <div className="relative flex min-h-[inherit] flex-1 items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-[#e8e4de] p-4 min-[961px]:aspect-4/3 min-[961px]:min-h-[320px] min-[961px]:p-8">
        <div className="relative w-full max-w-[520px] overflow-hidden rounded-xl border border-[rgba(46,46,46,0.12)] bg-cream p-2.5 shadow-[0_12px_40px_rgba(44,38,32,0.08)] min-[961px]:max-w-none min-[961px]:p-3">
          <img className="block h-auto w-full object-contain" src={displaySrc} alt={planAlt} loading="lazy" decoding="async" />
        </div>
      </div>
    </div>
  )
}
