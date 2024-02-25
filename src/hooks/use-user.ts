import { useAppSelector } from '@/hooks/store-hooks'
import { selectUser } from '@/store/utils/selectors'
import type { User } from '@/types/auth'

interface Return {
  user: User | null
  userId: User['id'] | undefined
}

export function useUser(): Return {
  const user = useAppSelector(selectUser)

  return { user, userId: user?.id }
}
