import type { User } from '@supabase/supabase-js'

// import _DBMethods from '@/services/db/db-methods'
import { _addHistory, _deleteAllHistory, _deleteHistoryById, _getHistory } from './db/localstorage/methods'

export const historyService = {

  getHistory: (userId: User['id'] | undefined) => _getHistory(userId),
  addHistory: (query: string, userId: User['id'] | undefined) => _addHistory(query, userId),
  deleteHistoryById: (itemId: number, userId: User['id'] | undefined) => _deleteHistoryById(itemId, userId),
  deleteAllHistory: (userId: User['id'] | undefined) => _deleteAllHistory(userId),

}
// export const historyService = {

//   getHistory: (userId: User['id'] | undefined) => _DBMethods._getHistory(userId),
//   addHistory: (query: string, userId: User['id'] | undefined) => _DBMethods._addHistory(query, userId),
//   deleteHistoryById: (itemId: number, userId: User['id'] | undefined) => _DBMethods._deleteHistoryById(itemId, userId),
//   deleteAllHistory: (userId: User['id'] | undefined) => _DBMethods._deleteAllHistory(userId),

// }
