import { _addFavorite, _getFavoriteById, _getFavorites, _removeFavorite } from '@/services/db/db-methods'

export const likeService = {
  changeLike: async (itemId: number, isCurrentStateActive: boolean) => {
    return isCurrentStateActive ? _removeFavorite(itemId) : _addFavorite(itemId)
  },

  getFavorites: () => _getFavorites(),
  getFavoriteById: (itemId: number) => _getFavoriteById(itemId),
}
