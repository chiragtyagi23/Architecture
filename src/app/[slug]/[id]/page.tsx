'use client'

import { Suspense } from 'react'
import { useParams, useSearchParams } from 'next/navigation'

import MicrositeLayout from '../../../layouts/MicrositeLayout'
import ProjectNameMicrosite from '../../../views/ProjectNameMicrosite'

function SlugCampaignPageClient() {
  const params = useParams<{ slug: string; id: string }>()
  const searchParams = useSearchParams()
  const template = searchParams?.get('template') ?? undefined

  return (
    <MicrositeLayout>
      <ProjectNameMicrosite id={params?.id} slug={params?.slug} templateOverride={template} />
    </MicrositeLayout>
  )
}

export default function SlugCampaignPage() {
  return (
    <Suspense>
      <SlugCampaignPageClient />
    </Suspense>
  )
}
