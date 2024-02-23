/* eslint-disable no-console */
import { getUser } from './auth'
import type { Favorites } from '@/types/db/db-methods'
import { favoritesService } from '@/services/favorites'

export async function getFavorites(): ReturnType<Favorites['getFavorites']> {
  const user = await getUser()
  const res = await favoritesService.getFavorites(user?.id)
  console.table(res)
  return res
}
export async function changeLike(params: string[]): Promise<void> {
  const id = +params[0]
  const user = await getUser()
  const likes = await getFavorites()
  const hasLike = !!likes?.find(l => l.item_id === id)
  await favoritesService.changeLike(id, hasLike, user?.id)
  console.log('✅')
}
