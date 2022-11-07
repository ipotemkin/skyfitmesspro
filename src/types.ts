import { accessTokenName } from './constants'

export interface CourseMainData {
  id?: number
  name?: string
  coverUrl?: string
}

export type CourseData = {
  description?: string
  suitableFor?: string[]
  lines?: string[]
  workouts?: Workout[]
  subscription?: boolean
} & CourseMainData

export type Workout = {
  id: number
  name?: string
  videoUrl?: string
  exercises?: Exercise[]
  done?: boolean
}

export type Exercise = {
  id: number
  name: string
  retriesCount: number
  userProgress?: number
}

// username & password are stored in a closed Firebase table. We cannot change it
// uid is to link UserData to a specified user in the closed Firebase table
export type UserData = {
  uid: string
  courses: CourseData[]
}

export type FormData = {
  email: string
  password: string
  confirmPassword?: string
}

export type FirebaseUserRESTAPI = {
  localId?: string
  displayName?: string
  email?: string
  idToken?: string
  refreshToken?: string
  registered?: boolean
  kind?: string
  expiresIn?: string
  needRelogin?: boolean
}

export type RefreshTokenResponse = {
  expires_in?: string
  token_type?: string
  refresh_token?: string
  id_token?: string
  user_id?: string
  project_id?: string
}

export type AppCookies = {
  [index: string]: string | undefined
  [accessTokenName]?: string
}

export type Message = {
  value?: string
}

export type ErrorTypes = {
  [index: string]: string
}

export type AuthErrorType = {
  status: number
  data: {
    error: {
      message: string
    }
  }
}

// структура idToken
export type idTokenType = {
  aud: string // project name
  auth_time: number // время последней авторизации
  email: string
  email_verified: boolean
  exp: number // время экспирации токена
  firebase: {
    identities: {
      email: string[]
    }
    sign_in_provider: string
  }
  iat: number // issued at
  iss: string // "https://securetoken.google.com/skyfitnesspro-202210"
  sub: string // == user_id
  user_id: string
}
