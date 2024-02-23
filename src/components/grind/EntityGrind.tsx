import { TrashIcon, XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks'
import { transformDateFromString } from '@/lib/utils'
import { AnimationWrapper } from '@/components/wrappers/AnimationWrapper'
import { Message } from '@/components/misc/Message'
import { selectAllVisits } from '@/store/utils/selectors'
import { visitRemoved, visitsRemoved } from '@/store/slices/entity-visit-slice'

export default function EntityGrind() {
  const dispatch = useAppDispatch()
  const allEntityVisits = useAppSelector(selectAllVisits)

  function handleEntityRemoved(id: number): void {
    dispatch(visitRemoved(id))
  }
  function handleEntitiesRemoved(): void {
    dispatch(visitsRemoved())
  }

  return (
    <div>
      {allEntityVisits.length === 0
        ? <Message message="You haven't entity visited any card yet" />
        : (
          <div>
            <h2>from entity adapter</h2>
            <AnimationWrapper className="border border-muted sm:w-80">
              {allEntityVisits.map(card => (
                <div key={card.id} className="border-b border-muted py-10 flex items-center gap-1">
                  <Button name="delete one" onClick={() => handleEntityRemoved(card.id)} variant="ghost" className="hover:text-destructive" size="icon">
                    <XIcon className="h-[1.2rem] w-[1.2rem]" />
                  </Button>
                  {card.id}
                      &nbsp;at&nbsp;
                  {transformDateFromString(card.timestamptz)}
                </div>
              ))}
            </AnimationWrapper>
            <Button name="delete all" title="delete all" className="w-full" onClick={handleEntitiesRemoved} variant="outline" size="icon">
              <TrashIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            </Button>
          </div>
          )}
    </div>
  )
}
