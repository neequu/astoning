import { Link } from 'react-router-dom'
import { PageContent } from '@/components/PageContent'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <PageContent className="place-content-center text-center items-center">
      <div>
        <h1 className="text-2xl sm:text-5xl font-bold mb-4">The page wasnt found</h1>
        <Button asChild variant="link">
          <Link to="/" className="text-xl">
            Go Home
          </Link>
        </Button>
      </div>
    </PageContent>
  )
}
