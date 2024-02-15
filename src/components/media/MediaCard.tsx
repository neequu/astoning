import { Link } from 'react-router-dom'
import type { Anime } from '@/types/anime'
import { LikeButton } from '@/components/LikeButton'

interface Props {
  item: Anime
  isAuth: boolean
}

export function MediaCard({ item, isAuth }: Props) {
  return (
    <div className="shadow-lg border rounded-md overflow-hidden p-4 flex flex-col">
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
      <LikeButton className="justify-end flex-1 place-items-end mt-4" isAuth={isAuth} id={item.mal_id} />
    </div>
  )
}
