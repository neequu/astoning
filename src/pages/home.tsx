import { Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/hooks/redux-hooks'
import { useAddHistoryMutation } from '@/redux/apis/db-api'
import { useGetAnimeQuery } from '@/redux/apis/anime-api'
import { SearchForm } from '@/components/search/SearchForm'
import { MediaGrid } from '@/components/media/MediaGrid'
import { MediaCard } from '@/components/media/MediaCard'
import { LoadingSkeleton } from '@/components/loadingState/LoadingSkeleton'
import { Message } from '@/components/misc/Message'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { LikeButton } from '@/components/LikeButton'
import { SearchSuggestions } from '@/components/search/SearchSuggestions'
import { useDebounce } from '@/hooks/use-debounce'
import { transformQuery } from '@/lib/utils'

export default function Home() {
  const user = useAppSelector(state => state.auth.user)
  const [addHistory] = useAddHistoryMutation()

  const navigate = useNavigate()
  // all anime data
  const { data: animeData, isError, isFetching, isSuccess } = useGetAnimeQuery()
  const successNoItems = isSuccess && animeData.pagination.items.count === 0
  // search queries
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query)

  // update query
  function handleQueryChange(newQuery: string) {
    setQuery(newQuery)
  }
  // on submit transform query and redirect to search page
  function handleSubmit() {
    const encodedQuery = transformQuery(query)
    addHistory({ query, userId: user?.id })
    const redirectUrl = `/search?q=${encodedQuery}`
    navigate(redirectUrl)
  }

  return (
    <>
      <SearchForm handleSubmit={handleSubmit} changeQuery={handleQueryChange}>
        <SearchSuggestions debouncedQuery={debouncedQuery} />
      </SearchForm>
      <Suspense>
        <PageWrapper heading="Home Page">

          {/* allow this to load but show form ↑ */}
          {isError && <Message message="There was an error!" className="flex-1 items-center text-destructive" />}

          {/* if fetching show skeleton → */}
          {isFetching
            ? <LoadingSkeleton />
          //  if success & nothing found show message →
            : successNoItems
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
