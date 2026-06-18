import { useCampaignData } from '../lib/CampaignDataContext'

export function Hero() {
  const vm = useCampaignData()
  const heroImage = vm.bannerImages[0]
  const heroStyle = heroImage
    ? { backgroundImage: `url(${heroImage})` }
    : undefined

  return (
    <section className={`dt-hero${heroImage ? ' dt-hero--image' : ''}`} id="home" style={heroStyle}>
      {heroImage ? <div className="dt-hero-overlay" aria-hidden /> : null}

      <div className="dt-hero-inner">
        {vm.possession ? <div className="dt-hero-badge">Possession {vm.possession}</div> : null}

        <h1>
          {vm.title}
          {vm.address ? (
            <>
              <br />
              <em>{vm.address}</em>
            </>
          ) : null}
        </h1>

        {vm.address ? (
          <div className="dt-hero-location">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {vm.address}
          </div>
        ) : null}

        <div className="dt-hero-actions">
          <a href="#enquiry" className="dt-btn-primary">
            Book Site Visit
          </a>
          {vm.showFloorPlans ? (
            <a href="#residences" className="dt-btn-outline">
              View Floor Plans
            </a>
          ) : vm.showGallery ? (
            <a href="#gallery" className="dt-btn-outline">
              View Gallery
            </a>
          ) : null}
        </div>
      </div>

      {vm.showStats ? (
        <div className="dt-hero-stats">
          <div className="dt-hero-stats-inner">
            {vm.heroStats.map((stat) => (
              <div key={`${stat.label}-${stat.value}`} className="dt-stat-item">
                <span className="dt-stat-val">{stat.value}</span>
                <span className="dt-stat-lbl">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}
