import type { User } from '@supabase/supabase-js'

import { _addFavorite, _getFavoriteById, _getFavorites, _removeFavorite } from './db/localstorage/methods'

// import _DBMethods from '@/services/db/db-methods'

export const likeService = {

  getFavorites: (userId: User['id'] | undefined) => _getFavorites(userId),
  getFavoriteById: (itemId: number, userId: User['id'] | undefined) => _getFavoriteById(itemId, userId),

  changeLike: async (itemId: number, isCurrentStateActive: boolean, userId: User['id'] | undefined) => {
    return isCurrentStateActive ? _removeFavorite(itemId, userId) : _addFavorite(itemId, userId)
  },

}

// export const likeService = {

//   getFavorites: (userId: User['id'] | undefined) => _DBMethods._getFavorites(userId),
//   getFavoriteById: (itemId: number, userId: User['id'] | undefined) => _DBMethods._getFavoriteById(itemId, userId),

//   changeLike: async (itemId: number, isCurrentStateActive: boolean, userId: User['id'] | undefined) => {
//     return isCurrentStateActive ? _DBMethods._removeFavorite(itemId, userId) : _DBMethods._addFavorite(itemId, userId)
//   },

// }
