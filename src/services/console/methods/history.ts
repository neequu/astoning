/* eslint-disable no-console */
import { getUser } from './auth'
import { historyService } from '@/services/history'

export async function getHistory() {
  const user = await getUser()
  const res = historyService.getHistory(user?.id)
  console.table(res)
}
export async function addHistory(params: string[]) {
  const user = await getUser()
  const query = params.join(' ')
  historyService.addHistory(query, user?.id)
  console.log('✅')
}
export async function deleteHistoryById(params: string[]) {
  const user = await getUser()
  const id = +params[0]
  await historyService.deleteHistoryById(id, user?.id)
  console.log('✅')
}
export async function deleteAllHistory() {
  const user = await getUser()
  await historyService.deleteAllHistory(user?.id)
  console.log('✅')
}
