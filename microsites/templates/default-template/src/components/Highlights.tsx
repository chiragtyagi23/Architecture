import { useCampaignData } from '../lib/CampaignDataContext'

export function Highlights() {
  const { showHighlights, highlights } = useCampaignData()
  if (!showHighlights) return null

  return (
    <section className="hs-section" id="highlights">
      <div className="hs-section-title">
        <h2>Why consider this project</h2>
      </div>
      <div className="hs-feature-grid">
        {highlights.map((item, i) => (
          <article key={`${item.title}-${i}`} className="hs-feature-card">
            <span className="hs-feature-index">{String(i + 1).padStart(2, '0')}</span>
            <h3>{item.title || `Highlight ${i + 1}`}</h3>
            {item.description ? <p>{item.description}</p> : null}
          </article>
        ))}
      </div>
    </section>
  )
}
