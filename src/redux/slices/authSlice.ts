import { createSlice } from '@reduxjs/toolkit'

interface AuthSlice {
  isAuth: boolean
}

const initialState: AuthSlice = {
  isAuth: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorize: (state) => {
      state.isAuth = true
    },
    disauthorize: (state) => {
      state.isAuth = false
    },
  },
})

export const { authorize, disauthorize } = authSlice.actions

export default authSlice.reducer
