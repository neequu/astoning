import { Link } from 'react-router-dom'
import { XOctagonIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn, transformDateFromString } from '@/lib/utils'
import type { HistoryTransformed } from '@/types/db/db'

interface Props {
  item: HistoryTransformed
  onDelete: (id: number) => void
}

export function HistoryCard({ item, onDelete }: Props) {
  const decoudedQuery = decodeURIComponent(item.query)
  const title = `Delete search from ${transformDateFromString(item.createdAt)}`

  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDeleted(): Promise<void> {
    setIsDeleting(true)
    onDelete(item.id)
  }

  return (
    <div className="flex justify-between border-b border-muted py-4 px-2 overflow-hidden">
      <Button name={`go to ${decoudedQuery}`} asChild variant="link" className="p-0">
        <Link to={`/search?q=${item.query}`}>
          <p className="text-xl">{decoudedQuery}</p>
        </Link>
      </Button>

      <Button name={`delete ${decoudedQuery}`} title={title} className={cn('p-2 hover:text-destructive', isDeleting && 'text-destructive')} disabled={isDeleting} size="icon" variant="ghost" onClick={handleDeleted}>
        <XOctagonIcon size={20} />
      </Button>
    </div>
  )
}
