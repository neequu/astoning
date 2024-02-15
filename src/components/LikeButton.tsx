import { HeartCrackIcon, HeartIcon } from 'lucide-react'
import { cn, handleError } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useSetLike } from '@/hooks/use-set-like'
import { useChangeLikeMutation } from '@/redux/apis/db-api'

interface Props {
  className?: string
  isAuth: boolean
  id: number
}

// review: too much code for this component?

export function LikeButton({ className, isAuth, id }: Props) {
  const { isActive, setIsActive, isLoadingLike } = useSetLike(id, isAuth)
  const [changeLike] = useChangeLikeMutation()

  function handleLikeChange(initialState: boolean) {
    return changeLike({ id, initialState })
  }

  async function handleLike() {
    if (!isAuth)
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
            <HeartCrackIcon className={cn('absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all ', isActive && 'rotate-0 scale-100 ')} />
            <HeartIcon className={cn('h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all', isActive && '-rotate-90 scale-0')} />
          </>
        )}
      </Button>
    </div>
  )
}
