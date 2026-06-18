import { useCampaignData } from '../lib/CampaignDataContext'

function LocationIcon() {
  return (
    <svg className="hs-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function ProjectSummary() {
  const vm = useCampaignData()

  const metaItems = [
    vm.bhk ? { label: 'Configuration', value: vm.bhk } : null,
    vm.possession ? { label: 'Possession', value: vm.possession } : null,
    vm.floors ? { label: 'Floors', value: vm.floors } : null,
    vm.regNo ? { label: 'RERA', value: vm.regNo } : null,
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <section className="hs-header" id="top">
      <div className="hs-container">
        {vm.regNo ? (
          <div className="hs-rera-strip">
            <span className="hs-rera-badge">RERA registered</span>
            <span className="hs-rera-id">{vm.regNo}</span>
          </div>
        ) : null}

        <h1 className="hs-title">{vm.title}</h1>

        {vm.address ? (
          <p className="hs-location">
            <LocationIcon />
            {vm.address}
          </p>
        ) : null}

        {(vm.startingPrice || vm.priceRange) && (
          <div className="hs-price-block">
            {vm.startingPrice ? <span className="hs-price">{vm.startingPrice}</span> : null}
            {vm.priceRange ? <span className="hs-price-note">{vm.priceRange}</span> : null}
          </div>
        )}

        {metaItems.length > 0 ? (
          <dl className="hs-meta-grid">
            {metaItems.map((item) => (
              <div key={item.label} className="hs-meta-item">
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  )
}
