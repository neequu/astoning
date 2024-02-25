import { useLayoutEffect, useState } from 'react'
import type { User } from '@/types/auth'
import { useChangeLikeMutation, useGetFavoritesByIdQuery } from '@/store/api/db-api'
import { showNotificationError } from '@/lib/utils'

export function useSetLike(itemId: number, userId: User['id'] | undefined) {
  const [isActive, setIsActive] = useState(false)
  const [changeLike] = useChangeLikeMutation()
  const [isDisabled, setIsDisabled] = useState(false)

  const { isLoading, data: favoritesData } = useGetFavoritesByIdQuery({ itemId, userId }, {
    skip: !userId || !itemId,
  })

  // use layout to remove animation from setting button active state
  useLayoutEffect(() => {
    // only change the state if liked state is different from the current state
    const isLiked = !!favoritesData?.itemId
    if (isLiked !== isActive)
      setIsActive(isLiked)
  }, [favoritesData])

  const handleLikeChange = async (itemId: number, userId: User['id'] | undefined) => {
    if (!userId)
      return showNotificationError('You need to be logged in')

    const initialState = isActive
    setIsActive(!initialState)
    setIsDisabled(true)

    const res = await changeLike({ itemId, isCurrentStateActive: initialState, userId })

    if (!res)
      setIsActive(initialState)

    setIsDisabled(false)
  }

  return { isActive, setIsActive, isLoadingLike: isLoading, handleLikeChange, isDisabled }
}
