import type { User } from '@supabase/supabase-js'
import { verifyLocalStorageByKey } from '../client'
import { generateItemId, generateTimestampTz, handleSuccess } from '@/lib/utils'
import { LS_KEY } from '@/lib/constants'
import type { FavoritesLS } from '@/types/db/localstorage'

export async function _getFavorites(userId: User['id'] | undefined): Promise<FavoritesLS[] | null> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEY.favorites)
  const allFavorites: FavoritesLS[] = JSON.parse(localStorage.getItem(LS_KEY.favorites)!)

  const userFavoritesIds = allFavorites.filter(f => userId === f.user_id)

  return userFavoritesIds
}

export async function _getFavoriteById(itemId: number, userId: User['id'] | undefined): Promise<Pick<FavoritesLS, 'item_id'> | null> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEY.favorites)

  // using any here: get favs can't return null - we have user
  const userFavorites = await _getFavorites(userId) as FavoritesLS[]
  const userFavoriteItem = userFavorites.find(f => itemId === f.item_id)

  if (!userFavoriteItem)
    return null

  return userFavoriteItem
}

export async function _addFavorite(itemId: number, userId: User['id'] | undefined): Promise<number | null> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEY.favorites)
  const allFavorites: FavoritesLS[] = JSON.parse(localStorage.getItem(LS_KEY.favorites)!)

  // using any here: get favs can't return null - we have user
  const userFavorites = await _getFavorites(userId) as FavoritesLS[]
  const lastItem: FavoritesLS | undefined = userFavorites[userFavorites.length - 1]

  // if no items in favs - set 1; if there are - generate prev id+1
  const newId = lastItem ? generateItemId(lastItem.id) : 1
  const timestamptz = generateTimestampTz()

  const newData: FavoritesLS[] = [{ item_id: itemId, user_id: userId, id: newId, created_at: timestamptz }, ...allFavorites]
  localStorage.setItem(LS_KEY.favorites, JSON.stringify(newData))

  handleSuccess('Added to your library')
  return itemId
}

export async function _removeFavorite(itemId: number, userId: User['id'] | undefined): Promise<number | null> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEY.favorites)

  const allFavorites: FavoritesLS[] = JSON.parse(localStorage.getItem(LS_KEY.favorites)!)
  const newData = allFavorites
    .filter(f => ((f.user_id === userId) && (f.item_id !== itemId)))

  localStorage.setItem(LS_KEY.favorites, JSON.stringify(newData))

  handleSuccess('Removed from your library')
  return itemId
}
