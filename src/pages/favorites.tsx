import { MediaGrid } from '@/components/media/MediaGrid'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { useAppSelector } from '@/hooks/redux-hooks'
import { CardWrapper } from '@/components/wrappers/CardWrapper'
import { useGetFavoritesQuery } from '@/redux/apis/db-api'

export default function Favorites() {
  const user = useAppSelector(state => state.auth.user)

  const { data: favoritesData, isSuccess, isLoading, refetch } = useGetFavoritesQuery()

  function handleRefetch() {
    refetch()
  }

  return (
    <PageWrapper>
      {isLoading && 'loading'}

      {(favoritesData && isSuccess) && (
        <MediaGrid>
          {/* @ts-expect-error database types currently not working todo: fix */}
          { favoritesData.map(itemId =>
            <CardWrapper key={itemId.item_id} isAuth={!!user} itemId={itemId.item_id} handleClick={handleRefetch} />,
          )}
        </MediaGrid>
      )}

    </PageWrapper>
  )
}
