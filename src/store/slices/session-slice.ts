import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface SessionState {
  email: string | null
  timestamptz: string | null
}

const initialState: SessionState = {
  email: null,
  timestamptz: null,
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<SessionState>) => {
      state.email = action.payload.email
      state.timestamptz = action.payload.timestamptz
    },
  },
})

export const { setSession } = sessionSlice.actions
export default sessionSlice.reducer
