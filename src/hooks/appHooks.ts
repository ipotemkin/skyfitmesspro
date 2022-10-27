// APPLICATION HOOKS

import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useGetUserDataMutation, useRefreshTokenMutation } from '../api/auth.api'
import { EXP_MESSAGE } from '../constants'
import { ROUTES } from '../routes'
import { selectCurrentUser, updateCurrentUser } from '../slices/currentUserSlice'
import type { AppDispatch, RootState } from '../store'
import { AppCookies, appCookiesNames } from '../types'
import { checkJWTExpTime, getJWTExpTime, getUserEmailFromJWT, getUserIdFromJWT, parseJWT } from '../utils'
import { useGoToLoginWithMessage } from './shortcuts'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppCookies = () => {
  const [ cookies, setCookie, removeCookie ] = useCookies(appCookiesNames)

  const setCookies = (cookiesArg: AppCookies) => {
    for (let item in cookiesArg) {
      setCookie(item, cookiesArg[item])
    }
  }

  const removeCookies = () => {
    // appCookiesNames.forEach(item => removeCookie(item))
    Object.keys(cookies).forEach((item: string) => removeCookie(item))
  }

  return { cookies, setCookies, removeCookies }
}
  
// возвращает фукнцию для загрузки credentials из cookies
export const useLoadCredentialsFromCookies = () => {
  const { cookies } = useAppCookies()
  const [getUserData] = useGetUserDataMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const loadCredentials = async () => {
    if (cookies && cookies.idToken) {
      console.log('updating currentUser')
      const expTime = getJWTExpTime(cookies.idToken)
      const valid = checkJWTExpTime(cookies.idToken)
      const parsedJWT = parseJWT(cookies.idToken)
      const userEmail = getUserEmailFromJWT(cookies.idToken)
      const userId = getUserIdFromJWT(cookies.idToken)
      console.group('idToken:')
      console.log('decoded idToken -->', parsedJWT)
      console.log('expTime -->', expTime)
      console.log('is valid -->', valid)
      console.log('userEmail -->', userEmail)
      console.groupEnd()

      try {
        // Заполняем недостающие поля из cookies
        // Firebase REST API update почему-то возвращает не все данные,
        // хотя по доке должен.
        // Плюс без этого действия router при перезагрузке страницы направляет на /
        // даже, когда пользователь есть
        dispatch(updateCurrentUser({ ...cookies, email: userEmail, localId: userId }))  

        // Получаем данные о пользователе с помощью idToken
        const res = await getUserData(cookies.idToken).unwrap()
        console.log('user data received -->', res)

      } catch (error) {
        console.error('Error while getting user data -->', error)
        
        // если токен недейстителен, просим пользователя снова войти в систему
        navigate(ROUTES.login)
      }

    } else {
      console.warn('no credentials found in cookies');
    } 
  }
  
  return { loadCredentials }
}

export const useRefreshToken = () => {
  const user = useAppSelector(selectCurrentUser)
  const [doRefreshToken] = useRefreshTokenMutation()
  const { setCookies } = useAppCookies()
  const goToLoginWithMessage = useGoToLoginWithMessage()
  const dispatch = useDispatch()

  const refreshToken = async (refreshTokenArg?: string) => {
    if (user.updatingTokens) {
      return
    }
    
    if (!refreshTokenArg) {
      console.error('No refresh token')
      goToLoginWithMessage(EXP_MESSAGE)
      return
    }
    
    dispatch(updateCurrentUser({
      updatingTokens: true
    }))

    try {
      const response = await doRefreshToken(refreshTokenArg).unwrap()
      const { id_token: idToken, refresh_token: refreshToken } = response
      setCookies({ idToken })
      console.log('Tokens updated')
      return { idToken, refreshToken }
    } catch (error) {
      console.error('Error refreshing token:', error)
      goToLoginWithMessage(EXP_MESSAGE)
    }
  }

  return { refreshToken }
}

export const useMutationWithRefreshToken = () => {
  const user = useAppSelector(selectCurrentUser)
  const goToLoginWithMessage = useGoToLoginWithMessage()
  const { refreshToken } = useRefreshToken()

  const handleMutationWithRefreshToken = async (func: Function) => {    
    try {
      console.log('handleMutationWithRefreshToken: first attempt')
      await func(user.idToken).unwrap()
    } catch (error) {
      console.log('handleMutationWithRefreshToken: first attempt failed')
      console.error('handleMutationWithRefreshToken: error -->', error)
      if (!user.refreshToken) {
        console.log('No refresh roken')
        goToLoginWithMessage(EXP_MESSAGE)
      } else {
        console.log('before refreshing token')
        const response = await refreshToken(user.refreshToken)
        if (response) {
          console.log('token in response -->', response)
          try {
            console.log('handleMutationWithRefreshToken: second attempt')
            const res = await func(response.idToken).unwrap()
            console.log('handleMutationWithRefreshToken: second attempt succeeded')
            console.log('res -->', res)
          } catch (error) {
            console.error('handleMutationWithRefreshToken: second attempt failed: error -->', error)
            goToLoginWithMessage(EXP_MESSAGE)
          }
        }
      }
    }
  }
  return handleMutationWithRefreshToken 
}

export const useQueryWithRefreshToken = (query: Function, args: Object) => {
  const user = useAppSelector(selectCurrentUser)
  const { refreshToken } = useRefreshToken()

  const { data, isLoading, error, isError } = query(args)

  useEffect(() => {
    if (
      error && 'status' in error &&
      (error.status === 400 || error.status === 401 || error.status === 403) &&
      user.refreshToken && !user.updatingTokens
    ) {
      console.group('useEffect in useQueryWithRefreshToken:')
      console.log('error status =', error.status)
      console.log('Refreshing token')
      console.groupEnd()
      refreshToken(user.refreshToken)
    }
  }, [error, refreshToken, user.refreshToken, user.updatingTokens])

  return { data, isLoading, error, isError }
}
