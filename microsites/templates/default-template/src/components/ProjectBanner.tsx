import { useCampaignData } from '../lib/CampaignDataContext'

export function ProjectBanner() {
  const { showBanner, bannerImages, title, showGallery } = useCampaignData()
  if (!showBanner) return null

  const images = bannerImages.slice(0, 5)
  const extra = bannerImages.length - images.length
  const gridClass =
    images.length === 1
      ? 'hs-photo-grid hs-photo-grid--1'
      : images.length === 2
        ? 'hs-photo-grid hs-photo-grid--2'
        : 'hs-photo-grid hs-photo-grid--multi'

  return (
    <section className="hs-photos" aria-label="Project photos">
      <div className="hs-container">
        <div className={gridClass}>
          {images.map((src, i) => {
            const isMain = images.length > 2 && i === 0
            const isLast = i === images.length - 1 && extra > 0
            const cellClass = `hs-photo-cell${isMain ? ' hs-photo-cell--main' : ''}`
            const img = (
              <>
                <img src={src} alt={i === 0 ? title : `${title} photo ${i + 1}`} />
                {isLast ? <span className="hs-photo-more">+{extra} photos</span> : null}
              </>
            )
            return showGallery ? (
              <a key={src} className={cellClass} href="#gallery">
                {img}
              </a>
            ) : (
              <div key={src} className={cellClass}>
                {img}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
