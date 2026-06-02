const TESTIMONIALS = [
  { name: 'Ariyana aly', role: 'Top Customer' },
  { name: 'Ariyana aly', role: 'Top Customer' },
  { name: 'Ariyana aly', role: 'Top Customer' },
]

function TestimonialsSection() {
  return (
    <section className="landing-testimonials">
      <div className="landing-container" style={{ position: 'relative' }}>
        <img
          className="landing-testimonials__banner"
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1400&q=80"
          alt="Happy homeowners"
        />
        <h2 className="landing-testimonials__overlay-title">See what our customers said about us</h2>

        <div className="landing-testimonials__cards">
          {TESTIMONIALS.map((item, idx) => (
            <article key={idx} className="landing-testimonial-card">
              <div className="landing-testimonial-card__head">
                <img className="landing-testimonial-card__avatar" src="https://placehold.co/91x91" alt={item.name} />
                <div>
                  <p className="landing-testimonial-card__name">{item.name}</p>
                  <p className="landing-testimonial-card__role">{item.role}</p>
                </div>
              </div>
              <p className="landing-testimonial-card__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum ante ipsum primis.
              </p>
              <p className="landing-testimonial-card__date">Date: 02-04-2022</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
