import * as React from 'react'

const SelectedCampaignContext = React.createContext<any>(null)

export function SelectedCampaignProvider({
  selected,
  children,
}: {
  selected: any
  children: React.ReactNode
}) {
  return <SelectedCampaignContext value={selected}>{children}</SelectedCampaignContext>
}

export function useSelectedCampaign(): any {
  return React.useContext(SelectedCampaignContext)
}

