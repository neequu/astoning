/* eslint-disable no-console */
import { getUser } from './auth'
import { historyService } from '@/services/history'

export async function getHistory() {
  const user = await getUser()
  historyService.getHistory(user?.id)
    .then(res => console.table(res))
}
export async function addHistory(params: string[]) {
  const user = await getUser()
  const query = params.join(' ')
  historyService.addHistory(query, user?.id)
}
export async function deleteHistoryById(params: string[]) {
  const user = await getUser()
  const id = +params[0]
  historyService.deleteHistoryById(id, user?.id)
}
export async function deleteAllHistory() {
  const user = await getUser()
  historyService.deleteAllHistory(user?.id)
}
