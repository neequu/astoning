import { Link } from 'react-router-dom'
import type { FallbackProps } from 'react-error-boundary'
import { Button } from '@/components/ui/button'
import { PageWrapper } from '@/components/wrappers/PageWrapper'

export function ErrorLayout({ resetErrorBoundary }: FallbackProps) {
  return (
    <PageWrapper className="place-content-center text-center items-center">
      <div>
        <h1 className="font-bold text-xl">Oops... There was an error!</h1>
        <Button asChild variant="link" onClick={resetErrorBoundary}>
          <Link to="/" className="text-xl">
            Go Home
          </Link>
        </Button>
      </div>
    </PageWrapper>
  )
}
