import { useCallback } from 'react'
import { FixedSizeList as HistoryList } from 'react-window'
import Autosizer from 'react-virtualized-auto-sizer'
import { lazily } from 'react-lazily'

import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { HistoryWrapper } from '@/components/history/HistoryWrapper'
import { useGetHistoryQuery } from '@/store/api/db-api'
import { useHistory } from '@/hooks/use-history'
import { Message } from '@/components/misc/Message'
import { useUser } from '@/hooks/use-user'

const { HistoryCard } = lazily(() => import('@/components/history/HistoryCard'))
const { Button } = lazily(() => import('@/components/ui/button'))

export function History() {
  const { userId } = useUser()
  const { data: historyData, isError, isSuccess, isLoading } = useGetHistoryQuery(userId, { skip: !userId })
  const hasResults = isSuccess && historyData && historyData.length > 0
  const { handleAllHistoryDeleted, handleHistoryDeletedById } = useHistory()

  // rtk mutation handlers
  const handleDeletedAll = (): void => {
    handleAllHistoryDeleted(userId)
  }
  const handleDeletedSingle = useCallback((itemId: number): void => {
    handleHistoryDeletedById(userId, itemId)
  }, [handleHistoryDeletedById])

  // row for virtualized list; usecallback to prevent retriggering delete button
  const renderHistoryRow = useCallback(({ index, style }: { index: number, style: React.HTMLAttributes<HTMLDivElement>['style'] }) => {
    if (!historyData)
      return null

    return (
      <div style={style}>
        <HistoryCard item={historyData[index]} onDelete={handleDeletedSingle} />
      </div>
    )
  }, [historyData, handleDeletedAll])

  return (
    <PageWrapper heading="Virtualized History">
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
          <Button aria-label="delete all" name="delete all" variant="destructive" className="mt-auto font-bold px-20 sm:self-center" onClick={handleDeletedAll}>Delete all history</Button>
        </>
      )}
      {isError && <Message message="There was an error loading history!" className="flex-1 items-center text-destructive" />}
      {!hasResults && !isLoading && <Message message="You have no history" className="flex-1 items-center" />}
    </PageWrapper>
  )
}
