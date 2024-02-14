import { NavLink } from 'react-router-dom'
import type { FallbackProps } from 'react-error-boundary'
import { Button } from '@/components/ui/button'

export default function Error({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="h-screen grid place-content-center text-center bg-background">
      <h1 className="font-bold text-xl">Oops... There was an error!</h1>
      <Button asChild variant="link" onClick={resetErrorBoundary}>
        <NavLink to="/">Return Home</NavLink>
      </Button>
    </div>
  )
}
