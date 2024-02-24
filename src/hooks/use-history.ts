import { useAddHistoryMutation, useDeleteAllHistoryMutation, useDeleteHistoryByIdMutation } from '@/store/api/db-api'
import type { User } from '@/types/auth'

export function useHistory() {
  const [addHistory] = useAddHistoryMutation()
  const [deleteHistoryById] = useDeleteHistoryByIdMutation()
  const [deleteAllHistory] = useDeleteAllHistoryMutation()

  const handleAddHistory = (userId: User['id'] | undefined, query: string) => {
    addHistory({ query, userId })
  }

  const handleDeleteHistoryById = (userId: User['id'] | undefined, itemId: number) => {
    deleteHistoryById({ itemId, userId })
  }

  const handleDeleteAllHistory = (userId: User['id'] | undefined) => {
    deleteAllHistory({ userId })
  }

  return { handleAddHistory, handleDeleteHistoryById, handleDeleteAllHistory }
}
