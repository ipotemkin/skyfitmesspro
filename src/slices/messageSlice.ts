import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'
import { Message } from '../types'

const initialState: Message = {
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    clearMessage: (state) => {
      return state = { ...initialState }
    }
  }
})

export const {
  setMessage,
  clearMessage
} = messageSlice.actions

export const selectMessage = (state: RootState) => state.message?.value

export default messageSlice.reducer
