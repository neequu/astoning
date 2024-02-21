import type { User } from '@/types/auth'
import _DB_METHODS from '@/services/db/db-methods-switch'
import type { Favorites } from '@/types/db/db-methods'

export const likeService: Favorites = {

  getFavorites: (userId: User['id'] | undefined): ReturnType<Favorites['getFavorites']> => _DB_METHODS.getFavorites(userId),
  getFavoriteById: (itemId: number, userId: User['id'] | undefined): ReturnType<Favorites['getFavoriteById']> => _DB_METHODS.getFavoriteById(itemId, userId),

  changeLike: async (itemId: number, isCurrentStateActive: boolean, userId: User['id'] | undefined): ReturnType<Favorites['addFavorite']> => {
    return isCurrentStateActive ? _DB_METHODS.removeFavorite(itemId, userId) : _DB_METHODS.addFavorite(itemId, userId)
  },
  removeFavorite: (itemId: number, userId: User['id'] | undefined): ReturnType<Favorites['removeFavorite']> => _DB_METHODS.removeFavorite(itemId, userId),
  addFavorite: (itemId: number, userId: User['id'] | undefined): ReturnType<Favorites['addFavorite']> => _DB_METHODS.addFavorite(itemId, userId),
}
