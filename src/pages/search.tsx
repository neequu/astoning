import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useGetAnimeSearchQuery } from '@/redux/apis/animeApi'
import { useDebounce } from '@/hooks/useDebounce'
import { useAppSelector } from '@/hooks/reduxHooks'
import { transformQuery } from '@/lib/utils'
import { handleLike } from '@/services/like'

import { SearchForm } from '@/components/search/SearchForm'
import { MediaGrid } from '@/components/media/MediaGrid'
import { MediaCard } from '@/components/media/MediaCard'
import { LoadingSkeleton } from '@/components/loadingState/LoadingSkeleton'
import { SearchMessage } from '@/components/search/SearchMessage'
import { SearchResults } from '@/components/search/SearchResults'
import { PageWrapper } from '@/components/wrappers/PageWrapper'

export default function Search() {
  const user = useAppSelector(state => state.auth.user)
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const debouncedQuery = useDebounce(query)

  // rtk data fetch
  const { data: animeData, isError, isSuccess, isFetching } = useGetAnimeSearchQuery(debouncedQuery)
  const successNoItems = isSuccess && animeData.pagination.items.count === 0

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
    <PageWrapper>
      <SearchForm value={query} handleSubmit={e => e.preventDefault()} changeQuery={handleQueryChange} autoFocus />
      {isError && <SearchMessage message="There was an error!" className="mt-10 text-destructive" />}

      {/* if fetching show skeleton → */}
      {isFetching
        ? <LoadingSkeleton />
        //  if success & nothing found show message →
        : successNoItems
          ? <SearchMessage message="No results were found!" className="mt-10" />
          // show results
          : isSuccess && (
            <SearchResults>
              <MediaGrid>
                {animeData.data.map(item => (
                  <MediaCard key={item.mal_id} item={item} isAuth={!!user} handleLike={handleLike} />
                ))}
              </MediaGrid>
            </SearchResults>
          )}
    </PageWrapper>
  )
}
