import type { User } from '@supabase/supabase-js'
import { verifyLocalStorageByKey } from '../client'
import { generateItemId, generateTimestampTz, handleSuccess } from '@/lib/utils'
import { LS_KEY } from '@/lib/constants'
import type { Tables } from '@/types/db/supabase'
import type { History } from '@/types/db/db-methods'

export async function getHistory(userId: User['id'] | undefined): Promise<ReturnType<History['getHistory']>> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEY.history)

  const allHistory: Tables<'history'>[] = JSON.parse(localStorage.getItem(LS_KEY.history)!)
  const userHistory = allHistory.filter(h => userId === h.user_id)

  return userHistory
}

export async function addHistory(query: string, userId: User['id'] | undefined): Promise<ReturnType<History['addHistory']>> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEY.history)

  const allHistory: Tables<'history'>[] = JSON.parse(localStorage.getItem(LS_KEY.history)!)

  // using any here: get history can't return null - we have user
  const userHistory = await getHistory(userId) as Tables<'history'>[]
  const lastItem: Tables<'history'> | undefined = userHistory[userHistory.length - 1]

  // if no items in history - set 1; if there are - generate prev id+1
  const newId = lastItem ? generateItemId(lastItem.id) : 1
  const timestamptz = generateTimestampTz()

  const newData: Tables<'history'>[] = [{ user_id: userId, created_at: timestamptz, id: newId, query }, ...allHistory]
  localStorage.setItem(LS_KEY.history, JSON.stringify(newData))

  return null
}

export async function deleteHistoryById(itemId: number, userId: User['id'] | undefined): Promise<ReturnType<History['deleteHistoryById']>> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEY.history)

  const allHistory: Tables<'history'>[] = JSON.parse(localStorage.getItem(LS_KEY.history)!)
  const newData = allHistory.filter(prevItem => prevItem.id !== itemId)

  localStorage.setItem(LS_KEY.history, JSON.stringify(newData))

  handleSuccess('History deleted')
  return null
}

export async function deleteAllHistory(userId: User['id'] | undefined): Promise<ReturnType<History['deleteAllHistory']>> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEY.history)

  const allHistory: Tables<'history'>[] = JSON.parse(localStorage.getItem(LS_KEY.favorites)!)
  const newData = allHistory.filter(h => h.user_id !== userId)

  localStorage.setItem(LS_KEY.history, JSON.stringify(newData))

  handleSuccess('All history deleted')
  return null
}
