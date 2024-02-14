import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { handleLike } from '@/services/like'
import { useAppSelector } from '@/hooks/redux-hooks'
import { useGetAnimeByIdQuery } from '@/redux/apis/anime-api'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { LoadingSkeleton } from '@/components/loadingState/LoadingSkeleton'
import { SearchMessage } from '@/components/search/SearchMessage'
import { AnimeCard } from '@/components/AnimeCard'

export default function AnimeItem() {
  const { id } = useParams()
  // не parseInt тк при стринге может дать num ('1x' даст 1 например)
  const animeId = +(id!)
  const navigate = useNavigate()

  useEffect(() => {
    if (Number.isNaN(animeId))
      navigate('/not-found', { replace: true })
  }, [animeId, navigate])

  const user = useAppSelector(state => state.auth.user)
  const { isError, isFetching, data: animeData, isSuccess } = useGetAnimeByIdQuery(animeId)

  return (
    <PageWrapper>
      {isError && <SearchMessage message="There was an error!" className="mt-10 text-destructive" />}

      {isFetching
        ? <LoadingSkeleton />
        : isSuccess && <AnimeCard item={animeData.data} handleLike={handleLike} isAuth={!!user} />}

    </PageWrapper>
  )
}
