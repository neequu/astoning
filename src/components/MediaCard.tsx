import { HeartIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

import type { Anime } from '@/types/anime'

interface Props {
  item: Anime
}

export function MediaCard({ item }: Props) {
  return (
    <div className="shadow-lg rounded-md overflow-hidden p-4 flex flex-col">
      <div className="mb-4">
        <p className="text-zinc-800 font-semibold text-xl line-clamp-1">{item.title}</p>
        <div className="flex gap-1 items-center text-zinc-400 ">
          <p className="line-clamp-1 text-sm">{item.type}</p>
          <p className="line-clamp-1 text-sm">{item.year}</p>
        </div>
      </div>
      <Link to={`/anime/${item.mal_id}`}>
        <div className="pb-2">
          <img src={item.images.webp.image_url} className="w-full min-w-[240px] max-h-[20rem] rounded" />
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
