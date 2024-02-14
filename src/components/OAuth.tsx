import type { Provider } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { capitalizeWord } from '@/lib/utils'

interface Props {
  provider: Provider
  handleOAuth: (p: Provider) => Promise<void>
  children: React.ReactNode
}

export function OAuth({ provider, handleOAuth, children }: Props) {
  return (
    <Button onClick={() => handleOAuth(provider)}>
      <span className="font-bold">{`Sign In with ${capitalizeWord(provider)}`}</span>
      {children}
    </Button>
  )
}
