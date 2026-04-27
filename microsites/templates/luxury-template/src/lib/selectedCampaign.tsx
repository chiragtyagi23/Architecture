import * as React from 'react'

const SelectedCampaignContext = React.createContext<any>(null)

export function SelectedCampaignProvider({
  selected,
  children,
}: {
  selected: any
  children: React.ReactNode
}) {
  return <SelectedCampaignContext.Provider value={selected}>{children}</SelectedCampaignContext.Provider>
}

export function useSelectedCampaign(): any {
  return React.useContext(SelectedCampaignContext)
}

