import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetAnimeQuery } from '@/redux/apis/anime-api'
import { SearchForm } from '@/components/search/SearchForm'
import { transformQuery } from '@/lib/utils'
import { MediaGrid } from '@/components/media/MediaGrid'
import { MediaCard } from '@/components/media/MediaCard'
import { LoadingSkeleton } from '@/components/loadingState/LoadingSkeleton'
import { Message } from '@/components/search/Message'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { useAppSelector } from '@/hooks/redux-hooks'
import { LikeButton } from '@/components/LikeButton'

export default function Home() {
  const user = useAppSelector(state => state.auth.user)
  const navigate = useNavigate()

  const [query, setQuery] = useState('')

  // rtk data fetch
  const { data: animeData, isError, isFetching, isSuccess } = useGetAnimeQuery()
  const successNoItems = isSuccess && animeData.pagination.items.count === 0

  function handleQueryChange(newQuery: string) {
    setQuery(newQuery)
  }

  function handleSubmit() {
    const encodedQuery = transformQuery(query)
    navigate(`/search?q=${encodedQuery}`)
  }

  return (
    <PageWrapper>
      <SearchForm handleSubmit={handleSubmit} changeQuery={handleQueryChange} />

      {isError && <Message message="There was an error :(" className="mt-10 text-destructive" />}
      {isSuccess && animeData.pagination.items.count === 0 && <Message message="No results were found!" className="mt-10" />}

      {/* if fetching show skeleton → */}
      {isFetching
        ? <LoadingSkeleton />
      //  if success & nothing found show message →
        : successNoItems
          ? <Message message="No results were found!" className="flex-1 items-center" />
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
  )
}
