import type { User } from '@/types/auth'
import { showNotificationError, showNotificationSuccess } from '@/lib/utils'
import supabase from '@/services/db/supabase/client'
import type { Favorites } from '@/types/db/db-methods'

export const supabaseFavorites: Omit<Favorites, 'changeLike'> = {

  getFavorites: async (userId: User['id'] | undefined) => {
    if (!userId)
      return null

    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)

    if (error) {
      showNotificationError(error.message || 'Couldn\t get favorites!')
      return null
    }

    return data
  },

  getFavoriteById: async (itemId: number, userId: User['id'] | undefined) => {
    if (!userId)
      return null

    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('item_id', itemId)
      .eq('user_id', userId)
      .maybeSingle()

    if (error) {
      showNotificationError(error.message || 'Couldn\t get favorites!')
      return null
    }

    return data
  },

  addFavorite: async (id: number, userId: User['id'] | undefined) => {
    if (!userId)
      return null
    const { error } = await supabase
      .from('favorites')
      .insert({ item_id: id })

    if (error) {
      showNotificationError(error.message || 'Couldn\t set like!')
      return null
    }

    showNotificationSuccess('Added to your library')
    return id
  },

  removeFavorite: async (id: number, userId: User['id'] | undefined) => {
    if (!userId)
      return null

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('item_id', id)
      .eq('user_id', userId)

    if (error) {
      showNotificationError(error.message)
      return null
    }

    showNotificationSuccess('Removed from your library')
    return id
  },
}
