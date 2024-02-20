import { Suspense } from 'react'
import { lazily } from 'react-lazily'
import { FailedCard } from '../media/FailedCard'
import { CardSkeleton } from '@/components/loading-state/CardSkeleton'
import { useGetAnimeByIdQuery } from '@/store/api/anime-api'

const { MediaCard } = lazily(() => import('@/components/media/MediaCard'))

interface Props {
  itemId: number
  children: React.ReactNode
}

export function CardWrapper({ itemId, children }: Props) {
  const { data: animeData, isSuccess, isError } = useGetAnimeByIdQuery(itemId)

  // api has rate limit, don't create card if blocked
  if (isError)
    return <FailedCard />

  return (
    <div>
      {isSuccess && (
        <Suspense fallback={<CardSkeleton amount={5} />}>
          <MediaCard item={animeData.data}>
            {children}
          </MediaCard>
        </Suspense>
      ) }
    </div>
  )
}
