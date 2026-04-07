import { useSiteSection } from '../lib/siteApi'

type FirmSectionPayload = {
  title: string
  headlineLine1: string
  headlineLine2: string
  body: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  stats: { value: string; label: string }[]
  image: { src: string; alt: string }
}

function FirmSection() {
  const { data, error } = useSiteSection<FirmSectionPayload>('VITE_FIRM_SECTION_API_URL', '/demo-api/firm-section.json')
  if (error) return null
  if (!data) return null

  return (
    <section className="bg-white py-12 sm:py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-[min(1600px,96vw)] mx-auto px-4 sm:pl-8 md:pl-12 w-full box-border">
        <h2 className="m-0 mb-10 sm:mb-14 text-center text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-tight text-black max-w-3xl mx-auto">
          {data.title}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 sm:gap-14 lg:gap-18 items-start">
          <div className="max-w-xl min-w-0">
            <h3 className="m-0 text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold leading-tight text-black text-left">
              {data.headlineLine1}
            </h3>
            <h3 className="m-0 mb-4 sm:mb-6 text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold leading-tight text-black text-left">
              {data.headlineLine2}
            </h3>
            <p className="m-0 mb-6 sm:mb-8 text-sm sm:text-base font-normal leading-[1.55] text-gray-600 text-left">
              {data.body}
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10">
              <a
                href={data.primaryCta.href}
                className="inline-flex items-center justify-center py-3 px-7 rounded-full font-sans text-base font-normal text-white bg-gray-900 border-0 no-underline hover:bg-gray-800"
              >
                {data.primaryCta.label}
              </a>
              <a
                href={data.secondaryCta.href}
                className="inline-flex items-center justify-center py-3 px-7 rounded-full font-sans text-base font-normal text-gray-700 bg-white border border-gray-300 no-underline hover:bg-gray-50 hover:border-gray-400"
              >
                {data.secondaryCta.label}
              </a>
            </div>
            <div className="flex flex-wrap justify-between items-start mt-8 sm:mt-10 max-w-md gap-6 sm:gap-8">
              {data.stats.map((stat, i) => (
                <div key={i} className="flex flex-col text-left min-w-20">
                  <span className="mb-1 text-[clamp(2rem,5vw,4rem)] font-bold leading-tight text-black">
                    {stat.value}
                  </span>
                  <span className="text-sm sm:text-[1.125rem] font-normal text-gray-600">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[280px] sm:h-[340px] lg:h-[460px] overflow-hidden rounded-tl-none rounded-tr-2xl sm:rounded-tr-[18px] rounded-br-2xl sm:rounded-br-[18px] rounded-bl-2xl sm:rounded-bl-[18px]">
            <img
              src={data.image.src}
              alt={data.image.alt}
              className="w-full h-full block object-cover object-right rounded-tl-none rounded-tr-2xl sm:rounded-tr-[18px] rounded-br-2xl sm:rounded-br-[18px] rounded-bl-2xl sm:rounded-bl-[18px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FirmSection
