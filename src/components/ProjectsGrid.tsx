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
          return <div key={row} className="landing-skeleton" aria-hidden />
        }

        const title = row.title
        const location = row.address ?? row.desc ?? ''
        const coverImage = row.coverImage ?? row.logo ?? 'https://placehold.co/800x600?text=Cover'
        const templateKey = typeof row.templateKey === 'string' ? row.templateKey : 'luxury-template'

        return (
          <article key={row.id} className="landing-property-card">
            <img className="landing-property-card__img" src={coverImage} alt={title} />
            <div className="landing-property-card__body">
              <h3 className="landing-property-card__title">{title}</h3>
              {location ? (
                <p className="landing-property-card__location">
                  <span className="landing-property-card__pin" aria-hidden />
                  {location}
                </p>
              ) : null}
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
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default ProjectsGrid
