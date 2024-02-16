import type { User } from '@supabase/supabase-js'
import { _addFavorite, _getFavoriteById, _getFavorites, _removeFavorite } from '@/services/db/db-methods'

export const likeService = {

  changeLike: async (itemId: number, isCurrentStateActive: boolean, userId: User['id'] | undefined) => {
    return isCurrentStateActive ? _removeFavorite(itemId, userId) : _addFavorite(itemId, userId)
  },
  getFavorites: (userId: User['id'] | undefined) => _getFavorites(userId),
  getFavoriteById: (itemId: number, userId: User['id'] | undefined) => _getFavoriteById(itemId, userId),

}
