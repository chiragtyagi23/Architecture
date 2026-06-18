import { useCampaignData } from '../lib/CampaignDataContext'

function isEmbeddable(url: string) {
  return /youtube\.com|youtu\.be|vimeo\.com/i.test(url)
}

function embedUrl(url: string) {
  if (/youtu\.be\//i.test(url)) {
    const id = url.split('/').pop()?.split('?')[0]
    return id ? `https://www.youtube.com/embed/${id}` : url
  }
  if (/youtube\.com\/watch/i.test(url)) {
    try {
      const id = new URL(url).searchParams.get('v')
      return id ? `https://www.youtube.com/embed/${id}` : url
    } catch {
      return url
    }
  }
  return url
}

export function FloorPlans() {
  const { showFloorPlans, floorRows, floorPlanImages } = useCampaignData()
  if (!showFloorPlans) return null

  return (
    <section className="hs-section" id="floorplans">
      <div className="hs-section-title">
        <h2>Floor plans & pricing</h2>
      </div>
      <div className="hs-panel">
        {floorRows.length > 0 ? (
          <div className="hs-table-wrap">
            <table className="hs-pricing-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Configuration</th>
                  <th>Carpet area</th>
                  <th>Floors</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {floorRows.map((row, i) => (
                  <tr key={`${row.tab}-${i}`}>
                    <td>{row.tab}</td>
                    <td>{row.configuration || '—'}</td>
                    <td>{row.carpetArea || '—'}</td>
                    <td>{row.floorRange || '—'}</td>
                    <td className="hs-price-cell">{row.price || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        {floorPlanImages.length > 0 ? (
          <div className="hs-floor-plans">
            {floorPlanImages.map((src) => (
              <img key={src} src={src} alt="Floor plan" loading="lazy" />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function Videos() {
  const { showVideos, videos } = useCampaignData()
  if (!showVideos) return null

  return (
    <section className="hs-section" id="videos">
      <div className="hs-section-title">
        <h2>Videos</h2>
      </div>
      <div className="hs-video-grid">
        {videos.map((v) => (
          <div key={v.url} className="hs-video-tile">
            {isEmbeddable(v.url) ? (
              <iframe src={embedUrl(v.url)} title={v.label} allowFullScreen />
            ) : (
              <video src={v.url} controls />
            )}
            <div className="hs-video-caption">{v.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
