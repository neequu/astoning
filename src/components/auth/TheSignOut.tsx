import { LogOutIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/hooks/store-hooks'
import { authService } from '@/services/auth'
import { userSet } from '@/store/slices/auth-slice'

export function TheSignOut() {
  const dispatch = useAppDispatch()

  async function handleSignOut(): Promise<void> {
    const res = await authService.signOut()
    dispatch(userSet(res))
  }

  return (
    <Button aria-label="sign out" name="sign out" onClick={handleSignOut} variant="outline" size="icon">
      <LogOutIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
    </Button>
  )
}
