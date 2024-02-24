import { TheFooter } from '../TheFooter'
import { LoadingSkeleton } from '@/components/loading-state/LoadingSkeleton'
import { TheHeader } from '@/components/TheHeader'

interface Props {
  children: React.ReactNode
  isLoading: boolean
}

export function LayoutWrapper({ children, isLoading }: Props) {
  return (
    <>
      {isLoading && <LoadingSkeleton /> }
      {!isLoading
      && (
        <>
          <TheHeader />
          <main className="container mx-auto px-4 flex-1 flex flex-col">
            {children}
          </main>
          <TheFooter />
        </>
      )}

    </>
  )
}
