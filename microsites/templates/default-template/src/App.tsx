import './index.css'
import { CampaignDataProvider } from './lib/CampaignDataContext'
import { Nav } from './components/Nav'
import { ProjectBanner } from './components/ProjectBanner'
import { ProjectSummary } from './components/ProjectSummary'
import { StatsSection } from './components/StatsSection'
import { ProjectDetails } from './components/ProjectDetails'
import { Gallery } from './components/Gallery'
import { Amenities } from './components/Amenities'
import { Highlights } from './components/Highlights'
import { FloorPlans, Videos } from './components/FloorPlans'
import { EnquiryCard, MobileEnquiryBar } from './components/EnquiryCard'
import { Footer } from './components/Footer'

interface MicrositeAppProps {
  selected?: unknown
}

function App(props: MicrositeAppProps) {
  return (
    <CampaignDataProvider selected={props.selected}>
      <div className="microsite-default">
        <Nav />
        <ProjectSummary />
        <ProjectBanner />

        <div className="hs-page">
          <div className="hs-container hs-layout">
            <main className="hs-main">
              <StatsSection />
              <ProjectDetails />
              <Gallery />
              <FloorPlans />
              <Amenities />
              <Highlights />
              <Videos />
            </main>
            <aside className="hs-sidebar">
              <EnquiryCard />
            </aside>
          </div>
        </div>

        <Footer />
        <MobileEnquiryBar />
      </div>
    </CampaignDataProvider>
  )
}

export default App
