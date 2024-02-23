import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useGetAnimeByIdQuery } from '@/store/api/anime-api'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { LoadingSkeleton } from '@/components/loading-state/LoadingSkeleton'
import { Message } from '@/components/misc/Message'
import { useAppDispatch } from '@/hooks/store-hooks'
import { setVisit } from '@/store/slices/visit-slice'
import { AnimeCard } from '@/components/media/AnimeCard'
import { visitAdded } from '@/store/slices/entity-visit-slice'
import { generateTimestampTz } from '@/lib/utils'

export function AnimeItem() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { id } = useParams()
  // не parseInt тк при стринге может дать num ('1x' даст 1 например)
  const animeId = +(id!)
  const isNotValidId = Number.isNaN(animeId)

  if (isNotValidId)
    navigate('/not-found', { replace: true })

  const { isError, isFetching, data: animeData, isSuccess } = useGetAnimeByIdQuery(animeId)

  // sync dispatch with rendered component
  useEffect(() => {
    if (isNotValidId)
      return
    dispatch(setVisit(animeId))
    dispatch(visitAdded({ id: animeId, timestamptz: generateTimestampTz() }))
  }, [])

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
