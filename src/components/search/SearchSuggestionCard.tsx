import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import type { Anime } from '@/types/anime'

interface Props {
  item: Anime
  children: React.ReactNode
  className?: string
}

export default function SearchSuggestionCard({ item, children, className }: Props) {
  return (
    <div className={cn('flex items-center justify-between border-b border-muted px-4 py-2', className)}>
      <div className="flex items-center gap-2 font-medium">
        <div className="min-h-16 min-w-12">
          <img src={item.images.webp.image_url} alt={item.title} className="block h-16 w-12 rounded-md" />
        </div>
        <Button asChild variant="link" className="p-0">
          <Link to={`/anime/${item.mal_id}`} title={item.title}>
            <span className="whitespace-pre-wrap text-start line-clamp-1">{item.title}</span>
          </Link>
        </Button>
      </div>
      {children}
    </div>
  )
}
