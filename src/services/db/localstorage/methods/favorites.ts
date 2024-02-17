import type { User } from '@supabase/supabase-js'
import { verifyLocalStorageByKey } from '../client'
import { handleSuccess } from '@/lib/utils'
import { LS_KEYS } from '@/lib/constants'
import type { Favorites } from '@/types/db/localstorage'

export async function _getFavorites(userId: User['id'] | undefined): Promise<Favorites[] | null> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEYS.favorites)
  const data: Favorites[] = JSON.parse(localStorage.getItem(LS_KEYS.favorites)!)

  return data
}

export async function _getFavoriteById(itemId: number, userId: User['id'] | undefined): Promise<Favorites | null> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEYS.favorites)
  const prevData: Favorites[] = JSON.parse(localStorage.getItem(LS_KEYS.favorites)!)

  const data = prevData.findIndex(prevItem => prevItem.item_id === itemId)

  return prevData[data]
}

export async function _addFavorite(itemId: number, userId: User['id'] | undefined): Promise<number | null> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEYS.favorites)

  const prevData: Favorites[] = JSON.parse(localStorage.getItem(LS_KEYS.favorites)!)
  const newData: Favorites[] = [...prevData, { item_id: itemId }]

  localStorage.setItem(LS_KEYS.favorites, JSON.stringify(newData))

  handleSuccess('Added to your library')
  return itemId
}

export async function _removeFavorite(itemId: number, userId: User['id'] | undefined): Promise<number | null> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEYS.favorites)

  const prevData: Favorites[] = JSON.parse(localStorage.getItem(LS_KEYS.favorites)!)
  const newData = prevData.filter(prevItem => prevItem.item_id !== itemId)

  localStorage.setItem(LS_KEYS.favorites, JSON.stringify(newData))

  handleSuccess('Removed from your library')
  return itemId
}
