import { HeartIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Anime } from '@/types/anime'
import { Button } from '@/components/ui/button'

interface Props {
  item: Anime
  isAuth: boolean
  handleLike: (auth: boolean, id: number) => void
}

export function MediaCard({ item, isAuth, handleLike }: Props) {
  return (
    <div className="shadow-lg border rounded-md overflow-hidden sm:p-4 p-2 flex flex-col">
      <div className="mb-4">
        <p className="font-semibold text-xl line-clamp-1" title={item.title}>{item.title}</p>
        <div className="flex gap-1 items-center text-muted-foreground ">
          <p className="text-sm">{item.type}</p>
          <p className="text-sm">{item.year}</p>
        </div>
      </div>
      <Link to={`/anime/${item.mal_id}`} className="max-h-72">
        <img src={item.images.webp.image_url} className="h-72 min-w-30 w-full max-w-56 mx-auto rounded" alt={item.title} />
      </Link>
      <div className="flex justify-end flex-1 place-items-end mt-4">
        <Button size="icon" variant="ghost" onClick={() => handleLike(isAuth, item.mal_id)}>
          <HeartIcon />
        </Button>
      </div>
    </div>
  )
}
