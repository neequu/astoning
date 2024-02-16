import { useEffect } from 'react'
import type { User } from '@supabase/supabase-js'
import { useAppDispatch } from '@/hooks/redux-hooks'
import { setUser } from '@/redux/slices/auth-slice'

export function useInitializeUser(getUser: () => Promise<User | null>) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    let isMounted = true

    const getInitialUser = async () => {
      const user = await getUser()
      if (isMounted)
        dispatch(setUser(user))
    }

    getInitialUser()

    return () => {
      isMounted = false
    }
  }, [])
}
