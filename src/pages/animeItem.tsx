import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { PageContent } from '@/components/PageContent'
import { useGetAnimeByIdQuery } from '@/redux/apis/animeApi'
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

  const { isError, isLoading, data: animeData, isSuccess } = useGetAnimeByIdQuery(animeId)

  return (
    <PageContent>
      <section>
        {isLoading && <LoadingSkeleton className="mt-6" />}
        {isError && <SearchMessage message="There was an error!" className="mt-10 text-destructive" />}

        {isSuccess && <AnimeCard item={animeData.data} />}

      </section>
    </PageContent>
  )
}
