import { MediaGrid } from '@/components/media/MediaGrid'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { useAppSelector } from '@/hooks/redux-hooks'
import { CardWrapper } from '@/components/wrappers/CardWrapper'
import { useGetFavoritesQuery } from '@/redux/apis/db-api'
import { LikeButton } from '@/components/LikeButton'
import { Message } from '@/components/search/Message'

export default function Favorites() {
  const user = useAppSelector(state => state.auth.user)

  const { data: favoritesData, isSuccess, isLoading, refetch } = useGetFavoritesQuery()

  function handleRefetch() {
    refetch()
  }

  return (
    <PageWrapper>
      {isLoading && 'loading'}
      {isSuccess && favoritesData.length === 0 && <Message message="You have no favorites" className="flex-1 items-center" />}
      {(isSuccess && favoritesData.length > 0) && (
        <MediaGrid>
          {/* @ts-expect-error database types currently not working todo: fix */}
          { favoritesData.map(itemId => (
            <CardWrapper key={itemId.item_id} isAuth={!!user} itemId={itemId.item_id} customMethod={handleRefetch}>
              <LikeButton className="justify-end flex-1 place-items-end mt-4" isAuth={!!user} id={itemId.item_id} customMethod={handleRefetch} />
            </CardWrapper>
          ),
          )}
        </MediaGrid>
      )}

    </PageWrapper>
  )
}
