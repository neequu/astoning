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
    const flag = await getTelegramFeatureFlag()
    setFeatureFlag(flag.isTelegramShareEnabled)
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
