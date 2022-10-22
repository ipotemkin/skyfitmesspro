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
  tagTypes: ['UserCourse', 'User'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + '/users',
  }),
  endpoints: (build) => ({
    getUsersWithCourses: build.query<UserData[], void>({
      query: () => '.json',
      providesTags: ['User']
    }),
    getUserCourses: build.query<CourseData[], string>({
      query: (uid: string) => `/${uid}/courses.json`,
      providesTags: ['UserCourse']
    }),
    getUserCourse: build.query<CourseData, CourseArg>({
      query: ({ uid, courseId }) => `/${uid}/courses/${courseId}.json`,
      providesTags: ['UserCourse']
    }),
    getUserExercises: build.query<UserData, WorkoutArg>({
      query: ({ uid, courseId, workoutId }) =>
        `/${uid}/courses/${courseId}/workouts/${workoutId}/exercises.json`,
      providesTags: ['UserCourse']
      }),
    updateUserExerciseProgress: build.mutation<void, ExercisePayload>({
      query: ({ arg, body }) => ({
        url: `/${arg.uid}/courses/${arg.courseId}/workouts/${arg.workoutId}/exercises/${arg.exerciseId}.json`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['UserCourse', 'User']
    }),
    setWorkoutStatus: build.mutation<void, WorkoutStatusArg>({
      query: ({ uid, courseId, workoutId, done }) => ({
        url: `/${uid}/courses/${courseId}/workouts/${workoutId}.json`,
        method: 'PATCH',
        body: { done: done },
      }),
      invalidatesTags: ['UserCourse', 'User']
    }),
    addUserCourse: build.mutation<void, CourseArg>({
      query: ({ uid, courseId }) => ({
        url: `/${uid}/courses/${courseId}.json`,
        method: 'PUT',
        body: { id: courseId },
      }),
      invalidatesTags: ['UserCourse', 'User']
    }),
    delUserCourse: build.mutation<void, CourseArg>({
      query: ({ uid, courseId }) => ({
        url: `/${uid}/courses/${courseId}.json`,
        method: 'DELETE',
        body: { id: courseId },
      }),
      invalidatesTags: ['UserCourse', 'User']
    }),
  }),
})

export const {
  useGetUserCoursesQuery,
  useGetUsersWithCoursesQuery,
  useGetUserCourseQuery,
  useGetUserExercisesQuery,
  useUpdateUserExerciseProgressMutation,
  useSetWorkoutStatusMutation,
  useAddUserCourseMutation,
  useDelUserCourseMutation
} = usersApi
