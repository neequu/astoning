import type { User } from '@supabase/supabase-js'
import { verifyLocalStorageByKey } from '../client'
import { generateItemId, generateTimestampTz, handleSuccess } from '@/lib/utils'
import { LS_KEYS } from '@/lib/constants'
import type { Tables } from '@/types/db/supabase'

export async function _getHistory(userId: User['id'] | undefined): Promise<Tables<'history'>[] | null> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEYS.history)
  const history: Tables<'history'>[] = JSON.parse(localStorage.getItem(LS_KEYS.history)!)

  return history
}

export async function _addHistory(query: string, userId: User['id'] | undefined): Promise<null> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEYS.history)

  const prevData: Tables<'history'>[] = JSON.parse(localStorage.getItem(LS_KEYS.history)!)

  const timestamptz = generateTimestampTz()

  // using any here: get history can't return null - we have user
  const history = await _getHistory(userId) as Tables<'history'>[]
  const lastItem: Tables<'history'> | undefined = history[history.length - 1]

  // if no items in history - set 1; if there are - generate prev id+1
  const newId = lastItem ? generateItemId(lastItem.id) : 1

  const newData: Tables<'history'>[] = [...prevData, { user_id: userId, created_at: timestamptz, id: newId, query }]
  localStorage.setItem(LS_KEYS.history, JSON.stringify(newData))

  return null
}

export async function _deleteHistoryById(itemId: number, userId: User['id'] | undefined): Promise<null> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEYS.history)

  const prevData: Tables<'history'>[] = JSON.parse(localStorage.getItem(LS_KEYS.history)!)

  const newData = prevData.filter(prevItem => prevItem.id !== itemId)

  localStorage.setItem(LS_KEYS.history, JSON.stringify(newData))

  handleSuccess('History deleted')
  return null
}

export async function _deleteAllHistory(userId: User['id'] | undefined): Promise<null> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEYS.history)
  localStorage.setItem(LS_KEYS.history, JSON.stringify([]))

  handleSuccess('All history deleted')
  return null
}
