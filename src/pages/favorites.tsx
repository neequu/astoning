import { MediaGrid } from '@/components/media/MediaGrid'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { useAppSelector } from '@/hooks/redux-hooks'
import { CardWrapper } from '@/components/wrappers/CardWrapper'
import { useGetFavoritesQuery } from '@/redux/apis/db-api'
import { LikeButton } from '@/components/LikeButton'
import { Message } from '@/components/search/Message'

export default function Favorites() {
  const user = useAppSelector(state => state.auth.user)

  const { data: favoritesData, isSuccess, isLoading } = useGetFavoritesQuery()

  return (
    <PageWrapper>
      {isLoading && 'loading'}
      {isSuccess && favoritesData.length === 0 && <Message message="You have no favorites" className="flex-1 items-center" />}
      {(isSuccess && favoritesData.length > 0) && (
        <MediaGrid>
          { favoritesData.map(itemId => (
            <CardWrapper key={itemId.item_id} itemId={itemId.item_id}>
              <LikeButton className="justify-end flex-1 place-items-end mt-4" isAuth={!!user} id={itemId.item_id} />
            </CardWrapper>
          ),
          )}
        </MediaGrid>
      )}

    </PageWrapper>
  )
}
