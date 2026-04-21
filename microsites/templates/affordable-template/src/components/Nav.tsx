export function Nav({ selected }: { selected?: any }) {
  const title = typeof selected?.title === 'string' ? selected.title : 'NestNest Homes'
  const logo = typeof selected?.logo === 'string' ? selected.logo : ''
  return (
    <nav>
      <div className="nav-logo">
        {logo ? <img src={logo} alt="" style={{ width: 26, height: 26, borderRadius: 8, objectFit: 'cover' }} /> : '🏠'}{' '}
        {title}
      </div>
      <ul className="nav-links">
        <li>
          <a href="#intro">About</a>
        </li>
        <li>
          <a href="#features">Features</a>
        </li>
        <li>
          <a href="#config">BHK Plans</a>
        </li>
        <li>
          <a href="#gallery">Gallery</a>
        </li>
        <li>
          <a href="#amenities">Amenities</a>
        </li>
        <li>
          <a href="#location">Location</a>
        </li>
      </ul>
      <a href="#enquiry" className="nav-cta">
        Enquire Now
      </a>
    </nav>
  )
}

