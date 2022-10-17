import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import userReducer from './slices/userSlice'
import courseReducer from './slices/courseSlice'
import { coursesApi } from './api/courses.api'
import { usersApi } from './api/users.api'

export const store = configureStore({
  reducer: {
    user: userReducer,
    activeCourse: courseReducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: getDefaultMiddleware => (
    getDefaultMiddleware()
    .concat(coursesApi.middleware)
    .concat(usersApi.middleware)
  )
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
