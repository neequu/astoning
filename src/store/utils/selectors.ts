import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import { entityVisitAdapter } from '@/store/slices/entity-visit-slice'

export const selectUser = (state: RootState) => state.auth.user
// for create selector
export const getVisits = (state: RootState) => state.visit.cards
export const getFilter = (state: RootState) => state.visit.filter

export const getVisitedCards = createSelector(
  [getVisits, getFilter],
  (cards, filter) => {
    const sortedCards = [...cards].sort((a, b) => {
      if (filter === 'asc')
        return a.timestamptz > b.timestamptz ? 1 : -1
      else
        return a.timestamptz < b.timestamptz ? 1 : -1
    })
    return sortedCards
  },
)

export const entityVisitsSelector = entityVisitAdapter.getSelectors<RootState>(
  state => state.entityVisit,
)

export function selectAllVisits(state: RootState) {
  return entityVisitAdapter.getSelectors().selectAll(state.entityVisit)
}
