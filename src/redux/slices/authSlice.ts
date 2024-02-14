import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AuthSlice {
  user: boolean
}

const initialState: AuthSlice = {
  user: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<boolean>) {
      state.user = action.payload
    },

  },
})

export const { setUser } = authSlice.actions

export default authSlice.reducer
