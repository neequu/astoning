import { useEffect, useState } from 'react'
import { useGetFavoritesByIdQuery } from '@/redux/apis/db-api'

export function useSetLike(itemId: number, isAuth: boolean) {
  const [isActive, setIsActive] = useState(false)

  const { isLoading, data, refetch } = useGetFavoritesByIdQuery(itemId, {
    skip: !isAuth,
  })

  useEffect(() => {
    // only change the state if liked state is different from the current state
    // @ts-expect-error database types currently not working todo: fix
    const isLiked = !!data?.length
    if (isLiked !== isActive)
      setIsActive(isLiked)
  }, [data])

  return { isActive, setIsActive, isLoadingLike: isLoading, refetch }
}
