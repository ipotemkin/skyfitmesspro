import { SerializedError } from '@reduxjs/toolkit';
import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
  } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { API_AUTH_URL, API_URL, EXP_MESSAGE } from '../constants';
import { ROUTES } from '../routes';
import { deleteCurrentUser } from '../slices/currentUserSlice';
import { setMessage } from '../slices/messageSlice';
import { RootState } from '../store';
import { RefreshTokenResponse } from '../types';
import { authApi } from './auth.api';
//   import { logout } from '../features/userSlice';
  
// API_URL для обычных запросов
//   
  
// Create a new mutex
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL + '/users'
})

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  console.log('customFetchBase: result -->', result)
  console.log('customFetchBase: response status --> ', result.meta?.response?.status)
  console.log('args -->', args)

  const matchResult = (args as string).match(/(^.*auth=)(.*)$/)
  let newArgs = ''
  if (matchResult) {
    newArgs = matchResult[1]
    let argsToken = matchResult[2]
    console.log('newArgs -->', newArgs)
    console.log('argsToken -->', argsToken)
  }

  alert(`customFetchBase: response status --> ${result.meta?.response?.status}`)

  if ([400, 401, 403].includes(result.error?.status as number)) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const storeState = api.getState() as RootState
        const refreshToken = storeState.currentUser.refreshToken
        console.log('refreshToken -->', refreshToken)
        console.log(refreshToken)
        console.log('fetching new credentials')
        
        alert('before if (refreshToken)')
        if (refreshToken) {
          alert('before refreshing token')
          const res: {
            data: RefreshTokenResponse } | { error: FetchBaseQueryError | SerializedError
          } = await api.dispatch(authApi.endpoints.refreshToken.initiate(refreshToken))
          console.log('api.dispatch -->', res)
          alert('after refreshing token')

          if ('data' in res && res.data.id_token) {
            alert('access_token in place')
            args = newArgs + res.data.id_token

            // const newToken = (res as RefreshTokenResponse)._token

            // Retry the initial query
            console.log('baseQuery args -->', args)
            result = await baseQuery(args, api, extraOptions)

          } else {
            document.cookie = ''
            api.dispatch(deleteCurrentUser())
            api.dispatch(setMessage(EXP_MESSAGE))
            window.location.href = ROUTES.login
          }
        } else {
          document.cookie = ''
          api.dispatch(deleteCurrentUser())
          api.dispatch(setMessage(EXP_MESSAGE))
          window.location.href = ROUTES.login
        }
        
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

export default customFetchBase
    