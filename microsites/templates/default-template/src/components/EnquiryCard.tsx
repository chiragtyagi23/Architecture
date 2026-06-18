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

export function EnquiryCard({ className = '' }: { className?: string }) {
  const { title, mobile } = useCampaignData()

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    window.alert('Thank you. Our team will contact you shortly.')
  }

  return (
    <div className={`hs-enquiry-card ${className}`.trim()} id="enquiry">
      <div className="hs-enquiry-card__head">
        <h2>Interested in this project?</h2>
        <p>Share your details for a callback on {title}.</p>
      </div>

      <form className="hs-enquiry-form" onSubmit={onSubmit}>
        <label className="hs-field">
          <span>Full name</span>
          <input name="name" type="text" placeholder="Enter your name" required autoComplete="name" />
        </label>
        <label className="hs-field">
          <span>Mobile number</span>
          <input name="phone" type="tel" placeholder="10-digit mobile" required autoComplete="tel" />
        </label>
        <label className="hs-field">
          <span>Configuration</span>
          <select name="bhk" defaultValue="">
            <option value="" disabled>
              Select BHK
            </option>
            {BHK_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
        <label className="hs-field">
          <span>Budget</span>
          <select name="budget" defaultValue="">
            <option value="" disabled>
              Select budget
            </option>
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="hs-btn-primary hs-btn-block">
          Request callback
        </button>
        <p className="hs-enquiry-disclaimer">
          By submitting, you agree to be contacted about this property. We respect your privacy.
        </p>
      </form>

      {mobile ? (
        <a className="hs-enquiry-call" href={`tel:${mobile.replace(/\s/g, '')}`}>
          Or call {mobile}
        </a>
      ) : null}
    </div>
  )
}

export function MobileEnquiryBar() {
  return (
    <div className="hs-mobile-bar" aria-hidden={false}>
      <a className="hs-btn-primary hs-btn-block" href="#enquiry">
        Request callback
      </a>
    </div>
  )
}
