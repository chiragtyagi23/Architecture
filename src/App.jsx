import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import UpcomingProjects from './components/UpcomingProjects'
import FirmSection from './components/FirmSection'
import SubscribeSection from './components/SubscribeSection'

function App() {
  return (
    <div className="m-0 w-full min-w-full font-sans text-[1.125rem] text-[#1a1a1a] bg-white box-border overflow-x-hidden">
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <Header />
      <main className="block">
        <Hero />
        <Features />
        <UpcomingProjects />
        <FirmSection />
        <SubscribeSection />
      </main>
    </div>
  )
}

export default App
