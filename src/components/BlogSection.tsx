function BlogSection() {
  const blogImages = [
    { className: 'landing-blog__item landing-blog__item--tall', src: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=80' },
    { className: 'landing-blog__item', src: 'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?w=700&q=80' },
    { className: 'landing-blog__item', src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80' },
    { className: 'landing-blog__item landing-blog__item--tall', src: 'https://images.unsplash.com/photo-1605146768851-eda79da39897?w=700&q=80' },
  ]

  return (
    <section className="landing-section" id="blog">
      <div className="landing-container">
        <div className="landing-section-header">
          <h2 className="landing-heading">See our latest news & read blog</h2>
          <a href="#blog" className="landing-link-explore">
            Explore All
          </a>
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
