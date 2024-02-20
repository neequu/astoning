import { Suspense, useCallback } from 'react'
import { FixedSizeList as HistoryList } from 'react-window'
import Autosizer from 'react-virtualized-auto-sizer'
import { lazily } from 'react-lazily'

import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { useAppSelector } from '@/hooks/redux-hooks'
import { useDeleteAllHistoryMutation, useDeleteHistoryByIdMutation, useGetHistoryQuery } from '@/redux/api/db-api'
import { HistoryWrapper } from '@/components/history/HistoryWrapper'
import { selectUser } from '@/redux/rtk/selectors'

const { Message } = lazily(() => import('@/components/misc/Message'))
const { HistoryCard } = lazily(() => import('@/components/history/HistoryCard'))
const { Button } = lazily(() => import('@/components/ui/button'))

export function History() {
  const user = useAppSelector(selectUser)
  const { data: historyData, isError, isSuccess, isLoading } = useGetHistoryQuery(user?.id, { skip: !user?.id })
  const hasResults = isSuccess && historyData && historyData.length > 0
  // rtk mutations
  const [deleteAllHistory] = useDeleteAllHistoryMutation()
  const [deleteHistoryById] = useDeleteHistoryByIdMutation()
  // rtk mutation handlers
  const handleDeleteAll = (): void => {
    deleteAllHistory({ userId: user?.id })
  }
  const handleDeleteSingle = useCallback((itemId: number): void => {
    deleteHistoryById({ itemId, userId: user?.id })
  }, [deleteHistoryById, user?.id])

  // row for virtualized list; usecallback to prevent retriggering delete button
  const renderHistoryRow = useCallback(({ index, style }: { index: number, style: React.HTMLAttributes<HTMLDivElement>['style'] }) => {
    if (!historyData)
      return null

    return (
      <div style={style}>
        <Suspense fallback={<div className="h-[73] animate-pulse bg-neutral-800" />}>
          <HistoryCard item={historyData[index]} onDelete={handleDeleteSingle} />
        </Suspense>
      </div>
    )
  }, [historyData, handleDeleteSingle])

  return (
    <PageWrapper heading="Virtualized History">
      <Suspense>
        {hasResults && (
          <>
            <HistoryWrapper>
              <Autosizer>
                {({ height, width }) => (
                  <HistoryList
                    itemSize={73}
                    height={height}
                    width={width}
                    itemCount={historyData.length}
                  >
                    {renderHistoryRow}
                  </HistoryList>
                )}
              </Autosizer>
            </HistoryWrapper>
            <Button variant="destructive" className="mt-auto font-bold px-20 sm:self-center" onClick={handleDeleteAll}>Delete all history</Button>
          </>
        )}
        {isError && <Message message="There was an error loading history!" className="flex-1 items-center text-destructive" />}
        {!hasResults && !isLoading && <Message message="You have no history" className="flex-1 items-center" />}
      </Suspense>
    </PageWrapper>
  )
}
