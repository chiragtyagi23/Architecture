import { useState } from 'react'

type HeroCard = {
  title: string
  iconSrc: string
  iconAlt: string
}

const HERO_CARDS: HeroCard[] = [
  { title: 'Home inspections', iconSrc: '/assets/hero-icon-home.png', iconAlt: 'Home inspections' },
  { title: 'Property insurance', iconSrc: '/assets/hero-icon-insurance.png', iconAlt: 'Property insurance' },
  { title: 'Best location', iconSrc: '/assets/hero-icon-location.png', iconAlt: 'Best location' },
  { title: 'Lots & land', iconSrc: '/assets/hero-icon-land.png', iconAlt: 'Lots & land' },
]

function Hero() {
  const [mode, setMode] = useState<'rent' | 'sell'>('sell')

  return (
    <section className="landing-hero">
      <div className="landing-hero__stage">
        <div className="landing-hero__bg-dark" aria-hidden />
        <div className="landing-hero__visual">
          <img src="/assets/hero-house.png" alt="Modern property exterior" />
        </div>

        <div className="landing-hero__content">
          <h1 className="landing-hero__title">Find your next dream home</h1>
          <p className="landing-hero__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia Curae.
          </p>

          <div className="landing-hero__bottom">
            <div className="landing-hero__controls">
              <div className="landing-hero__toggle" role="tablist" aria-label="Listing type">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'rent'}
                  className={`landing-hero__toggle-btn${mode === 'rent' ? ' landing-hero__toggle-btn--active' : ''}`}
                  onClick={() => setMode('rent')}
                >
                  Rent
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'sell'}
                  className={`landing-hero__toggle-btn${mode === 'sell' ? ' landing-hero__toggle-btn--active' : ''}`}
                  onClick={() => setMode('sell')}
                >
                  Sell
                </button>
              </div>

              <div className="landing-hero__search">
                <div className="landing-hero__search-type-wrap">
                  <span className="landing-hero__search-type">Property Type</span>
                  <svg className="landing-hero__search-chevron" width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M6 9l6 6 6-6" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="landing-hero__search-sep" aria-hidden />
                <div className="landing-hero__search-field">
                  <svg className="landing-hero__search-magnifier" width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="11" cy="11" r="7" stroke="#252525" strokeWidth="2" />
                    <path d="M20 20l-3.5-3.5" stroke="#252525" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <input
                    type="search"
                    className="landing-hero__search-input"
                    placeholder="Search by location or property ID....."
                    aria-label="Search properties"
                  />
                </div>
                <button type="button" className="landing-btn landing-btn--primary landing-hero__search-btn">
                  Buy Now
                </button>
              </div>
            </div>

            <div className="landing-hero__checks">
              <label className="landing-hero__check">
                <input type="checkbox" defaultChecked />
                Only Properties in exclusive representation
              </label>
              <label className="landing-hero__check">
                <input type="checkbox" />
                Only new development
              </label>
            </div>
          </div>
        </div>

        <div className="landing-hero-cards">
          <div className="landing-hero-cards__grid">
            {HERO_CARDS.map((card) => (
              <article key={card.title} className="landing-hero-card">
                <div className="landing-hero-card__icon-wrap">
                  <img className="landing-hero-card__icon" src={card.iconSrc} alt={card.iconAlt} />
                </div>
                <div className="landing-hero-card__meta">
                  <h3 className="landing-hero-card__title">{card.title}</h3>
                  <div className="landing-hero-card__line" aria-hidden />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
