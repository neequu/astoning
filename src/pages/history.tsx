import { Link } from 'react-router-dom'
import { LoadingSkeleton } from '@/components/loadingState/LoadingSkeleton'
import { Message } from '@/components/misc/Message'
import { Button } from '@/components/ui/button'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { useAppSelector } from '@/hooks/redux-hooks'
import { useDeleteAllHistoryMutation, useDeleteHistoryByIdMutation, useGetHistoryQuery } from '@/redux/apis/db-api'
import { AnimationWrapper } from '@/components/wrappers/AnimationWrapper'

export default function History() {
  const user = useAppSelector(state => state.auth.user)

  const { data: historyData, isLoading, isError } = useGetHistoryQuery(user?.id)
  const hasResults = !historyData?.length

  const [deleteAllHistory] = useDeleteAllHistoryMutation()
  const [deleteHistoryById] = useDeleteHistoryByIdMutation()

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
            <AnimationWrapper>
              {historyData.map(h => (
                <div key={h.id}>
                  <Button asChild variant="link" className="p-0">
                    <Link to={`/search?q=${h.query}`}>
                      {h.query}
                    </Link>
                  </Button>
                  <button className="text-pink-600" onClick={() => deleteHistoryById({ itemId: h.id, userId: user?.id })}>
                    delte history for
                    {h.id}
                  </button>
                </div>
              ))}
              <button className="text-pink-600" onClick={() => deleteAllHistory({ userId: user?.id })}>delete all</button>
            </AnimationWrapper>
            )}

    </PageWrapper>
  )
}
