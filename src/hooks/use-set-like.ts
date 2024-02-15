import { useEffect, useState } from 'react'
import { getFavorite } from '@/services/db'

export function useCheckFavorite(itemId: number, isAuth: boolean) {
  const [isActive, setIsActive] = useState(false)
  const [isLoadingLike, setIsLoadingLike] = useState(false)

  useEffect(() => {
    const checkInitialLike = async () => {
      // skip check if no user
      if (!isAuth)
        return null

      setIsLoadingLike(true)
      try {
        const likedItem = await getFavorite(itemId)

        if (!likedItem || !likedItem.length)
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

    checkInitialLike()
  }, [])

  return { isActive, setIsActive, isLoadingLike }
}
