import { NavLink } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import { TheNav } from '@/components/TheNav'

export function TheHeader() {
  return (
    <header>
      <div className="container py-2 mx-auto px-4 flex justify-between items-center">
        <NavLink to="/">
          <Logo />
        </NavLink>
        <TheNav />
      </div>
    </header>
  )
}
