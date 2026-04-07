import Hero from '../components/Hero'
import Features from '../components/Features'
import UpcomingProjects from '../components/UpcomingProjects'
import FirmSection from '../components/FirmSection'
import SubscribeSection from '../components/SubscribeSection'

function LandingPage() {
  return (
    <main className="block">
      <Hero />
      <Features />
      <UpcomingProjects />
      <FirmSection />
      <SubscribeSection />
    </main>
  )
}

export default LandingPage
