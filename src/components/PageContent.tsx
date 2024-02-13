import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
}

export function PageContent({ children, className }: Props) {
  return (
    <section className={cn('py-12 flex-1 flex flex-col', className)}>
      {children}
    </section>
  )
}
