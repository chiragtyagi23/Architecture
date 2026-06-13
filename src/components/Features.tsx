function Features() {
  return (
    <section className="landing-section landing-section--services">
      <div className="landing-container landing-services__grid">
        <div className="landing-services__content">
          <p className="landing-services__eyebrow">Our Services</p>
          <h2 className="landing-services__heading">
            We’re Here To Help You To
            <br />
            Find Your Dream House.
          </h2>
          <p className="landing-services__body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia Curae.
          </p>
          <ul className="landing-services__list">
            <li>
              <span className="landing-services__star" aria-hidden />
              Property management
            </li>
            <li>
              <span className="landing-services__star" aria-hidden />
              Construction Services
            </li>
            <li>
              <span className="landing-services__star" aria-hidden />
              Online Services
            </li>
          </ul>
        </div>

        <div className="landing-services__visual">
          <div className="landing-services__images">
            <img
              className="landing-services__img-back"
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1012&q=80"
              alt="Luxury modern house exterior"
            />
            <img
              className="landing-services__img-front"
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1012&q=80"
              alt="Professional team collaborating"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
