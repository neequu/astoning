import { NavLink } from 'react-router-dom'
import { Clock8Icon, HeartIcon } from 'lucide-react'
import type { User } from '@/types/auth'
import { Button } from '@/components/ui/button'
import { TheSignOut } from '@/components/auth/TheSignOut'

interface Props {
  children?: React.ReactNode
  user: User | null
}

export function TheNav({ children, user }: Props) {
  return (
    <nav className="flex items-center gap-2">
      {children}
      {user
        ? (
          <>
            <Button aria-label="go to likes" name="go to likes" asChild variant="outline" size="icon">
              <NavLink to="/favorites">
                <HeartIcon className="h-[1.2rem] w-[1.2rem] scale-100 transition-all " />
              </NavLink>
            </Button>
            <Button aria-label="go to history" name="go to history" asChild variant="outline" size="icon">
              <NavLink to="/history">
                <Clock8Icon className="h-[1.2rem] w-[1.2rem] scale-100 transition-all " />
              </NavLink>
            </Button>
            <TheSignOut />
          </>
          )
        : (
          <>
            <Button aria-label="go register" name="go register" asChild className="font-bold" variant="outline">
              <NavLink to="/register">
                Register
              </NavLink>
            </Button>
            <Button aria-label="go login" name="go login" asChild className="font-bold">
              <NavLink to="/login">
                Log In
              </NavLink>
            </Button>
          </>
          )}

    </nav>
  )
}
