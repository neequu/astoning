import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { generateTimestampTz } from '@/lib/utils'

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
    visitSet(state, action: PayloadAction<number>) {
      const cardId = action.payload
      const hasCard = state.cards.find(c => c.id === cardId)
      if (cardId && !hasCard)
        state.cards.push({ id: cardId, timestamptz: generateTimestampTz() })
    },
    filterSet(state) {
      const newFilter = state.filter === 'asc' ? 'desc' : 'asc'
      state.filter = newFilter
    },
  },
})

export const { visitSet, filterSet } = visitSlice.actions

export default visitSlice.reducer
