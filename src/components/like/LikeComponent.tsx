import { LikeButton } from './LikeButton'
import { cn } from '@/lib/utils'

import { useSetLike } from '@/hooks/use-set-like'
import { useUser } from '@/hooks/use-user'

interface Props {
  className?: string
  itemId: number
}

export function LikeComponent({ className, itemId }: Props) {
  const { userId, user } = useUser()
  const { isActive, isDisabled, isLoadingLike, handleLikeChange } = useSetLike(itemId, userId)

  return (
    <div className={cn('flex', className)}>
      <LikeButton isDisabled={isDisabled} handleClick={() => handleLikeChange(itemId, userId)} isActive={isActive} isLoadingLike={isLoadingLike} hasUser={!!user} />
    </div>
  )
}
