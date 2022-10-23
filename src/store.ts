import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import userReducer from './slices/userSlice'
import currentUserReducer from './slices/currentUserSlice'
import courseReducer from './slices/courseSlice'
import { coursesApi } from './api/courses.api'
import { usersApi } from './api/users.api'
import { authApi } from './api/auth.api'

export const store = configureStore({
  reducer: {
    user: userReducer,
    currentUser: currentUserReducer,
    activeCourse: courseReducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware => (
    getDefaultMiddleware()
    .concat(coursesApi.middleware)
    .concat(usersApi.middleware)
    .concat(authApi.middleware)
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
