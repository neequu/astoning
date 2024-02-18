import type { User } from '@supabase/supabase-js'
import _DBMethods from '@/services/db/db-methods'

export const historyService = {

  getHistory: (userId: User['id'] | undefined) => _DBMethods._getHistory(userId),
  addHistory: (query: string, userId: User['id'] | undefined) => _DBMethods._addHistory(query, userId),
  deleteHistoryById: (itemId: number, userId: User['id'] | undefined) => _DBMethods._deleteHistoryById(itemId, userId),
  deleteAllHistory: (userId: User['id'] | undefined) => _DBMethods._deleteAllHistory(userId),

}
