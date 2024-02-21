import type { User } from '@/types/auth'
import { showNotificationError, showNotificationSuccess } from '@/lib/utils'
import supabase from '@/services/db/supabase/client'
import type { History } from '@/types/db/db-methods'

export async function getHistory(userId: User['id'] | undefined): Promise<ReturnType<History['getHistory']>> {
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
}

export async function addHistory(query: string, userId: User['id'] | undefined): Promise<ReturnType<History['addHistory']>> {
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
}

export async function deleteHistoryById(itemId: number, userId: User['id'] | undefined): Promise<ReturnType<History['deleteHistoryById']>> {
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
}

export async function deleteAllHistory(userId: User['id'] | undefined): Promise<ReturnType<History['deleteAllHistory']>> {
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
}
