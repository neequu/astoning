import { LogOutIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/hooks/redux-hooks'
import { authService } from '@/services/auth'
import { setUser } from '@/redux/slices/auth-slice'

export function TheSignOut() {
  const dispatch = useAppDispatch()

  async function handleSignOut(): Promise<void> {
    await authService.signOut()
    dispatch(setUser(null))
  }

  return (
    <Button onClick={handleSignOut} variant="outline" size="icon">
      <LogOutIcon className="h-[1.2rem] w-[1.2rem] scale-100 transition-all " />
    </Button>
  )
}
