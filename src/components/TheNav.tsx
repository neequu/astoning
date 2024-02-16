import { NavLink } from 'react-router-dom'
import { Clock8Icon, HeartIcon } from 'lucide-react'
import type { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { TheSignOut } from '@/components/TheSignOut'

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
            <TheSignOut />
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
