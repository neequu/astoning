import { useNavigate, useParams } from 'react-router-dom'
import { useGetAnimeByIdQuery } from '@/store/api/anime-api'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { LoadingSkeleton } from '@/components/loading-state/LoadingSkeleton'
import { Message } from '@/components/misc/Message'
import { AnimeCard } from '@/components/media/AnimeCard'
import { useVisitSet } from '@/hooks/use-visit-set'

export function AnimeItem() {
  const navigate = useNavigate()
  const { id } = useParams()
  // не parseInt тк при стринге может дать num ('1x' даст 1 например)
  const animeId = +(id!)
  const isInvalidId = Number.isNaN(animeId)

  if (isInvalidId)
    navigate('/not-found', { replace: true })

  const { isError, isFetching, data: animeData, isSuccess } = useGetAnimeByIdQuery(animeId)
  useVisitSet(animeId, isInvalidId)

  return (
    <PageWrapper>
      {isError && <Message message="There was an error!" className="mt-10 text-destructive" />}
      {isFetching
        ? <LoadingSkeleton />
        : isSuccess
        && <AnimeCard item={animeData.data} />}

    </PageWrapper>
  )
}
