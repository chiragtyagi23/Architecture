'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchCampaigns } from '../store/campaignsSlice'
import ProjectsGrid from '../components/ProjectsGrid'

function ProjectsPage() {
  const dispatch = useAppDispatch()
  const campaigns = useAppSelector((s) => s.campaigns.items)
  const loading = useAppSelector((s) => s.campaigns.loading)
  const error = useAppSelector((s) => s.campaigns.error)

  useEffect(() => {
    dispatch(fetchCampaigns())
  }, [dispatch])

  return (
    <section className="landing-section">
      <div className="landing-container">
        <p className="landing-eyebrow">Projects</p>
        <h1 className="landing-heading" style={{ marginBottom: '0.75rem' }}>
          Best recommendation
        </h1>
        <p className="landing-body" style={{ maxWidth: '640px', marginBottom: '2rem' }}>
          Browse all available projects and open a microsite to view full details.
        </p>

        {error ? (
          <div
            style={{
              borderRadius: '10px',
              border: '1px solid #fecaca',
              background: '#fef2f2',
              padding: '1rem',
              color: '#991b1b',
            }}
          >
            Failed to load projects: {error}
          </div>
        ) : !loading && campaigns.length === 0 ? (
          <p className="landing-body" style={{ color: '#666' }}>
            No projects available right now. Please check back soon.
          </p>
        ) : (
          <ProjectsGrid campaigns={campaigns} loading={loading} skeletonCount={8} />
        )}
      </div>
    </section>
  )
}

export default ProjectsPage
