import { useMemo, useState } from 'react'

type Panel = {
  columns?: string[]
  rows?: string[][]
  floorPlanImages?: string[]
  priceLabel?: string
  price?: string
  planTag?: string
  priceNote?: string
}

type SizeFloorTab = { id: string; label: string }

export function Config({ selected }: { selected?: any }) {
  const [active, setActive] = useState(0)

  const tabs = useMemo(() => {
    const t = selected?.sizeFloor?.tabs
    return Array.isArray(t) ? t : []
  }, [selected])

  const panels: Record<string, Panel> = useMemo(() => {
    const p = selected?.sizeFloor?.panels
    return p && typeof p === 'object' ? (p as Record<string, Panel>) : {}
  }, [selected])

  const defaultTabId = typeof selected?.sizeFloor?.defaultTabId === 'string' ? selected.sizeFloor.defaultTabId : ''

  const resolvedTabs: SizeFloorTab[] = useMemo(() => {
    return tabs
      .map((t: any, idx: number) => ({
        id: typeof t?.id === 'string' ? t.id : `tab-${idx}`,
        label: typeof t?.label === 'string' ? t.label : `Plan ${idx + 1}`,
      }))
      .filter((t: any) => typeof t.id === 'string' && typeof t.label === 'string')
  }, [tabs])

  // When defaultTabId is present, lock initial selection to it.
  const activeIdx = useMemo(() => {
    if (!defaultTabId) return active
    const idx = resolvedTabs.findIndex((t) => t.id === defaultTabId)
    return idx >= 0 ? idx : active
  }, [active, defaultTabId, resolvedTabs])

  const activeId = resolvedTabs[Math.min(activeIdx, resolvedTabs.length - 1)]?.id
  const panel = activeId ? panels[activeId] : undefined

  const firstRow = Array.isArray(panel?.rows) && panel?.rows?.length ? panel.rows[0] : undefined
  const rowConfig = typeof firstRow?.[0] === 'string' ? firstRow[0] : ''
  const rowArea = typeof firstRow?.[1] === 'string' ? firstRow[1] : ''
  const rowFloor = typeof firstRow?.[2] === 'string' ? firstRow[2] : ''
  const rowPrice = typeof firstRow?.[3] === 'string' ? firstRow[3] : ''
  return (
    <section id="config">
      <div className="section-container">
        <div className="reveal">
          <div className="section-tag">🏡 Home Plans</div>
          <h2 className="section-title">
            {typeof selected?.sizeFloor?.titleBefore === 'string' ? selected.sizeFloor.titleBefore : 'Choose Your '}
            <span style={{ color: 'var(--aqua-dark)' }}>
              {typeof selected?.sizeFloor?.titleItalic === 'string' ? selected.sizeFloor.titleItalic : 'Residence'}
            </span>
            {typeof selected?.sizeFloor?.titleAfter === 'string' ? selected.sizeFloor.titleAfter : ''}
          </h2>
          <p style={{ marginTop: 10, color: 'var(--text-mid)', fontSize: 15, lineHeight: 1.8 }}>
            Select a plan that fits your family and your budget.
          </p>
        </div>

        <div className="config-grid">
          {resolvedTabs.map((t, idx) => {
            const p = panels[t.id]
            const r0 = Array.isArray(p?.rows) && p?.rows?.length ? p.rows[0] : undefined
            const config = typeof r0?.[0] === 'string' ? r0[0] : p?.planTag || ''
            const carpet = typeof r0?.[1] === 'string' ? r0[1] : ''
            const floor = typeof r0?.[2] === 'string' ? r0[2] : ''
            const price = (typeof p?.price === 'string' && p.price) || (typeof r0?.[3] === 'string' ? r0[3] : '')
            const priceLabel = typeof p?.priceLabel === 'string' && p.priceLabel ? p.priceLabel : 'Starting Price'

            return (
            <div
              key={t.id}
              className={`config-card ${idx % 4 === 0 ? 'c1' : idx % 4 === 1 ? 'c2' : idx % 4 === 2 ? 'c3' : 'c4'} ${
                activeIdx === idx ? 'active' : ''
              } reveal`}
              role="button"
              tabIndex={0}
              onClick={() => setActive(idx)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? setActive(idx) : null)}
            >
              <div className="config-bhk">{t.label}</div>
              <div className="config-type">{config || 'Configuration'}</div>
              {floor ? <div className="config-size">{floor}</div> : null}
              {carpet ? <div className="config-area">{carpet}</div> : null}
              <div className="config-label">{priceLabel}</div>
              <div className="config-price">{price}</div>
            </div>
            )
          })}
        </div>

        {typeof panel?.priceNote === 'string' && panel.priceNote ? (
          <p style={{ color: 'var(--text-light)', fontSize: 12, textAlign: 'center', marginTop: 20 }}>{panel.priceNote}</p>
        ) : null}

        {panel?.rows?.length ? (
          <div className="reveal" style={{ marginTop: 24, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr>
                  {(panel.columns ?? []).map((c) => (
                    <th
                      key={c}
                      style={{ textAlign: 'left', fontSize: 12, color: 'var(--text-mid)', padding: '10px 12px' }}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {panel.rows.map((r, i) => (
                  <tr key={i}>
                    {r.map((cell, j) => (
                      <td key={j} style={{ padding: '10px 12px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {panel?.floorPlanImages?.length ? (
          <div className="gallery-slider-row reveal" style={{ marginTop: 22 }}>
            <div className="gallery-slider-head">
              <div className="gallery-slider-title">{panel.planTag || 'Floor Plans'}</div>
            </div>
            <div className="gallery-slider-track" role="region" aria-label="Floor plan images">
            {panel.floorPlanImages.slice(0, 6).map((src) => (
              <div key={src} className="gallery-slide">
                <div className="gallery-slide-inner">
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div className="gallery-label">📐 Floor Plan</div>
                </div>
              </div>
            ))}
          </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

