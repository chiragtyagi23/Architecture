export function Intro({ selected }: { selected?: any }) {
  const title = typeof selected?.title === 'string' ? selected.title : 'NestNest Homes'
  const address = typeof selected?.address === 'string' ? selected.address : ''
  const facts = Array.isArray(selected?.overview?.facts) ? selected.overview.facts : []
  const startingPrice = facts.find((f: any) => f?.key === 'Starting Price')?.value
  const bhkRange = facts.find((f: any) => f?.key === 'BHK Range')?.value
  const totalFloors = facts.find((f: any) => f?.key === 'Total Floors')?.value
  return (
    <section id="intro">
      <div className="section-container reveal">
        <div className="section-tag">🏘️ About the Project</div>
        <h2 className="section-title">
          Welcome to <span style={{ color: 'var(--aqua-dark)' }}>{title}</span>
        </h2>
        <div className="intro-grid">
          <div className="intro-text">
            <p style={{ marginBottom: 12 }}>
              {address
                ? `${title} is located at ${address}.`
                : `${title} is a thoughtfully designed affordable residential community built for real families.`}
            </p>
            <p style={{ marginBottom: 12 }}>
              Explore the plans, gallery, amenities and connectivity details below — all populated from your campaign data in CRM.
            </p>
          </div>
          <div className="intro-stats">
            <div className="stat-card">
              <div className="stat-num a">{startingPrice || '—'}</div>
              <div className="stat-label">Starting Price</div>
            </div>
            <div className="stat-card">
              <div className="stat-num r">{bhkRange || '—'}</div>
              <div className="stat-label">BHK Range</div>
            </div>
            <div className="stat-card">
              <div className="stat-num y">{totalFloors || '—'}</div>
              <div className="stat-label">Total Floors</div>
            </div>
            <div className="stat-card">
              <div className="stat-num a">{facts.length ? `${facts.length}+` : '—'}</div>
              <div className="stat-label">Overview Facts</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

