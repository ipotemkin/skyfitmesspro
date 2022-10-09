import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Unsubscribe } from 'firebase/database'
import { RootState } from '../store'

type Listeners = {
  courses?: Unsubscribe
}

const initialState: Listeners = {
  
}

export const listenersSlice = createSlice({
  name: 'listeners',
  initialState,
  reducers: {
    setCoursesListener: (state, action: PayloadAction<Unsubscribe>) => {
      state.courses = action.payload
    },
  },
  extraReducers: (builder) => {},
})

export const { setCoursesListener } = listenersSlice.actions;

export const selectCoursesListener = (state: RootState) => state.listeners.courses

export default listenersSlice.reducer
