import { createSlice } from '@reduxjs/toolkit'

interface FeatureState {
  isTelegramShareEnabled: boolean
}

const initialState: FeatureState = {
  isTelegramShareEnabled: false,
}

export const telegramSlice = createSlice({
  name: 'telegram',
  initialState,
  reducers: {
    setTelegramShareEnabled: (state, action) => {
      state.isTelegramShareEnabled = action.payload
    },
  },
})

export const { setTelegramShareEnabled } = telegramSlice.actions

export default telegramSlice.reducer
