import { Link } from 'react-router-dom'
import { XOctagonIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Tables } from '@/types/db'

interface Props {
  item: Tables<'history'>
  onDelete: (id: number) => void
}

export function HistoryCard({ item, onDelete }: Props) {
  return (
    <div className="flex justify-between">
      <Button asChild variant="link" className="p-0">
        <Link to={`/search?q=${item.query}`}>
          <p className="text-xl">{item.query}</p>
        </Link>
      </Button>
      <Button size="icon" className="w-8 h-8" variant="destructive" onClick={() => onDelete(item.id)}>
        <XOctagonIcon size={20} />
      </Button>
    </div>
  )
}
