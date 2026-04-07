import { useState, type FormEvent } from 'react'
import toast from 'react-hot-toast'
import { submitSubscribeEmail } from '../utils/web3forms'
import { useSiteSection } from '../lib/siteApi'

function Hero() {
  const { data, error: loadError } = useSiteSection<HeroPayload>('VITE_HERO_API_URL', '/demo-api/hero.json')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)
    const source = data?.form.sourceLabel ?? 'Hero: Newsletter subscription'
    const result = await submitSubscribeEmail(email, source)
    setLoading(false)
    if (result.success) {
      setSuccess(true)
      setEmail('')
      toast.success("Thanks! We'll be in touch.")
    } else {
      setError(result.message || 'Something went wrong.')
      toast.error(result.message || 'Something went wrong.')
    }
  }

  if (loadError) return null
  if (!data) return null

  return (
    <section className="px-3 sm:px-6 py-4 pb-20 sm:pb-24 lg:pb-28 max-w-[min(1600px,96vw)] mx-auto w-full box-border overflow-visible">
      <div
        className="rounded-2xl sm:rounded-[18px] overflow-visible flex flex-col lg:flex-row flex-wrap items-end justify-between gap-6 lg:gap-8 py-5 px-4 sm:py-6 sm:px-8 lg:py-8 lg:px-12 min-h-0 w-full box-border shadow-[4px_4px_20px_rgba(0,0,0,0.06)]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E"), linear-gradient(90deg, #c8dceb 0%, #ecd9c9 100%)`,
        }}
      >
        {/* Left: text + email subscribe */}
        <div className="flex-1 min-w-0 w-full max-w-md flex flex-col justify-center self-center">
          <p className="m-0 mb-2 sm:mb-3 text-sm font-normal text-black">{data.eyebrow}</p>
          <h1 className="m-0 mb-4 sm:mb-5 text-[clamp(1.875rem,5vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-black">
            {data.titleLine1}
            <br />
            {data.titleLine2}
          </h1>
          <p className="m-0 mb-6 sm:mb-8 text-sm sm:text-base font-normal leading-relaxed text-black/90 max-w-full">
            {data.description}
          </p>
          <form
            className="flex flex-col sm:flex-row gap-2 sm:gap-0 w-full max-w-md rounded-xl overflow-hidden border border-gray-300 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            onSubmit={handleSubmit}
            aria-label="Subscribe by email"
          >
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full flex-1 min-w-0 min-h-[44px] h-11 sm:h-12 pl-4 pr-4 font-sans text-base text-black bg-white border-0 outline-none placeholder:text-gray-500 rounded-xl sm:rounded-none sm:rounded-l-xl disabled:opacity-70"
              placeholder={data.form.placeholder}
              aria-label="Email address"
              autoComplete="email"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer sm:w-auto h-11 sm:h-12 min-h-[44px] px-6 shrink-0 text-base font-medium text-white bg-gray-900 border-0 hover:bg-black rounded-xl sm:rounded-none sm:rounded-r-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? data.form.buttonLoading : data.form.buttonIdle}
            </button>
          </form>
        </div>
        {/* Right: 3D house illustration */}
        <div className="flex-1 min-w-0 w-full max-w-[720px] flex items-end justify-center lg:justify-end shrink-0 overflow-visible order-first lg:order-0">
          <div className="w-full max-w-[680px] overflow-visible rounded-tr-3xl rounded-bl-3xl rounded-tl-md rounded-br-md -mb-12 lg:-mb-20">
            <img
              src={data.image.src}
              alt={data.image.alt}
              className="w-full h-auto object-contain object-right drop-shadow-[0_12px_32px_rgba(0,0,0,0.08)] block"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

type HeroPayload = {
  eyebrow: string
  titleLine1: string
  titleLine2: string
  description: string
  image: { src: string; alt: string }
  form: { placeholder: string; buttonIdle: string; buttonLoading: string; sourceLabel: string }
}

export default Hero
