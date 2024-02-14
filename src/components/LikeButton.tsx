import { useState } from 'react'
import { HeartCrackIcon, HeartIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface Props {
  className?: string
  isAuth: boolean
  handleLike: (auth: boolean, id: number) => void
  id: number
}

export function LikeButton({ className, isAuth, handleLike, id }: Props) {
  const [isActive, setIsActive] = useState(false)

  function handleClick() {
    setIsActive(p => !p)
    handleLike(isAuth, id)
  }

  return (
    <div className={cn('flex', className)}>
      <Button size="icon" variant="ghost" onClick={handleClick} className={cn(isActive && 'hover:text-destructive transition-all')}>
        <HeartCrackIcon className={cn('absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all ', isActive && 'rotate-0 scale-100 ')} />
        <HeartIcon className={cn('h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all', isActive && '-rotate-90 scale-0')} />
      </Button>
    </div>
  )
}
