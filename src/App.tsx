import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import LandingPage from './pages/LandingPage'
import ComingSoon from './components/ComingSoon'
import ContactModal from './components/ContactModal'
import ProjectNameMicrosite from './pages/ProjectNameMicrosite'

function AppShell() {
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const location = useLocation()
  const isTemplateRoute = location.pathname === '/project-name' || location.pathname.startsWith('/project-name/')

  return (
    <div className="m-0 w-full min-w-full font-sans text-[1.125rem] text-[#1a1a1a] bg-white box-border overflow-x-hidden">
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      {!isTemplateRoute ? <Header onOpenContact={() => setContactModalOpen(true)} /> : null}
      {!isTemplateRoute ? (
        <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
      ) : null}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/locations" element={<ComingSoon />} />
        <Route path="/projects" element={<ComingSoon />} />
        <Route path="/commercial" element={<ComingSoon />} />
        <Route path="/listings" element={<ComingSoon />} />
        <Route path="/project-name" element={<ProjectNameMicrosite />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
