export function Features() {
  return (
    <section id="features">
      <div className="section-container">
        <div className="reveal">
          <div className="section-tag">✨ Why Choose Us</div>
          <h2 className="section-title">
            Packed with Benefits <span style={{ color: 'var(--red)' }}>Just for You</span>
          </h2>
        </div>
        <div className="features-grid">
          <div className="feat-card c-aqua reveal">
            <div className="feat-icon bg-aqua">💰</div>
            <div className="feat-title">Budget Friendly Pricing</div>
            <div className="feat-desc">
              Homes priced for real families. No hidden costs, no surprises — just honest value for your hard-earned money.
            </div>
          </div>
          <div className="feat-card c-red reveal">
            <div className="feat-icon bg-red">🏗️</div>
            <div className="feat-title">Quality Construction</div>
            <div className="feat-desc">Built with top-grade materials and skilled craftsmanship. Durable, safe, and beautiful.</div>
          </div>
          <div className="feat-card c-yellow reveal">
            <div className="feat-icon bg-yellow">📍</div>
            <div className="feat-title">Prime Location</div>
            <div className="feat-desc">Centrally located with easy access to schools, hospitals, malls, and metro stations.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

