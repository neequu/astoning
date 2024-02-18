import { FailedCard } from '../media/FailedCard'
import { MediaCard } from '../media/MediaCard'
import { useGetAnimeByIdQuery } from '@/redux/apis/anime-api'

interface Props {
  itemId: number
  children: React.ReactNode
}

export function CardWrapper({ itemId, children }: Props) {
  const { data: animeData, isSuccess, isFetching } = useGetAnimeByIdQuery(itemId)

  // review: ok?
  // api has rate limit, don't create card if blocked
  if (!isSuccess && !isFetching)
    return <FailedCard />

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
