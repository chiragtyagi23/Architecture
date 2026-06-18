import { createContext, useContext, useMemo } from 'react'

import { buildCampaignViewModel, type CampaignViewModel } from './campaignData'

const CampaignDataContext = createContext<CampaignViewModel | null>(null)

export function CampaignDataProvider({
  selected,
  children,
}: {
  selected?: unknown
  children: React.ReactNode
}) {
  const vm = useMemo(() => buildCampaignViewModel(selected), [selected])
  return <CampaignDataContext.Provider value={vm}>{children}</CampaignDataContext.Provider>
}

export function useCampaignData(): CampaignViewModel {
  const ctx = useContext(CampaignDataContext)
  if (!ctx) throw new Error('useCampaignData must be used within CampaignDataProvider')
  return ctx
}
