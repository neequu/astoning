import { toast } from 'sonner'
import { addFavorite, removeFavorite } from './db'

export async function changeLike(isAuth: boolean, itemId: number, isCurrentStateActive: boolean) {
  if (!isAuth) {
    toast.error('You need to be logged in')
    return null
  }

  // todo: remove this; for testing
  if (itemId > 7 || itemId < 7)
    return null

  return isCurrentStateActive ? removeFavorite(itemId) : addFavorite(itemId)
}
