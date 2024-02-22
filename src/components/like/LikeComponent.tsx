import { useState } from 'react'
import { LikeButton } from './LikeButton'
import { cn, showNotificationError } from '@/lib/utils'

import { useSetLike } from '@/hooks/use-set-like'
import { useChangeLikeMutation } from '@/store/api/db-api'
import { useAppSelector } from '@/hooks/store-hooks'
import { selectUser } from '@/store/utils/selectors'

interface Props {
  className?: string
  itemId: number
}

export function LikeComponent({ className, itemId }: Props) {
  const user = useAppSelector(selectUser)
  const userId = user?.id

  const { isActive, setIsActive, isLoadingLike } = useSetLike(itemId, userId)
  const [changeLike] = useChangeLikeMutation()
  const [disabled, setDisabled] = useState(false)

  function handleLikeChange(initialState: boolean) {
    return changeLike({ itemId, isCurrentStateActive: initialState, userId })
  }

  async function handleLike(): Promise<void> {
    if (!userId)
      return showNotificationError('You need to be logged in')
    // disable on click
    setDisabled(true)
    const initialState = isActive

    // optimistically change state
    setIsActive(!initialState)
    const res = await handleLikeChange(initialState)
    // if no res → set to initial state
    if (!res)
      setIsActive(initialState)

    // enable in the end
    setDisabled(false)
  }
  return (
    <div className={cn('flex', className)}>
      <LikeButton isDisabled={disabled} handleClick={handleLike} isActive={isActive} isLoadingLike={isLoadingLike} hasUser={!!user} />
    </div>
  )
}
