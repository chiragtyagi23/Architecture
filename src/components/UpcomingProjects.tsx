import { useEffect } from 'react'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchCampaigns } from '../store/campaignsSlice'
import ProjectsGrid from './ProjectsGrid'

function UpcomingProjects() {
  const dispatch = useAppDispatch()
  const campaigns = useAppSelector((s) => s.campaigns.items)
  const loading = useAppSelector((s) => s.campaigns.loading)
  const error = useAppSelector((s) => s.campaigns.error)

  useEffect(() => {
    dispatch(fetchCampaigns())
  }, [dispatch])

  if (error) {
    return (
      <section className="landing-section">
        <div className="landing-container">
          <div
            style={{
              borderRadius: '10px',
              border: '1px solid #fecaca',
              background: '#fef2f2',
              padding: '1rem',
              color: '#991b1b',
            }}
          >
            Projects failed to load: {error}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="landing-section landing-section--properties">
      <div className="landing-container">
        <div className="landing-section-header">
          <h2 className="landing-heading">Best recommendation</h2>
          <Link className="landing-link-explore" href="/projects">
            Explore All
          </Link>
        </div>

        {!loading && campaigns.length === 0 ? (
          <p className="landing-body landing-body--empty">No projects available right now. Please check back soon.</p>
        ) : (
          <ProjectsGrid campaigns={campaigns} loading={loading} limit={4} skeletonCount={4} />
        )}
      </div>
    </section>
  )
}

export default UpcomingProjects
