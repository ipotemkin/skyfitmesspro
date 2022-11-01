export const LOGO_COLOR_DARK = '#000000'

export const LOGO_COLOR_LIGHT = '#ffffff'

export const SKELETON_COLOR = '#ffffffaa'

export const NUMBER_OF_SKELETONS = 6

export const API_URL =
  'https://skyfitnesspro-202210-default-rtdb.europe-west1.firebasedatabase.app/'

export const API_AUTH_URL = 'https://identitytoolkit.googleapis.com/v1'

type ErrorTypes = {
  [index: string]: string
}

export const ERRORS: ErrorTypes = {
  EMAIL_NOT_FOUND: 'Неверный email',
  INVALID_PASSWORD: 'Неверный пароль',
  EMAIL_EXISTS: 'Email занят',
}

export const EXP_MESSAGE = 'Ваша сессия истекла. Пожалуйста, войдите в систему!'
