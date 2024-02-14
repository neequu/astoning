import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetAnimeQuery } from '@/redux/apis/animeApi'
import { SearchForm } from '@/components/search/SearchForm'
import { transformQuery } from '@/lib/utils'
import { MediaGrid } from '@/components/media/MediaGrid'
import { MediaCard } from '@/components/media/MediaCard'
import { LoadingSkeleton } from '@/components/loadingState/LoadingSkeleton'
import { SearchMessage } from '@/components/search/SearchMessage'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { useAppSelector } from '@/hooks/reduxHooks'
import { handleLike } from '@/services/like'

export default function Home() {
  // get user
  const user = useAppSelector(state => state.auth.user)

  // rtk data fetch
  const { data: animeData, isError, isLoading, isSuccess } = useGetAnimeQuery()

  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleQueryChange(newQuery: string) {
    setQuery(newQuery)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const encodedQuery = transformQuery(query)
    navigate(`/search?q=${encodedQuery}`)
  }

  return (
    <PageWrapper>
      <SearchForm handleSubmit={handleSubmit} changeQuery={handleQueryChange} />

      {isLoading && <LoadingSkeleton />}
      {isError && <SearchMessage message="There was an error :(" className="mt-10 text-destructive" />}
      {isSuccess && animeData.pagination.items.count === 0 && <SearchMessage message="No results were found!" className="mt-10" />}

      {isSuccess && (
        <MediaGrid>
          {animeData.data.map(item => (
            <MediaCard key={item.mal_id} item={item} isAuth={!!user} handleLike={handleLike} />
          ))}
        </MediaGrid>
      )}

    </PageWrapper>
  )
}
