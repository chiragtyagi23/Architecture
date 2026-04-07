import { useSiteSection } from '../lib/siteApi'

type FeaturesPayload = {
  eyebrow: string
  title: string
  items: { title: string; description: string; icon: { src: string; alt?: string } }[]
}

function Features() {
  const { data, error } = useSiteSection<FeaturesPayload>('VITE_FEATURES_API_URL', '/demo-api/features.json')
  if (error) return null
  if (!data) return null

  return (
    <section className="bg-white py-12 sm:py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-[min(1600px,96vw)] mx-auto px-4 sm:pl-8 md:pl-12 text-center w-full box-border">
        <p className="m-0 mb-2 text-sm font-normal text-gray-600">{data.eyebrow}</p>
        <h2 className="m-0 mb-10 sm:mb-12 md:mb-16 text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-tight text-gray-900">
          {data.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 items-start">
          {data.items.map((item, i) => (
            <article key={i} className="m-0 text-left">
              <div className="flex items-center justify-start w-12 h-12 sm:w-14 sm:h-14 mb-4 sm:mb-6">
                <img src={item.icon.src} alt={item.icon.alt ?? ''} className="w-12 h-12 sm:w-14 sm:h-14" aria-hidden />
              </div>
              <h3 className="m-0 mb-3 sm:mb-4 text-base sm:text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="m-0 text-sm sm:text-base font-normal leading-relaxed text-gray-600 max-w-[20rem]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
