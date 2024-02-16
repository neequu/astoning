import { MediaGrid } from '@/components/media/MediaGrid'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { useAppSelector } from '@/hooks/redux-hooks'
import { CardWrapper } from '@/components/wrappers/CardWrapper'
import { useGetFavoritesQuery } from '@/redux/apis/db-api'
import { LikeButton } from '@/components/LikeButton'
import { Message } from '@/components/misc/Message'
import { AnimationWrapper } from '@/components/wrappers/AnimationWrapper'
import { LoadingSkeleton } from '@/components/loadingState/LoadingSkeleton'

export default function Favorites() {
  const user = useAppSelector(state => state.auth.user)

  const { data: favoritesData, isSuccess, isLoading, isError } = useGetFavoritesQuery(user?.id)

  const successNoItems = isSuccess && favoritesData?.length === 0

  return (
    <PageWrapper>
      {isError && <Message message="There was an error!" className="flex-1 items-center text-destructive" />}
      {/* if loading show skeleton → */}
      {isLoading
        ? <LoadingSkeleton />
      //  if success & nothing found show message →
        : successNoItems
          ? <Message message="You have no favorites" className="flex-1 items-center" />
          // show results
          : (
            <MediaGrid>
              <AnimationWrapper className="grid-tmp">
                { favoritesData?.map(itemId => (
                  <CardWrapper key={itemId.item_id} itemId={itemId.item_id}>
                    <LikeButton className="justify-end flex-1 place-items-end mt-4" userId={user?.id} itemId={itemId.item_id} />
                  </CardWrapper>
                ),
                )}
              </AnimationWrapper>
            </MediaGrid>
            )}

    </PageWrapper>
  )
}
