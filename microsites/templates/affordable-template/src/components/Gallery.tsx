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
  return (
    <section id="gallery">
      <div className="section-container">
        <div className="reveal">
          <div className="section-tag">📸 Gallery</div>
          <h2 className="section-title">
            See Your Future <span style={{ color: 'var(--red)' }}>Home</span>
          </h2>
        </div>

        {groups.length ? (
          <div className="gallery-sliders">
            {groups.map((g) => (
              <GalleryGroupSlider key={g.tag} tag={g.tag} images={g.images} />
            ))}
          </div>
        ) : (
          <div className="gallery-grid reveal">
            <div className="gallery-item">
            <svg viewBox="0 0 400 460" xmlns="http://www.w3.org/2000/svg" height="100%" preserveAspectRatio="xMidYMid slice">
              <rect width="400" height="460" fill="#E3F2FD" />
              <rect y="300" width="400" height="160" fill="#A5D6A7" />
              <rect x="60" y="120" width="280" height="200" fill="white" rx="6" />
              <rect x="60" y="100" width="280" height="26" fill="#42C6D9" rx="4" />
              <rect x="80" y="140" width="40" height="36" fill="#EAFBFD" rx="4" />
              <rect x="135" y="140" width="40" height="36" fill="#EAFBFD" rx="4" />
              <rect x="190" y="140" width="40" height="36" fill="#EAFBFD" rx="4" />
              <rect x="245" y="140" width="40" height="36" fill="#EAFBFD" rx="4" />
              <rect x="80" y="195" width="40" height="36" fill="#FFD447" rx="4" opacity="0.7" />
              <rect x="135" y="195" width="40" height="36" fill="#EAFBFD" rx="4" />
              <rect x="190" y="195" width="40" height="36" fill="#EAFBFD" rx="4" />
              <rect x="245" y="195" width="40" height="36" fill="#F04B4B" rx="4" opacity="0.4" />
              <rect x="80" y="250" width="40" height="36" fill="#EAFBFD" rx="4" />
              <rect x="135" y="250" width="40" height="36" fill="#FFD447" rx="4" opacity="0.7" />
              <rect x="190" y="250" width="40" height="36" fill="#EAFBFD" rx="4" />
              <rect x="245" y="250" width="40" height="36" fill="#EAFBFD" rx="4" />
              <rect x="175" y="290" width="50" height="30" fill="#42C6D9" rx="4" />
              <rect x="30" y="280" width="10" height="40" fill="#795548" />
              <circle cx="35" cy="265" r="22" fill="#4CAF50" />
              <rect x="360" y="285" width="10" height="35" fill="#795548" />
              <circle cx="365" cy="270" r="20" fill="#43A047" />
              <rect x="80" y="98" width="130" height="22" fill="#F04B4B" rx="3" />
              <text
                x="145"
                y="113"
                textAnchor="middle"
                fontFamily="Nunito,sans-serif"
                fontWeight="800"
                fontSize="11"
                fill="white"
              >
                NestNest Homes
              </text>
            </svg>
            <div className="gallery-label">🏢 Exterior View</div>
          </div>

            <div className="gallery-item">
            <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" height="100%" preserveAspectRatio="xMidYMid slice">
              <rect width="240" height="240" fill="#FFF9F1" />
              <rect y="180" width="240" height="60" fill="#EFEBE9" />
              <rect x="30" y="130" width="180" height="55" fill="#42C6D9" rx="12" />
              <rect x="50" y="145" width="60" height="30" fill="#EAFBFD" rx="6" />
              <rect x="130" y="145" width="60" height="30" fill="#EAFBFD" rx="6" />
              <rect x="80" y="80" width="80" height="55" fill="#5D4037" rx="4" />
              <rect x="90" y="88" width="60" height="40" fill="#1A237E" rx="2" />
              <circle cx="120" cy="108" r="8" fill="#42C6D9" opacity="0.4" />
              <rect x="10" y="160" width="220" height="8" fill="#BCAAA4" rx="4" />
              <circle cx="40" cy="75" r="20" fill="#A5D6A7" />
              <rect x="33" y="90" width="14" height="25" fill="#795548" />
              <circle cx="200" cy="70" r="16" fill="#FFD447" opacity="0.6" />
              <rect x="194" y="82" width="12" height="20" fill="#795548" />
            </svg>
            <div className="gallery-label">🛋️ Living Room</div>
          </div>

            <div className="gallery-item">
            <svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" height="100%" preserveAspectRatio="xMidYMid slice">
              <rect width="240" height="200" fill="#EAFBFD" />
              <rect y="130" width="240" height="70" fill="#B2EBF2" />
              <rect x="0" y="100" width="100" height="35" fill="#42C6D9" rx="6" />
              <rect x="10" y="108" width="35" height="20" fill="#E0F7FA" rx="3" />
              <rect x="55" y="108" width="35" height="20" fill="#E0F7FA" rx="3" />
              <circle cx="28" cy="108" r="4" fill="#00ACC1" />
              <circle cx="73" cy="108" r="4" fill="#00ACC1" />
              <rect x="140" y="95" width="90" height="40" fill="#FFD447" rx="6" />
              <rect x="150" y="103" width="30" height="24" fill="#FFF9C4" rx="3" />
              <rect x="188" y="103" width="30" height="24" fill="#FFF9C4" rx="3" />
              <rect x="20" y="50" width="70" height="45" fill="white" rx="4" />
              <rect x="30" y="58" width="50" height="30" fill="#80DEEA" rx="2" />
              <rect x="160" y="40" width="65" height="55" fill="white" rx="4" />
              <rect x="168" y="48" width="49" height="38" fill="#F04B4B" rx="2" opacity="0.3" />
            </svg>
            <div className="gallery-label">🍳 Kitchen</div>
          </div>

            <div className="gallery-item">
            <svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" height="100%" preserveAspectRatio="xMidYMid slice">
              <rect width="240" height="200" fill="#FFF3E0" />
              <rect y="140" width="240" height="60" fill="#FFCCBC" />
              <rect x="30" y="95" width="180" height="50" fill="#BCAAA4" rx="8" />
              <rect x="35" y="85" width="70" height="20" fill="#FF8A65" rx="6" />
              <rect x="135" y="85" width="70" height="20" fill="#FF8A65" rx="6" />
              <rect x="40" y="90" width="60" height="56" fill="#FFD447" opacity="0.5" rx="4" />
              <rect x="140" y="90" width="60" height="56" fill="#FFD447" opacity="0.5" rx="4" />
              <rect x="35" y="95" width="170" height="14" fill="#A1887F" rx="4" />
              <rect x="0" y="140" width="240" height="8" fill="#8D6E63" rx="2" />
              <rect x="185" y="50" width="40" height="60" fill="#90CAF9" rx="4" />
              <rect x="10" y="40" width="30" height="75" fill="#5D4037" rx="3" />
              <rect x="13" y="43" width="24" height="30" fill="#42C6D9" rx="2" opacity="0.4" />
              <circle cx="26" cy="155" r="5" fill="#FFD447" />
              <circle cx="200" cy="155" r="5" fill="#FFD447" />
            </svg>
            <div className="gallery-label">🛏️ Bedroom</div>
          </div>

            <div className="gallery-item">
            <svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" height="100%" preserveAspectRatio="xMidYMid slice">
              <rect width="240" height="200" fill="#E8F5E9" />
              <rect y="150" width="240" height="50" fill="#A5D6A7" />
              <rect x="40" y="80" width="12" height="80" fill="#F04B4B" rx="3" />
              <rect x="100" y="80" width="12" height="80" fill="#F04B4B" rx="3" />
              <rect x="40" y="78" width="72" height="10" fill="#FF8A65" rx="3" />
              <path d="M52 88 L130 150" stroke="#FFD447" strokeWidth="10" strokeLinecap="round" />
              <line x1="160" y1="40" x2="145" y2="120" stroke="#5D4037" strokeWidth="3" />
              <line x1="200" y1="40" x2="215" y2="120" stroke="#5D4037" strokeWidth="3" />
              <rect x="145" y="118" width="70" height="10" fill="#42C6D9" rx="3" />
              <line x1="160" y1="40" x2="200" y2="40" stroke="#5D4037" strokeWidth="4" />
              <circle cx="20" cy="155" r="15" fill="#43A047" />
              <circle cx="220" cy="155" r="15" fill="#43A047" />
              <ellipse cx="80" cy="30" rx="30" ry="16" fill="white" opacity="0.7" />
              <ellipse cx="170" cy="20" rx="24" ry="13" fill="white" opacity="0.6" />
            </svg>
            <div className="gallery-label">🛝 Play Area</div>
          </div>
          </div>
        )}
      </div>
    </section>
  )
}

