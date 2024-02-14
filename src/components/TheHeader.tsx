import { NavLink } from 'react-router-dom'
import { Button } from './ui/button'
import { Logo } from '@/components/misc/Logo'
import { TheNav } from '@/components/TheNav'
import { ThemeToggle } from '@/components/ThemeToggle'

export function TheHeader() {
  return (
    <header>
      <div className="container py-3 mx-auto px-4 flex justify-between items-center">
        <Button asChild variant="link" className="p-0">
          <NavLink to="/">
            <Logo />
          </NavLink>
        </Button>
        <TheNav>
          <ThemeToggle />
        </TheNav>
      </div>
    </header>
  )
}
