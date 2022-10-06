export interface User {
  id: number
  username: string
  password: string
}

export interface CourseMainData {
  id: number
  name: string
  coverUrl: string
}

export type CourseData = {
  description: string
  suitableFor: string[]
  lines: string[]
  workouts: Workout[]
} & CourseMainData

export type Workout = {
  id: number
  name: string
  videoUrl: string
  exercises: {
    id: number
    name: string
    retriesCount: number
  }[]
}

export type FormData = {
  email: string
  password: string
  confirmPassword?: string
}
