import { FailedCard } from '../media/FailedCard'
import { MediaCard } from '../media/MediaCard'
import { useGetAnimeByIdQuery } from '@/redux/api/anime-api'

interface Props {
  itemId: number
  children: React.ReactNode
}

export function CardWrapper({ itemId, children }: Props) {
  const { data: animeData, isSuccess, isError } = useGetAnimeByIdQuery(itemId)

  // review: ok?
  // api has rate limit, don't create card if blocked
  if (isError)
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
