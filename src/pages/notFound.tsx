import { Link } from 'react-router-dom'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { Button } from '@/components/ui/button'

export function NotFound() {
  return (
    <PageWrapper className="place-content-center text-center items-center">
      <div>
        <h1 className="text-2xl sm:text-5xl font-bold mb-4">The page wasnt found</h1>
        <Button asChild variant="link">
          <Link to="/" className="text-xl">
            Go Home
          </Link>
        </Button>
      </div>
    </PageWrapper>
  )
}
