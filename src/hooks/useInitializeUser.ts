import { useEffect } from 'react'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { setUser } from '@/redux/slices/authSlice'
import supabase from '@/services/supabase'

export function useInitializeUser() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    let isMounted = true

    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (isMounted)
          dispatch(setUser(user))
      }
      catch (error) {
        console.error(error)
      }
    }

    getUser()

    return () => {
      isMounted = false
    }
  }, [])
}
