import { TheHeader } from './TheHeader'
import Router from '@/router'

export function Layout() {
  return (
    <>
      <TheHeader />
      <main className="container mx-auto px-4">
        <Router />
      </main>
    </>
  )
}
