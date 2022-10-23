import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiKey } from '../env'
import { FirebaseUserRESTAPI } from '../types'

// const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]'
const baseUrl = 'https://identitytoolkit.googleapis.com/v1'

type SingInArg = {
  email: string
  password: string
}

export const authApi = createApi({
  reducerPath: 'auth/api',
  tagTypes: ['Auth'],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    signIn: build.mutation<FirebaseUserRESTAPI, SingInArg>({
      query: (arg) => ({
        url: `accounts:signInWithPassword?key=${apiKey}`,
        method: 'POST',
        body: {
          ...arg,
          returnSecureToken: true
        }
      }),
      transformResponse: (response: FirebaseUserRESTAPI) => {
        console.log('signIn response -->', response)
        return response;
      }
    }),
  }),
})

export const {
  useSignInMutation
} = authApi

