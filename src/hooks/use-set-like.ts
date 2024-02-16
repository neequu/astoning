import { useLayoutEffect, useState } from 'react'
import { useGetFavoritesByIdQuery } from '@/redux/apis/db-api'

export function useSetLike(itemId: number, isAuth: boolean) {
  const [isActive, setIsActive] = useState(false)

  const { isLoading, data } = useGetFavoritesByIdQuery(itemId, {
    skip: !isAuth,
  })
  // review: use layout to remove animation from setting button active state
  useLayoutEffect(() => {
    // only change the state if liked state is different from the current state
    const isLiked = !!data?.length
    if (isLiked !== isActive)
      setIsActive(isLiked)
  }, [data])

  return { isActive, setIsActive, isLoadingLike: isLoading }
}
