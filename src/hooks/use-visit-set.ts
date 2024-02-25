import { useEffect } from 'react'
import { useAppDispatch } from '@/hooks/store-hooks'
import { visitSet } from '@/store/slices/visit-slice'
import { visitAdded } from '@/store/slices/entity-visit-slice'
import { generateTimestampTz } from '@/lib/utils'

export function useVisitSet(itemId: number, shouldBreak: boolean): void {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (shouldBreak)
      return
    dispatch(visitSet(itemId))
    dispatch(visitAdded({ id: itemId, timestamptz: generateTimestampTz() }))
  }, [])
}
