import { useCallback, useState } from 'react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { MarqueeStrip } from './components/MarqueeStrip'
import { Overview } from './components/Overview'
import { Gallery } from './components/Gallery'
import { Videos } from './components/Videos'
import { Reels } from './components/Reels'
import { FloorPlans } from './components/FloorPlans'
import { LocationMap } from './components/LocationMap'
import { Amenities } from './components/Amenities'
import { Highlights } from './components/Highlights'
import { Benefits } from './components/Benefits'
import { Enquiry } from './components/Enquiry'
import { EnquiryPopup } from './components/EnquiryPopup'
import { SiteFooter } from './components/SiteFooter'
import { IntroSplash } from './components/IntroSplash'
import { SelectedCampaignProvider } from './lib/selectedCampaign'

const INTRO_SESSION_KEY = 'mg_site_intro_v1'

interface MicrositeAppProps {
  selected: any
}

function readIntroSeen(): boolean {
  try {
    return sessionStorage.getItem(INTRO_SESSION_KEY) === '1'
  } catch {
    return false
  }
}

/** After 3rd immersive slide; first-time visitors start false so the popup timer waits for the intro gate. */
const ENQUIRY_DELAY_AFTER_INTRO_GATE_MS = 900

function App({ selected }: MicrositeAppProps) {
  const introAlreadySeen = readIntroSeen()
  const [showIntro, setShowIntro] = useState(() => !introAlreadySeen)
  const [suppressNavLogo, setSuppressNavLogo] = useState(() => !introAlreadySeen)
  const [enquiryGateOpen, setEnquiryGateOpen] = useState(() => introAlreadySeen)

  const enquiryPopupDelayMs = introAlreadySeen ? 10_000 : ENQUIRY_DELAY_AFTER_INTRO_GATE_MS

  const onIntroNavReveal = useCallback(() => {
    setSuppressNavLogo(false)
  }, [])

  const onIntroComplete = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, '1')
    } catch {
      /* ignore */
    }
    setSuppressNavLogo(false)
    setShowIntro(false)
  }, [])

  return (
    <SelectedCampaignProvider selected={selected}>
      <EnquiryPopup scheduleWhenReady={enquiryGateOpen} openDelayMs={enquiryPopupDelayMs} />
      {showIntro ? (
        <IntroSplash
          onNavReveal={onIntroNavReveal}
          onComplete={onIntroComplete}
          onEnquiryGateOpen={() => setEnquiryGateOpen(true)}
        />
      ) : null}
      <Nav suppressLogo={suppressNavLogo} />
      <Hero entranceReady={!showIntro} />
      <MarqueeStrip />
      <Overview />
      <Gallery />
      <Videos selected={selected} />
      <Reels selected={selected} />
      <FloorPlans />
      <Amenities />
      <Benefits />
      <LocationMap />
      <Enquiry />
      <SiteFooter />
    </SelectedCampaignProvider>
  )
}

export default App
