import { useMemo, useRef } from 'react'

function asGroups(selected: any): { tag: string; images: { src: string; alt?: string }[] }[] {
  const rows = Array.isArray(selected?.projectImages) ? selected.projectImages : []
  return rows
    .map((r: any) => ({
      tag: String(r?.tag ?? 'Gallery'),
      images: Array.isArray(r?.images) ? r.images : [],
    }))
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
  const groups = useMemo(() => asGroups(selected), [selected])
  if (!groups.length) return null
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
          {groups.map((g) => (
            <GalleryGroupSlider key={g.tag} tag={g.tag} images={g.images} />
          ))}
        </div>
      </div>
    </section>
  )
}

