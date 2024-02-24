/* eslint-disable no-console */
import { getUser } from './auth'
import { historyService } from '@/services/history'

export async function getHistory(): Promise<null | void> {
  const user = await getUser()
  const res = await historyService.getHistory(user?.id)

  if (res)
    console.table(res)
  else
    console.log('❎')
}

export async function addHistory(params: string[]): Promise<null | void> {
  const user = await getUser()
  const query = params.join(' ')

  const res = await historyService.addHistory(query, user?.id)

  if (res)
    console.log('✅')
  else
    console.log('❎')
}

export async function deleteHistoryById(params: string[]): Promise<null | void> {
  const user = await getUser()
  const id = +params[0]
  const res = await historyService.deleteHistoryById(id, user?.id)

  if (res)
    console.log('✅')
  else
    console.log('❎')
}

export async function deleteAllHistory(): Promise<null | void> {
  const user = await getUser()

  if (!user) {
    console.log('❎')
    return null
  }

  await historyService.deleteAllHistory(user?.id)
}
