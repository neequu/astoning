import { LikeButton } from '../LikeButton'
import { MediaCard } from '../media/MediaCard'
import { useGetAnimeByIdQuery } from '@/redux/apis/anime-api'

interface Props {
  itemId: number
  isAuth: boolean
  handleClick: () => void
}

export function CardWrapper({ itemId, isAuth, handleClick }: Props) {
  const { data: animeData, isSuccess } = useGetAnimeByIdQuery(itemId)
  return (
    <div>
      {isSuccess && (
        <MediaCard item={animeData.data}>
          <LikeButton className="justify-end flex-1 place-items-end mt-4" isAuth={isAuth} id={itemId} handleClick={handleClick} />
        </MediaCard>
      ) }
    </div>
  )
}
