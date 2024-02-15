import { HeartCrackIcon, HeartIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { likeService } from '@/services/like'
import { useSetLike } from '@/hooks/use-set-like'

interface Props {
  className?: string
  isAuth: boolean
  id: number
  customMethod?: () => void
}

export function LikeButton({ className, isAuth, id, customMethod }: Props) {
  const { isActive, setIsActive, isLoadingLike, refetch } = useSetLike(id, isAuth)

  async function handleLike() {
    const initialState = isActive
    // optimistically change state
    setIsActive(!initialState)

    const res = await likeService.changeLike(isAuth, id, initialState)

    // if res is ok do nothing → otherwise set to initial state
    if (res?.success) {
      refetch()
      // if custom method needed → perform
      if (customMethod)
        customMethod()
    }
    else {
      setIsActive(initialState)
    }
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
