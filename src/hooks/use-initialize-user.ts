import { useEffect, useState } from 'react'
import type { User } from '@/types/auth'
import { useAppDispatch } from '@/hooks/store-hooks'
import { userSet } from '@/store/slices/auth-slice'

interface ReturnType {
  isLoading: boolean
}

export function useInitializeUser(getUser: () => Promise<User | null>): ReturnType {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const getInitialUser = async () => {
      setIsLoading(true)
      const user = await getUser()
      if (isMounted) {
        dispatch(userSet(user))
        setIsLoading(false)
      }
    }

    getInitialUser()

    return () => {
      isMounted = false
    }
  }, [])

  return { isLoading }
}
