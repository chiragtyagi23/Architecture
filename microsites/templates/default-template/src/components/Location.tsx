import { useCampaignData } from '../lib/CampaignDataContext'

export function Location() {
  const { showLocation, socialInfraGroups } = useCampaignData()
  if (!showLocation) return null

  return (
    <section className="dt-section" id="location">
      <span className="dt-eyebrow">Connectivity</span>
      <h2 className="dt-section-title">
        Prime <em>Location</em>
      </h2>
      {socialInfraGroups.map((group, gi) => (
        <div key={`${group.title}-${gi}`} className="dt-infra-group">
          {group.title ? <div className="dt-infra-group-title">{group.title}</div> : null}
          <div>
            {group.items.map((item, ii) => (
              <div key={`${item.name}-${ii}`} className="dt-infra-row">
                <span className="dt-infra-name">{item.name}</span>
                <span className="dt-infra-dist">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
