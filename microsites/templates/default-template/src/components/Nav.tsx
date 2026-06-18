import { useCampaignData } from '../lib/CampaignDataContext'

export function Nav() {
  const vm = useCampaignData()

  const links = [
    vm.showFacts ? { href: '#overview', label: 'Overview' } : null,
    vm.showFloorPlans ? { href: '#residences', label: 'Floor Plans' } : null,
    vm.showGallery ? { href: '#gallery', label: 'Gallery' } : null,
    vm.showAmenities ? { href: '#amenities', label: 'Amenities' } : null,
    vm.showLocation ? { href: '#location', label: 'Location' } : null,
  ].filter(Boolean) as { href: string; label: string }[]

  return (
    <nav className="dt-nav">
      <a className="dt-nav-logo" href="#home">
        {vm.logo ? <img src={vm.logo} alt="" /> : null}
        <span>{vm.title}</span>
      </a>
      {links.length > 0 ? (
        <ul className="dt-nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      ) : null}
      <a href="#enquiry" className="dt-nav-cta">
        Book Site Visit
      </a>
    </nav>
  )
}
