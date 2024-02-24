import type { FeatureState } from '@/types/features'

const serverUrl = import.meta.env.VITE_SERVER_URL + (import.meta.env.VITE_PORT || 3002)
const featUrl = import.meta.env.VITE_TELEGRAM_FEAT_URL

export async function getTelegramFeatureFlag(): Promise<FeatureState> {
  const res = await fetch(`${serverUrl}${featUrl}`)
  const data = await res.json()
  return data
}
