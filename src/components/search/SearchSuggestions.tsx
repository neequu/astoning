import { Suspense } from 'react'
import { lazily } from 'react-lazily'
import { CardSkeleton } from '../loading-state/CardSkeleton'
import { MAX_SUGGESTIONS } from '@/lib/constants'
import { useGetAnimeSearchQuery } from '@/store/api/anime-api'
import { cn } from '@/lib/utils'

const { Message } = lazily(() => import('@/components/misc/Message'))
const { SearchSuggestionCard } = lazily(() => import('@/components/search/SearchSuggestionCard'))
const { AnimationWrapper } = lazily(() => import('@/components/wrappers/AnimationWrapper'))

interface Props {
  debouncedQuery: string
  isInputFocused?: boolean
}

export function SearchSuggestions({ debouncedQuery, isInputFocused }: Props) {
  const { data: searchData, isSuccess, isError, isFetching, isLoading } = useGetAnimeSearchQuery({ q: debouncedQuery, limit: MAX_SUGGESTIONS }, {
    skip: !debouncedQuery,
  })
  // don't render anything initially
  if (!searchData || !debouncedQuery)
    return null

  const noResults = isSuccess && searchData.pagination.items.count === 0

  return (
    <div className={cn('flex flex-col bg-menu text-menu-foreground rounded-md shadow-lg border mt-3 overflow-hidden absolute top-full -left-20 -right-20 z-50 opacity-0 transition-all duration-500', isInputFocused && 'opacity-100 left-0 right-0')}>
      <Suspense fallback={<CardSkeleton amount={5} className="h-[81px]" />}>
        {isLoading
          ? <CardSkeleton amount={5} className="h-[80px]" />
          : (
            <AnimationWrapper>
              {searchData.data.map(item => (
                <SearchSuggestionCard key={item.malId} item={item} />
              ))}
            </AnimationWrapper>
            )}
        {isError && <Message message="There was an error with your search!" className="flex-1 text-xl items-center text-destructive py-7" />}
        {noResults && !isFetching && <Message message={`No results for ${debouncedQuery} found!`} className="flex-1 items-center py-7 text-md" />}
      </Suspense>
    </div>
  )
}
