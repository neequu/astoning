import { TheFooter } from '../TheFooter'
import { LoadingSkeleton } from '@/components/loading-state/LoadingSkeleton'
import { TheHeader } from '@/components/TheHeader'
import { useInitializeUser } from '@/hooks/use-initialize-user'
import { authService } from '@/services/auth'
import { initializeConsole } from '@/services/console/init'

interface Props {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: Props) {
  const { isLoading } = useInitializeUser(authService.getUser)
  initializeConsole()
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
