import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'
import { FirebaseUser } from '../types'

export const initialState: FirebaseUser = {
  email: null,
  displayName: null,
  uid: null,
  isLoading: true
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<FirebaseUser>) => state = {...action.payload},
    deleteUser: (state) => state = initialState,
  },
  extraReducers: (builder) => {},
})

export const { setUser, deleteUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
