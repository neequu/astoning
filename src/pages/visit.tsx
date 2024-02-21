import { ArrowDownAZIcon, ArrowUpAZIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageWrapper } from '@/components/wrappers/PageWrapper'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { setFilter } from '@/store/slices/visit-slice'
import { getFilter, getVisitedCards } from '@/store/utils/selectors'

import { cn, transformDateFromString } from '@/lib/utils'
import { AnimationWrapper } from '@/components/wrappers/AnimationWrapper'
import { Message } from '@/components/misc/Message'

export function Visit() {
  const dispatch = useAppDispatch()
  const visitedCards = useAppSelector(getVisitedCards)
  const filter = useAppSelector(getFilter)

  return (
    <PageWrapper heading="Your visits" className="place-contnet-center">
      <div className="flex flex-1 flex-col gap-5 my-auto place-content-center items-center text-center text-2xl">
        <div>
          {visitedCards.length === 0
            ? <Message message="You haven't visited any card yet" />
            : (
              <>
                <AnimationWrapper className="border border-muted sm:w-80">
                  {visitedCards.map(card => (
                    <div key={card.id} className="border-b border-muted py-10">
                      {card.id}
                      &nbsp;at&nbsp;
                      {transformDateFromString(card.timestamptz)}
                    </div>
                  ))}
                </AnimationWrapper>
                <Button title="filter by date" className="w-full" onClick={() => dispatch(setFilter(filter === 'asc' ? 'desc' : 'asc'))} variant="outline" size="icon">
                  <ArrowDownAZIcon className={cn('h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all', filter === 'desc' && '-rotate-90 scale-0')} />
                  <ArrowUpAZIcon className={cn('absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all', filter === 'desc' && 'rotate-0 scale-100')} />
                </Button>
              </>
              )}
        </div>
      </div>
    </PageWrapper>
  )
}
