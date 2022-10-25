import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import { authApi } from './api/auth.api'
import { coursesApi } from './api/courses.api'
import { usersApi } from './api/users.api'
import currentUserReducer from './slices/currentUserSlice'
import messageReducer from './slices/messageSlice'

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    message: messageReducer,
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
