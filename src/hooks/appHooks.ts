// APPLICATION HOOKS

import { useCookies } from 'react-cookie'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { updateCurrentUser } from '../slices/currentUserSlice'
import type { RootState, AppDispatch } from '../store'
import { AppCookies, appCookiesNames } from '../types'

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
      appCookiesNames.forEach(item => removeCookie(item))
    }
  
    return { cookies, setCookies, removeCookies }
  }
  
// возвращает фукнцию для загрузки credentials из cookies
export const useLoadCredentialsFromCookies = () => {
    const { cookies } = useAppCookies()
    const dispatch = useAppDispatch()
    const { idToken,  refreshToken, localId, email } = cookies
  
    const loadCredentials = () => {
      if (cookies && idToken) {
        console.log('updating currentUser')
        dispatch(updateCurrentUser({
          idToken,
          refreshToken,
          localId,
          email
        }))
      } else {
        console.warn('no credentials found in cookies');
      } 
    }
    
    return { loadCredentials }
  }
  