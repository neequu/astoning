import { LogOutIcon } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/hooks/redux-hooks'
import { authService } from '@/services/auth'
import { handleSuccess } from '@/lib/utils'
import { setUser } from '@/redux/slices/auth-slice'
import { protectedRoutes } from '@/router/router-config'

export function SignOut() {
  const location = useLocation()
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  function redirectAfterSignOut() {
    const currentRoute = location.pathname
    if (protectedRoutes.find(route => route.path === currentRoute))
      navigate('/')
  }

  async function handleSignOut() {
    // sign out from db
    await authService.signOut()
    // net user to null in store
    dispatch(setUser(null))
    // redirect
    redirectAfterSignOut()
    handleSuccess('Signed out!')
  }

  return (
    <Button onClick={handleSignOut} variant="outline" size="icon">
      <LogOutIcon className="h-[1.2rem] w-[1.2rem] scale-100 transition-all " />
    </Button>
  )
}
