import { HeartCrackIcon, HeartIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn, showNotificationError } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useSetLike } from '@/hooks/use-set-like'
import { useChangeLikeMutation } from '@/store/api/db-api'
import { useAppSelector } from '@/hooks/store-hooks'
import { selectUser } from '@/store/utils/selectors'

interface Props {
  className?: string
  itemId: number
}

export function LikeButton({ className, itemId }: Props) {
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

  useEffect(() => {
    if (!user)
      setIsActive(false)
  }, [user, setIsActive])

  return (
    <div className={cn('flex', className)}>
      <Button data-testid="like-button" disabled={disabled} size="icon" variant="ghost" onClick={handleLike} className={cn(isActive && 'hover:text-destructive transition-all', isLoadingLike && 'animate-pulse rounded-md bg-muted')}>
        {!isLoadingLike && (
          <>
            {/* show if liked */}
            <HeartCrackIcon className={cn('absolute h-[1.2rem] w-[1.2rem] rotate-20 scale-0 transition-[rotate_scale_300ms]', isActive && 'rotate-0 scale-100 ')} />
            {/* show if not liked */}
            <HeartIcon className={cn('h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-[rotate_scale_300ms]', isActive && '-rotate-20 scale-0')} />
          </>
        )}
      </Button>
    </div>
  )
}
