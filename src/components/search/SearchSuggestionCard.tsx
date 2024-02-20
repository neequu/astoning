import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import type { Anime } from '@/types/api/anime'

interface Props {
  item: Anime
  children?: React.ReactNode
  className?: string
}

export function SearchSuggestionCard({ item, children, className }: Props) {
  return (
    <Link to={`/anime/${item.malId}`} className="hover:bg-muted block transition-colors">
      <div className={cn('flex items-center justify-between border-b border-muted px-4 py-2', className)}>
        <div className="flex items-center gap-2 font-medium">
          <div className="min-h-16 min-w-12">
            <img src={item.images.webp.image_url} alt={item.title} className="block h-16 w-12 rounded-md" />
          </div>
          <span className="whitespace-pre-wrap text-start line-clamp-1" title={item.title}>{item.title}</span>
        </div>
        {children && children}
      </div>
    </Link>
  )
}
