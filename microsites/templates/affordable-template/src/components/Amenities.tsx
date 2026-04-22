export function Amenities({ selected }: { selected?: any }) {
  const items = Array.isArray(selected?.amenities) ? selected.amenities : []
  if (!items.length) return null
  return (
    <section id="amenities">
      <div className="section-container">
        <div className="reveal">
          <div className="section-tag">🌟 Amenities</div>
          <h2 className="section-title">
            Everything Your Family <span style={{ color: 'var(--yellow)' }}>Loves</span>
          </h2>
          <p style={{ marginTop: 10, color: 'var(--text-mid)', fontSize: 15, lineHeight: 1.8 }}>
            {items.length ? `${items.length}+ amenities from your campaign.` : 'Amenities list from your campaign.'}
          </p>
        </div>

        <div className="amenities-grid reveal">
          {items.map((a: any) => (
            <div key={a.id ?? a.name} className="amen-card">
              <div className="amen-icon">🌟</div>
              <div className="amen-name">{String(a?.name ?? '')}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

