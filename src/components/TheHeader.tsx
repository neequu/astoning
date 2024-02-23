import { NavLink } from 'react-router-dom'
import { Logo } from '@/components/misc/Logo'
import { TheNav } from '@/components/TheNav'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/hooks/store-hooks'
import { selectUser } from '@/store/utils/selectors'

export function TheHeader() {
  const user = useAppSelector(selectUser)

  return (
    <header>
      <div className="container py-3 mx-auto px-4 min-h-16 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <Button asChild variant="link" className="p-0" aria-label="home" name="home">
          <NavLink to="/">
            <Logo />
          </NavLink>
        </Button>
        <TheNav user={user}>
          <ThemeToggle />
        </TheNav>
      </div>
    </header>
  )
}
