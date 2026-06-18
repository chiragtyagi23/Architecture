import { useCampaignData } from '../lib/CampaignDataContext'

export function Footer() {
  const { title, regNo, address } = useCampaignData()
  const year = new Date().getFullYear()

  return (
    <footer className="hs-footer">
      <div className="hs-container hs-footer-inner">
        <div className="hs-footer-brand">{title}</div>
        {address ? <p className="hs-footer-address">{address}</p> : null}
        <p className="hs-footer-legal">
          © {year} {title}. All rights reserved.
          {regNo ? (
            <>
              {' '}
              · MahaRERA No. {regNo}. Details available on the MahaRERA website.
            </>
          ) : null}
        </p>
      </div>
    </footer>
  )
}
