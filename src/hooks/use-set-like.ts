import { useLayoutEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { useGetFavoritesByIdQuery } from '@/redux/apis/db-api'

interface ReturnType {
  isActive: boolean
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
  isLoadingLike: boolean
}

export function useSetLike(itemId: number, userId: User['id'] | undefined): ReturnType {
  const [isActive, setIsActive] = useState(false)

  const { isLoading, data } = useGetFavoritesByIdQuery({ itemId, userId }, {
    skip: !userId,
  })
  // review: use layout to remove animation from setting button active state
  useLayoutEffect(() => {
    // only change the state if liked state is different from the current state
    const isLiked = !!data?.item_id
    if (isLiked !== isActive)
      setIsActive(isLiked)
  }, [data])

  return { isActive, setIsActive, isLoadingLike: isLoading }
}
