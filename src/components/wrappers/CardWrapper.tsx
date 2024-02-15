import { MediaCard } from '../media/MediaCard'
import { useGetAnimeByIdQuery } from '@/redux/apis/anime-api'

interface Props {
  itemId: number
  isAuth: boolean
  customMethod: () => void
  children: React.ReactNode
}

export function CardWrapper({ itemId, children }: Props) {
  const { data: animeData, isSuccess } = useGetAnimeByIdQuery(itemId)
  return (
    <div>
      {isSuccess && (
        <MediaCard item={animeData.data}>
          {children}
        </MediaCard>
      ) }
    </div>
  )
}
