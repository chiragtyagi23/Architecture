import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import LandingPage from './pages/LandingPage'
import ComingSoon from './components/ComingSoon'

function App() {
  return (
    <BrowserRouter>
      <div className="m-0 w-full min-w-full font-sans text-[1.125rem] text-[#1a1a1a] bg-white box-border overflow-x-hidden">
        <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/locations" element={<ComingSoon />} />
          <Route path="/projects" element={<ComingSoon />} />
          <Route path="/commercial" element={<ComingSoon />} />
          <Route path="/listings" element={<ComingSoon />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
