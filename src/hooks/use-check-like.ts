import { useEffect, useState } from 'react'
import { getFavorite } from '@/services/db'

export function useCheckFavorite(itemId: number) {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const checkLike = async () => {
      const likedItem = await getFavorite(itemId)

      if (!likedItem || !likedItem.length)
        return

      setIsActive(!!likedItem)
    }

    checkLike()
  }, [])

  return { isActive, setIsActive }
}
