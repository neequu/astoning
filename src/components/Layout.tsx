import { TheHeader } from '@/components/TheHeader'

interface Props {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  return (
    <>
      <TheHeader />
      <main className="container mx-auto px-4">
        {children}
      </main>
    </>
  )
}
