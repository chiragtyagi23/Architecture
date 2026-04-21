export function Location({ selected }: { selected?: any }) {
  const groups = Array.isArray(selected?.socialInfraGroups) ? selected.socialInfraGroups : []
  return (
    <section id="location">
      <div className="section-container">
        <div className="reveal">
          <div className="section-tag">📍 Location</div>
          <h2 className="section-title">
            At the Heart of <span style={{ color: 'var(--aqua-dark)' }}>Convenience</span>
          </h2>
        </div>

        <div className="location-grid reveal">
          <div className="map-placeholder">
            <svg viewBox="0 0 500 340" xmlns="http://www.w3.org/2000/svg">
              <rect width="500" height="340" fill="#EAFBFD" />
              <rect x="0" y="160" width="500" height="18" fill="#ccc" />
              <rect x="240" y="0" width="18" height="340" fill="#ccc" />
              <rect x="30" y="30" width="80" height="60" fill="#B2EBF2" rx="6" />
              <rect x="130" y="30" width="90" height="60" fill="#C8E6C9" rx="6" />
              <rect x="30" y="200" width="90" height="60" fill="#FFE0B2" rx="6" />
              <rect x="130" y="200" width="80" height="60" fill="#F8BBD9" rx="6" opacity="0.7" />
              <rect x="280" y="30" width="100" height="70" fill="#C8E6C9" rx="6" />
              <rect x="400" y="30" width="70" height="55" fill="#FFE0B2" rx="6" />
              <rect x="280" y="200" width="85" height="65" fill="#B2EBF2" rx="6" />
              <rect x="380" y="200" width="85" height="65" fill="#D1C4E9" rx="6" />
              <circle cx="249" cy="165" r="24" fill="#F04B4B" />
              <circle cx="249" cy="160" r="14" fill="white" />
              <circle cx="249" cy="160" r="7" fill="#F04B4B" />
              <polygon points="249,189 241,178 257,178" fill="#F04B4B" />
              <text x="70" y="65" textAnchor="middle" fontFamily="Poppins,sans-serif" fontSize="9" fill="#5A6A7A">
                School
              </text>
              <text x="175" y="65" textAnchor="middle" fontFamily="Poppins,sans-serif" fontSize="9" fill="#5A6A7A">
                Hospital
              </text>
              <text x="75" y="236" textAnchor="middle" fontFamily="Poppins,sans-serif" fontSize="9" fill="#5A6A7A">
                Metro
              </text>
              <text x="170" y="236" textAnchor="middle" fontFamily="Poppins,sans-serif" fontSize="9" fill="#5A6A7A">
                Market
              </text>
              <text x="330" y="72" textAnchor="middle" fontFamily="Poppins,sans-serif" fontSize="9" fill="#5A6A7A">
                Park
              </text>
              <text x="435" y="62" textAnchor="middle" fontFamily="Poppins,sans-serif" fontSize="9" fill="#5A6A7A">
                Mall
              </text>
              <text x="322" y="238" textAnchor="middle" fontFamily="Poppins,sans-serif" fontSize="9" fill="#5A6A7A">
                Bank
              </text>
              <text x="422" y="238" textAnchor="middle" fontFamily="Poppins,sans-serif" fontSize="9" fill="#5A6A7A">
                Temple
              </text>
              <rect x="178" y="130" width="82" height="20" fill="#F04B4B" rx="8" />
              <text x="219" y="144" textAnchor="middle" fontFamily="Nunito,sans-serif" fontWeight="800" fontSize="10" fill="white">
                NestNest Homes
              </text>
            </svg>
          </div>

          <div>
            <p style={{ color: 'var(--text-mid)', fontSize: 15, marginBottom: 24, lineHeight: 1.8 }}>
              {typeof selected?.address === 'string' && selected.address.trim().length > 0
                ? `Strategically located at ${selected.address}.`
                : 'Strategically located with smooth connectivity to the city and everyday essentials nearby.'}
            </p>
            <div className="nearby-list">
              {groups.length
                ? groups.flatMap((g: any, gi: number) => {
                    const items = Array.isArray(g?.items) ? g.items : []
                    return items.slice(0, 6).map((it: any, ii: number) => (
                      <div key={`${gi}-${ii}-${it?.name}`} className="nearby-item">
                        <div className={`nearby-icon ${gi % 3 === 0 ? 'ni-aqua' : gi % 3 === 1 ? 'ni-red' : 'ni-yellow'}`}>
                          📍
                        </div>
                        <div>
                          <div className="nearby-name">{String(it?.name ?? '')}</div>
                          <div className="nearby-dist">{String(it?.value ?? '')}</div>
                        </div>
                      </div>
                    ))
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

