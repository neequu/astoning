import { Suspense, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddHistoryMutation } from '@/redux/api/db-api'
import { useGetAnimeQuery } from '@/redux/api/anime-api'
import { transformQuery } from '@/lib/utils'
import { useAppSelector } from '@/hooks/redux-hooks'
import { useDebounce } from '@/hooks/use-debounce'
import { MediaGrid } from '@/components/media/MediaGrid'
import { MediaCard } from '@/components/media/MediaCard'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { LikeButton } from '@/components/LikeButton'
import { SearchSuggestions } from '@/components/search/SearchSuggestions'
import { selectUser } from '@/redux/rtk/selectors'
import { SearchPanel } from '@/components/search/SearchPanel'
import type { Anime } from '@/types/anime'
import TailElement from '@/components/misc/TailElement'
import { LoadingSkeleton } from '@/components/loadingState/LoadingSkeleton'
import { Message } from '@/components/misc/Message'

export default function Home() {
  const user = useAppSelector(selectUser)
  const [addHistory] = useAddHistoryMutation()

  const navigate = useNavigate()
  // search queries
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query)

  const [page, setPage] = useState(1)
  const [items, setItems] = useState<Anime[]>([])

  // all anime data
  const { data: animeData, isLoading, isError } = useGetAnimeQuery(page)

  useEffect(() => {
    if (!animeData)
      return

    setItems(p => [...p, ...animeData.data])
  }, [animeData])

  // update page
  function handlePageChange(): void {
    setPage(p => p + 1)
  }

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

      <PageWrapper className="pt-6" heading="Anime Collection">
        <Suspense>
          <MediaGrid className="grid-tmp">
            {items.map(item => (
              <MediaCard key={item.mal_id} item={item}>
                <LikeButton className="justify-end flex-1 place-items-end mt-4" itemId={item.mal_id} />
              </MediaCard>
            ))}
          </MediaGrid>
          {isError && <Message message="There was an error loading anime!" className="flex-1 items-center text-destructive" />}
          {isLoading && <LoadingSkeleton />}
          <TailElement breakCheck={!animeData || !animeData.pagination.has_next_page} callback={handlePageChange} />
        </Suspense>
      </PageWrapper>
    </>
  )
}
