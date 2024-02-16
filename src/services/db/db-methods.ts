import type { Provider, User } from '@supabase/supabase-js'
import type { Credentials } from '@/types/auth'
import { handleError, handleSuccess } from '@/lib/utils'
import supabase from '@/services/db'

// todo: create a universal function
// __AUTH__
export async function _loginWithCredentials(cred: Credentials) {
  const { data: { user }, error } = await supabase.auth.signInWithPassword(cred)

  if (error || !user) {
    handleError(error?.message)
    return null
  }

  return user
}

export async function _register(cred: Credentials) {
  const { data: { user }, error } = await supabase.auth.signUp(cred)

  if (error || !user) {
    handleError(error?.message)
    return null
  }

  return user
}

export async function _signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    handleError(error?.message)
    return null
  }
}

export async function _getUser() {
  const { data: { session }, error } = await supabase.auth.getSession()

  const user = session?.user ?? null

  if (error) {
    handleError(error?.message)
    return null
  }

  return user
}

export async function _loginWithOath(provider: Provider) {
  await supabase.auth.signInWithOAuth({
    provider,
  })
}

// __FAVORITES__
export async function _getFavoriteById(itemId: number, userId: User['id'] | undefined) {
  if (!userId)
    return null

  const { data, error } = await supabase
    .from('favorites')
    .select('item_id')
    .eq('item_id', itemId)
    .eq('user_id', userId)

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
    .select('item_id')
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
    .insert({ item_id: id })

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

// __HISTORY__
export async function _getHistory(userId: User['id'] | undefined) {
  if (!userId)
    return null

  const { data, error } = await supabase
    .from('history')
    .select('*')
    .eq('user_id', userId)

  if (error) {
    handleError(error.message || 'Couldn\t get history!')
    return null
  }

  return data
}

export async function _deleteHistoryById(itemId: number, userId: User['id'] | undefined) {
  if (!userId)
    return null

  const { data, error } = await supabase
    .from('history')
    .delete()
    .eq('user_id', userId)
    .eq('id', itemId)

  if (error) {
    handleError(error.message || 'Couldn\t delete history!')
    return null
  }

  return data
}

export async function _deleteAllHistory(userId: User['id'] | undefined) {
  if (!userId)
    return null

  const { data, error } = await supabase
    .from('history')
    .delete()
    .eq('user_id', userId)

  if (error) {
    handleError(error.message || 'Couldn\t delete history!')
    return null
  }

  return data
}
