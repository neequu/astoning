import { cn } from '@/lib/utils'

interface Props {
  amount?: number
  className?: string
}

export default function CardSkeleton({ amount = 1, className }: Props) {
  const dummyArray = Array.from({ length: amount }).fill('')
  return (
    <>
      {dummyArray.map((_, idx) => <div key={idx} className={cn('shadow-lg border h-[442px] rounded-md overflow-hidden p-4 bg-muted animate-pulse', className)} />)}
    </>

  )
}
