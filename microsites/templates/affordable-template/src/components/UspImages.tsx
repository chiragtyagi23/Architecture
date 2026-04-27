import { useMemo, useState } from 'react'

function uspImages(selected: any): { url: string }[] {
  const rows = Array.isArray(selected?.projectImages) ? selected.projectImages : []
  const grp = rows.find((r: any) => String(r?.tag ?? '') === '__usp_images')
  const imgs = Array.isArray(grp?.images) ? grp.images : []
  const fromGroup = imgs
    .map((i: any) => ({ url: typeof i?.src === 'string' ? i.src : '' }))
    .filter((d: any) => d.url.trim().length > 0)
    .slice(0, 3)
  if (fromGroup.length) return fromGroup

  // fallback (older data)
  const docs = Array.isArray(selected?.documents) ? selected.documents : []
  return docs
    .filter((d: any) => String(d?.type ?? '') === 'usp_image' && typeof d?.url === 'string')
    .map((d: any) => ({ url: d.url }))
    .filter((d: any) => d.url.trim().length > 0)
    .slice(0, 3)
}

export function UspImages({ selected }: { selected?: any }) {
  const items = useMemo(() => uspImages(selected), [selected])
  if (!items.length) return null

  const [idx, setIdx] = useState(0)
  const safeIdx = items.length ? ((idx % items.length) + items.length) % items.length : 0
  const go = (dir: -1 | 1) => setIdx((i) => i + dir)

  return (
    <section id="usp">
      <div className="section-container">
        <div className="reveal">
          <div className="section-tag">✨ USP</div>
          <h2 className="section-title">
            What Makes It <span style={{ color: 'var(--red)' }}>Different</span>
          </h2>
        </div>

        <div className="reveal" style={{ marginTop: 18 }}>
          <div
            className="rounded-3xl overflow-hidden border border-black/10 bg-black shadow-[0_18px_54px_rgba(0,0,0,0.18)]"
            style={{ height: 'min(86vh, 780px)', position: 'relative' as any }}
          >
            <img
              src={items[safeIdx]?.url}
              alt=""
              loading="eager"
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            />

            {items.length > 1 ? (
              <>
                <button
                  type="button"
                  aria-label="Previous USP image"
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
                  aria-label="Next USP image"
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

