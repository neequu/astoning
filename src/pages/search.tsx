import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useGetAnimeSearchQuery } from '@/redux/apis/anime-api'
import { useDebounce } from '@/hooks/use-debounce'
import { useAppSelector } from '@/hooks/redux-hooks'
import { transformQuery } from '@/lib/utils'

import { SearchForm } from '@/components/search/SearchForm'
import { MediaGrid } from '@/components/media/MediaGrid'
import { MediaCard } from '@/components/media/MediaCard'
import { LoadingSkeleton } from '@/components/loadingState/LoadingSkeleton'
import { Message } from '@/components/search/Message'
import { SearchResults } from '@/components/search/SearchResults'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { LikeButton } from '@/components/LikeButton'

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
      {isError && <Message message="There was an error!" className="flex-1 items-center text-destructive" />}

      {/* if fetching show skeleton → */}
      {isFetching
        ? <LoadingSkeleton />
        //  if success & nothing found show message →
        : successNoItems
          ? <Message message="No results were found!" className="flex-1 items-center" />
          // show results
          : isSuccess && (
            <SearchResults>
              <MediaGrid>
                {animeData.data.map(item => (
                  <MediaCard key={item.mal_id} item={item}>
                    <LikeButton className="justify-end flex-1 place-items-end mt-4" userId={user?.id} itemId={item.mal_id} />
                  </MediaCard>
                ))}
              </MediaGrid>
            </SearchResults>
          )}
    </PageWrapper>
  )
}
