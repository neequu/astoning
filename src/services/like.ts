import { toast } from 'sonner'

export function handleLike(isAuth: boolean, itemId: number) {
  if (!isAuth) {
    toast.error('You need to be logged in')
    return
  }

  toast.success(itemId)
}
