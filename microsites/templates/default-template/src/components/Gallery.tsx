import { useCampaignData } from '../lib/CampaignDataContext'

export function Gallery() {
  const { showGallery, galleryImages } = useCampaignData()
  if (!showGallery) return null

  return (
    <section className="hs-section" id="gallery">
      <div className="hs-section-title">
        <h2>Gallery</h2>
      </div>
      <div className="hs-gallery-grid">
        {galleryImages.map((img, i) => (
          <figure key={`${img.src}-${i}`} className="hs-gallery-figure">
            <img src={img.src} alt={img.alt} loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  )
}
