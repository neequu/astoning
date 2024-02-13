import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { maxTextLengthForHiddenBlock } from '@/lib/constants'

interface Props {
  text: string
  className?: string
}
export function HiddenTextBlock({ text, className }: Props) {
  const isTooLong = text.length >= maxTextLengthForHiddenBlock
  const [isHidden, setIsHidden] = useState(isTooLong)

  return (
    <div className={cn(className)}>
      <p className="text-muted-foreground font-semibold text-xl mb-2">Synonpsis</p>
      <p className={cn('line-clamp-none', isHidden && 'line-clamp-3')}>
        {text}
      </p>
      {
        isTooLong
        && <Button variant="link" className="p-0 text-muted-foreground font-" onClick={() => setIsHidden(p => !p)}>{isHidden ? 'Show more' : 'Show less'}</Button>
      }
    </div>
  )
}
