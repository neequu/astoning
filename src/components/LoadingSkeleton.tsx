import { Spinner } from '@/components/ui/spinner'

export function LoadingSkeleton() {
  return (
    <div className="flex items-center justify-center">
      <Spinner />
    </div>
  )
}
