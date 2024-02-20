import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import { lazily } from 'react-lazily'
import { useGetAnimeSearchQuery } from '@/store/api/anime-api'
import { useAppSelector } from '@/hooks/store-hooks'
import { transformQuery } from '@/lib/utils'

import { MediaGrid } from '@/components/media/MediaGrid'
import { MediaCard } from '@/components/media/MediaCard'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { LikeButton } from '@/components/LikeButton'
import { AnimationWrapper } from '@/components/wrappers/AnimationWrapper'
import { useAddHistoryMutation } from '@/store/api/db-api'
import { selectUser } from '@/store/utils/selectors'
import { SearchPanel } from '@/components/search/SearchPanel'
import { CardSkeleton } from '@/components/loading-state/CardSkeleton'

const { Message } = lazily(() => import('@/components/misc/Message'))

export function Search() {
  const user = useAppSelector(selectUser)
  const [addHistory] = useAddHistoryMutation()

  const navigate = useNavigate()
  // search queries
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [currenstSearch, setCurrenstSearch] = useState(query)

  // search data
  const { data: animeData, isError, isSuccess, isLoading, isFetching } = useGetAnimeSearchQuery({ q: currenstSearch })
  const hasResults = isSuccess && animeData && animeData.data.length > 0
  const throttledSearch = useDebouncedCallback(search, 666)
  // search msgs based on if the are results
  const searchMessage = currenstSearch && hasResults ? `Showing ${animeData.pagination.items.count} results for ${currenstSearch}` : 'Search any anime!'
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
        <MediaGrid>
          <AnimationWrapper className="grid-tmp">
            {isLoading && <CardSkeleton amount={20} />}
            {animeData?.data.map(item => (
              <MediaCard key={item.malId} item={item}>
                <LikeButton className="justify-end flex-1 place-items-end mt-4" itemId={item.malId} />
              </MediaCard>
            ))}
          </AnimationWrapper>
        </MediaGrid>
        {isError && <Message message="There was an error with your search!" className="flex-1 items-center text-destructive" />}
        {!hasResults && !isFetching && <Message message={`No results for ${currenstSearch} found!`} className="flex-1 items-center" />}
      </PageWrapper>
    </>
  )
}
