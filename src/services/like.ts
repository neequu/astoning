import type { User } from '@/types/db/db'
import _DB_METHODS from '@/services/db/db-methods-switch'
import type { Favorites } from '@/types/db/db-methods'

export const likeService = {

  getFavorites: (userId: User['id'] | undefined): Promise<ReturnType<Favorites['getFavorites']>> => _DB_METHODS.getFavorites(userId),
  getFavoriteById: (itemId: number, userId: User['id'] | undefined): Promise<ReturnType<Favorites['getFavoriteById']>> => _DB_METHODS.getFavoriteById(itemId, userId),

  changeLike: async (itemId: number, isCurrentStateActive: boolean, userId: User['id'] | undefined): Promise<ReturnType<Favorites['addFavorite']>> => {
    return isCurrentStateActive ? _DB_METHODS.removeFavorite(itemId, userId) : _DB_METHODS.addFavorite(itemId, userId)
  },

}
