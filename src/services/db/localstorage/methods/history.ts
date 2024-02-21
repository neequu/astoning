import { verifyLocalStorageByKey } from '../client'
import type { Tables } from '@/types/db/db'
import type { User } from '@/types/auth'
import { generateItemId, generateTimestampTz, showNotificationSuccess } from '@/lib/utils'
import { LS_KEYS } from '@/lib/constants'

import type { History } from '@/types/db/db-methods'

export async function getHistory(userId: User['id'] | undefined): Promise<ReturnType<History['getHistory']>> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEYS.history)

  const allHistory: Tables<'history'>[] = JSON.parse(localStorage.getItem(LS_KEYS.history)!)
  const userHistory = allHistory.filter(h => userId === h.user_id)

  return userHistory
}

export async function addHistory(query: string, userId: User['id'] | undefined): Promise<ReturnType<History['addHistory']>> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEYS.history)

  const allHistory: Tables<'history'>[] = JSON.parse(localStorage.getItem(LS_KEYS.history)!)

  // using as here: get history can't return null - we have user
  const userHistory = await getHistory(userId) as Tables<'history'>[]
  const lastItem: Tables<'history'> | undefined = userHistory[userHistory.length - 1]

  // if no items in history - set 1; if there are - generate prev id+1
  const newId = lastItem ? generateItemId(lastItem.id) : 1
  const timestamptz = generateTimestampTz()

  const newData: Tables<'history'>[] = [...allHistory, { user_id: userId, created_at: timestamptz, id: newId, query }]
  localStorage.setItem(LS_KEYS.history, JSON.stringify(newData))

  return null
}

export async function deleteHistoryById(itemId: number, userId: User['id'] | undefined): Promise<ReturnType<History['deleteHistoryById']>> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEYS.history)

  const allHistory: Tables<'history'>[] = JSON.parse(localStorage.getItem(LS_KEYS.history)!)
  const newData = allHistory.filter(prevItem => prevItem.id !== itemId)

  localStorage.setItem(LS_KEYS.history, JSON.stringify(newData))

  showNotificationSuccess('History deleted')
  return itemId
}

export async function deleteAllHistory(userId: User['id'] | undefined): Promise<ReturnType<History['deleteAllHistory']>> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEYS.history)

  const allHistory: Tables<'history'>[] = JSON.parse(localStorage.getItem(LS_KEYS.favorites)!)
  const newData = allHistory.filter(h => h.user_id !== userId)

  localStorage.setItem(LS_KEYS.history, JSON.stringify(newData))

  showNotificationSuccess('All history deleted')
  return null
}
