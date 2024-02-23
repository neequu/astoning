import { getUser } from './auth'
import { favoritesService } from '@/services/favorites'

export async function getFavorites() {
  const user = await getUser()
  const res = await favoritesService.getFavorites(user?.id)
  return res
}
export async function changeLike(params: string[]) {
  const id = +params[0]
  const user = await getUser()
  const likes = await getFavorites()
  const hasLike = !!likes?.find(l => l.item_id === id)
  await favoritesService.changeLike(id, hasLike, user?.id)
}
