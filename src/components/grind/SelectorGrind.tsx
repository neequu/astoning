import { ArrowDown01Icon, ArrowUp01Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, showNotificationError, transformDateFromString } from '@/lib/utils'
import { AnimationWrapper } from '@/components/wrappers/AnimationWrapper'
import { Message } from '@/components/misc/Message'
import { setFilter } from '@/store/slices/visit-slice'
import { getFilter, getVisitedCards } from '@/store/utils/selectors'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'

export default function SelectorGrind() {
  const dispatch = useAppDispatch()
  const visitedCards = useAppSelector(getVisitedCards)
  const filter = useAppSelector(getFilter)

  function handleFilter(): void {
    if (visitedCards.length <= 1)
      return showNotificationError('Not enough items to filter')
    dispatch(setFilter())
  }
  return (
    <div>
      {visitedCards.length === 0
        ? <Message message="You haven't visited any card yet" />
        : (
          <div>
            <h2>from create selector</h2>
            <AnimationWrapper className="border border-muted sm:w-80">
              {visitedCards.map(card => (
                <div key={card.id} className="border-b border-muted py-10">
                  {card.id}
                      &nbsp;at&nbsp;
                  {transformDateFromString(card.timestamptz)}
                </div>
              ))}
            </AnimationWrapper>
            <Button title="filter by date" className="w-full" onClick={handleFilter} variant="outline" size="icon">
              <ArrowDown01Icon className={cn('h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all', filter === 'desc' && '-rotate-90 scale-0')} />
              <ArrowUp01Icon className={cn('absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all', filter === 'desc' && 'rotate-0 scale-100')} />
            </Button>
          </div>
          )}
    </div>
  )
}
