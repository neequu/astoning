import { Suspense } from 'react'
import { lazily } from 'react-lazily'
import { MAX_SUGGESTIONS } from '@/lib/constants'
import { useGetAnimeSearchQuery } from '@/redux/api/anime-api'
import SearchSuggestionCard from '@/components/search/SearchSuggestionCard'
import { AnimationWrapper } from '@/components/wrappers/AnimationWrapper'
import { cn } from '@/lib/utils'

const { Message } = lazily(() => import('@/components/misc/Message'))

interface Props {
  debouncedQuery: string
  isInputFocused?: boolean
}

export function SearchSuggestions({ debouncedQuery, isInputFocused }: Props) {
  const { data: searchData, isSuccess, isError, isFetching } = useGetAnimeSearchQuery({ q: debouncedQuery, limit: MAX_SUGGESTIONS }, {
    skip: !debouncedQuery,
  })
  // don't render anything initially
  if (!searchData)
    return null

  const noResults = isSuccess && searchData.pagination.items.count === 0

  return (
    <div className={cn('flex flex-col bg-menu text-menu-foreground rounded-md shadow-lg border mt-3 overflow-hidden absolute top-full -left-20 -right-20 z-50 opacity-0 transition-all duration-500', isInputFocused && 'opacity-100 left-0 right-0')}>
      <Suspense>
        <AnimationWrapper>
          {searchData.data.map(item => (
            <SearchSuggestionCard key={item.mal_id} item={item} />
          ))}
        </AnimationWrapper>
        {isError && <Message message="There was an error with your search!" className="flex-1 text-xl items-center text-destructive py-7" />}
        {noResults && !isFetching && <Message message={`No results for ${debouncedQuery} found!`} className="flex-1 items-center py-7 text-md" />}
      </Suspense>
    </div>
  )
}
