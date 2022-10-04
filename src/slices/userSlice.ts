import { createSlice } from '@reduxjs/toolkit'
import { User } from '../types'
import { RootState } from '../store'

const initialState: User = {
  id: -1,
  username: '',
  password: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
