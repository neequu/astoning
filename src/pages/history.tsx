import { Suspense, useEffect, useState } from 'react'
import { FixedSizeList as HistoryList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import { Message } from '@/components/misc/Message'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { useAppSelector } from '@/hooks/redux-hooks'
import { useDeleteAllHistoryMutation, useDeleteHistoryByIdMutation, useGetHistoryQuery } from '@/redux/api/db-api'
import { HistoryCard } from '@/components/history/HistoryCard'
import { HistoryWrapper } from '@/components/history/HistoryWrapper'
import { Button } from '@/components/ui/button'
import { selectUser } from '@/redux/slices/selectors'
import { AnimationWrapper } from '@/components/wrappers/AnimationWrapper'

export default function History() {
  const user = useAppSelector(selectUser)

  const { data: historyData, isError, isSuccess } = useGetHistoryQuery(user?.id, { skip: !user?.id })
  const hasResults = isSuccess && historyData && historyData.length > 0

  const [deleteAllHistory] = useDeleteAllHistoryMutation()
  const [deleteHistoryById] = useDeleteHistoryByIdMutation()

  function handleDeleteSingle(itemId: number): void {
    deleteHistoryById({ itemId, userId: user?.id })
  }
  function handleDeleteAll(): void {
    deleteAllHistory({ userId: user?.id })
  }

  const [items, setItems] = useState(historyData || [])

  useEffect(() => {
    if (!historyData)
      return

    setItems(historyData)
  }, [historyData])

  // can't move from here be
  function HistoryItem({ index, style }: { index: number, style: React.HTMLAttributes<HTMLDivElement>['style'] }) {
    if (!items)
      return
    const item = items[index]
    return (
      <div style={style}>
        <HistoryCard item={item} key={item.id} onDelete={handleDeleteSingle} />
      </div>
    )
  }

  return (
    <PageWrapper heading="History">
      <Suspense>
        {hasResults && (
          <>
            <HistoryWrapper>
              <AutoSizer>
                {({ height, width }) => (
                  <AnimationWrapper>
                    <HistoryList
                      height={height}
                      width={width}
                      itemCount={items.length}
                      itemSize={73}
                    >
                      {HistoryItem}
                    </HistoryList>
                  </AnimationWrapper>
                )}
              </AutoSizer>
            </HistoryWrapper>
            <Button variant="destructive" className="mt-auto font-bold px-20 sm:self-center" onClick={handleDeleteAll}>Delete all history</Button>
          </>
        )}
        {isError && <Message message="There was an error loading history!" className="flex-1 items-center text-destructive" />}
        {!hasResults && <Message message="You have no favorites" className="flex-1 items-center" />}
      </Suspense>
    </PageWrapper>
  )
}
