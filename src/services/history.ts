import type { User } from '@/types/auth'
import _DB_METHODS from '@/services/db/db-methods-switch'
import type { History } from '@/types/db/db-methods'

export const historyService = {

  getHistory: (userId: User['id'] | undefined): Promise<ReturnType<History['getHistory']>> => _DB_METHODS.getHistory(userId),
  addHistory: (query: string, userId: User['id'] | undefined): Promise<ReturnType<History['addHistory']>> => _DB_METHODS.addHistory(query, userId),
  deleteHistoryById: (itemId: number, userId: User['id'] | undefined): Promise<ReturnType<History['deleteHistoryById']>> => _DB_METHODS.deleteHistoryById(itemId, userId),
  deleteAllHistory: (userId: User['id'] | undefined): Promise<ReturnType<History['deleteAllHistory']>> => _DB_METHODS.deleteAllHistory(userId),

}
