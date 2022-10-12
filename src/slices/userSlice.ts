import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FirebaseUser } from '../types'
import { RootState } from '../store'

export const initialState: FirebaseUser = {
  email: null,
  displayName: null,
  uid: null,
  isLoading: false

  // accessToken: null,
  // refreshToken: null
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
