import { TheFooter } from '../TheFooter'
import { LoadingSkeleton } from '@/components/loadingState/LoadingSkeleton'
import { TheHeader } from '@/components/TheHeader'
import { useInitializeUser } from '@/hooks/use-initialize-user'
import { authService } from '@/services/auth'

interface Props {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: Props) {
  const { isLoading } = useInitializeUser(authService.getUser)

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
