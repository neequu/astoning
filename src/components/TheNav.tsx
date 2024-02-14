import { NavLink } from 'react-router-dom'
import { Clock8Icon, HeartIcon, LogOutIcon } from 'lucide-react'
import type { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'

interface Props {
  children?: React.ReactNode
  handleSignOut: () => void
  user: User | null
}

export function TheNav({ children, handleSignOut, user }: Props) {
  return (
    <nav className="flex items-center gap-2">
      {children}
      {user
        ? (
          <>
            <Button asChild variant="outline" size="icon">
              <NavLink to="/favorites">
                <HeartIcon className="h-[1.2rem] w-[1.2rem] scale-100 transition-all " />
              </NavLink>
            </Button>
            <Button asChild variant="outline" size="icon">
              <NavLink to="/history">
                <Clock8Icon className="h-[1.2rem] w-[1.2rem] scale-100 transition-all " />
              </NavLink>
            </Button>
            <Button onClick={handleSignOut} variant="outline" size="icon">
              <LogOutIcon className="h-[1.2rem] w-[1.2rem] scale-100 transition-all " />
            </Button>

          </>
          )
        : (
          <>
            <Button asChild className="font-bold" variant="outline">
              <NavLink to="/register">
                Register
              </NavLink>
            </Button>
            <Button asChild className="font-bold">
              <NavLink to="/login">
                Log In
              </NavLink>
            </Button>
          </>
          )}

    </nav>
  )
}
