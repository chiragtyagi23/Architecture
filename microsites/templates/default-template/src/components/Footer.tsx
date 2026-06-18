import { useCampaignData } from '../lib/CampaignDataContext'

export function Footer() {
  const { title, regNo, address } = useCampaignData()
  const year = new Date().getFullYear()

  return (
    <footer className="dt-footer">
      <div className="dt-footer-logo">{title}</div>
      <div className="dt-footer-rera">
        {regNo ? `RERA Registration: ${regNo}` : null}
        {regNo && address ? ' | ' : null}
        {address ?? null}
      </div>
      <div className="dt-footer-copy">
        © {year} {title}. All rights reserved. This is not an offer or contract. Subject to RERA compliance.
      </div>
    </footer>
  )
}
