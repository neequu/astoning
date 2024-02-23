/* eslint-disable no-console */
import { getUser } from './auth'
import databaseMethods from '@/services/db/db-methods-switch'

export async function getFavorites() {
  const user = await getUser()
  databaseMethods.getFavorites(user?.id)
    .then(res => console.log(res))
}
export async function addFavorite(params: string[]) {
  const user = await getUser()
  const id = +params[0]
  databaseMethods.addFavorite(id, user?.id)
}
export async function removeFavorite(params: string[]) {
  const user = await getUser()
  const id = +params[0]
  databaseMethods.removeFavorite(id, user?.id)
}
