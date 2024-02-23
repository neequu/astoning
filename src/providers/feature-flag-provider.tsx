import { createContext, useContext } from 'react'

interface FeatureState {
  isTelegramShareEnabled: boolean
}

const initialState: FeatureState = {
  isTelegramShareEnabled: false,
}

const FeatureProviderContext = createContext<FeatureState>(initialState)

export function FeatureProvider({ children }: { children: React.ReactNode }) {
  const value = {
    isTelegramShareEnabled: false,
  }

  return (
    <FeatureProviderContext.Provider value={value}>
      {children}
    </FeatureProviderContext.Provider>
  )
}

export function useFeature(): FeatureState {
  const context = useContext(FeatureProviderContext)

  if (context === undefined)
    throw new Error('useFeature must be used within a FeatureProvider')

  return context
}
