import { updateCurrentUser } from '../slices/currentUserSlice'
import { getJWTExpTime, parseJWT } from '../utils'
import { useAppCookies, useAppDispatch } from './appHooks'

// возвращает фукнцию для загрузки credentials из cookies
export const useLoadCredentialsFromCookies = () => {
  const { cookies } = useAppCookies()
  const dispatch = useAppDispatch()

  const loadCredentials = () => {
    if (cookies && cookies.idToken) {
      const { email, user_id: localId } = parseJWT(cookies.idToken)
     
      // TODO remove on release!
      console.log('token expired at', getJWTExpTime(cookies.idToken))

      // Получаем данные о пользователе из idToken
      dispatch(updateCurrentUser({
        ...cookies,
        email,
        localId,
        needRelogin: false
      }))
    } else {
      console.warn('no credentials found in cookies');
    } 
  }
  
  return { loadCredentials }
}
  
// export const useRefreshToken = () => {
//   const user = useAppSelector(selectCurrentUser)
//   const [doRefreshToken] = useRefreshTokenMutation()
//   const { setCookies } = useAppCookies()
//   const goToLoginWithMessage = useGoToLoginWithMessage()
//   const dispatch = useDispatch()

//   const refreshToken = async (refreshTokenArg?: string) => {
//     if (user.updatingTokens) {
//       return
//     }
    
//     if (!refreshTokenArg) {
//       console.error('No refresh token')
//       goToLoginWithMessage(EXP_MESSAGE)
//       return
//     }
    
//     // dispatch(updateCurrentUser({
//     //   updatingTokens: true
//     // }))

//     try {
//       const response = await doRefreshToken(refreshTokenArg).unwrap()

//       console.log('refreshToken: doRefreshToken: response -->', response)

//       const { id_token: idToken, refresh_token: refreshToken } = response
//       setCookies({ idToken })
//       return { idToken, refreshToken }
//     } catch (error) {
//       console.error('Error refreshing token:', error)
//       goToLoginWithMessage(EXP_MESSAGE)
//     }
//   }

//   return { refreshToken }
// }

// для мутаций с проверкой и обновлением токенов
// export const useMutationWithRefreshToken = () => {
//   const user = useAppSelector(selectCurrentUser)
//   const goToLoginWithMessage = useGoToLoginWithMessage()
//   const { refreshToken } = useRefreshToken()

//   const handleMutationWithRefreshToken = async (func: Function) => {    
//     try {
//       // console.log('handleMutationWithRefreshToken: first attempt')
//       await func(user.idToken).unwrap()
//     } catch (error) {
//       console.log('handleMutationWithRefreshToken: first attempt failed')
//       console.error('handleMutationWithRefreshToken: error -->', error)
//       if (!user.refreshToken) {
//         console.error('No refresh roken')
//         goToLoginWithMessage(EXP_MESSAGE)
//       } else {
//         console.log('before refreshing token')
//         const response = await refreshToken(user.refreshToken)
//         if (response) {
//           console.log('token in response -->', response)
//           try {
//             console.log('handleMutationWithRefreshToken: second attempt')
//             const res = await func(response.idToken).unwrap()
//             console.log('handleMutationWithRefreshToken: second attempt succeeded')
//             console.log('res -->', res)
//           } catch (error) {
//             console.error('Refreshing token failed')
//             console.error('handleMutationWithRefreshToken: second attempt failed: error -->', error)
//             goToLoginWithMessage(EXP_MESSAGE)
//           }
//         }
//       }
//     }
//   }
//   return handleMutationWithRefreshToken 
// }

// для query с проверкой и обновлением токенов
// export const useQueryWithRefreshToken = (query: Function, args: Object) => {
//   const user = useAppSelector(selectCurrentUser)
//   const { refreshToken } = useRefreshToken()
//   const goToLoginWithMessage = useGoToLoginWithMessage()

//   const { data, isLoading, error, isError } = query(args)

//   useEffect(() => {
//     if (
//       error && 'status' in error &&
//       [400, 401, 403].includes(error.status)
//       // && !user.updatingTokens
//     ) {
//       if (user.refreshToken) {
//         console.group('useEffect in useQueryWithRefreshToken:')
//         console.log('error status =', error.status)
//         console.log('Refreshing token')
//         console.groupEnd()
//         refreshToken(user.refreshToken)
//       } else {
//         goToLoginWithMessage(EXP_MESSAGE)
//       }
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [error, refreshToken, user.refreshToken,
//     //  user.updatingTokens
//     ])

//   return { data, isLoading, error, isError }
// }
