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

export type WorkoutArg = {
  workoutId: number
} & CourseArg

export type WorkoutStatusArg = {
  done: boolean
} & WorkoutArg

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
  tagTypes: ['UserData', 'UserCourse'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + '/users',
  }),
  endpoints: (build) => ({
    getUsersWithCourses: build.query<UserData[], void>({
      query: () => '.json',
      providesTags: () => ([{ type: 'UserCourse' as const }])
    }),
    getUserCourses: build.query<CourseData[], string>({
      query: (uid: string) => `/${uid}/courses.json`,
      providesTags: () => ([{ type: 'UserCourse' as const }])
    }),
    getUserCourse: build.query<CourseData, CourseArg>({
      query: ({ uid, courseId }) => `/${uid}/courses/${courseId}.json`,
      providesTags: () => ([{ type: 'UserCourse' as const }])
    }),
    getUserExercises: build.query<UserData, WorkoutArg>({
      query: ({ uid, courseId, workoutId }) =>
        `/${uid}/courses/${courseId}/workouts/${workoutId}/exercises.json`,
      providesTags: () => ([{ type: 'UserCourse' as const }])
      }),
    updateUserExerciseProgress: build.mutation<void, ExercisePayload>({
      query: ({ arg, body }) => ({
        url: `/${arg.uid}/courses/${arg.courseId}/workouts/${arg.workoutId}/exercises/${arg.exerciseId}.json`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: [{ type: 'UserCourse' }]
    }),
    setWorkoutStatus: build.mutation<void, WorkoutStatusArg>({
      query: ({ uid, courseId, workoutId, done }) => ({
        url: `/${uid}/courses/${courseId}/workouts/${workoutId}.json`,
        method: 'PATCH',
        body: { done: done },
      }),
      invalidatesTags: [{ type: 'UserData' }]
    }),
    setWorkoutDone: build.mutation<void, WorkoutArg>({
      query: ({ uid, courseId, workoutId }) => ({
        url: `/${uid}/courses/${courseId}/workouts/${workoutId}.json`,
        method: 'PATCH',
        body: { done: true },
      }),
      invalidatesTags: [{ type: 'UserCourse' }]
    }),
    setWorkoutUndone: build.mutation<void, WorkoutArg>({
      query: ({ uid, courseId, workoutId }) => ({
        url: `/${uid}/courses/${courseId}/workouts/${workoutId}.json`,
        method: 'PATCH',
        body: { done: false },
      }),
      invalidatesTags: [{ type: 'UserCourse' }]
    }),
    addUserCourse: build.mutation<void, CourseArg>({
      query: ({ uid, courseId }) => ({
        url: `/${uid}/courses/${courseId}.json`,
        method: 'POST',
        body: { id: courseId },
      }),
      invalidatesTags: [{ type: 'UserCourse' }]
    }),
  }),
})

export const {
  useGetUserCoursesQuery,
  useGetUsersWithCoursesQuery,
  useGetUserCourseQuery,
  useGetUserExercisesQuery,
  useUpdateUserExerciseProgressMutation,
  useSetWorkoutDoneMutation,
  useSetWorkoutUndoneMutation,
  useSetWorkoutStatusMutation,
  useAddUserCourseMutation
} = usersApi
