import { lazily } from 'react-lazily'
import { MediaGrid } from '@/components/media/MediaGrid'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { useGetFavoritesQuery } from '@/store/api/db-api'
import { AnimationWrapper } from '@/components/wrappers/AnimationWrapper'
import { CardSkeleton } from '@/components/loading-state/CardSkeleton'
import { useUser } from '@/hooks/use-user'

const { Message } = lazily(() => import('@/components/misc/Message'))
const { CardWrapper } = lazily(() => import('@/components/wrappers/CardWrapper'))
const { LikeComponent } = lazily(() => import('@/components/like/LikeComponent'))

export function Favorites() {
  const { userId } = useUser()

  const { data: favoritesData, isError, isLoading } = useGetFavoritesQuery(userId, {
    skip: !userId,
  })
  const hasResults = favoritesData && favoritesData.length > 0
  return (
    <PageWrapper heading="Favorites">
      <MediaGrid>
        {isLoading && (
          <AnimationWrapper className="grid-tmp">
            <CardSkeleton amount={5} />
          </AnimationWrapper>
        )}
        <AnimationWrapper className="grid-tmp">
          {favoritesData?.map(item => (
            <CardWrapper key={item.itemId} itemId={item.itemId}>
              <LikeComponent className="justify-end flex-1 place-items-end mt-4" itemId={item.itemId} />
            </CardWrapper>
          ),
          )}
        </AnimationWrapper>
      </MediaGrid>
      {isError && <Message message="There was an error loading favorites!" className="flex-1 items-center text-destructive" />}
      {!hasResults && !isLoading && <Message message="You have no favorites" className="flex-1 items-center" />}
    </PageWrapper>
  )
}
