function FirmSection() {
  return (
    <section className="landing-section">
      <div className="landing-container landing-benefits__grid">
        <div>
          <p className="landing-eyebrow landing-eyebrow--blue">Benefits</p>
          <h2 className="landing-heading">Why choose us</h2>
          <p className="landing-body" style={{ marginTop: '1rem', maxWidth: '575px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia Curae.
          </p>
          <ul className="landing-benefits__list">
            <li>Trusted Developer</li>
            <li>Outstanding properties</li>
            <li>A safe and trustworthy</li>
            <li>Buy with Confidence</li>
            <li>Market Leading research</li>
          </ul>
        </div>
        <div className="landing-benefits__visual">
          <img
            className="landing-benefits__img"
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80"
            alt="Team standing near property"
          />
          <div className="landing-benefits__badge">
            <h3 className="landing-benefits__badge-title">100+ Employee</h3>
            <p className="landing-benefits__badge-meta">5.0 • (39.9k reviews)</p>
            <div className="landing-benefits__avatars" aria-hidden>
              <img src="https://placehold.co/65x65" alt="" />
              <img src="https://placehold.co/65x65" alt="" />
              <img src="https://placehold.co/65x65" alt="" />
              <img src="https://placehold.co/65x65" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FirmSection
