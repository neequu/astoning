/* eslint-disable no-console */
import { getUser } from './auth'
import databaseMethods from '@/services/db/db-methods-switch'

export async function getHistory(): Promise<void> {
  const user = await getUser()
  databaseMethods.getHistory(user?.id)
    .then(res => console.log(res))
}
export async function addHistory(params: string[]): Promise<void> {
  const user = await getUser()
  const query = params[0]
  databaseMethods.addHistory(query, user?.id)
}
export async function deleteHistoryById(params: string[]): Promise<void> {
  const user = await getUser()
  const id = +params[0]
  databaseMethods.deleteHistoryById(id, user?.id)
}
export async function deleteAllHistory(): Promise<void> {
  const user = await getUser()
  databaseMethods.deleteAllHistory(user?.id)
}
