import { NavLink } from 'react-router-dom'
import { Logo } from '@/components/misc/Logo'
import { TheNav } from '@/components/TheNav'
import { ThemeToggle } from '@/components/ThemeToggle'

export function TheHeader() {
  return (
    <header>
      <div className="container py-3 mx-auto px-4 flex justify-between items-center">
        <NavLink to="/">
          <Logo />
        </NavLink>
        <TheNav>
          <ThemeToggle />
        </TheNav>
      </div>
    </header>
  )
}
