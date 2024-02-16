import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Logo } from '@/components/misc/Logo'
import { TheNav } from '@/components/TheNav'
import { ThemeToggle } from '@/components/ThemeToggle'
import { setUser } from '@/redux/slices/auth-slice'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { authService } from '@/services/auth'

export function TheHeader() {
  const user = useAppSelector(state => state.auth.user)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  async function handleSignOut() {
    await authService.signOut()
    dispatch(setUser(null))
    navigate('/')
    toast.success('Signed out!')
  }

  return (
    <header>
      <div className="container py-3 mx-auto px-4 min-h-16 flex justify-between items-center">
        <Button asChild variant="link" className="p-0">
          <NavLink to="/">
            <Logo />
          </NavLink>
        </Button>
        <TheNav handleSignOut={handleSignOut} user={user}>
          <ThemeToggle />
        </TheNav>
      </div>
    </header>
  )
}
