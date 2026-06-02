import { useState } from 'react'

const HERO_CARDS = [
  { title: 'Home inspections', icon: 'https://placehold.co/44x44/1B3CFF/FFFFFF?text=H' },
  { title: 'Property insurance', icon: 'https://placehold.co/45x45/1B3CFF/FFFFFF?text=P' },
  { title: 'Best location', icon: 'https://placehold.co/45x45/1B3CFF/FFFFFF?text=L' },
  { title: 'Lots & land', icon: 'https://placehold.co/50x44/1B3CFF/FFFFFF?text=T' },
]

function Hero() {
  const [mode, setMode] = useState<'rent' | 'sell'>('rent')

  return (
    <section className="landing-hero">
      <div className="landing-hero__grid">
        <div className="landing-hero__panel">
          <h1 className="landing-hero__title">Find your next dream home</h1>
          <p className="landing-hero__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia Curae.
          </p>

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
            <span className="landing-hero__search-type">Property Type</span>
            <input
              type="search"
              className="landing-hero__search-input"
              placeholder="Search by location or property ID....."
              aria-label="Search properties"
            />
            <button type="button" className="landing-btn landing-btn--primary landing-btn--sm">
              Buy Now
            </button>
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

        <div className="landing-hero__visual">
          <img
            src="/assets/House-1.png"
            alt="Modern property exterior"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'
            }}
          />
        </div>
      </div>

      <div className="landing-container landing-hero-cards">
        <div className="landing-hero-cards__grid">
          {HERO_CARDS.map((card) => (
            <article key={card.title} className="landing-hero-card">
              <div className="landing-hero-card__icon-wrap">
                <img src={card.icon} alt="" className="landing-hero-card__icon" aria-hidden />
              </div>
              <h3 className="landing-hero-card__title">{card.title}</h3>
              <div className="landing-hero-card__line" aria-hidden />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
