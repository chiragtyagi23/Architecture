import { useCampaignData } from '../lib/CampaignDataContext'

export function SiteVisitCTA() {
  const { title } = useCampaignData()

  return (
    <section className="hs-visit" id="enquiry">
      <div className="hs-container">
        <div className="hs-visit-card">
          <div>
            <span className="hs-visit-free">100% FREE</span>
            <h2>Book a free site visit</h2>
            <p>
              Schedule a guided tour for {title}. No brokerage — buy directly with the builder, inspired by
              portals like Housiey and Housing.com.
            </p>
          </div>
          <form
            className="hs-visit-form"
            onSubmit={(e) => {
              e.preventDefault()
              window.alert('Thank you! Our team will contact you shortly.')
            }}
          >
            <input className="hs-input" name="name" placeholder="Your name" />
            <input className="hs-input" name="mobile" placeholder="Mobile number" type="tel" />
            <input className="hs-input" name="email" placeholder="Email (optional)" type="email" />
            <button type="submit" className="hs-btn-primary">
              Schedule site visit
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
