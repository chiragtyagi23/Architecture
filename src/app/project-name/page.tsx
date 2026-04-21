'use client'

import { Suspense } from 'react'
import MicrositeLayout from '../../layouts/MicrositeLayout'
import ProjectNameMicrosite from '../../views/ProjectNameMicrosite'
import { useSearchParams } from 'next/navigation'

function ProjectNameClient() {
  const searchParams = useSearchParams()
  const template = searchParams?.get('template') ?? undefined

  return (
    <MicrositeLayout>
      <ProjectNameMicrosite id={undefined} templateOverride={template} />
    </MicrositeLayout>
  )
}

export default function Page() {
  return (
    <Suspense>
      <ProjectNameClient />
    </Suspense>
  )
}

