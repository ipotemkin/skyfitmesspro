import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../constants'
import { CourseData, UserData } from '../types'

export interface ILoginUser {
  email: string
  password: string
}

export interface ISignupUser {
  username: string
  email: string
  password: string
}

type CourseArg = {
  uid: string
  courseId: number
}

type WorkoutArg = {
  workoutId: number
} & CourseArg

export type ExerciseArg = {
  exerciseId: number
} & WorkoutArg

export type ExerciseProgress = {
  userProgress: number
}

export type ExercisePayload = {
  arg: ExerciseArg
  body: ExerciseProgress
}

export const usersApi = createApi({
  reducerPath: 'users/api',
  tagTypes: ['UserData'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + '/users',
  }),
  endpoints: (build) => ({
    getUsersWithCourses: build.query<UserData[], void>({
      query: () => '.json',
    }),
    getUserCourses: build.query<CourseData[], string>({
      query: (uid: string) => `/${uid}/courses.json`,
    }),
    getUserCourse: build.query<CourseData, CourseArg>({
      query: ({ uid, courseId }) => `/${uid}/courses/${courseId}.json`,
      providesTags: () => ([{ type: 'UserData' as const }])
    }),
    getUserExercises: build.query<UserData, WorkoutArg>({
      query: ({ uid, courseId, workoutId }) =>
        `/${uid}/courses/${courseId}/workouts/${workoutId}/exercises.json`,
    }),
    updateUserExerciseProgress: build.mutation<void, ExercisePayload>({
      query: ({ arg, body }) => ({
        url: `/${arg.uid}/courses/${arg.courseId}/workouts/${arg.workoutId}/exercises/${arg.exerciseId}.json`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: [{ type: 'UserData' }]
    }),
  }),
})

export const {
  useGetUserCoursesQuery,
  useGetUsersWithCoursesQuery,
  useGetUserCourseQuery,
  useGetUserExercisesQuery,
  useUpdateUserExerciseProgressMutation,
} = usersApi
