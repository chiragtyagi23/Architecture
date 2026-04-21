export function Hero({ selected }: { selected?: any }) {
  const title = typeof selected?.title === 'string' ? selected.title : 'Affordable Dream Home'
  const address = typeof selected?.address === 'string' ? selected.address : ''
  const cover = typeof selected?.coverImage === 'string' ? selected.coverImage : ''
  const banners = Array.isArray(selected?.banners) ? selected.banners : []
  const bannerUrl =
    typeof banners?.[0]?.imageId === 'string'
      ? banners[0].imageId
      : typeof selected?.hero?.data?.backgroundImages?.[0]?.src === 'string'
        ? selected.hero.data.backgroundImages[0].src
        : ''
  const heroImage = cover || bannerUrl
  return (
    <section id="hero">
      <div className="hero-inner">
        <div>
          <div className="hero-badge">🎉 Now Open for Booking</div>
          <h1 className="hero-title">
            {title}
            <br />
            {address ? <span className="accent-aqua">{address}</span> : <span className="accent-aqua">Affordable</span>}
          </h1>
          <p className="hero-subtitle">
            NestNest Homes — where every family finds their perfect cozy corner, at a price that truly makes you smile.
          </p>
          <div className="gem-row">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={`gem ${i % 3 === 0 ? 'a' : i % 3 === 1 ? 'r' : 'y'}`} />
            ))}
          </div>
        </div>
        <div className="hero-image-wrap">
          <div className="hero-deco-blob" />
          <div className="hero-deco-blob2" />
          <div className="hero-img" aria-hidden>
            {heroImage ? (
              <img src={heroImage} alt="" className="hero-img-svg" style={{ objectFit: 'cover' }} />
            ) : (
              <svg className="hero-img-svg" viewBox="0 0 520 420" xmlns="http://www.w3.org/2000/svg">
                <rect width="520" height="420" fill="#42C6D9" />
                <circle cx="440" cy="80" r="38" fill="#FFD447" opacity="0.9" />
                <rect y="310" width="520" height="110" fill="#4CAF50" rx="0" />
                <rect x="140" y="200" width="240" height="130" fill="white" rx="8" />
                <polygon points="120,205 260,120 400,205" fill="#F04B4B" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

