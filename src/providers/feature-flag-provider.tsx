import { createContext, useContext, useMemo, useState } from 'react'
import type { FeatureState } from '@/types/features'
import { getTelegramFeatureFlag } from '@/features/telegram'

const initialState: FeatureState = {
  isTelegramShareEnabled: false,
}

const FeatureProviderContext = createContext<FeatureState>(initialState)

export function FeatureProvider({ children }: { children: React.ReactNode }) {
  const [featureFlag, setFeatureFlag] = useState(false)

  useMemo(async () => {
    try {
      const flag = await getTelegramFeatureFlag()
      setFeatureFlag(flag.isTelegramShareEnabled)
    }
    catch (error) {
      console.error('error fetching feature flag:', error)
      setFeatureFlag(false)
    }
  }, [])

  return (
    <FeatureProviderContext.Provider value={{ isTelegramShareEnabled: featureFlag }}>
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
