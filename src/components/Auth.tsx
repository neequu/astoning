import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { authorize } from '@/redux/slices/authSlice'
import { Button } from '@/components/ui/button'

export function Auth() {
  const dispatch = useDispatch()

  function auth() {
    dispatch(authorize())
    toast.success('Authorized')
  }

  return (
    <Button className="font-bold" onClick={auth}>
      Auth
    </Button>
  )
}
