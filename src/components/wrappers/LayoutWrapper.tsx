import { TheHeader } from '@/components/TheHeader'

interface Props {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: Props) {
  return (
    <>
      <TheHeader />
      <main className="container mx-auto px-4 flex-1 flex flex-col">
        {children}
      </main>
    </>
  )
}
