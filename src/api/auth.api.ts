import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiKey } from '../env'
import { FirebaseUserRESTAPI } from '../types'

// const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]'
const baseUrl = 'https://identitytoolkit.googleapis.com/v1'

type SingInArg = {
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
    signIn: build.mutation<FirebaseUserRESTAPI, SingInArg>({
      query: (arg: SingInArg) => ({
        url: `accounts:signInWithPassword?key=${apiKey}`,
        method: 'POST',
        body: {
          ...arg,
          returnSecureToken: true
        }
      }),
      // for DEBUG. TODO: remove on release!
      transformResponse: (response: FirebaseUserRESTAPI) => {
        console.log('signIn response -->', response)
        return response;
      }
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
      // for DEBUG. TODO: remove on release!
      transformResponse: (response: FirebaseUserRESTAPI) => {
        console.log('changeEmail response -->', response)
        return response;
      }
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
      // for DEBUG. TODO: remove on release!
      transformResponse: (response: FirebaseUserRESTAPI) => {
        console.log('changePassword response -->', response)
        return response;
      }
    }),
  }),
})

export const {
  useSignInMutation,
  useChangeEmailMutation,
  useChangePasswordMutation
} = authApi

