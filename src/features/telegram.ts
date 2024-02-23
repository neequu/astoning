import { SERVER_URL, TELEGRAM_FEAT_URL } from '@/lib/constants'
import type { FeatureState } from '@/types/features'

export async function getTelegramFeatureFlag(): Promise<FeatureState> {
  const res = await fetch(`${SERVER_URL}${TELEGRAM_FEAT_URL}`)
  const data = await res.json()
  return data
}
