import { LikeButton } from './LikeButton'
import { cn } from '@/lib/utils'

import { useSetLike } from '@/hooks/use-set-like'
import { useAppSelector } from '@/hooks/store-hooks'
import { selectUser } from '@/store/utils/selectors'

interface Props {
  className?: string
  itemId: number
}

export function LikeComponent({ className, itemId }: Props) {
  const user = useAppSelector(selectUser)
  const userId = user?.id
  const { isActive, isDisabled, isLoadingLike, handleLikeChange } = useSetLike(itemId, userId)

  return (
    <div className={cn('flex', className)}>
      <LikeButton isDisabled={isDisabled} handleClicked={() => handleLikeChange(itemId, userId)} isActive={isActive} isLoadingLike={isLoadingLike} hasUser={!!user} />
    </div>
  )
}
