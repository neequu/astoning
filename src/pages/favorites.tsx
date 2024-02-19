import { Suspense } from 'react'
import { MediaGrid } from '@/components/media/MediaGrid'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { useAppSelector } from '@/hooks/redux-hooks'
import { CardWrapper } from '@/components/wrappers/CardWrapper'
import { useGetFavoritesQuery } from '@/redux/api/db-api'
import { LikeButton } from '@/components/LikeButton'
import { Message } from '@/components/misc/Message'
import { AnimationWrapper } from '@/components/wrappers/AnimationWrapper'
import { LoadingSkeleton } from '@/components/loadingState/LoadingSkeleton'
import { selectUser } from '@/redux/slices/selectors'

export default function Favorites() {
  const user = useAppSelector(selectUser)

  const { data: favoritesData, isSuccess, isLoading, isError } = useGetFavoritesQuery(user?.id, {
    skip: !user?.id,
  })

  const successNoItems = isSuccess && favoritesData?.length === 0

  return (
    <PageWrapper heading="Favorites">
      <Suspense>
        <MediaGrid>
          <AnimationWrapper className="grid-tmp">
            {favoritesData?.map(itemId => (
              <CardWrapper key={itemId.item_id} itemId={itemId.item_id}>
                <LikeButton className="justify-end flex-1 place-items-end mt-4" userId={user?.id} itemId={itemId.item_id} />
              </CardWrapper>
            ),
            )}
          </AnimationWrapper>
        </MediaGrid>
        {isError && <Message message="There was an error loading favorites!" className="flex-1 items-center text-destructive" />}
        {isLoading && <LoadingSkeleton />}
        {successNoItems && <Message message="You have no favorites" className="flex-1 items-center" />}
      </Suspense>
    </PageWrapper>
  )
}
