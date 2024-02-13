import { NavLink } from 'react-router-dom'
import { Button } from './ui/button'

export function ErrorLayout() {
  return (
    <div className="h-screen grid place-content-center text-center">
      <h1 className="font-bold text-xl">Oops... There was an error!</h1>
      <Button asChild variant="link">
        <NavLink to="/">Return Home</NavLink>
      </Button>
    </div>
  )
}
