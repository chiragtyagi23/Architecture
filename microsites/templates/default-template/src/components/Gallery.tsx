import { useCampaignData } from '../lib/CampaignDataContext'

export function Gallery() {
  const { showGallery, galleryImages } = useCampaignData()
  if (!showGallery) return null

  return (
    <section className="dt-section dt-section--gray" id="gallery">
      <span className="dt-eyebrow">Visual Tour</span>
      <h2 className="dt-section-title">
        Project <em>Gallery</em>
      </h2>
      <div className="dt-gallery-grid">
        {galleryImages.map((img, i) => (
          <div key={`${img.src}-${i}`} className="dt-gallery-item">
            <img src={img.src} alt={img.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  )
}
