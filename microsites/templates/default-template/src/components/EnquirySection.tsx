import { type FormEvent } from 'react'

import { useCampaignData } from '../lib/CampaignDataContext'

const BHK_OPTIONS = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK']
const BUDGET_OPTIONS = [
  'Under 50 Lakhs',
  '50–75 Lakhs',
  '75 Lakhs – 1 Cr',
  '1–1.5 Crores',
  '1.5 Crores+',
]

export function EnquirySection() {
  const { title, address, regNo, mobile, bhk } = useCampaignData()

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    window.alert('Thank you. Our team will contact you shortly.')
  }

  const bhkOptions = bhk
    ? bhk.split(/[,–-]/).map((s) => s.trim()).filter(Boolean)
    : BHK_OPTIONS

  return (
    <section className="dt-section dt-section--blue" id="enquiry">
      <div className="dt-enquiry-wrap">
        <div>
          <span className="dt-eyebrow">Get In Touch</span>
          <h2 className="dt-section-title">
            Book Your <em>Site Visit</em>
          </h2>
          <p className="dt-enquiry-sub">
            Experience {title} firsthand. Schedule a site visit and let our team walk you through the project.
          </p>
          {address ? (
            <div className="dt-enquiry-detail">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span>
                <strong>{address}</strong>
              </span>
            </div>
          ) : null}
          {regNo ? (
            <div className="dt-enquiry-detail">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                RERA Reg: <strong>{regNo}</strong>
              </span>
            </div>
          ) : null}
          {mobile ? (
            <div className="dt-enquiry-detail">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>
                Call: <strong>{mobile}</strong>
              </span>
            </div>
          ) : null}
        </div>

        <div className="dt-form-card">
          <h3>Request a Callback</h3>
          <form onSubmit={onSubmit}>
            <div className="dt-form-group">
              <label htmlFor="dt-name">Full Name</label>
              <input id="dt-name" name="name" type="text" placeholder="Your name" required autoComplete="name" />
            </div>
            <div className="dt-form-group">
              <label htmlFor="dt-phone">Mobile Number</label>
              <input id="dt-phone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" required autoComplete="tel" />
            </div>
            <div className="dt-form-group">
              <label htmlFor="dt-email">Email Address</label>
              <input id="dt-email" name="email" type="email" placeholder="you@email.com" autoComplete="email" />
            </div>
            <div className="dt-form-group">
              <label htmlFor="dt-bhk">Interested In</label>
              <select id="dt-bhk" name="bhk" defaultValue="">
                <option value="" disabled>
                  Select configuration
                </option>
                {bhkOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="dt-form-group">
              <label htmlFor="dt-budget">Budget</label>
              <select id="dt-budget" name="budget" defaultValue="">
                <option value="" disabled>
                  Select budget
                </option>
                {BUDGET_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="dt-form-submit">
              Book Site Visit →
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export function MobileEnquiryBar() {
  return (
    <div className="dt-mobile-bar">
      <a href="#enquiry" className="dt-nav-cta">
        Book Site Visit
      </a>
    </div>
  )
}
