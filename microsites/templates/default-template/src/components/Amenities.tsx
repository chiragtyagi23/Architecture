import { useCampaignData } from '../lib/CampaignDataContext'

function DefaultAmenityIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function AmenityIcon({ icons }: { icons: string[] }) {
  const icon = icons[0]
  if (icon && /^https?:\/\//i.test(icon)) {
    return <img src={icon} alt="" className="hs-amenity-card__img" />
  }
  if (icon) {
    return <span className="hs-amenity-card__emoji">{icon}</span>
  }
  return (
    <span className="hs-amenity-card__fallback">
      <DefaultAmenityIcon />
    </span>
  )
}

export function Amenities() {
  const { showAmenities, amenities } = useCampaignData()
  if (!showAmenities) return null

  return (
    <section className="hs-section" id="amenities">
      <div className="hs-section-title">
        <h2>Amenities</h2>
      </div>
      <div className="hs-amenity-cards">
        {amenities.map((item) => (
          <article key={item.name} className="hs-amenity-card">
            <div className="hs-amenity-card__icon">
              <AmenityIcon icons={item.icons} />
            </div>
            <h3 className="hs-amenity-card__name">{item.name}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}
