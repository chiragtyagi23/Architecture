'use client'

import { Suspense } from 'react'
import MicrositeLayout from '../../../layouts/MicrositeLayout'
import ProjectNameMicrosite from '../../../views/ProjectNameMicrosite'
import { useParams, useSearchParams } from 'next/navigation'

function ProjectNameByIdClient() {
  const params = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const template = searchParams?.get('template') ?? undefined

  return (
    <MicrositeLayout>
      <ProjectNameMicrosite id={params?.id} templateOverride={template} />
    </MicrositeLayout>
  )
}

export default function Page() {
  return (
    <Suspense>
      <ProjectNameByIdClient />
    </Suspense>
  )
}

