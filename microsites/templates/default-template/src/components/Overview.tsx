import { useCampaignData } from '../lib/CampaignDataContext'

function ChipIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  )
}

function isReraKey(key: string) {
  return /rera/i.test(key)
}

export function Overview() {
  const { showFacts, facts, title, regNo } = useCampaignData()
  if (!showFacts) return null

  return (
    <section className="dt-section" id="overview">
      <div className="dt-overview-header">
        <h2 className="dt-overview-title">
          {title} <em>Overview</em>
        </h2>
        <a href="#enquiry" className="dt-brochure-btn">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Brochure
        </a>
      </div>

      <div className="dt-chips-grid">
        {facts.map((fact) => (
          <div key={fact.key} className="dt-chip">
            <div className="dt-chip-icon">
              <ChipIcon />
            </div>
            <div>
              <span className={`dt-chip-val${isReraKey(fact.key) ? ' dt-chip-val--mono' : ''}`}>{fact.value}</span>
              <span className="dt-chip-lbl">{fact.key}</span>
            </div>
          </div>
        ))}
      </div>

      {regNo ? (
        <div className="dt-cert-strip">
          <span className="dt-cert-label">Project Certifications & Registration — MahaRERA No.</span>
          <span className="dt-cert-val">{regNo}</span>
        </div>
      ) : null}
    </section>
  )
}
