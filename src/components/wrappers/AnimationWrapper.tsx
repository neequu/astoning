import { useEffect, useRef } from 'react'
import autoAnimate from '@formkit/auto-animate'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
}

export function AnimationWrapper({ children, className }: Props) {
  const parent = useRef(null)
  // use effect usage according to lib docs
  useEffect(() => {
    parent.current && autoAnimate(parent.current, {
      duration: 330,
    })
  }, [parent])

  return (
    <div ref={parent} className={cn(className)}>
      {children}
    </div>
  )
}
