import { SerializedError } from '@reduxjs/toolkit'
import {
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query'

import { RefreshTokenResponse } from '../types'
import { authApi } from './auth.api'

export const parseFirebaseString = (text: string) => text.replace(/_n/g, '\n')

const getQueryPath = (url: string) => {
  const matchResult = url.match(/(^.*auth=)(.*)$/)
  return matchResult ? matchResult[1] : ''
} 

export const updateTokenInArgs = (args: string | FetchArgs, newToken: string) => {
  if (typeof args === 'string') {
    return getQueryPath(args) + newToken
  } else {
    args.url = getQueryPath(args.url) + newToken
    return args
  }
}

export const AddTokenToUrl = (args: string | FetchArgs, token: string) => {
  const queryString = '?auth=' + token
  if (typeof args === 'string') {
    return args + queryString
  } else {
    args.url = args.url + queryString
    return args
  }
}

export const runRefreshToken = async (api: any, refreshToken: string) => {
  const res: {
    data: RefreshTokenResponse } | { error: FetchBaseQueryError | SerializedError
  } = await api.dispatch(authApi.endpoints.refreshToken.initiate(refreshToken))
  return res
}
