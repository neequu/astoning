import type { User } from '@supabase/supabase-js'
import { _addFavorite, _getFavoriteById, _getFavorites, _removeFavorite } from '@/services/db/db-methods'

export const likeService = {

  getFavorites: (userId: User['id'] | undefined) => _getFavorites(userId),
  getFavoriteById: (itemId: number, userId: User['id'] | undefined) => _getFavoriteById(itemId, userId),

  changeLike: async (itemId: number, isCurrentStateActive: boolean, userId: User['id'] | undefined) => {
    return isCurrentStateActive ? _removeFavorite(itemId, userId) : _addFavorite(itemId, userId)
  },

}
