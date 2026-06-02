import { useState, type FormEvent } from 'react'
import toast from 'react-hot-toast'

const LEADS_API_BASE_URL =
  (process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_BASE_URL || '').trim() || 'http://localhost:4000'

function SubscribeSection() {
  const data: EnquiryPayload = {
    title: 'Enquiry form',
    body: 'Share your details and our team will contact you shortly.',
    form: {
      buttonIdle: 'Submit enquiry',
      buttonLoading: 'Submitting…',
      sourceLabel: 'website',
    },
  }

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [bhk, setBhk] = useState('')
  const [budget, setBudget] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!name.trim() || !number.trim()) {
      toast.error('Please enter name and phone number.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${LEADS_API_BASE_URL}/api/capture-leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          number: number.trim(),
          email: email.trim() || null,
          bhk: bhk || null,
          budget: budget || null,
          campaignId: null,
          preferredLocation: [],
          source: data.form.sourceLabel,
        }),
      })

      if (!res.ok) {
        toast.error('Could not submit enquiry. Please try again.')
        return
      }

      setName('')
      setNumber('')
      setEmail('')
      setBhk('')
      setBudget('')
      toast.success('Enquiry submitted. Lead captured in CRM.')
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="landing-subscribe-wrap" id="contact">
      <div className="landing-container">
        <div className="landing-subscribe-card">
          <h2 className="landing-subscribe-card__title">{data.title}</h2>
          <p className="landing-subscribe-card__subtitle">{data.body}</p>
          <form className="landing-subscribe-card__form" onSubmit={handleSubmit} aria-label="Enquiry form">
            <div className="landing-subscribe-card__field">
              <label htmlFor="enquiry-name">Full name</label>
              <input
                id="enquiry-name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="landing-subscribe-card__field">
              <label htmlFor="enquiry-phone">Phone number</label>
              <input
                id="enquiry-phone"
                type="tel"
                name="phone"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                disabled={loading}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="landing-subscribe-card__field">
              <label htmlFor="enquiry-email">Email (optional)</label>
              <input
                id="enquiry-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>
            <div className="landing-subscribe-card__field">
              <label htmlFor="enquiry-bhk">BHK</label>
              <select
                className="landing-subscribe-card__select"
                id="enquiry-bhk"
                name="bhk"
                value={bhk}
                onChange={(e) => setBhk(e.target.value)}
                disabled={loading}
              >
                <option value="">Select BHK</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
              </select>
            </div>
            <div className="landing-subscribe-card__field">
              <label htmlFor="enquiry-budget">Budget</label>
              <select
                className="landing-subscribe-card__select"
                id="enquiry-budget"
                name="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                disabled={loading}
              >
                <option value="">Select budget</option>
                <option value="45-55 Lakhs">45-55 Lakhs</option>
                <option value="65-75 Lakhs">65-75 Lakhs</option>
                <option value="75-85 Lakhs">75-85 Lakhs</option>
                <option value="90 Lakhs - 1 Cr">90 Lakhs - 1 Cr</option>
                <option value="1-1.2 Crores">1-1.2 Crores</option>
              </select>
            </div>
            <div className="landing-subscribe-card__field">
              <label htmlFor="enquiry-source">Source</label>
              <input id="enquiry-source" className="landing-subscribe-card__readonly" type="text" value={data.form.sourceLabel} disabled />
            </div>
            <div className="landing-subscribe-card__actions">
              <button type="submit" className="landing-btn landing-btn--primary landing-btn--full" disabled={loading}>
                {loading ? data.form.buttonLoading : data.form.buttonIdle}
              </button>
              <p className="landing-subscribe-card__note">This form creates a CRM lead with source set to &quot;website&quot;.</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

type EnquiryPayload = {
  title: string
  body: string
  form: { buttonIdle: string; buttonLoading: string; sourceLabel: string }
}

export default SubscribeSection
