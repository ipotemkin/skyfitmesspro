import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CourseData } from '../types'
import { RootState } from '../store'

export const initialState: CourseData = {
}

export const courseSlice = createSlice({
  name: 'activeCourse',
  initialState,
  reducers: {
    setActiveCourse: (state, action: PayloadAction<CourseData>) => state = {...action.payload},
    deleteActiveCourse: (state) => state = initialState,
  },
  extraReducers: (builder) => {},
})

export const { setActiveCourse, deleteActiveCourse } = courseSlice.actions

export const selectUser = (state: RootState) => state.user

export default courseSlice.reducer
