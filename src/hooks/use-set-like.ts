import { useEffect, useState } from 'react'
import { likeService } from '@/services/like'

export function useCheckFavorite(itemId: number, isAuth: boolean) {
  const [isActive, setIsActive] = useState(false)
  const [isLoadingLike, setIsLoadingLike] = useState(false)

  useEffect(() => {
    let isMounted = true
    const checkInitialLike = async () => {
      // skip check if no user
      if (!isAuth)
        return null
      if (isMounted) {
        setIsLoadingLike(true)
        try {
          const likedItem = await likeService.getFavoriteById(itemId)

          if (!likedItem)
            return null

          setIsActive(!!likedItem)
        }
        catch (e) {
          console.error(e)
          return null
        }
        finally {
          setIsLoadingLike(false)
        }
      }
    }

    checkInitialLike()

    return () => {
      isMounted = false
    }
  }, [])

  return { isActive, setIsActive, isLoadingLike }
}
