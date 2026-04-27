import { useMemo, useRef } from 'react'

function asGroupsFromRows(rows: any[]): { tag: string; images: { src: string; alt?: string }[] }[] {
  return rows
    .map((r: any) => ({
      tag: String(r?.tag ?? 'Gallery'),
      images: Array.isArray(r?.images) ? r.images : [],
    }))
    .filter((g: any) => !String(g.tag).startsWith('__'))
    .filter((g: any) => Array.isArray(g.images) && g.images.length > 0)
}

function GalleryGroupSlider({ tag, images }: { tag: string; images: { src: string; alt?: string }[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const scrollByCards = (dir: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('.gallery-slide')
    const step = (card?.offsetWidth ?? 280) + 14
    el.scrollBy({ left: dir * step * 2, behavior: 'smooth' })
  }

  return (
    <div className="gallery-slider-row reveal">
      <div className="gallery-slider-head">
        <div className="gallery-slider-title">{tag}</div>
        <div className="gallery-slider-actions">
          <button type="button" className="gallery-slider-btn" aria-label={`Scroll ${tag} left`} onClick={() => scrollByCards(-1)}>
            ‹
          </button>
          <button type="button" className="gallery-slider-btn" aria-label={`Scroll ${tag} right`} onClick={() => scrollByCards(1)}>
            ›
          </button>
        </div>
      </div>

      <div ref={scrollerRef} className="gallery-slider-track" role="region" aria-label={`${tag} gallery`}>
        {images.map((img, idx) => (
          <div key={`${tag}-${idx}-${img.src}`} className="gallery-slide">
            <div className="gallery-slide-inner">
              <img src={img.src} alt={img.alt ?? ''} loading="lazy" />
              <div className="gallery-label">{tag}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Gallery({ selected }: { selected?: any }) {
  const { externalGroups, internalGroups, fallbackGroups } = useMemo(() => {
    const extRows = Array.isArray((selected as any)?.extenalimage) ? (selected as any).extenalimage : []
    const intRows = Array.isArray((selected as any)?.Internalimages) ? (selected as any).Internalimages : []
    const fallbackRows = Array.isArray((selected as any)?.projectImages) ? (selected as any).projectImages : []

    const externalGroups = extRows.length ? asGroupsFromRows(extRows) : []
    const internalGroups = intRows.length ? asGroupsFromRows(intRows) : []
    const fallbackGroups = fallbackRows.length ? asGroupsFromRows(fallbackRows) : []
    return { externalGroups, internalGroups, fallbackGroups }
  }, [selected])

  const hasSplit = externalGroups.length > 0 || internalGroups.length > 0
  const groups = hasSplit ? [] : fallbackGroups

  if (!hasSplit && !groups.length) return null
  if (hasSplit && !externalGroups.length && !internalGroups.length) return null
  return (
    <section id="gallery">
      <div className="section-container">
        <div className="reveal">
          <div className="section-tag">📸 Gallery</div>
          <h2 className="section-title">
            See Your Future <span style={{ color: 'var(--red)' }}>Home</span>
          </h2>
        </div>

        <div className="gallery-sliders">
          {hasSplit ? (
            <>
              {externalGroups.length ? (
                <div className="reveal" style={{ marginTop: 10, marginBottom: 4, fontWeight: 800 }}>
                  External images
                </div>
              ) : null}
              {externalGroups.map((g) => (
                <GalleryGroupSlider key={`ext-${g.tag}`} tag={g.tag} images={g.images} />
              ))}
              {internalGroups.length ? (
                <div className="reveal" style={{ marginTop: 18, marginBottom: 4, fontWeight: 800 }}>
                  Internal images
                </div>
              ) : null}
              {internalGroups.map((g) => (
                <GalleryGroupSlider key={`int-${g.tag}`} tag={g.tag} images={g.images} />
              ))}
            </>
          ) : (
            groups.map((g) => <GalleryGroupSlider key={g.tag} tag={g.tag} images={g.images} />)
          )}
        </div>
      </div>
    </section>
  )
}

