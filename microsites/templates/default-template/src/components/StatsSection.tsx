import { useCampaignData } from '../lib/CampaignDataContext'

export function StatsSection() {
  const { showStats, benefitStats } = useCampaignData()
  if (!showStats) return null

  return (
    <section className="hs-section">
      <div className="hs-section-title">
        <h2>Key highlights</h2>
      </div>
      <div className="hs-highlights-bar">
        {benefitStats.map((s) => (
          <div key={`${s.label}-${s.value}`} className="hs-highlights-bar__item">
            <span className="hs-highlights-bar__value">{s.value || '—'}</span>
            <span className="hs-highlights-bar__label">{s.label || 'Highlight'}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
