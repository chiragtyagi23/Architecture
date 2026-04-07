import { useState, type FormEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { submitSubscribeEmail } from '../utils/web3forms'

const pathToTitle: Record<string, string> = {
  '/locations': 'Locations',
  '/projects': 'Projects',
  '/commercial': 'Commercial',
  '/listings': 'Listings',
}

function ComingSoon() {
  const { pathname } = useLocation()
  const title = pathToTitle[pathname] || 'This page'
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const result = await submitSubscribeEmail(email, `${title}: Coming Soon signup`)
    setLoading(false)
    if (result.success) {
      setEmail('')
      toast.success("We'll notify you when we launch.")
    } else {
      toast.error(result.message || 'Something went wrong.')
    }
  }

  return (
    <main className="min-h-[60vh] flex flex-col justify-center">
      <section className="px-4 sm:px-6 py-12 sm:py-16 max-w-[min(1600px,96vw)] mx-auto w-full box-border">
        <div
          className="rounded-2xl sm:rounded-[18px] overflow-visible flex flex-col items-center justify-center text-center py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 w-full box-border shadow-[4px_4px_20px_rgba(0,0,0,0.06)]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E"), linear-gradient(90deg, #b8d4e8 0%, #e8d0bc 100%)`,
          }}
        >
          <p className="m-0 mb-2 text-sm font-normal text-black/80">MAX Life Real Estate</p>
          <h1 className="m-0 mb-4 text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight tracking-tight text-black">
            {title} — Coming Soon
          </h1>
          <p className="m-0 mb-8 max-w-md text-base font-normal leading-relaxed text-black/90">
            We're working on something great. Leave your email and we'll notify you as soon as it's ready.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full max-w-md"
            onSubmit={handleSubmit}
            aria-label="Get notified"
          >
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full flex-1 min-w-0 min-h-[44px] h-10 pl-4 pr-4 font-sans text-base text-gray-900 bg-white border border-gray-200 rounded-xl outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] placeholder:text-gray-400 disabled:opacity-70"
              placeholder="Enter your email"
              aria-label="Email address"
              autoComplete="email"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto min-h-[44px] h-10 px-5 font-sans text-sm font-bold text-white bg-gray-900 border-0 rounded-xl cursor-pointer hover:bg-gray-800 shrink-0 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending…' : 'Notify me'}
            </button>
          </form>
          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center py-2.5 px-5 text-sm font-medium text-[#1a1a1a] bg-white border border-gray-300 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:bg-gray-50 no-underline"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  )
}

export default ComingSoon
