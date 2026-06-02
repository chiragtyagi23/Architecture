'use client'

import SiteLayout from '../../layouts/SiteLayout'

const BLOGS = [
  {
    title: 'How to choose the right property location',
    excerpt: 'A quick checklist to evaluate neighborhood growth, schools, connectivity, and future value.',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=80',
  },
  {
    title: 'Rent vs Buy: what works in 2026',
    excerpt: 'Compare monthly cash flow, tax impact, and long-term returns before taking the final call.',
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=900&q=80',
  },
  {
    title: 'What to verify before booking a home',
    excerpt: 'Know the essential legal and technical checks to avoid delays and protect your investment.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80',
  },
]

export default function BlogsPage() {
  return (
    <SiteLayout>
      <section className="landing-section">
        <div className="landing-container">
          <p className="landing-eyebrow">Blogs</p>
          <h1 className="landing-heading" style={{ marginBottom: '1rem' }}>
            Latest insights from our real estate experts
          </h1>
          <p className="landing-body" style={{ maxWidth: '760px', marginBottom: '2rem' }}>
            Read practical guides on buying, renting, investing, and selecting the right project for your goals.
          </p>

          <div className="landing-properties__grid">
            {BLOGS.map((blog) => (
              <article key={blog.title} className="landing-property-card">
                <img className="landing-property-card__img" src={blog.image} alt={blog.title} />
                <div className="landing-property-card__body">
                  <h2 className="landing-property-card__location">{blog.title}</h2>
                  <p style={{ margin: 0, color: '#444', lineHeight: 1.6 }}>{blog.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
