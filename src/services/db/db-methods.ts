import type { Provider } from '@supabase/supabase-js'
import type { Credentials } from '@/types/auth'
import { handleError, handleSuccess } from '@/lib/utils'
import supabase from '@/services/db'

// __AUTH__
export async function _loginWithCredentials(cred: Credentials) {
  const { data: { user }, error } = await supabase.auth.signInWithPassword(cred)

  if (error || !user)
    return handleError(error?.message)

  return user
}

export async function _register(cred: Credentials) {
  const { data: { user }, error } = await supabase.auth.signUp(cred)

  if (error || !user)
    return handleError(error?.message)

  return user
}

export async function _signOut() {
  const { error } = await supabase.auth.signOut()

  if (error)
    return handleError(error?.message)
}

export async function _getUser() {
  const { data: { session }, error } = await supabase.auth.getSession()

  const user = session?.user ?? null

  if (error)
    return handleError(error?.message)

  return user
}

export async function _loginWithOath(provider: Provider) {
  await supabase.auth.signInWithOAuth({
    provider,
  })
}

// __FAVORITES__
export async function _getFavoriteById(id: number) {
  const { data, error } = await supabase.from('favorites').select('*').eq('item_id', id)

  if (error) {
    handleError(error.message || 'Couldn\t get favorites!')
    return null
  }

  return data
}

export async function _getFavorites() {
  const { data, error } = await supabase.from('favorites').select('item_id')

  if (error) {
    handleError(error.message || 'Couldn\t get favorites!')
    return null
  }

  return data
}

export async function _addFavorite(id: number) {
  // @ts-expect-error database types currently not working todo: fix
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

export async function _removeFavorite(id: number) {
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
