import { useCallback } from 'react'
import { useAddHistoryMutation, useDeleteAllHistoryMutation, useDeleteHistoryByIdMutation } from '@/store/api/db-api'
import type { User } from '@/types/auth'

export function useHistory() {
  const [addHistory] = useAddHistoryMutation()
  const [deleteHistoryById] = useDeleteHistoryByIdMutation()
  const [deleteAllHistory] = useDeleteAllHistoryMutation()

  const handleAddHistory = useCallback((userId: User['id'] | undefined, query: string) => {
    addHistory({ query, userId })
  }, [addHistory])

  const handleDeleteHistoryById = useCallback((userId: User['id'] | undefined, itemId: number) => {
    deleteHistoryById({ itemId, userId })
  }, [deleteHistoryById])

  const handleDeleteAllHistory = useCallback((userId: User['id'] | undefined) => {
    deleteAllHistory({ userId })
  }, [deleteAllHistory])

  return { handleAddHistory, handleDeleteHistoryById, handleDeleteAllHistory }
}
