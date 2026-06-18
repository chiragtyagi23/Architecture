import { useCampaignData } from '../lib/CampaignDataContext'

function AmenityIcon({ icons }: { icons: string[] }) {
  const icon = icons[0]
  if (icon && /^https?:\/\//i.test(icon)) {
    return <img src={icon} alt="" />
  }
  if (icon) return <span>{icon}</span>
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
    </svg>
  )
}

export function Amenities() {
  const { showAmenities, amenities } = useCampaignData()
  if (!showAmenities) return null

  return (
    <section className="dt-section" id="amenities">
      <span className="dt-eyebrow">World-Class Facilities</span>
      <h2 className="dt-section-title">
        Amenities &amp; <em>Lifestyle</em>
      </h2>
      <div className="dt-amenity-grid">
        {amenities.map((item) => (
          <div key={item.name} className="dt-amenity-card">
            <div className="dt-amenity-icon">
              <AmenityIcon icons={item.icons} />
            </div>
            <div className="dt-amenity-name">{item.name}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
