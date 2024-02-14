import { NavLink, useNavigate } from 'react-router-dom'
import { Clock8Icon, HeartIcon, LogOutIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import supabase from '@/services/supabase'
import { setUser } from '@/redux/slices/authSlice'

interface Props {
  children?: React.ReactNode
}

export function TheNav({ children }: Props) {
  const user = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  async function signOut() {
    await supabase.auth.signOut()
    dispatch(setUser(false))
    navigate('/login')
    toast.success('signed out!')
  }

  return (
    <nav className="flex items-center gap-2">
      {children}
      {user
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
