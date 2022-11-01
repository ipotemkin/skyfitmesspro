import { createApi } from '@reduxjs/toolkit/query/react'
import { CourseData, UserData } from '../types'
import customFetchBase from './customFetchBase'

type TokenArg = {
  idToken?: string
}

type UserArg = {
  uid?: string
} & TokenArg

type CourseArg = {
  uid: string
  courseId: number
} & TokenArg

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
  baseQuery: customFetchBase,
  endpoints: (build) => ({
    addUser: build.mutation<void, UserArg>({
      query: ({ uid }) => ({
        url: `${uid}.json`,
        method: 'PUT',
        body: { uid },
      }),
      invalidatesTags: ['User'],
    }),
    getUsersWithCourses: build.query<UserData[], void>({
      query: () => `.json`,
      providesTags: ['User']
    }),
    getUserCourses: build.query<CourseData[], UserArg>({
      query: ({ uid }) => `/${uid}/courses.json`,
      providesTags: [{ type: 'UserCourse', id: 'LIST' }]
    }),
    getUserCourse: build.query<CourseData, CourseArg>({
      query: ({ uid, courseId }) => `/${uid}/courses/${courseId}.json`,
      providesTags: (result, error, arg) => 
        [
          { type: 'UserCourse', id: arg.courseId },
          { type: 'UserCourse', id: 'LIST' },
        ]
    }),
    getUserExercises: build.query<UserData, WorkoutArg>({
      query: ({ uid, courseId, workoutId }) =>
      `/${uid}/courses/${courseId}/workouts/${workoutId}/exercises.json`,
      providesTags: (result, error, arg) => 
        [
          { type: 'UserCourse', id: arg.courseId },
          { type: 'UserCourse', id: 'LIST' },
        ]
      }),
    updateUserExerciseProgress: build.mutation<void, ExercisePayload>({
      query: ({ arg, body }) => ({
        url: `/${arg.uid}/courses/${arg.courseId}/workouts/${arg.workoutId}/exercises/${arg.exerciseId}.json`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'UserCourse', id: arg.arg.courseId },
        { type: 'UserCourse', id: 'LIST' },
        'User'
      ]
    }),
    setWorkoutStatus: build.mutation<void, WorkoutStatusArg>({
      query: ({ uid, courseId, workoutId, done }) => ({
        url: `/${uid}/courses/${courseId}/workouts/${workoutId}.json`,
        method: 'PATCH',
        body: { done: done },
      }),
      invalidatesTags: (result, error, arg) =>
        [
          { type: 'UserCourse', id: 'LIST' },
          { type: 'UserCourse', id:  arg.courseId },
          'User'
        ]
    }),
    addUserCourse: build.mutation<void, CourseArg>({
      query: ({ uid, courseId }) => ({
        url: `/${uid}/courses/${courseId}.json`,
        method: 'PUT',
        body: { id: courseId },
      }),
      invalidatesTags: 
        [
          { type: 'UserCourse', id: 'LIST' },
          'User'
        ]
    }),
    delUserCourse: build.mutation<void, CourseArg>({
      query: ({ uid, courseId }) => ({
        url: `/${uid}/courses/${courseId}.json`,
        method: 'DELETE',
        body: { id: courseId },
      }),
      invalidatesTags: (result, error, arg) => 
        [
          { type: 'UserCourse', id: 'LIST' },
          { type: 'UserCourse', id: arg.courseId },
          'User'
        ]
    }),
  }),
})

export const {
  useAddUserMutation,
  useGetUserCoursesQuery,
  useGetUsersWithCoursesQuery,
  useGetUserCourseQuery,
  useGetUserExercisesQuery,
  useUpdateUserExerciseProgressMutation,
  useSetWorkoutStatusMutation,
  useAddUserCourseMutation,
  useDelUserCourseMutation
} = usersApi
