import type { FavoritesTransformed, HistoryTransformed, Tables } from '@/types/db/db'

export function transformFavoritesData(favItem: Tables<'favorites'>): FavoritesTransformed {
  const { created_at, item_id, user_id, id } = favItem

  return {
    id,
    createdAt: created_at,
    itemId: item_id,
    userId: user_id,
  }
}
export function transformHistoryData(historyItem: Tables<'history'>): HistoryTransformed {
  const { created_at, user_id, ...rest } = historyItem

  return {
    ...rest,
    createdAt: created_at,
    userId: user_id,
  }
}
