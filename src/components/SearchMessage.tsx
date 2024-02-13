import { cn } from '@/lib/utils'

interface Props {
  message: string
  className?: string
}

export function SearchMessage({ message, className }: Props) {
  return (
    <div className={cn('text-zinc-400 flex justify-center font-semibold', className)}>
      <p>{message}</p>
    </div>
  )
}
