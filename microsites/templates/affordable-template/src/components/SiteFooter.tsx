export function SiteFooter() {
  return (
    <footer style={{ background: 'var(--text-dark)', padding: 40, textAlign: 'center' }}>
      <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900, fontSize: 24, color: 'white', marginBottom: 12 }}>
        🏠 Nest<span style={{ color: 'var(--aqua)' }}>Nest</span> Homes
      </div>
      <p style={{ marginBottom: 8, color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
        Greenview Township, Sector 14 · contact@nestnesthomes.in · +91 1800-NEST-NOW
      </p>
      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>© 2024 NestNest Homes. All rights reserved.</p>
    </footer>
  )
}

