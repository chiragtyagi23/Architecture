import { useSiteSection } from '../lib/siteApi'

function UpcomingProjects() {
  const { data, error } = useSiteSection<UpcomingProjectsPayload>(
    'VITE_UPCOMING_PROJECTS_API_URL',
    '/demo-api/upcoming-projects.json',
  )

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
          {data.cards.map((p, i) => (
            <article
              key={`${p.slug || 'soon'}-${i}`}
              className={
                p.slug
                  ? 'bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow'
                  : 'bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] opacity-80'
              }
            >
              {p.slug ? (
                <a
                  href={`/${p.slug}`}
                  target={p.openInNewTab ? '_blank' : undefined}
                  rel={p.openInNewTab ? 'noopener noreferrer' : undefined}
                  className="block no-underline text-inherit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/50 rounded-xl"
                  aria-label={`Open ${p.title}`}
                >
                  <div className="aspect-4/3 overflow-hidden bg-gray-100">
                    <img src={p.image} alt="" className="w-full h-full object-cover block" />
                  </div>
                  <div className="p-4">
                    <h3 className="m-0 mb-2 text-lg font-bold text-black">{p.title}</h3>
                    <p className="m-0 text-sm font-normal leading-relaxed text-gray-500">{p.description}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="inline-flex gap-0.5 items-center">
                        {[1, 2, 3].map((s) => (
                          <svg key={s} className="w-4 h-4 text-amber-400 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="relative inline-block w-4 h-4 shrink-0" aria-hidden>
                          <svg className="absolute inset-0 w-4 h-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                            <svg className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </span>
                        </span>
                        <svg className="w-4 h-4 text-gray-300 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-500">{p.rating}</span>
                    </div>
                  </div>
                </a>
              ) : (
                <>
                <div className="aspect-4/3 overflow-hidden bg-gray-100">
                  <img src={p.image} alt="" className="w-full h-full object-cover block" />
                </div>
                <div className="p-4">
                  <h3 className="m-0 mb-2 text-lg font-bold text-black">{p.title}</h3>
                  <p className="m-0 text-sm font-normal leading-relaxed text-gray-500">{p.description}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="inline-flex gap-0.5 items-center">
                      {[1, 2, 3].map((s) => (
                        <svg key={s} className="w-4 h-4 text-amber-400 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="relative inline-block w-4 h-4 shrink-0" aria-hidden>
                        <svg className="absolute inset-0 w-4 h-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                          <svg className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </span>
                      </span>
                      <svg className="w-4 h-4 text-gray-300 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-500">{p.rating}</span>
                  </div>
                </div>
                </>
              )}
              </article>
          ))}
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
