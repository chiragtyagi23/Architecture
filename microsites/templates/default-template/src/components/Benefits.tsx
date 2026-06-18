import { useCampaignData } from '../lib/CampaignDataContext'

export function Benefits() {
  const { showBenefits, benefits, title } = useCampaignData()
  if (!showBenefits) return null

  return (
    <section className="dt-section dt-section--blue" id="benefits">
      <span className="dt-eyebrow">Why Invest</span>
      <h2 className="dt-section-title">
        Why Invest in <em>{title}</em>
      </h2>
      <div className="dt-benefits-list">
        {benefits.map((item, i) => (
          <div key={`${item.title}-${i}`} className="dt-benefit-row">
            <span className="dt-benefit-num">{String(i + 1).padStart(2, '0')}</span>
            <div>
              {item.title ? <div className="dt-benefit-title">{item.title}</div> : null}
              {item.description ? <p className="dt-benefit-text">{item.description}</p> : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
