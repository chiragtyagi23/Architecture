function nonEmpty(s: unknown) {
  return typeof s === 'string' && s.trim().length > 0
}

export function Features({ selected }: { selected?: any }) {
  const raw = selected?.benefits
  const items = Array.isArray(raw?.items)
    ? raw.items
        .map((it: any) => ({
          title: String(it?.title ?? '').trim(),
          text: String(it?.text ?? '').trim(),
        }))
        .filter((it: any) => nonEmpty(it.title) || nonEmpty(it.text))
    : []

  // Hide the whole "Why Choose Us" section if no real campaign data.
  if (!items.length) return null

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
          {items.slice(0, 3).map((it: any, idx: number) => {
            const tone = idx === 0 ? 'aqua' : idx === 1 ? 'red' : 'yellow'
            const icon = idx === 0 ? '💰' : idx === 1 ? '🏗️' : '📍'
            return (
              <div key={`${it.title}-${idx}`} className={`feat-card c-${tone} reveal`}>
                <div className={`feat-icon bg-${tone}`}>{icon}</div>
                <div className="feat-title">{it.title || `Benefit ${idx + 1}`}</div>
                <div className="feat-desc">{it.text}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

