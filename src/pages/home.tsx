import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { lazily } from 'react-lazily'
import { useAddHistoryMutation } from '@/store/api/db-api'
import { useGetAnimeQuery } from '@/store/api/anime-api'
import { useAppSelector } from '@/hooks/store-hooks'
import { useDebounce } from '@/hooks/use-debounce'
import { MediaGrid } from '@/components/media/MediaGrid'
import { MediaCard } from '@/components/media/MediaCard'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { LikeButton } from '@/components/LikeButton'
import { selectUser } from '@/store/utils/selectors'
import { SearchPanel } from '@/components/search/SearchPanel'
import { Message } from '@/components/misc/Message'
import { transformQuery } from '@/lib/utils'
import { CardSkeleton } from '@/components/loading-state/CardSkeleton'
import type { Anime } from '@/types/api/anime'

const { TailElement } = lazily(() => import('@/components/misc/TailElement'))
const { SearchSuggestions } = lazily(() => import('@/components/search/SearchSuggestions'))

export function Home() {
  const user = useAppSelector(selectUser)
  const [addHistory] = useAddHistoryMutation()
  const navigate = useNavigate()

  // search queries
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query)
  const [page, setPage] = useState(1)

  // all anime data
  const { data: animeData, isLoading, isError } = useGetAnimeQuery(page)
  const [items, setItems] = useState<Anime[]>([])

  useEffect(() => {
    if (!animeData)
      return

    if (page === 1)
      setItems([])

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
        <MediaGrid className="grid-tmp">
          {isLoading && <CardSkeleton amount={20} />}
          {items.map(item => (
            <MediaCard key={item.malId} item={item}>
              <LikeButton className="justify-end flex-1 place-items-end mt-4" itemId={item.malId} />
            </MediaCard>
          ))}
        </MediaGrid>
        {isError && <Message message="There was an error loading anime!" className="flex-1 items-center text-destructive" />}
        <TailElement breakCheck={!animeData || !animeData.pagination.hasNextPage} callback={handlePageChange} />
      </PageWrapper>
    </>
  )
}
