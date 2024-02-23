import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import { lazily } from 'react-lazily'
import { useGetAnimeSearchQuery } from '@/store/api/anime-api'

import { MediaGrid } from '@/components/media/MediaGrid'
import { MediaCard } from '@/components/media/MediaCard'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { LikeComponent } from '@/components/like/LikeComponent'
import { AnimationWrapper } from '@/components/wrappers/AnimationWrapper'
import { SearchPanel } from '@/components/search/SearchPanel'
import { CardSkeleton } from '@/components/loading-state/CardSkeleton'

const { Message } = lazily(() => import('@/components/misc/Message'))

export function Search() {
  // search queries
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [currenstSearch, setCurrenstSearch] = useState(query)

  // search fn
  const throttledSearch = useDebouncedCallback(search, 666)

  // search data
  const { data: animeData, isError, isSuccess, isLoading, isFetching } = useGetAnimeSearchQuery({ q: currenstSearch })
  const hasResults = isSuccess && animeData && animeData.data.length > 0

  // search msgs based on if the are results
  const searchMessage = currenstSearch && hasResults ? `Showing ${animeData.pagination.items.count} results for ${currenstSearch}` : 'Search any anime!'
  const searchHeading = isLoading ? 'Loading...' : searchMessage

  function handleQueryChange(newQuery: string): void {
    setQuery(newQuery)
    throttledSearch()
  }

  function search(): void {
    if (currenstSearch === query)
      return

    setCurrenstSearch(query)
    const newSearchParams = new URLSearchParams(searchParams)
    if (query === '')
      newSearchParams.delete('q')
    else
      newSearchParams.set('q', query)

    setSearchParams(newSearchParams.toString())
  }

  return (
    <>
      <SearchPanel changeQuery={handleQueryChange} query={query} />
      <PageWrapper className="pt-6" heading={searchHeading}>
        <MediaGrid>
          <AnimationWrapper className="grid-tmp">
            {isLoading && <CardSkeleton amount={20} />}
            {animeData?.data.map(item => (
              <MediaCard key={item.malId} item={item}>
                <LikeComponent className="justify-end flex-1 place-items-end mt-4" itemId={item.malId} />
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
