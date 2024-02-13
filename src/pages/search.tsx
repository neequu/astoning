import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useGetAnimeSearchQuery } from '@/redux/apis/animeApi'
import { useDebounce } from '@/hooks/useDebounce'
import { transformQuery } from '@/lib/utils'

import { SearchForm } from '@/components/search/SearchForm'
import { MediaGrid } from '@/components/media/MediaGrid'
import { MediaCard } from '@/components/media/MediaCard'
import { LoadingSkeleton } from '@/components/loadingState/LoadingSkeleton'
import { SearchMessage } from '@/components/search/SearchMessage'
import { SearchResults } from '@/components/search/SearchResults'
import { PageContent } from '@/components/PageContent'

export default function Search() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const debouncedQuery = useDebounce(query)

  const { data: animeData, isLoading, isError, isSuccess } = useGetAnimeSearchQuery(debouncedQuery)

  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  function handleQueryChange(newQuery: string) {
    setQuery(newQuery)
  }

  useEffect(() => {
    if (!debouncedQuery)
      return navigate(`/search`)

    const encodedQuery = transformQuery(debouncedQuery)
    navigate(`/search?q=${encodedQuery}`, { replace: true })
  }, [debouncedQuery, navigate])

  return (
    <PageContent>
      <SearchForm value={query} handleSubmit={handleSubmit} changeQuery={handleQueryChange} autoFocus />

      {isLoading && <LoadingSkeleton />}
      {isError && <SearchMessage message="There was an error!" className="mt-10 text-destructive" />}
      {isSuccess && animeData.pagination.items.count === 0 && <SearchMessage message="No results were found!" className="mt-10" />}

      {isSuccess && (
        <SearchResults>
          <MediaGrid>
            {animeData.data.map(item => (
              <MediaCard key={item.mal_id} item={item} />
            ))}
          </MediaGrid>
        </SearchResults>
      )}

    </PageContent>
  )
}
