import { LogOutIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/hooks/redux-hooks'
import { authService } from '@/services/auth'
import { handleSuccess } from '@/lib/utils'
import { setUser } from '@/redux/slices/auth-slice'

// import { useLocation, useNavigate } from 'react-router-dom'
// import { routesAuthOnly } from '@/router/router-config'

export function TheSignOut() {
  // todo: maybe uncommend this later
//   const location = useLocation()
//   const navigate = useNavigate()

  //   function redirectAfterSignOut() {
  //     const currentRoute = location.pathname
  //     if (routesAuthOnly.find(route => route.path === currentRoute))
  //     navigate('/')
  // }

  const dispatch = useAppDispatch()
  async function handleSignOut() {
    // sign out from db
    await authService.signOut()
    // net user to null in store
    dispatch(setUser(null))
    // redirect
    // redirectAfterSignOut()
    handleSuccess('Signed out!')
  }

  return (
    <Button onClick={handleSignOut} variant="outline" size="icon">
      <LogOutIcon className="h-[1.2rem] w-[1.2rem] scale-100 transition-all " />
    </Button>
  )
}
