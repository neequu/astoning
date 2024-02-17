import { LoadingSkeleton } from '@/components/loadingState/LoadingSkeleton'
import { Message } from '@/components/misc/Message'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { useAppSelector } from '@/hooks/redux-hooks'
import { useDeleteAllHistoryMutation, useDeleteHistoryByIdMutation, useGetHistoryQuery } from '@/redux/apis/db-api'

export default function History() {
  const user = useAppSelector(state => state.auth.user)

  const { data: historyData, isSuccess, isLoading, isError } = useGetHistoryQuery(user?.id)

  const [deleteAllHistory] = useDeleteAllHistoryMutation()
  const [deleteHistoryById] = useDeleteHistoryByIdMutation()

  return (
    <PageWrapper>
      {isError && <Message message="There was an error!" className="flex-1 items-center text-destructive" />}
      {/* if loading show skeleton → */}
      {isLoading
        ? <LoadingSkeleton />
      //  if success & nothing found show message →
        : !historyData?.length
            ? <Message message="You have no history" className="flex-1 items-center" />
          // show results
            : (
              <div>
                {historyData.map(h => (
                  <div key={h.id}>
                    <p>
                      {h.query}
                    </p>
                    <button className="text-pink-600" onClick={() => deleteHistoryById({ itemId: h.id, userId: user?.id })}>
                      delte history for
                      {h.id}
                    </button>
                  </div>
                ))}
                <button className="text-pink-600" onClick={() => deleteAllHistory({ userId: user?.id })}>delete all</button>
              </div>
              )}

    </PageWrapper>
  )
}
