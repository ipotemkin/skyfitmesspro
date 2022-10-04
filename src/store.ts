import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import { coursesApi } from './api/courses.api';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
  },
  middleware: getDefaultMiddleware => (
    getDefaultMiddleware()
    .concat(coursesApi.middleware)
  )
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
