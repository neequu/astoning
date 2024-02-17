import { Link } from 'react-router-dom'
import { XOctagonIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Tables } from '@/types/db/supabase'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { transformDateFromString } from '@/lib/utils'

interface Props {
  item: Tables<'history'>
  onDelete: (id: number) => void
}

export function HistoryCard({ item, onDelete }: Props) {
  const decoudedQuery = decodeURIComponent(item.query)

  return (
    <div className="flex justify-between border-b border-muted py-4">
      <Button asChild variant="link" className="p-0">
        <Link to={`/search?q=${item.query}`}>
          <p className="text-xl">{decoudedQuery}</p>
        </Link>
      </Button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <span>
              <Button asChild className="hover:text-destructive w-10 h-10 p-2 inline-block" size="icon" variant="ghost" onClick={() => onDelete(item.id)}>
                <XOctagonIcon size={20} />
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              <span>Delete search from</span>
              &nbsp;
              <span className="font-medium">{transformDateFromString(item.created_at)}</span>
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
