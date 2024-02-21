import type { User } from '@/types/auth'
import { showNotificationError, showNotificationSuccess } from '@/lib/utils'
import supabase from '@/services/db/supabase/client'
import type { History } from '@/types/db/db-methods'

export const supabaseHistory: History = {

  getHistory: async (userId: User['id'] | undefined) => {
    if (!userId)
      return null

    const { data, error } = await supabase
      .from('history')
      .select('*')
      .eq('user_id', userId)

    if (error) {
      showNotificationError(error.message || 'Couldn\t get history!')
      return null
    }

    return data
  },

  addHistory: async (query: string, userId: User['id'] | undefined) => {
    if (!userId)
      return null

    const { data, error } = await supabase
      .from('history')
      .insert({ query })

    if (error) {
      showNotificationError(error.message || 'Couldn\t add history!')
      return null
    }

    return data
  },

  deleteHistoryById: async (itemId: number, userId: User['id'] | undefined) => {
    if (!userId)
      return null

    const { error } = await supabase
      .from('history')
      .delete()
      .eq('user_id', userId)
      .eq('id', itemId)

    if (error) {
      showNotificationError(error.message || 'Couldn\t delete history!')
      return null
    }

    showNotificationSuccess('History deleted')
    return itemId
  },

  deleteAllHistory: async (userId: User['id'] | undefined) => {
    if (!userId)
      return null

    const { error } = await supabase
      .from('history')
      .delete()
      .eq('user_id', userId)

    if (error) {
      showNotificationError(error.message || 'Couldn\t delete history!')
      return null
    }

    showNotificationSuccess('All history deleted')
    return null
  },
}
