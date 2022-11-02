import { updateCurrentUser } from '../slices/currentUserSlice'
import { parseJWT } from '../utils'
import { useAppDispatch } from './appHooks'
import Cookies from 'js-cookie'
import { accessTokenName } from '../constants'

// возвращает функцию для загрузки credentials из cookies
export const useLoadCredentialsFromCookies = () => {
  const dispatch = useAppDispatch()

  const loadCredentials = () => {
    const idToken = Cookies.get(accessTokenName)
    if (idToken) {
      const { email, user_id: localId } = parseJWT(idToken)

      // Получаем данные о пользователе из idToken
      dispatch(
        updateCurrentUser({
          idToken,
          email,
          localId,
          needRelogin: false,
        })
      )
    }
  }

  return { loadCredentials }
}
