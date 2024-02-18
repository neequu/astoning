import type { User } from '@supabase/supabase-js'
import { handleError, handleSuccess } from '@/lib/utils'
import supabase from '@/services/db/supabase/client'

export async function _getFavoriteById(itemId: number, userId: User['id'] | undefined) {
  if (!userId)
    return null

  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('item_id', itemId)
    .eq('user_id', userId)
    .maybeSingle()

  if (error) {
    handleError(error.message || 'Couldn\t get favorites!')
    return null
  }

  return data
}

export async function _getFavorites(userId: User['id'] | undefined) {
  if (!userId)
    return null

  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId)

  if (error) {
    handleError(error.message || 'Couldn\t get favorites!')
    return null
  }

  return data
}

export async function _addFavorite(id: number, userId: User['id'] | undefined) {
  if (!userId)
    return null
  const { error } = await supabase
    .from('favorites')
    .upsert({ item_id: id })

  if (error) {
    handleError(error.message || 'Couldn\t set like!')
    return null
  }

  handleSuccess('Added to your library')
  return id
}

export async function _removeFavorite(id: number, userId: User['id'] | undefined) {
  if (!userId)
    return null

  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('item_id', id)
    .eq('user_id', userId)

  if (error) {
    handleError(error.message)
    return null
  }

  handleSuccess('Removed from your library')
  return id
}
