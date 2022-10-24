export const LOGO_COLOR_DARK = '#000000'

export const LOGO_COLOR_LIGHT = '#ffffff'

export const SKELETON_COLOR = '#ffffffaa'

export const NUMBER_OF_SKELETONS = 3

export const API_URL =
  'https://skyfitnesspro-202210-default-rtdb.europe-west1.firebasedatabase.app/'


type ErrorTypes = {
  [index: string]: string
}
  
export const ERRORS: ErrorTypes = {
  EMAIL_NOT_FOUND: 'Неверный email',
  INVALID_PASSWORD: 'Неверный пароль',
  EMAIL_EXISTS: 'Email занят'
}
