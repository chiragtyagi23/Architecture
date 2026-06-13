import * as React from 'react'
import LuxuryMicrositeApp from '../../microsites/templates/luxury-template/src/App'
import { TemplateBasePathProvider } from '../../microsites/templates/luxury-template/src/lib/basePath'
import AffordableMicrositeApp from '../../microsites/templates/affordable-template/src/App'
import { fetchCampaignById } from '../store/campaignsSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

type Props = {
  id?: string
  slug?: string
  templateOverride?: string
}

export default function ProjectNameMicrosite({ id, slug, templateOverride }: Props) {
  const dispatch = useAppDispatch()
  const selectedId = useAppSelector((s) => (s as any).campaigns.selectedId) as string | null
  const selected = useAppSelector((s) => (s as any).campaigns.selected)
  const selectedLoading = useAppSelector((s) => (s as any).campaigns.selectedLoading) as boolean
  const selectedError = useAppSelector((s) => (s as any).campaigns.selectedError) as string | null
  const templateOverrideKey = React.useMemo(() => String(templateOverride ?? '').toLowerCase(), [templateOverride])

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
    if (templateOverrideKey) return templateOverrideKey
    const key = selected && typeof selected === 'object' && 'templateKey' in selected ? (selected as any).templateKey : ''
    return typeof key === 'string' ? key.toLowerCase() : ''
  })()

  const basePath = slug ? `/${slug}` : '/project-name'

  return resolvedTemplate === 'affordable' ||
    resolvedTemplate === 'affordable-template' ||
    resolvedTemplate === 'template-2' ? (
    <AffordableMicrositeApp selected={selected} />
  ) : (
    <TemplateBasePathProvider basePath={basePath}>
      <LuxuryMicrositeApp selected={selected} />
    </TemplateBasePathProvider>
  )
}
