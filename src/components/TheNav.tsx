import { toast } from 'sonner'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Clock8Icon, HeartIcon, LogOutIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { disauthorize } from '@/redux/slices/authSlice'
import type { RootState } from '@/redux'

interface Props {
  children?: React.ReactNode
}

export function TheNav({ children }: Props) {
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
      {children}

      {isAuth
        ? (
          <>
            <Button asChild variant="outline" size="icon">
              <NavLink to="/favorites">
                <HeartIcon className="h-[1.2rem] w-[1.2rem] scale-100 transition-all " />
              </NavLink>
            </Button>
            <Button asChild variant="outline" size="icon">
              <NavLink to="/history">
                <Clock8Icon className="h-[1.2rem] w-[1.2rem] scale-100 transition-all " />
              </NavLink>
            </Button>
            <Button onClick={signOut} variant="outline" size="icon">
              <LogOutIcon className="h-[1.2rem] w-[1.2rem] scale-100 transition-all " />
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
