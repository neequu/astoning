import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { lazily } from 'react-lazily'
import { useGetAnimeSearchQuery } from '@/store/api/anime-api'
import { selectUser } from '@/store/utils/selectors'
import { useHistory } from '@/hooks/use-history'
import { useAppSelector } from '@/hooks/store-hooks'

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

  const { handleAddHistory } = useHistory()
  const user = useAppSelector(selectUser)

  // search data
  const { data: animeData, isError, isSuccess, isLoading, isFetching } = useGetAnimeSearchQuery({ q: currenstSearch })
  const hasResults = isSuccess && animeData && animeData.data.length > 0

  // search msgs based on if the are results
  const searchMessage = currenstSearch ? `Showing ${animeData?.pagination.items.count || '...'} results for ${currenstSearch}` : 'Search any anime!'
  const searchHeading = isLoading ? 'Loading...' : searchMessage

  function handleQueryChange(newQuery: string): void {
    setQuery(newQuery)
  }
  // note: not extracting this, because there might be a page that works not on submit (like i had in ver.1)
  function handleSubmit(): void {
    setCurrenstSearch(query)
    const newSearchParams = new URLSearchParams(searchParams)

    if (query === '')
      newSearchParams.delete('q')
    else
      newSearchParams.set('q', query)

    handleAddHistory(user?.id, query)
    setSearchParams(newSearchParams.toString())
  }

  return (
    <>
      <SearchPanel handleSubmit={handleSubmit} changeQuery={handleQueryChange} query={query} />
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
