// APPLICATION HOOKS

import { useCookies } from 'react-cookie'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from '../store'
import { AppCookies, appCookiesNames } from '../types'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppCookies = () => {
  const [cookies, setCookie, removeCookie] = useCookies(appCookiesNames)

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
