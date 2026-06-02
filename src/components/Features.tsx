function Features() {
  return (
    <section className="landing-section">
      <div className="landing-container landing-services__grid">
        <div>
          <p className="landing-eyebrow">Our Services</p>
          <h2 className="landing-heading">We’re Here To Help You To Find Your Dream House.</h2>
          <p className="landing-body" style={{ marginTop: '1rem', maxWidth: '575px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia Curae.
          </p>
          <ul className="landing-services__list">
            <li>Property management</li>
            <li>Construction Services</li>
            <li>Online Services</li>
          </ul>
        </div>
        <div className="landing-services__images">
          <img
            className="landing-services__img-back"
            src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80"
            alt="Luxury building"
          />
          <img
            className="landing-services__img-front"
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"
            alt="Modern apartment"
          />
        </div>
      </div>
    </section>
  )
}

export default Features
