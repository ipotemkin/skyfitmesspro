import { ERRORS } from "./constants"
import { AuthErrorType } from "./types"

export const formatString = (text: string, args: string[]) => {
  let res = text
  for (const arg of args) res = res.replace(/{}/, arg)
  return res
}

export const getErrorMessage = (
  error: AuthErrorType, defaultError = 'Неверный логин или пароль'
) => {
  const testValue: string = ERRORS[error.data.error.message]
  return testValue || defaultError
}

export const parseJWT = (token: string) => {
  const base64Url = token.split('.')[1]
  const base64 = decodeURIComponent(atob(base64Url).split('').map((c) => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  return JSON.parse(base64)
}

export const getUserIdFromJWT = (token: string) => {
  return parseJWT(token).user_id
}

export const getUserEmailFromJWT = (token: string) => {
  return parseJWT(token).email
}

export const getJWTExpTime = (token: string) => {
  return new Date(+parseJWT(token).exp*1000)
}

export const checkJWTExpTime = (token: string) => {
  return new Date() < getJWTExpTime(token)
}

export const getQueryErrorStatus = (error: any) => {
  if (error && 'status' in error) return error.status
  return undefined
}
