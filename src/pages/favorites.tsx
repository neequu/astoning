import { lazily } from 'react-lazily'
import { MediaGrid } from '@/components/media/MediaGrid'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { useAppSelector } from '@/hooks/store-hooks'
import { useGetFavoritesQuery } from '@/store/api/db-api'
import { AnimationWrapper } from '@/components/wrappers/AnimationWrapper'
import { selectUser } from '@/store/utils/selectors'
import { CardSkeleton } from '@/components/loading-state/CardSkeleton'

const { Message } = lazily(() => import('@/components/misc/Message'))
const { CardWrapper } = lazily(() => import('@/components/wrappers/CardWrapper'))
const { LikeButton } = lazily(() => import('@/components/LikeButton'))

export function Favorites() {
  const user = useAppSelector(selectUser)

  const { data: favoritesData, isError, isFetching, isLoading } = useGetFavoritesQuery(user?.id, {
    skip: !user?.id,
  })
  const hasResults = favoritesData && favoritesData.length > 0

  return (
    <PageWrapper heading="Favorites">
      <MediaGrid>
        <AnimationWrapper className="grid-tmp">
          {isLoading
            ? <CardSkeleton amount={5} />
            : (
          // reason: can't render with no fragment
          // eslint-disable-next-line react/jsx-no-useless-fragment
              <>
                {favoritesData?.map(item => (
                  <CardWrapper key={item.itemId} itemId={item.itemId}>
                    <LikeButton className="justify-end flex-1 place-items-end mt-4" itemId={item.itemId} />
                  </CardWrapper>
                ),
                )}
              </>
              )}
        </AnimationWrapper>
      </MediaGrid>
      {isError && <Message message="There was an error loading favorites!" className="flex-1 items-center text-destructive" />}
      {!hasResults && !isFetching && <Message message="You have no favorites" className="flex-1 items-center" />}
    </PageWrapper>
  )
}
