import { handleError, handleSuccess } from '@/lib/utils'
import supabase from '@/services/supabase'

// todo: make single makeRequest fn for uniting requests

export async function getFavorite(id: number) {
  const { data, error } = await supabase.from('favorites').select('*').eq('item_id', id)

  if (error) {
    handleError(error.message || 'Couldn\t get favorites!')
    return null
  }

  return data
}

export async function addFavorite(id: number) {
  const { error } = await supabase
    .from('favorites')
    .insert({ item_id: id })

  if (error) {
    handleError(error.message || 'Couldn\t set like!')
    return null
  }

  handleSuccess('Added to your library')
  return { success: true }
}

export async function removeFavorite(id: number) {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('item_id', id)

  if (error) {
    handleError(error.message)
    return null
  }

  handleSuccess('Removed from your library')
  return { success: true }
}
