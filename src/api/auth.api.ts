import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_AUTH_URL } from '../constants'
import { apiKey, httpOnlyProxy } from '../env'
import { FirebaseUserRESTAPI, RefreshTokenResponse } from '../types'

let baseUrl = API_AUTH_URL
if (httpOnlyProxy) {
  baseUrl = '/proxy/v1/'
}

type Credentials = {
  email: string
  password: string
}

type ChangeEmailArg = {
  idToken: string
  email: string
}

type ChangePasswordArg = {
  idToken: string
  password: string
}

export const authApi = createApi({
  reducerPath: 'auth/api',
  tagTypes: ['Auth'],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    signUp: build.mutation<FirebaseUserRESTAPI, Credentials>({
      query: (arg: Credentials) => ({
        url: `accounts:signUp?key=${apiKey}`,
        method: 'POST',
        body: {
          ...arg,
          returnSecureToken: true
        }
      }),
    }),
    signIn: build.mutation<FirebaseUserRESTAPI, Credentials>({
      query: (arg: Credentials) => ({
        url: `accounts:signInWithPassword?key=${apiKey}`,
        method: 'POST',
        body: {
          ...arg,
          returnSecureToken: true
        }
      }),
    }),
    changeEmail: build.mutation<FirebaseUserRESTAPI, ChangeEmailArg>({
      query: (arg: ChangeEmailArg) => ({
        url: `accounts:update?key=${apiKey}`,
        method: 'POST',
        body: {
          ...arg,
          returnSecureToken: true
        }
      }),
    }),
    changePassword: build.mutation<FirebaseUserRESTAPI, ChangePasswordArg>({
      query: (arg: ChangePasswordArg) => ({
        url: `accounts:update?key=${apiKey}`,
        method: 'POST',
        body: {
          ...arg,
          returnSecureToken: true
        }
      }),
    }),
    refreshToken: build.mutation<RefreshTokenResponse, string>({
      query: (refreshToken: string) => ({
        url: `token?key=${apiKey}`,
        method: 'POST',
        body: {
          refresh_token: refreshToken,
          grant_type: 'refresh_token'
        }
      }),
    }),
    getUserData: build.mutation<FirebaseUserRESTAPI, string>({
      query: (idToken: string) => ({
        url: `accounts:update?key=${apiKey}`,
        method: 'POST',
        body: {
          idToken,
          returnSecureToken: true
        }
      }),
    }),

  }),
})

export const {
  useSignUpMutation,
  useSignInMutation,
  useChangeEmailMutation,
  useChangePasswordMutation,
  useRefreshTokenMutation,
  useGetUserDataMutation
} = authApi
