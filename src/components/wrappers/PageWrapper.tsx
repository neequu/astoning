import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  heading?: string
}

export function PageWrapper({ children, className, heading }: Props) {
  return (
    <section className={cn('py-12 flex-1 flex flex-col', className)}>
      {heading && <h1 className="font-bold text-2xl mb-16">{heading}</h1>}
      {children}
    </section>
  )
}
