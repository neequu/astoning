/* eslint-disable no-console */
import { getUser } from './auth'
import type { Favorites } from '@/types/db/db-methods'
import { favoritesService } from '@/services/favorites'

export async function getFavorites(): ReturnType<Favorites['getFavorites']> {
  const user = await getUser()
  const res = await favoritesService.getFavorites(user?.id)

  if (res)
    console.table(res)
  else
    console.log('❎')

  return res
}

export async function changeLike(params: string[]): Promise<null | void> {
  const id = +params[0]
  const user = await getUser()

  if (!user) {
    console.log('❎')
    return null
  }

  const likes = await getFavorites()
  const hasLike = !!likes?.find(l => l.item_id === id)
  const res = await favoritesService.changeLike(id, hasLike, user?.id)

  if (res)
    console.log('✅')
  else
    console.log('❎')
}
