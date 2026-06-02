import Hero from '../components/Hero'
import Features from '../components/Features'
import UpcomingProjects from '../components/UpcomingProjects'
import FirmSection from '../components/FirmSection'
import BlogSection from '../components/BlogSection'
import TestimonialsSection from '../components/TestimonialsSection'
import SubscribeSection from '../components/SubscribeSection'
import Footer from '../components/Footer'

function LandingPage() {
  return (
    <main className="block">
      <Hero />
      <Features />
      <UpcomingProjects />
      <FirmSection />
      <BlogSection />
      <TestimonialsSection />
      <SubscribeSection />
      <Footer />
    </main>
  )
}

export default LandingPage

