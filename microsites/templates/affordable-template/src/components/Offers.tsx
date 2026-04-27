import { useMemo, useState } from 'react'

function offerCreatives(selected: any): { url: string; timeText: string }[] {
  const rows = Array.isArray(selected?.projectImages) ? selected.projectImages : []
  const grp = rows.find((r: any) => String(r?.tag ?? '') === '__festival_offers')
  const imgs = Array.isArray(grp?.images) ? grp.images : []
  const fromGroup = imgs
    .map((i: any) => ({
      url: typeof i?.src === 'string' ? i.src : '',
      timeText: typeof i?.alt === 'string' ? i.alt : '',
    }))
    .filter((d: any) => d.url.trim().length > 0)
  if (fromGroup.length) return fromGroup

  // fallback (older data)
  const docs = Array.isArray(selected?.documents) ? selected.documents : []
  return docs
    .filter((d: any) => String(d?.type ?? '') === 'offer_creative' && typeof d?.url === 'string')
    .map((d: any) => ({ url: d.url, timeText: typeof d?.alt === 'string' ? d.alt : '' }))
    .filter((d: any) => d.url.trim().length > 0)
}

export function Offers({ selected }: { selected?: any }) {
  const items = useMemo(() => offerCreatives(selected), [selected])
  if (!items.length) return null

  const slides = items.map((i) => i)
  const [idx, setIdx] = useState(0)
  const safeIdx = slides.length ? ((idx % slides.length) + slides.length) % slides.length : 0
  const go = (dir: -1 | 1) => setIdx((i) => i + dir)

  return (
    <section id="offers">
      <div className="section-container">
        <div className="reveal">
          <div className="section-tag">🎉 Offers</div>
          <h2 className="section-title">
            Festival <span style={{ color: 'var(--red)' }}>Deals</span>
          </h2>
        </div>

        <div className="reveal" style={{ marginTop: 18 }}>
          <div
            className="rounded-3xl overflow-hidden border border-black/10 bg-black shadow-[0_18px_54px_rgba(0,0,0,0.18)]"
            style={{ height: 'min(86vh, 780px)', position: 'relative' as any }}
          >
            <img
              src={slides[safeIdx]?.url}
              alt=""
              loading="eager"
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            />
            <div
              style={{
                position: 'absolute',
                left: 14,
                bottom: 14,
                background: 'rgba(0,0,0,0.6)',
                color: '#fff',
                padding: '8px 10px',
                borderRadius: 14,
                fontSize: 12,
                fontWeight: 800,
                maxWidth: 'calc(100% - 28px)',
              }}
            >
              Offer
              {slides[safeIdx]?.timeText && String(slides[safeIdx]?.timeText).trim()
                ? ` · ${String(slides[safeIdx]?.timeText).trim()}`
                : ''}
            </div>

            {slides.length > 1 ? (
              <>
                <button
                  type="button"
                  aria-label="Previous offer"
                  onClick={() => go(-1)}
                  style={{
                    position: 'absolute',
                    left: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 42,
                    height: 42,
                    borderRadius: 999,
                    border: 'none',
                    background: 'rgba(0,0,0,0.55)',
                    color: '#fff',
                    fontSize: 22,
                    cursor: 'pointer',
                  }}
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Next offer"
                  onClick={() => go(1)}
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 42,
                    height: 42,
                    borderRadius: 999,
                    border: 'none',
                    background: 'rgba(0,0,0,0.55)',
                    color: '#fff',
                    fontSize: 22,
                    cursor: 'pointer',
                  }}
                >
                  ›
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

