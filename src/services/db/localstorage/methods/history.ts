import type { User } from '@supabase/supabase-js'
import { verifyLocalStorageByKey } from '../client'
import { generateItemId, generateTimestampTz, handleSuccess } from '@/lib/utils'
import { LS_KEY } from '@/lib/constants'
import type { HistoryLS } from '@/types/db/localstorage'

export async function _getHistory(userId: User['id'] | undefined): Promise<HistoryLS[] | null> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEY.history)

  const allHistory: HistoryLS[] = JSON.parse(localStorage.getItem(LS_KEY.history)!)
  const userHistory = allHistory.filter(h => userId === h.user_id)

  return userHistory
}

export async function _addHistory(query: string, userId: User['id'] | undefined): Promise<null> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEY.history)

  const allHistory: HistoryLS[] = JSON.parse(localStorage.getItem(LS_KEY.history)!)

  // using any here: get history can't return null - we have user
  const userHistory = await _getHistory(userId) as HistoryLS[]
  const lastItem: HistoryLS | undefined = userHistory[userHistory.length - 1]

  // if no items in history - set 1; if there are - generate prev id+1
  const newId = lastItem ? generateItemId(lastItem.id) : 1
  const timestamptz = generateTimestampTz()

  const newData: HistoryLS[] = [{ user_id: userId, created_at: timestamptz, id: newId, query }, ...allHistory]
  localStorage.setItem(LS_KEY.history, JSON.stringify(newData))

  return null
}

export async function _deleteHistoryById(itemId: number, userId: User['id'] | undefined): Promise<null> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEY.history)

  const allHistory: HistoryLS[] = JSON.parse(localStorage.getItem(LS_KEY.history)!)
  const newData = allHistory.filter(prevItem => prevItem.id !== itemId)

  localStorage.setItem(LS_KEY.history, JSON.stringify(newData))

  handleSuccess('History deleted')
  return null
}

export async function _deleteAllHistory(userId: User['id'] | undefined): Promise<null> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEY.history)

  const allHistory: HistoryLS[] = JSON.parse(localStorage.getItem(LS_KEY.favorites)!)
  const newData = allHistory.filter(h => h.user_id !== userId)

  localStorage.setItem(LS_KEY.history, JSON.stringify(newData))

  handleSuccess('All history deleted')
  return null
}
