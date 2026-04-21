import { useCallback, useState } from 'react'

export function Enquiry({ selected }: { selected?: any }) {
  const [submitted, setSubmitted] = useState(false)
  const onSubmit = useCallback(() => setSubmitted(true), [])
  const email = typeof selected?.email === 'string' ? selected.email : ''
  const mobile = typeof selected?.mobile === 'string' ? selected.mobile : ''
  return (
    <section id="enquiry">
      <div className="section-container">
        <div className="enquiry-inner reveal">
          <div className="section-tag">📬 Get In Touch</div>
          <h2 className="section-title">
            Book Your <span style={{ color: 'var(--red)' }}>Dream Home</span> Today!
          </h2>
          <p className="enquiry-sub">
            Fill in your details and our friendly team will reach out within 24 hours. It's quick, easy, and free!
          </p>

          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" placeholder="Rahul" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" placeholder="Sharma" />
            </div>
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            <input type="tel" placeholder="+91 98765 43210" defaultValue={mobile || ''} />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="rahul@email.com" defaultValue={email || ''} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Interested In</label>
              <select defaultValue="">
                <option value="">Select BHK Type</option>
                <option>1 BHK – ₹18 Lakhs onwards</option>
                <option>2 BHK – ₹26 Lakhs onwards</option>
                <option>2.5 BHK – ₹33 Lakhs onwards</option>
                <option>3 BHK – ₹44 Lakhs onwards</option>
              </select>
            </div>
            <div className="form-group">
              <label>Budget Range</label>
              <select defaultValue="">
                <option value="">Select Budget</option>
                <option>Under ₹20 Lakhs</option>
                <option>₹20 – ₹30 Lakhs</option>
                <option>₹30 – ₹40 Lakhs</option>
                <option>₹40 Lakhs & Above</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Message (Optional)</label>
            <textarea placeholder="Tell us anything — preferred floor, site visit request, loan queries..." />
          </div>

          <div className="enquiry-check">
            <input type="checkbox" id="consent" defaultChecked />
            <label htmlFor="consent">
              I agree to be contacted by the team via call, SMS, or email with property updates and offers. I understand this is not spam.
            </label>
          </div>

          <button className="submit-btn" onClick={onSubmit} disabled={submitted}>
            {submitted ? "✅ Submitted! We'll call you shortly." : '🏠 Get Free Callback Now →'}
          </button>

          <p className="form-note">🔒 Your information is 100% safe &amp; private. No spam, ever.</p>
        </div>
      </div>
    </section>
  )
}

