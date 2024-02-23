import { createContext, useContext } from 'react'
import { useGetFeatureFlagQuery } from '@/features/api/telegram'
import type { FeatureState } from '@/types/features'

const initialState: FeatureState = {
  isTelegramShareEnabled: false,
}

const FeatureProviderContext = createContext<FeatureState>(initialState)

export function FeatureProvider({ children }: { children: React.ReactNode }) {
  const { data } = useGetFeatureFlagQuery()

  return (
    <FeatureProviderContext.Provider value={{ isTelegramShareEnabled: !!data?.isTelegramShareEnabled }}>
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
