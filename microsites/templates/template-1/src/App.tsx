import { useCallback, useState } from 'react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { MarqueeStrip } from './components/MarqueeStrip'
import { Overview } from './components/Overview'
import { Gallery } from './components/Gallery'
import { FloorPlans } from './components/FloorPlans'
import { LocationMap } from './components/LocationMap'
import { Amenities } from './components/Amenities'
import { Highlights } from './components/Highlights'
import { Benefits } from './components/Benefits'
import { Enquiry } from './components/Enquiry'
import { EnquiryPopup } from './components/EnquiryPopup'
import { SiteFooter } from './components/SiteFooter'
import { IntroSplash } from './components/IntroSplash'

const INTRO_SESSION_KEY = 'mg_site_intro_v1'

function readIntroSeen(): boolean {
  try {
    return sessionStorage.getItem(INTRO_SESSION_KEY) === '1'
  } catch {
    return false
  }
}

function App() {
  const [showIntro, setShowIntro] = useState(() => !readIntroSeen())
  const [suppressNavLogo, setSuppressNavLogo] = useState(() => !readIntroSeen())

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
    <>
      <EnquiryPopup scheduleWhenReady={!showIntro} />
      {showIntro ? (
        <IntroSplash onNavReveal={onIntroNavReveal} onComplete={onIntroComplete} />
      ) : null}
      <Nav suppressLogo={suppressNavLogo} />
      <Hero entranceReady={!showIntro} />
      <MarqueeStrip />
      <Overview />
      <Gallery />
      <FloorPlans />
      <Amenities />
      <Highlights />
      <Benefits />
      <LocationMap />
      <Enquiry />
      <SiteFooter />
    </>
  )
}

export default App
