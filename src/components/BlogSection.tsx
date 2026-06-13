import Link from 'next/link'

function BlogSection() {
  const blogImages = [
    { className: 'landing-blog__item landing-blog__item--tall', src: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=80' },
    { className: 'landing-blog__item landing-blog__item--short-top', src: 'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=700&q=80' },
    { className: 'landing-blog__item landing-blog__item--short-bottom', src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80' },
    { className: 'landing-blog__item landing-blog__item--tall landing-blog__item--right', src: 'https://images.unsplash.com/photo-1605146768851-eda79da39897?w=700&q=80' },
  ]

  return (
    <section className="landing-section landing-section--blog" id="blog">
      <div className="landing-container">
        <div className="landing-section-header landing-section-header--blog">
          <h2 className="landing-heading landing-heading--blog">See our latest news & read blog</h2>
          <Link href="/blogs" className="landing-link-explore landing-link-explore--with-arrow">
            Explore All
            <svg width="46" height="46" viewBox="0 0 46 46" fill="none" aria-hidden>
              <path d="M18 12l10 11-10 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="landing-blog__grid">
          {blogImages.map((item, idx) => (
            <div key={idx} className={item.className}>
              <img src={item.src} alt="Blog cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogSection
