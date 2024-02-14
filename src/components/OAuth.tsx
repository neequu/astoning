import type { Provider } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { capitalizeWord } from '@/lib/utils'

interface Props {
  provider: Provider
  Icon: string
  handleOAuth: (p: Provider) => Promise<void>
}

export function OAuth({ provider, Icon, handleOAuth }: Props) {
  return (
    <Button onClick={() => handleOAuth(provider)}>
      <span className="font-bold">{`Sign In with ${capitalizeWord(provider)}`}</span>
      &nbsp;&nbsp;
      <img src={Icon} alt={`Sign in with ${provider}`} />
    </Button>
  )
}
