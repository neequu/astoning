import type { Provider } from '@/types/auth'
import { Button } from '@/components/ui/button'
import { capitalizeWord } from '@/lib/utils'

interface Props {
  provider: Provider
  handleOAuth: (p: Provider) => Promise<void>
  children: React.ReactNode
  isDisabled: boolean
}

export function OAuth({ provider, handleOAuth, children, isDisabled }: Props) {
  return (
    <Button onClick={() => handleOAuth(provider)} variant="secondary" disabled={isDisabled}>
      <span className="font-bold">{`Sign In with ${capitalizeWord(provider)}`}</span>
      {children}
    </Button>
  )
}
