import * as React from 'react'
import { useParams } from 'react-router-dom'
import '../../microsites/templates/luxury-template/src/index.css'
import LuxuryMicrositeApp from '../../microsites/templates/luxury-template/src/App'
import { TemplateBasePathProvider } from '../../microsites/templates/luxury-template/src/lib/basePath'
import '../../microsites/templates/affordable-template/src/index.css'
import AffordableMicrositeApp from '../../microsites/templates/affordable-template/src/App'
import { fetchCampaignById } from '../store/campaignsSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export default function ProjectNameMicrosite() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const selectedId = useAppSelector((s) => (s as any).campaigns.selectedId) as string | null
  const selected = useAppSelector((s) => (s as any).campaigns.selected)
  const selectedLoading = useAppSelector((s) => (s as any).campaigns.selectedLoading) as boolean
  const selectedError = useAppSelector((s) => (s as any).campaigns.selectedError) as string | null
  const templateOverride = React.useMemo(() => {
    try {
      const t = new URLSearchParams(window.location.search).get('template')
      return (t ?? '').toLowerCase()
    } catch {
      return ''
    }
  }, [])

  React.useEffect(() => {
    if (!id) return
    dispatch(fetchCampaignById(id))
  }, [dispatch, id])

  if (!id) {
    return (
      <div style={{ padding: 24, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
        Missing campaign id.
      </div>
    )
  }

  if (selectedLoading && selectedId !== id) {
    return (
      <div style={{ padding: 24, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
        Loading project…
      </div>
    )
  }

  if (selectedError) {
    return (
      <div style={{ padding: 24, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
        Failed to load campaign: {selectedError}
      </div>
    )
  }

  const resolvedTemplate = (() => {
    if (templateOverride) return templateOverride
    const key = selected && typeof selected === 'object' && 'templateKey' in selected ? (selected as any).templateKey : ''
    return typeof key === 'string' ? key.toLowerCase() : ''
  })()

  return (
    // Keep basePath stable so the template can load its own JSON/assets.
    // The campaign id is only for our backend fetch (/api/campaigns/:id).
    resolvedTemplate === 'affordable' ||
    resolvedTemplate === 'affordable-template' ||
    resolvedTemplate === 'template-2' ? (
      <AffordableMicrositeApp selected={selected} />
    ) : (
      // Luxury template (previously template-1). Also acts as default.
      <TemplateBasePathProvider basePath="/project-name">
        <LuxuryMicrositeApp selected={selected} />
      </TemplateBasePathProvider>
    )
  )
}

