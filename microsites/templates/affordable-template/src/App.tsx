import './index.css'
import { SprinkleCanvas } from './components/SprinkleCanvas'
import { ScrollReveal } from './components/ScrollReveal'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { Features } from './components/Features'
import { Config } from './components/Config'
import { Gallery } from './components/Gallery'
import { Amenities } from './components/Amenities'
import { Location } from './components/Location'
import { Videos } from './components/Videos'
import { Reels } from './components/Reels'
import { Enquiry } from './components/Enquiry'
import { SiteFooter } from './components/SiteFooter'

interface MicrositeAppProps {
  selected?: unknown
}

function App(props: MicrositeAppProps) {
  return (
    <div className="microsite-budget">
      <SprinkleCanvas />
      <ScrollReveal />
      <Nav selected={(props as any).selected} />
      <Hero selected={(props as any).selected} />
      <Intro selected={(props as any).selected} />
      <Features />
      <Config selected={(props as any).selected} />
      <Gallery selected={(props as any).selected} />
      <Amenities selected={(props as any).selected} />
      <Location selected={(props as any).selected} />
      <Videos selected={(props as any).selected} />
      <Reels selected={(props as any).selected} />
      <Enquiry selected={(props as any).selected} />
      <SiteFooter />
    </div>
  )
}

export default App

