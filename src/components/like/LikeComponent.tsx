import { useState } from 'react'
import { LikeButton } from './LikeButton'
import { cn, showNotificationError } from '@/lib/utils'

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
  const { isActive, setIsActive, isLoadingLike, handleLikeChanged } = useSetLike(itemId, userId)

  const [disabled, setDisabled] = useState(false)

  async function handleLiked(): Promise<void> {
    if (!userId)
      return showNotificationError('You need to be logged in')
    // disable on click
    setDisabled(true)
    const initialState = isActive

    // optimistically change state
    setIsActive(!initialState)
    const res = await handleLikeChanged(itemId, initialState, userId)
    // if no res → set to initial state
    if (!res)
      setIsActive(initialState)

    // enable in the end
    setDisabled(false)
  }
  return (
    <div className={cn('flex', className)}>
      <LikeButton isDisabled={disabled} handleClicked={handleLiked} isActive={isActive} isLoadingLike={isLoadingLike} hasUser={!!user} />
    </div>
  )
}
