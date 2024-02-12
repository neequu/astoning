import { toast } from 'sonner'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Clock8Icon, HeartIcon, LogOutIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { disauthorize } from '@/store/auth/authSlice'
import type { RootState } from '@/store/store'

export function TheNav() {
  // todo: change to get session from backend
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  const dispatch = useDispatch()

  // todo: change to backend functions | remove logic from this component
  function signOut() {
    dispatch(disauthorize())
    toast.success('Signed out')
  }

  return (
    <nav className="flex items-center gap-2">
      {isAuth
        ? (
          <>
            <Button asChild variant="ghost" size="icon">
              <NavLink to="/favorites">
                <HeartIcon />
              </NavLink>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <NavLink to="/history">
                <Clock8Icon />
              </NavLink>
            </Button>
            <Button onClick={signOut} size="icon">
              <LogOutIcon />
            </Button>
          </>
          )
        : (
          <>
            <Button asChild className="font-bold" variant="outline">
              <NavLink to="/register">
                Register
              </NavLink>
            </Button>
            <Button asChild className="font-bold">
              <NavLink to="/login">
                Log In
              </NavLink>
            </Button>
          </>
          )}
    </nav>
  )
}
