import { Link } from 'react-router-dom'
import type { FallbackProps } from 'react-error-boundary'
import { Button } from '@/components/ui/button'
import { PageWrapper } from '@/components/wrappers/PageWrapper'

export function ErrorLayout({ resetErrorBoundary }: FallbackProps) {
  return (
    <PageWrapper className="flex flex-1 place-content-center text-center items-center">
      <div>
        <h1 className="text-2xl sm:text-5xl font-bold mb-4">Oops... There was an error!</h1>
        <Button aria-label="home" name="home" asChild variant="link" onClick={resetErrorBoundary}>
          <Link to="/" className="text-xl">
            Go Home
          </Link>
        </Button>
      </div>
    </PageWrapper>
  )
}
