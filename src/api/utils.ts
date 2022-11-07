import { FetchArgs } from '@reduxjs/toolkit/query'

import { authApi } from './auth.api'

export const parseFirebaseString = (text: string) => text.replace(/_n/g, '\n')

const getQueryPath = (url: string) => {
  const matchResult = url.match(/(^.*auth=)(.*)$/)
  return matchResult ? matchResult[1] : ''
} 

export const updateTokenInArgs = (args: string | FetchArgs, newToken: string) => {
  if (typeof args === 'string') return getQueryPath(args) + newToken
  args.url = getQueryPath(args.url) + newToken
  return args
}

export const addTokenToUrl = (args: string | FetchArgs, token: string) => {
  const queryString = '?auth=' + token
  if (typeof args === 'string') return args + queryString
  args.url = args.url + queryString
  return args
}

export const runRefreshToken = async (api: any, refreshToken: string) => (
  await api.dispatch(authApi.endpoints.refreshToken.initiate(refreshToken))
)
