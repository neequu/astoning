import { Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddHistoryMutation } from '@/redux/apis/db-api'
import { useGetAnimeQuery } from '@/redux/apis/anime-api'
import { transformQuery } from '@/lib/utils'
import { useAppSelector } from '@/hooks/redux-hooks'
import { useDebounce } from '@/hooks/use-debounce'

import { MediaGrid } from '@/components/media/MediaGrid'
import { MediaCard } from '@/components/media/MediaCard'
import { LoadingSkeleton } from '@/components/loadingState/LoadingSkeleton'
import { Message } from '@/components/misc/Message'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { LikeButton } from '@/components/LikeButton'
import { SearchSuggestions } from '@/components/search/SearchSuggestions'
import { selectUser } from '@/redux/slices/selectors'
import { SearchPanel } from '@/components/search/SearchPanel'

export default function Home() {
  const user = useAppSelector(selectUser)
  const [addHistory] = useAddHistoryMutation()

  const navigate = useNavigate()
  // search queries
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query)

  // all anime data
  const { data: animeData, isError, isFetching, isSuccess } = useGetAnimeQuery()
  const hasResults = !animeData?.data.length

  // update query
  function handleQueryChange(newQuery: string): void {
    setQuery(newQuery)
  }
  // on submit transform query and redirect to search page
  function handleSubmit(): void {
    const encodedQuery = transformQuery(query)

    addHistory({ query, userId: user?.id })
    const redirectUrl = `/search?q=${encodedQuery}`
    navigate(redirectUrl)
  }

  return (
    <>
      <SearchPanel changeQuery={handleQueryChange} shouldKeepFocusState={true} handleSubmit={handleSubmit}>
        <SearchSuggestions debouncedQuery={debouncedQuery} />
      </SearchPanel>

      <Suspense>
        <PageWrapper className="pt-6" heading="Anime Collection">
          {/* allow this to load but show form ↑ */}
          {isError && <Message message="There was an error!" className="flex-1 items-center text-destructive" />}

          {/* if fetching show skeleton → */}
          {isFetching
            ? <LoadingSkeleton />
          //  if success & nothing found show message →
            : hasResults
              ? <Message message="No anime found!" className="flex-1 items-center" />
            // show results
              : isSuccess && (
                <MediaGrid className="grid-tmp">
                  {animeData.data.map(item => (
                    <MediaCard key={item.mal_id} item={item}>
                      <LikeButton className="justify-end flex-1 place-items-end mt-4" userId={user?.id} itemId={item.mal_id} />
                    </MediaCard>
                  ))}
                </MediaGrid>
              )}
        </PageWrapper>
      </Suspense>
    </>
  )
}
