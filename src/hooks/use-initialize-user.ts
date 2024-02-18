import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { useAppDispatch } from '@/hooks/redux-hooks'
import { setUser } from '@/redux/slices/auth-slice'

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
      if (isMounted)
        dispatch(setUser(user))
      setIsLoading(false)
    }

    getInitialUser()

    return () => {
      isMounted = false
    }
  }, [])

  return { isLoading }
}
