import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export function LoadingSkeleton({ className }: Props) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Spinner />
    </div>
  )
}
