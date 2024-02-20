import { verifyLocalStorageByKey } from '../client'
import type { Tables, User } from '@/types/db/db'
import { generateItemId, generateTimestampTz, showNotificationSuccess } from '@/lib/utils'
import { LS_KEYS } from '@/lib/constants'
import type { Favorites } from '@/types/db/db-methods'

export async function getFavorites(userId: User['id'] | undefined): Promise<ReturnType<Favorites['getFavorites']>> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEYS.favorites)
  const allFavorites: Tables<'favorites'>[] = JSON.parse(localStorage.getItem(LS_KEYS.favorites)!)

  const userFavoritesIds = allFavorites.filter(f => userId === f.user_id)

  return userFavoritesIds
}

export async function getFavoriteById(itemId: number, userId: User['id'] | undefined): Promise<ReturnType<Favorites['getFavoriteById']>> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEYS.favorites)

  // using as here: get favs can't return null - we have user
  const userFavorites = await getFavorites(userId) as Tables<'favorites'>[]
  const userFavoriteItem = userFavorites.find(f => itemId === f.item_id)

  if (!userFavoriteItem)
    return null

  return userFavoriteItem
}

export async function addFavorite(itemId: number, userId: User['id'] | undefined): Promise<ReturnType<Favorites['addFavorite']>> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEYS.favorites)
  const allFavorites: Tables<'favorites'>[] = JSON.parse(localStorage.getItem(LS_KEYS.favorites)!)

  // using as here: get favs can't return null - we have user
  const userFavorites = await getFavorites(userId) as Tables<'favorites'>[]
  const lastItem: Tables<'favorites'> | undefined = userFavorites[userFavorites.length - 1]

  // if no items in favs - set 1; if there are - generate prev id+1
  const newId = lastItem ? generateItemId(lastItem.id) : 1
  const timestamptz = generateTimestampTz()

  const newData: Tables<'favorites'>[] = [...allFavorites, { item_id: itemId, user_id: userId, id: newId, created_at: timestamptz }]
  localStorage.setItem(LS_KEYS.favorites, JSON.stringify(newData))

  showNotificationSuccess('Added to your library')
  return itemId
}

export async function removeFavorite(itemId: number, userId: User['id'] | undefined): Promise<ReturnType<Favorites['removeFavorite']>> {
  if (!userId)
    return null

  verifyLocalStorageByKey(LS_KEYS.favorites)

  const allFavorites: Tables<'favorites'>[] = JSON.parse(localStorage.getItem(LS_KEYS.favorites)!)
  const newData = allFavorites
    .filter(f => ((f.user_id === userId) && (f.item_id !== itemId)))

  localStorage.setItem(LS_KEYS.favorites, JSON.stringify(newData))

  showNotificationSuccess('Removed from your library')
  return itemId
}
