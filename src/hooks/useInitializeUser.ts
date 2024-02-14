import { useEffect } from 'react'
import type { User } from '@supabase/supabase-js'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { setUser } from '@/redux/slices/authSlice'

export function useInitializeUser(getUser: () => Promise<User | null>) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    let isMounted = true

    const getInitialUser = async () => {
      try {
        const user = await getUser()
        if (isMounted)
          dispatch(setUser(user))
      }
      catch (error) {
        console.error(error)
      }
    }

    getInitialUser()

    return () => {
      isMounted = false
    }
  }, [])
}
