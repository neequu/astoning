import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface Props {
  text: string
  className?: string
}
export function HiddenTextBlock({ text, className }: Props) {
  const [showFull, setShowFull] = useState(false)

  return (
    <div className={cn(className)}>
      <p className="text-muted-foreground font-semibold text-xl mb-2">Synonpsis</p>
      <p className={cn('line-clamp-3', showFull && 'line-clamp-none')}>
        {text}
      </p>
      <Button variant="link" className="p-0 text-muted-foreground font-" onClick={() => setShowFull(p => !p)}>{showFull ? 'Show less' : 'Show more'}</Button>
    </div>
  )
}
