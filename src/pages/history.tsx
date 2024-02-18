import { LoadingSkeleton } from '@/components/loadingState/LoadingSkeleton'
import { Message } from '@/components/misc/Message'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { useAppSelector } from '@/hooks/redux-hooks'
import { useDeleteAllHistoryMutation, useDeleteHistoryByIdMutation, useGetHistoryQuery } from '@/redux/api/db-api'
import { AnimationWrapper } from '@/components/wrappers/AnimationWrapper'
import { HistoryCard } from '@/components/history/HistoryCard'
import { HistoryWrapper } from '@/components/history/HistoryWrapper'
import { Button } from '@/components/ui/button'
import { selectUser } from '@/redux/slices/selectors'

export default function History() {
  const user = useAppSelector(selectUser)

  const { data: historyData, isLoading, isError } = useGetHistoryQuery(user?.id, { skip: !user?.id })
  const hasResults = !historyData?.length

  const [deleteAllHistory] = useDeleteAllHistoryMutation()
  const [deleteHistoryById] = useDeleteHistoryByIdMutation()

  function handleDeleteSingle(itemId: number): void {
    deleteHistoryById({ itemId, userId: user?.id })
  }
  function handleDeleteAll(): void {
    deleteAllHistory({ userId: user?.id })
  }

  return (
    <PageWrapper heading="History">
      {isError && <Message message="There was an error!" className="flex-1 items-center text-destructive" />}
      {/* if loading show skeleton → */}
      {isLoading
        ? <LoadingSkeleton />
      //  if success & nothing found show message →
        : hasResults
          ? <Message message="You have no history" className="flex-1 items-center" />
          // show results
          : (
            <HistoryWrapper>
              <AnimationWrapper>
                {historyData.map(hist => (
                  <HistoryCard item={hist} key={hist.id} onDelete={handleDeleteSingle} />
                ))}
              </AnimationWrapper>
              <Button variant="destructive" className="mt-auto font-bold px-20 sm:self-center" onClick={handleDeleteAll}>Delete all history</Button>
            </HistoryWrapper>
            )}

    </PageWrapper>
  )
}
