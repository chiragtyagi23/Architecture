import type { CampaignRow } from '../store/campaignsSlice'

type Props = {
  campaigns: CampaignRow[]
  loading?: boolean
  skeletonCount?: number
  limit?: number
}

function ProjectsGrid({ campaigns, loading = false, skeletonCount = 4, limit }: Props) {
  const rows = loading ? Array.from({ length: skeletonCount }, (_, i) => i) : limit ? campaigns.slice(0, limit) : campaigns

  return (
    <div className="landing-properties__grid">
      {rows.map((row, idx) => {
        if (typeof row === 'number') {
          return <div key={row} className="landing-skeleton" style={{ height: '420px' }} aria-hidden />
        }

        const title = row.title
        const description = row.desc ?? row.address ?? ''
        const coverImage = row.coverImage ?? row.logo ?? 'https://placehold.co/800x600?text=Cover'
        const templateKey = typeof row.templateKey === 'string' ? row.templateKey : 'luxury-template'

        return (
          <article key={row.id} className="landing-property-card">
            <img className="landing-property-card__img" src={coverImage} alt={title} />
            <div className="landing-property-card__body">
              <h3 className="landing-property-card__location">{title}</h3>
              <p style={{ margin: '0 0 0.75rem', color: '#444', fontSize: '0.95rem' }}>{description}</p>
              <div className="landing-property-card__meta">
                <span>8 Bed</span>
                <span>10*10</span>
                <span>6 Room</span>
              </div>
              <div className="landing-property-card__footer">
                <button
                  type="button"
                  className={`landing-property-card__book ${idx === 0 ? 'landing-property-card__book--fill' : 'landing-property-card__book--outline'}`}
                  onClick={() => {
                    const path = `/project-name/${row.id}?template=${encodeURIComponent(templateKey)}`
                    window.open(path, '_blank', 'noopener,noreferrer')
                  }}
                >
                  Book now
                </button>
                <strong className="landing-property-card__price">$5,200,00</strong>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default ProjectsGrid
