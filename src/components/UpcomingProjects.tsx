import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchCampaigns } from '../store/campaignsSlice'

function UpcomingProjects() {
  const data: UpcomingProjectsPayload = {
    eyebrow: 'UPCOMING PROJECTS',
    title: 'Explore what’s launching soon',
    cards: [],
  }
  const error: string | null = null

  const dispatch = useAppDispatch()
  // NOTE: some setups type `useSelector` state as `unknown`; this cast keeps it beginner-friendly.
  const campaigns = useAppSelector((s) => (s as any).campaigns.items)
  const loading = useAppSelector((s) => (s as any).campaigns.loading)
  useEffect(() => {
    dispatch(fetchCampaigns())
  }, [])

  if (error) {
    return (
      <section className="bg-white py-12 sm:py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-[min(1600px,96vw)] mx-auto px-4 sm:pl-8 md:pl-12 w-full box-border">
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
            Upcoming projects failed to load: {error}
          </div>
        </div>
      </section>
    )
  }

  if (!data) {
    return (
      <section className="bg-white py-12 sm:py-16 md:py-24 px-4 sm:px-6" aria-busy="true">
        <div className="max-w-[min(1600px,96vw)] mx-auto px-4 sm:pl-8 md:pl-12 w-full box-border">
          <div className="h-6 w-56 rounded bg-gray-100" />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-[280px] rounded-xl bg-gray-100" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-12 sm:py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-[min(1600px,96vw)] mx-auto px-4 sm:pl-8 md:pl-12 w-full box-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <p className="m-0 mb-2 text-sm font-normal text-gray-500">
              {data.eyebrow}
            </p>
            <h2 className="m-0 text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-tight text-black">
              {data.title}
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="w-11 h-11 rounded-full border-0 cursor-pointer text-xl leading-none flex items-center justify-center bg-gray-200 text-black hover:bg-gray-300 transition-colors"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              type="button"
              className="w-11 h-11 rounded-full border-0 cursor-pointer text-xl leading-none flex items-center justify-center bg-gray-800 text-white hover:bg-gray-900 transition-colors"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {(loading ? [0, 1, 2] : campaigns).map((row: any) => {
            if (typeof row === 'number') {
              return <div key={row} className="h-[280px] rounded-xl bg-gray-100" aria-hidden />
            }

            const title = row.title
            const description = row.desc ?? row.address ?? ''
            const coverImage = row.coverImage ?? row.logo ?? 'https://placehold.co/800x600?text=Cover'
            const templateKey = typeof row.templateKey === 'string' ? row.templateKey : 'luxury-template'

            return (
              <button
                key={row.id}
                type="button"
                onClick={() => {
                  const path = `/project-name/${row.id}?template=${encodeURIComponent(templateKey)}`
                  window.open(path, '_blank', 'noopener,noreferrer')
                }}
                className="text-left bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow border-0 p-0 cursor-pointer"
              >
                <div className="aspect-4/3 overflow-hidden bg-gray-100">
                  <img src={coverImage} alt="" className="w-full h-full object-cover block" />
                </div>
                <div className="p-4">
                  <h3 className="m-0 mb-2 text-lg font-bold text-black">{title}</h3>
                  <p className="m-0 text-sm font-normal leading-relaxed text-gray-500">{description}</p>
                  <div className="mt-3 text-xs text-gray-500 break-all">ID: {row.id}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

type UpcomingProjectCard = {
  slug?: string
  title: string
  description: string
  rating: number
  image: string
  openInNewTab?: boolean
}

type UpcomingProjectsPayload = {
  eyebrow: string
  title: string
  cards: UpcomingProjectCard[]
}

export default UpcomingProjects
