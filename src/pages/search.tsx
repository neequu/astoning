import { Suspense, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import { useGetAnimeSearchQuery } from '@/redux/apis/anime-api'
import { useAppSelector } from '@/hooks/redux-hooks'
import { transformQuery } from '@/lib/utils'

import { SearchForm } from '@/components/search/SearchForm'
import { MediaGrid } from '@/components/media/MediaGrid'
import { MediaCard } from '@/components/media/MediaCard'
import { Message } from '@/components/misc/Message'
import { SearchResults } from '@/components/search/SearchResults'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { LikeButton } from '@/components/LikeButton'
import { AnimationWrapper } from '@/components/wrappers/AnimationWrapper'
import { useAddHistoryMutation } from '@/redux/apis/db-api'

export default function Search() {
  const user = useAppSelector(selectUser)
  const [addHistory] = useAddHistoryMutation()

  const navigate = useNavigate()
  // search queries
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [currenstSearch, setCurrenstSearch] = useState(query)

  // search data
  const { data: animeData, isError, isSuccess } = useGetAnimeSearchQuery({ q: currenstSearch })
  const successNoItems = isSuccess && animeData.pagination.items.count === 0

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

  const throttledSearch = useDebouncedCallback(search, 1000)

  // perform throttled search on query change
  useEffect(() => {
    throttledSearch()
  }, [navigate, query, throttledSearch])

  return (
    <>
      <SearchForm query={query} changeQuery={handleQueryChange} />
      <Suspense>
        <PageWrapper heading={currenstSearch ? `Results for ${currenstSearch}` : 'Search any anime!'}>
          {/* allow this to load but show form ↑ */}
          {isError && <Message message="There was an error!" className="flex-1 items-center text-destructive" />}
          {/* if success & nothing found show message → */}
          {successNoItems
            ? <Message message="No results were found!" className="flex-1 items-center" />
            // show results
            : (
              <SearchResults>
                <MediaGrid>
                  <AnimationWrapper className="grid-tmp">
                    {animeData?.data.map(item => (
                      <MediaCard key={item.mal_id} item={item}>
                        <LikeButton className="justify-end flex-1 place-items-end mt-4" userId={user?.id} itemId={item.mal_id} />
                      </MediaCard>
                    ))}
                  </AnimationWrapper>
                </MediaGrid>
              </SearchResults>
              )}
        </PageWrapper>
      </Suspense>
    </>
  )
}
