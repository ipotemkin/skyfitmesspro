import { updateCurrentUser } from '../slices/currentUserSlice'
import { parseJWT } from '../utils'
import { useAppCookies, useAppDispatch } from './appHooks'

// возвращает фукнцию для загрузки credentials из cookies
export const useLoadCredentialsFromCookies = () => {
  const { cookies } = useAppCookies()
  const dispatch = useAppDispatch()

  const loadCredentials = () => {
    if (cookies && cookies.idToken) {
      const { email, user_id: localId } = parseJWT(cookies.idToken)
     
      // Получаем данные о пользователе из idToken
      dispatch(updateCurrentUser({
        ...cookies,
        email,
        localId,
        needRelogin: false
      }))
    } 
  }
  
  return { loadCredentials }
}
