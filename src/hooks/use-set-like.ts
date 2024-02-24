import { useLayoutEffect, useState } from 'react'
import type { User } from '@/types/auth'
import { useChangeLikeMutation, useGetFavoritesByIdQuery } from '@/store/api/db-api'

export function useSetLike(itemId: number, userId: User['id'] | undefined) {
  const [isActive, setIsActive] = useState(false)
  const [changeLike] = useChangeLikeMutation()

  const { isLoading, data: favoritesData } = useGetFavoritesByIdQuery({ itemId, userId }, {
    skip: !userId,
  })
  // use layout to remove animation from setting button active state
  useLayoutEffect(() => {
    // only change the state if liked state is different from the current state
    const isLiked = !!favoritesData?.itemId
    if (isLiked !== isActive)
      setIsActive(isLiked)
  }, [favoritesData])

  const handleLikeChanged = (itemId: number, isCurrentStateActive: boolean, userId: User['id'] | undefined) => {
    return changeLike({ itemId, isCurrentStateActive, userId })
  }

  return { isActive, setIsActive, isLoadingLike: isLoading, handleLikeChanged }
}
