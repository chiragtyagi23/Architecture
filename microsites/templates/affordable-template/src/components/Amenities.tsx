export function Amenities({ selected }: { selected?: any }) {
  const items = Array.isArray(selected?.amenities) ? selected.amenities : []
  if (!items.length) return null

  const iconsForAmenity = (a: any): string[] => {
    const raw = a?.icon
    if (Array.isArray(raw)) return raw.map((x: any) => String(x ?? '')).filter((s: string) => s.trim().length > 0)
    if (typeof raw !== 'string') return []
    const s = raw.trim()
    if (!s) return []
    try {
      const parsed = JSON.parse(s)
      if (Array.isArray(parsed)) return parsed.map((x: any) => String(x ?? '')).filter((t: string) => t.trim().length > 0)
      if (typeof parsed === 'string') return [parsed]
      return [s]
    } catch {
      return [s]
    }
  }

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
              <div className="amen-icon">
                {(() => {
                  const icons = iconsForAmenity(a)
                  const first = icons[0] ?? '🌟'
                  return /^https?:\/\//i.test(first) ? <img src={first} alt="" style={{ width: 26, height: 26, objectFit: 'cover', borderRadius: 6 }} /> : first
                })()}
              </div>
              <div className="amen-name">{String(a?.name ?? '')}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

