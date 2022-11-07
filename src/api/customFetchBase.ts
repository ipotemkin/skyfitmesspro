import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

import { API_URL } from '../constants'
import { httpOnlyProxy } from '../env'
import { updateCurrentUser } from '../slices/currentUserSlice'
import { hideSpinnerForce, showFetchSpinner, showSpinnerForce } from '../slices/spinnerSlice'
import { RootState } from '../store'
import { checkJWTExpTime } from '../utils'
import { addTokenToUrl, runRefreshToken, updateTokenInArgs } from './utils'

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
  api.dispatch(showFetchSpinner())

  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  
  const { idToken } = (api.getState() as RootState).currentUser
  args = addTokenToUrl(args, idToken || '')
  
  let result: any = true
  if (idToken && checkJWTExpTime(idToken))
    result = await baseQuery(args, api, extraOptions)
  else result = false

  if (!result || [400, 401, 403].includes(result.error?.status as number)) {
    api.dispatch(showSpinnerForce())
    let success = false

    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      let submitToken: string = ''
        
        try {
          if (!httpOnlyProxy) {
            const { refreshToken } = (api.getState() as RootState).currentUser
            if (!refreshToken) throw new Error('No refresh token')  
            else submitToken = refreshToken
          }
          const res = await runRefreshToken(api, submitToken)
          
          if (res && 'data' in res && res.data.id_token) {            
            args = updateTokenInArgs(args, res.data.id_token)
          
            // Retry the initial query
            try {
              result = await baseQuery(args, api, extraOptions)
              success = true
            } catch {
              success = false
            }
          } 
      } finally {
        if (!success) api.dispatch(updateCurrentUser({ needRelogin: true }))
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      
      const { idToken } = (api.getState() as RootState).currentUser
      if (idToken) args = updateTokenInArgs(args, idToken)
      
      result = await baseQuery(args, api, extraOptions)
    }
  }
  // делаем задержку в полсекунды, чтобы спиннер не моргал,
  // если несколько запросов идут друг за другом
  setTimeout(() => api.dispatch(hideSpinnerForce()), 500)
  return result
}

export default customFetchBase
