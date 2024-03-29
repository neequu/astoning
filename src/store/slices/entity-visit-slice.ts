import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Visit {
  id: number
  timestamptz: string
}

export const entityVisitAdapter = createEntityAdapter({
  selectId: (visit: Visit) => visit.id,
  sortComparer: (a, b) =>
    a.timestamptz > b.timestamptz ? 1 : -1,
})

const initialState = entityVisitAdapter.getInitialState()

const entityVisitSlice = createSlice({
  name: 'visits',
  initialState,
  reducers: {
    visitAdded(state, action) {
      entityVisitAdapter.addOne(state, action.payload)
    },
    visitRemoved(state, action: PayloadAction<number>) {
      entityVisitAdapter.removeOne(state, action.payload)
    },
    visitsRemoved(state) {
      entityVisitAdapter.removeAll(state)
    },
  },
})

export const { visitAdded, visitRemoved, visitsRemoved } = entityVisitSlice.actions

export default entityVisitSlice.reducer
