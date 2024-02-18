import { HeartCrackIcon, HeartIcon } from 'lucide-react'
import type { User } from '@supabase/supabase-js'
import { cn, handleError } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useSetLike } from '@/hooks/use-set-like'
import { useChangeLikeMutation } from '@/redux/api/db-api'

interface Props {
  className?: string
  userId: User['id'] | undefined
  itemId: number
}

export function LikeButton({ className, userId, itemId }: Props) {
  const { isActive, setIsActive, isLoadingLike } = useSetLike(itemId, userId)
  const [changeLike] = useChangeLikeMutation()

  function handleLikeChange(initialState: boolean) {
    return changeLike({ itemId, isCurrentStateActive: initialState, userId })
  }

  async function handleLike(): Promise<void> {
    if (!userId)
      return handleError('You need to be logged in')

    const initialState = isActive

    // optimistically change state
    setIsActive(!initialState)
    const res = await handleLikeChange(initialState)
    // if no res → set to initial state
    if (!res)
      setIsActive(initialState)
  }

  return (
    <div className={cn('flex', className)}>
      <Button size="icon" variant="ghost" onClick={handleLike} className={cn(isActive && 'hover:text-destructive transition-all', isLoadingLike && 'animate-pulse rounded-md bg-muted')}>
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
