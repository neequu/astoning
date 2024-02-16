import { Suspense } from 'react'
import type { User } from '@supabase/supabase-js'
import { LikeButton } from '@/components/LikeButton'
import { Message } from '@/components/misc/Message'
import { MAX_SUGGESTIONS } from '@/lib/constants'
import { useGetAnimeSearchQuery } from '@/redux/apis/anime-api'
import SearchSuggestionCard from '@/components/search/SearchSuggestionCard'
import { AnimationWrapper } from '@/components/wrappers/AnimationWrapper'

interface Props {
  debouncedQuery: string
  userId: User['id'] | undefined
  isInputFocused?: boolean
}

export function SearchSuggestions({ debouncedQuery, userId, isInputFocused }: Props) {
  const { data: searchData, isSuccess, isError } = useGetAnimeSearchQuery({ q: debouncedQuery, limit: MAX_SUGGESTIONS }, {
    skip: !debouncedQuery,
  })

  if (searchData === undefined || !debouncedQuery)
    return null

  const successNoItems = isSuccess && searchData.pagination.items.count === 0
  return (
    <div className="flex flex-col bg-menu text-menu-foreground rounded-md shadow-lg border mt-2 overflow-hidden absolute top-full left-0 right-0 z-50">
      {isInputFocused && <p>hello</p>}
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
                <SearchSuggestionCard key={item.mal_id} item={item}>
                  <LikeButton userId={userId} itemId={item.mal_id} />
                </SearchSuggestionCard>
              ),
              )}
            </AnimationWrapper>
          </Suspense>
          )}
    </div>
  )
}
