import './index.css'
import { CampaignDataProvider } from './lib/CampaignDataContext'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Overview } from './components/Overview'
import { Benefits } from './components/Benefits'
import { Gallery } from './components/Gallery'
import { FloorPlans, Videos } from './components/FloorPlans'
import { Amenities } from './components/Amenities'
import { Location } from './components/Location'
import { EnquirySection, MobileEnquiryBar } from './components/EnquirySection'
import { Footer } from './components/Footer'

interface MicrositeAppProps {
  selected?: unknown
}

function App(props: MicrositeAppProps) {
  return (
    <CampaignDataProvider selected={props.selected}>
      <div className="microsite-default">
        <Nav />
        <Hero />
        <Overview />
        <Benefits />
        <Gallery />
        <FloorPlans />
        <Amenities />
        <Location />
        <Videos />
        <EnquirySection />
        <Footer />
        <MobileEnquiryBar />
      </div>
    </CampaignDataProvider>
  )
}

export default App
