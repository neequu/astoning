import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { generateTimestampTz } from '@/lib/utils'
import { getFilter, getVisits } from '@/store/utils/selectors'

interface VisitSlice {
  cards: { id: number, timestamptz: string }[]
  filter: 'asc' | 'desc'
}

const initialState: VisitSlice = {
  cards: [],
  filter: 'asc',
}

const visitSlice = createSlice({
  name: 'visit',
  initialState,
  reducers: {
    setVisit(state, action: PayloadAction<number>) {
      const cardId = action.payload
      const hasCard = state.cards.find(c => c.id === cardId)
      if (cardId && !hasCard)
        state.cards.push({ id: cardId, timestamptz: generateTimestampTz() })
    },
    setFilter(state, action: PayloadAction<'asc' | 'desc'>) {
      state.filter = action.payload
    },
  },
})

export const { setVisit, setFilter } = visitSlice.actions

export default visitSlice.reducer

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
