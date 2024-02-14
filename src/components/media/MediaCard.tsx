import { HeartIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Anime } from '@/types/anime'
import { Button } from '@/components/ui/button'

interface Props {
  item: Anime
}

export function MediaCard({ item }: Props) {
  return (
    <div className="shadow-lg border rounded-md overflow-hidden p-4 flex flex-col">
      <div className="mb-4">
        <p className="font-semibold text-xl line-clamp-1" title={item.title}>{item.title}</p>
        <div className="flex gap-1 items-center text-muted-foreground ">
          <p className="text-sm">{item.type}</p>
          <p className="text-sm">{item.year}</p>
        </div>
      </div>
      <Link to={`/anime/${item.mal_id}`}>
        <div className="pb-2 h-[20rem]">
          <img src={item.images.webp.image_url} className="w-full min-w-[240px] max-h-[20rem] rounded" alt={item.title} />
        </div>
      </Link>
      <div className="flex justify-end flex-1 place-items-end">
        <Button size="icon" variant="ghost">
          <HeartIcon />
        </Button>
      </div>
    </div>
  )
}