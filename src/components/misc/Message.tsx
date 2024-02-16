import { cn } from '@/lib/utils'

interface Props {
  message: string
  className?: string
}

export function Message({ message, className }: Props) {
  return (
    <div className={cn('text-muted-foreground flex justify-center font-semibold text-xl', className)}>
      <p>{message}</p>
    </div>
  )
}
