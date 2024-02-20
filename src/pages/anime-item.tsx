import { useNavigate, useParams } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import { lazily } from 'react-lazily'
import { useGetAnimeByIdQuery } from '@/store/api/anime-api'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { LoadingSkeleton } from '@/components/loading-state/LoadingSkeleton'
import { Message } from '@/components/misc/Message'

const { AnimeCard } = lazily(() => import('@/components/AnimeCard'))

export function AnimeItem() {
  const navigate = useNavigate()
  const { id } = useParams()
  // не parseInt тк при стринге может дать num ('1x' даст 1 например)
  const animeId = +(id!)
  const isNotValidId = Number.isNaN(animeId)

  useEffect(() => {
    if (isNotValidId)
      navigate('/not-found', { replace: true })
  }, [isNotValidId, navigate])

  const { isError, isFetching, data: animeData, isSuccess } = useGetAnimeByIdQuery(animeId, {
    skip: isNotValidId,
  })

  return (
    <PageWrapper>
      {isError && <Message message="There was an error!" className="mt-10 text-destructive" />}

      {isFetching
        ? <LoadingSkeleton />
        : isSuccess
        && (
          <Suspense fallback={<LoadingSkeleton />}>
            <AnimeCard item={animeData.data} />
          </Suspense>
        )}

    </PageWrapper>
  )
}
