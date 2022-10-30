import { SerializedError } from '@reduxjs/toolkit'
import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
  } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import { API_URL } from '../constants'
import { updateCurrentUser } from '../slices/currentUserSlice'
import { RootState } from '../store'
import { RefreshTokenResponse } from '../types'
import { authApi } from './auth.api'
    
// Create a new mutex
const mutex = new Mutex()

const getQueryPath = (url: string) => {
  const matchResult = url.match(/(^.*auth=)(.*)$/)
  return matchResult ? matchResult[1] : ''
} 

const updateTokenInArgs = (args: string | FetchArgs, newToken: string) => {
  if (typeof args === 'string') {
    return getQueryPath(args) + newToken
  } else {
    args.url = getQueryPath(args.url) + newToken
    return args
  }
}

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

  // console.log('customFetchBase: result -->', result)
  // console.log('customFetchBase: response status --> ', result.meta?.response?.status)
  // console.log('args -->', args)
  
  // alert(`customFetchBase: response status --> ${result.meta?.response?.status}`)

  if ([400, 401, 403].includes(result.error?.status as number)) {
    let success = false

    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const { refreshToken } = (api.getState() as RootState).currentUser
        // const refreshToken = storeState.currentUser.refreshToken
        console.log('refreshToken -->', refreshToken)
        // console.log(refreshToken)
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

            args = updateTokenInArgs(args, res.data.id_token)
          
            // Retry the initial query
            console.log('baseQuery args -->', args)
            try {
              result = await baseQuery(args, api, extraOptions)
              success = true
            } catch {
              success = false
            }
          } 
        } 
      } finally {
        if (!success) {
          api.dispatch(updateCurrentUser({ needRelogin: true }))
          alert('setting refreshToken to undefined')
        }
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      alert('Before last baseQuery')
      
      const { idToken } = (api.getState() as RootState).currentUser
      if (idToken)
        args = updateTokenInArgs(args, idToken)
      
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

export default customFetchBase
