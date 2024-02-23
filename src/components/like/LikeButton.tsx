import { HeartCrackIcon, HeartIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props {
  handleClick: () => void
  isDisabled: boolean
  isActive: boolean
  isLoadingLike: boolean
  hasUser: boolean
}

export function LikeButton({ isDisabled, handleClick, isActive, isLoadingLike, hasUser }: Props) {
  return (
    <Button aria-label="like item" name="like item" data-testid="like-button" disabled={isDisabled} size="icon" variant="ghost" onClick={handleClick} className={cn(isActive && 'hover:text-destructive transition-all', isLoadingLike && 'animate-pulse rounded-md bg-muted')}>
      {/* if not loading and user exists */}
      {!isLoadingLike && hasUser && (
        <>
          {/* show if liked */}
          <HeartCrackIcon className={cn('absolute h-[1.2rem] w-[1.2rem] rotate-20 scale-0 transition-[rotate_scale_300ms]', isActive && 'rotate-0 scale-100 ')} />
          {/* show if not liked */}
          <HeartIcon className={cn('h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-[rotate_scale_300ms]', isActive && '-rotate-20 scale-0')} />
        </>
      )}
      {/* // if user logs out show this */}
      {!hasUser && <HeartIcon className={cn('h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-[rotate_scale_300ms]')} />}
    </Button>
  )
}
