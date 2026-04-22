function nonEmptyStr(s: unknown) {
  return typeof s === 'string' && s.trim().length > 0
}

/** Match Features.tsx: section hidden when no benefit items. */
function affordableFeaturesNavVisible(selected?: any) {
  const raw = selected?.benefits
  const items = Array.isArray(raw?.items)
    ? raw.items
        .map((it: any) => ({
          title: String(it?.title ?? '').trim(),
          text: String(it?.text ?? '').trim(),
        }))
        .filter((it: any) => nonEmptyStr(it.title) || nonEmptyStr(it.text))
    : []
  return items.length > 0
}

/** Match Gallery.tsx `asGroups` + empty check. */
function affordableGalleryNavVisible(selected?: any) {
  const rows = Array.isArray(selected?.projectImages) ? selected.projectImages : []
  return rows.some((r: any) => Array.isArray(r?.images) && r.images.length > 0)
}

/** Match Amenities.tsx. */
function affordableAmenitiesNavVisible(selected?: any) {
  return Array.isArray(selected?.amenities) && selected.amenities.length > 0
}

export function Nav({ selected }: { selected?: any }) {
  const title = typeof selected?.title === 'string' ? selected.title : 'NestNest Homes'
  const logo = typeof selected?.logo === 'string' ? selected.logo : ''

  const navLinks = [
    { href: '#intro', label: 'About', visible: true },
    { href: '#features', label: 'Features', visible: affordableFeaturesNavVisible(selected) },
    { href: '#config', label: 'BHK Plans', visible: true },
    { href: '#gallery', label: 'Gallery', visible: affordableGalleryNavVisible(selected) },
    { href: '#amenities', label: 'Amenities', visible: affordableAmenitiesNavVisible(selected) },
    { href: '#location', label: 'Location', visible: true },
  ].filter((l) => l.visible)

  return (
    <nav>
      <div className="nav-logo">
        {logo ? <img src={logo} alt="" style={{ width: 26, height: 26, borderRadius: 8, objectFit: 'cover' }} /> : '🏠'}{' '}
        {title}
      </div>
      <ul className="nav-links">
        {navLinks.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
      <a href="#enquiry" className="nav-cta">
        Enquire Now
      </a>
    </nav>
  )
}

