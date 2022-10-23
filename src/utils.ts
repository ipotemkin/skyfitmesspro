import { ERRORS } from "./constants"

export const formatString = (text: string, args: string[]) => {
  let res = text
  for (const arg of args) {
    res = res.replace(/{}/, arg)
  }
  return res
}

type AuthErrorType = {
  status: number
  data: {
    error: {
      message: string
    }
  }
}

export const getErrorMessage = (
  error: AuthErrorType, defaultError = 'Неверный логин или пароль'
) => {
  const testValue: string = ERRORS[error.data.error.message]
  console.log('getErrorMessage: defaultError -->', defaultError)
  return testValue || defaultError
}
