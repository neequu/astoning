import { useEffect, useState } from 'react'
import { getFavorite } from '@/services/db'

export function useCheckFavorite(itemId: number) {
  const [isActive, setIsActive] = useState(false)
  const [isLoadingLike, setIsLoadingLike] = useState(false)

  useEffect(() => {
    const checkLike = async () => {
      setIsLoadingLike(true)
      try {
        const likedItem = await getFavorite(itemId)

        if (!likedItem || !likedItem.length)
          return

        setIsActive(!!likedItem)
      }
      catch (e) {}
      finally {
        setIsLoadingLike(false)
      }
    }

    checkLike()
  }, [])

  return { isActive, setIsActive, isLoadingLike }
}
