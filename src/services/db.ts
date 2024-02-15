import supabase from '@/services/supabase'

export async function addFavorite(id: number) {
  const { error } = await supabase
    .from('favorites')
    .insert({ item_id: id })
}

export async function getFavorite(id: number) {
  const { data, error } = await supabase.from('favorites').select('*').eq('item_id', id)
  return data
}
