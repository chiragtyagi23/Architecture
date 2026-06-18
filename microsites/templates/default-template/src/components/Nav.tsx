import { useCampaignData } from '../lib/CampaignDataContext'

export function Nav() {
  const { title, logo, mobile } = useCampaignData()
  const tel = mobile?.replace(/\s/g, '')

  return (
    <header className="hs-nav">
      <div className="hs-container hs-nav-inner">
        <a className="hs-brand" href="#top">
          {logo ? (
            <img src={logo} alt="" />
          ) : (
            <span className="hs-brand-mark" aria-hidden>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z"
                  fill="currentColor"
                />
              </svg>
            </span>
          )}
          <span className="hs-brand-text">{title}</span>
        </a>

        <div className="hs-nav-actions">
          {tel ? (
            <a className="hs-nav-phone" href={`tel:${tel}`}>
              {mobile}
            </a>
          ) : null}
          <a className="hs-nav-cta" href="#enquiry">
            Request callback
          </a>
        </div>
      </div>
    </header>
  )
}
