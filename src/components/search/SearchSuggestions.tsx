import { Suspense } from 'react'
import { Message } from '@/components/misc/Message'
import { MAX_SUGGESTIONS } from '@/lib/constants'
import { useGetAnimeSearchQuery } from '@/redux/apis/anime-api'
import SearchSuggestionCard from '@/components/search/SearchSuggestionCard'
import { AnimationWrapper } from '@/components/wrappers/AnimationWrapper'
import { cn } from '@/lib/utils'

interface Props {
  debouncedQuery: string
  isInputFocused?: boolean
}

export function SearchSuggestions({ debouncedQuery, isInputFocused }: Props) {
  const { data: searchData, isSuccess, isError } = useGetAnimeSearchQuery({ q: debouncedQuery, limit: MAX_SUGGESTIONS }, {
    skip: !debouncedQuery,
  })

  if (!debouncedQuery || searchData === undefined)
    return null

  const successNoItems = isSuccess && searchData.pagination.items.count === 0
  return (
    <div className={cn('flex flex-col bg-menu text-menu-foreground rounded-md shadow-lg border mt-3 overflow-hidden absolute top-full -left-20 -right-20 z-50 opacity-0 transition-all duration-500', isInputFocused && 'opacity-100 left-0 right-0')}>
      {/* allow this to load but show form ↑ */}
      {isError && <Message message="There was an error!" className="flex-1 text-xl items-center text-destructive" />}
      {/* if success & nothing found show message → */}
      {successNoItems
        ? <Message message="No results were found!" className="flex-1 text-md items-center" />
      // show results
        : (
          <Suspense>
            <AnimationWrapper>
              {searchData.data.map(item => (
                <SearchSuggestionCard key={item.mal_id} item={item} />
              ),
              )}
            </AnimationWrapper>
          </Suspense>
          )}
    </div>
  )
}
