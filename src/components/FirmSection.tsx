function FirmSection() {
  const avatars = [
    { src: '/assets/benefits-avatar-1.png', alt: 'Team member' },
    { src: '/assets/benefits-avatar-2.png', alt: 'Team member' },
    { src: '/assets/benefits-avatar-3.png', alt: 'Team member' },
    { src: '/assets/benefits-avatar-4.png', alt: 'Team member' },
  ]

  return (
    <section className="landing-section landing-section--benefits">
      <div className="landing-container landing-benefits__grid">
        <div className="landing-benefits__content">
          <p className="landing-benefits__eyebrow">Benefits</p>
          <h2 className="landing-benefits__heading">Why choose us</h2>
          <p className="landing-benefits__body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia Curae.
          </p>
          <ul className="landing-benefits__list">
            <li>
              <span className="landing-benefits__star" aria-hidden />
              Trusted Developer
            </li>
            <li>
              <span className="landing-benefits__star" aria-hidden />
              Outstanding properties
            </li>
            <li>
              <span className="landing-benefits__star" aria-hidden />
              A safe and trustworthy
            </li>
            <li>
              <span className="landing-benefits__star" aria-hidden />
              Buy with Confidence
            </li>
            <li>
              <span className="landing-benefits__star" aria-hidden />
              Markert Leading research
            </li>
          </ul>
        </div>

        <div className="landing-benefits__visual">
          <div className="landing-benefits__frame">
            <div className="landing-benefits__accent" aria-hidden />
            <img
              className="landing-benefits__img"
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1030&q=80"
              alt="Modern interior living space"
            />
            <div className="landing-benefits__badge">
              <div className="landing-benefits__badge-copy">
                <h3 className="landing-benefits__badge-title">100+Employee</h3>
                <p className="landing-benefits__badge-meta">
                  <span className="landing-benefits__badge-star" aria-hidden />
                  <span className="landing-benefits__badge-rating">5.0</span>
                  <span className="landing-benefits__badge-reviews">(39.9k reviews)</span>
                </p>
              </div>
              <div className="landing-benefits__avatars" aria-hidden>
                {avatars.map((avatar) => (
                  <img key={avatar.src} src={avatar.src} alt={avatar.alt} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FirmSection
