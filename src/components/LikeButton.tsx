import { HeartCrackIcon, HeartIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface Props {
  className?: string
  handleLike: () => void
  isActive: boolean
  isLoadingLike: boolean
}

export function LikeButton({ className, isActive, handleLike, isLoadingLike }: Props) {
  return (
    <div className={cn('flex', className)}>
      <Button size="icon" variant="ghost" onClick={handleLike} className={cn(isActive && 'hover:text-destructive transition-all', isLoadingLike && 'animate-pulse rounded-md bg-muted')}>
        {!isLoadingLike
        && (
          <>
            <HeartCrackIcon className={cn('absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all ', isActive && 'rotate-0 scale-100 ')} />
            <HeartIcon className={cn('h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all', isActive && '-rotate-90 scale-0')} />
          </>
        )}
      </Button>
    </div>
  )
}
