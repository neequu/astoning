import { useCallback } from 'react'
import { useAddHistoryMutation, useDeleteAllHistoryMutation, useDeleteHistoryByIdMutation } from '@/store/api/db-api'
import type { User } from '@/types/auth'

export function useHistory() {
  const [addHistory] = useAddHistoryMutation()
  const [deleteHistoryById] = useDeleteHistoryByIdMutation()
  const [deleteAllHistory] = useDeleteAllHistoryMutation()

  const handleHistoryAdded = (userId: User['id'] | undefined, query: string): void => {
    addHistory({ query, userId })
  }

  const handleHistoryDeletedById = useCallback((userId: User['id'] | undefined, itemId: number): void => {
    deleteHistoryById({ itemId, userId })
  }, [deleteHistoryById])

  const handleAllHistoryDeleted = (userId: User['id'] | undefined): void => {
    deleteAllHistory({ userId })
  }

  return { handleHistoryAdded, handleHistoryDeletedById, handleAllHistoryDeleted }
}
