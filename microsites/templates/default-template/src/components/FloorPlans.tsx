import { useState } from 'react'

import { useCampaignData } from '../lib/CampaignDataContext'

export function FloorPlans() {
  const { showFloorPlans, floorTabs, floorRows, floorPlanImages } = useCampaignData()
  const [activeTab, setActiveTab] = useState(0)

  if (!showFloorPlans) return null

  const hasTabs = floorTabs.length > 1
  const active = floorTabs[activeTab] ?? floorTabs[0]
  const rows = hasTabs && active ? active.rows : floorRows
  const images = hasTabs && active ? active.images : floorPlanImages

  return (
    <section className="dt-section dt-section--gray" id="residences">
      <span className="dt-eyebrow">Residences</span>
      <h2 className="dt-section-title">
        Floor Plans &amp; <em>Pricing</em>
      </h2>

      {hasTabs ? (
        <div className="dt-tabs-row">
          {floorTabs.map((tab, i) => (
            <button
              key={tab.id}
              type="button"
              className={`dt-tab-btn${i === activeTab ? ' active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      ) : null}

      {rows.length > 0 ? (
        <table className="dt-floor-table">
          <thead>
            <tr>
              {!hasTabs ? <th>Type</th> : null}
              <th>Configuration</th>
              <th>Carpet Area</th>
              <th>Floors</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={`${row.tab}-${i}`}>
                {!hasTabs ? <td>{row.tab}</td> : null}
                <td>{row.configuration || '—'}</td>
                <td>{row.carpetArea || '—'}</td>
                <td>{row.floorRange || '—'}</td>
                <td>{row.price || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      {images.length > 0 ? (
        <div className="dt-floor-images">
          {images.map((src) => (
            <img key={src} src={src} alt="Floor plan" loading="lazy" />
          ))}
        </div>
      ) : null}
    </section>
  )
}

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

export function Videos() {
  const { showVideos, videos } = useCampaignData()
  if (!showVideos) return null

  return (
    <section className="dt-section" id="videos">
      <span className="dt-eyebrow">Media</span>
      <h2 className="dt-section-title">
        Project <em>Videos</em>
      </h2>
      <div className="dt-video-grid">
        {videos.map((v) => (
          <div key={v.url} className="dt-video-card">
            {isEmbeddable(v.url) ? (
              <iframe src={embedUrl(v.url)} title={v.label} allowFullScreen />
            ) : (
              <video src={v.url} controls />
            )}
            <div className="dt-video-label">{v.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
