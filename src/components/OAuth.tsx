import type { LucideIcon } from 'lucide-react'
import type { Provider } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import supabase from '@/services/supabase'

interface Props {
  provider: Provider
  Icon: LucideIcon
}

export function OAuth({ provider, Icon }: Props) {
  async function handleOAuth() {
    await supabase.auth.signInWithOAuth({
      provider,
    })
  }

  return (
    <div className="mt-10">
      <Button onClick={handleOAuth}>
        <Icon />
      </Button>
    </div>
  )
}
