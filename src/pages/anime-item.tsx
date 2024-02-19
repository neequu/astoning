import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppSelector } from '@/hooks/redux-hooks'
import { useGetAnimeByIdQuery } from '@/redux/api/anime-api'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { LoadingSkeleton } from '@/components/loadingState/LoadingSkeleton'
import { Message } from '@/components/misc/Message'
import { AnimeCard } from '@/components/AnimeCard'
import { selectUser } from '@/redux/rtk/selectors'

export default function AnimeItem() {
  const navigate = useNavigate()
  const { id } = useParams()
  // не parseInt тк при стринге может дать num ('1x' даст 1 например)
  const animeId = +(id!)
  const isNotValidId = Number.isNaN(animeId)

  useEffect(() => {
    if (isNotValidId)
      navigate('/not-found', { replace: true })
  }, [isNotValidId, navigate])

  const user = useAppSelector(selectUser)

  const { isError, isFetching, data: animeData, isSuccess } = useGetAnimeByIdQuery(animeId, {
    skip: isNotValidId,
  })

  return (
    <PageWrapper>
      {isError && <Message message="There was an error!" className="mt-10 text-destructive" />}

      {isFetching
        ? <LoadingSkeleton />
        : isSuccess && <AnimeCard item={animeData.data} userId={user?.id} />}

    </PageWrapper>
  )
}
