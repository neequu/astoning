import { Suspense, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import { useGetAnimeSearchQuery } from '@/redux/api/anime-api'
import { useAppSelector } from '@/hooks/redux-hooks'
import { transformQuery } from '@/lib/utils'

import { MediaGrid } from '@/components/media/MediaGrid'
import { MediaCard } from '@/components/media/MediaCard'
import { Message } from '@/components/misc/Message'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { LikeButton } from '@/components/LikeButton'
import { AnimationWrapper } from '@/components/wrappers/AnimationWrapper'
import { useAddHistoryMutation } from '@/redux/api/db-api'
import { selectUser } from '@/redux/slices/selectors'
import { SearchPanel } from '@/components/search/SearchPanel'
import { LoadingSkeleton } from '@/components/loadingState/LoadingSkeleton'

export default function Search() {
  const user = useAppSelector(selectUser)
  const [addHistory] = useAddHistoryMutation()

  const navigate = useNavigate()
  // search queries
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [currenstSearch, setCurrenstSearch] = useState(query)

  // search data
  const { data: animeData, isError, isSuccess, isLoading } = useGetAnimeSearchQuery({ q: currenstSearch })
  const noResults = isSuccess && animeData.pagination.items.count === 0

  const throttledSearch = useDebouncedCallback(search, 1000)
  // search msgs based on if the are results
  const hasSearchAndData = currenstSearch && animeData?.data.length
  const searchMessage = hasSearchAndData ? `Showing ${animeData.pagination.items.count} results for ${currenstSearch}` : 'Search any anime!'
  const searchHeading = isLoading ? 'Loading...' : searchMessage

  function handleQueryChange(newQuery: string): void {
    setQuery(newQuery)
  }

  function search(): void | null {
    if (currenstSearch === query)
      return null
    setCurrenstSearch(query)

    if (!query)
      return navigate('/search')

    const encodedQuery = transformQuery(query)
    const redirectUrl = `/search?q=${encodedQuery}`

    addHistory({ query: encodedQuery, userId: user?.id })
    navigate(redirectUrl)
  }

  // perform throttled search on query change
  useEffect(() => {
    throttledSearch()
  }, [navigate, query, throttledSearch])

  return (
    <>
      <SearchPanel changeQuery={handleQueryChange} query={query} />
      <PageWrapper className="pt-6" heading={searchHeading}>
        <Suspense>
          <MediaGrid>
            <AnimationWrapper className="grid-tmp">
              {animeData?.data.map(item => (
                <MediaCard key={item.mal_id} item={item}>
                  <LikeButton className="justify-end flex-1 place-items-end mt-4" userId={user?.id} itemId={item.mal_id} />
                </MediaCard>
              ))}
            </AnimationWrapper>
          </MediaGrid>
          {isError && <Message message="There was an error with your search!" className="flex-1 items-center text-destructive" />}
          {isLoading && <LoadingSkeleton />}
          {noResults && <Message message={`No results for ${currenstSearch} found!`} className="flex-1 items-center" />}
        </Suspense>
      </PageWrapper>
    </>
  )
}
