'use client'

import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Header from '../components/Header'
import ContactModal from '../components/ContactModal'
import '../landing.css'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [contactModalOpen, setContactModalOpen] = useState(false)

  return (
    <div className="landing-page">
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <Header onOpenContact={() => setContactModalOpen(true)} />
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
      {children}
    </div>
  )
}
