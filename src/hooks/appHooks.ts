// APPLICATION HOOKS

import { useCookies } from 'react-cookie'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useGetUserDataMutation, useRefreshTokenMutation } from '../api/auth.api'
import { ROUTES } from '../routes'
import { updateCurrentUser } from '../slices/currentUserSlice'
import type { AppDispatch, RootState } from '../store'
import { AppCookies, appCookiesNames, FirebaseUserRESTAPI } from '../types'

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
  const [getUserData] = useGetUserDataMutation()
  const navigate = useNavigate()

  const loadCredentials = async () => {
    if (cookies && cookies.idToken) {
      console.log('updating currentUser')

      try {
        // Заполняем недостающие поля из cookies
        // Firebase REST API update почему-то возвращает не все данные,
        // хотя по доке должен.
        // Плюс без этого действия router при перезагрузке страницы направляет на /
        // даже, когда пользователь есть
        dispatch(updateCurrentUser({ ...cookies }))  

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
  const [doRefreshToken] = useRefreshTokenMutation()
  const { setCookies } = useAppCookies()

  const refreshToken = async (refreshTokenArg: string) => {
    try {
      const response = await doRefreshToken(refreshTokenArg).unwrap()
      const { id_token: idToken, refresh_token: refreshToken } = response
      setCookies({ idToken, refreshToken })
      console.log('Tokens updated')
      return { idToken, refreshToken }
    } catch (error) {
      console.error('Error refreshing token:', error)
    }  
  }

  return { refreshToken }
}

const useUpdateCurrentUser = () => {
  const dispatch = useDispatch()
  const { setCookies } = useAppCookies()

  const doUpdateCurrentUser = async (updateData: FirebaseUserRESTAPI) => {
    dispatch(updateCurrentUser({ ...updateData }))
    setCookies({ ...updateData as AppCookies })
  }

  return { doUpdateCurrentUser }
}
