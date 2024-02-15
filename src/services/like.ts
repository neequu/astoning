import { _addFavorite, _getFavoriteById, _getFavorites, _removeFavorite } from '@/services/db/db-methods'
import { handleError } from '@/lib/utils'

export const likeService = {

  changeLike: async (isAuth: boolean, itemId: number, isCurrentStateActive: boolean) => {
    if (!isAuth)
      return handleError('You need to be logged in')

    return isCurrentStateActive ? _removeFavorite(itemId) : _addFavorite(itemId)
  },

  getFavorites: () => _getFavorites(),
  getFavoriteById: (itemId: number) => _getFavoriteById(itemId),
}
