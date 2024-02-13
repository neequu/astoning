import { Loader2Icon } from 'lucide-react'

interface Props {
  size?: number
}

export function Spinner({ size = 48 }: Props) {
  return (
    <div className="animate-spin w-min h-min">
      <Loader2Icon size={size} />
    </div>
  )
}
