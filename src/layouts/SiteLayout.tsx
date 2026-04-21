'use client'

import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Header from '../components/Header'
import ContactModal from '../components/ContactModal'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [contactModalOpen, setContactModalOpen] = useState(false)

  return (
    <div className="m-0 w-full min-w-full font-sans text-[1.125rem] text-[#1a1a1a] bg-white box-border overflow-x-hidden">
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <Header onOpenContact={() => setContactModalOpen(true)} />
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
      {children}
    </div>
  )
}

