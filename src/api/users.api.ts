import { createApi } from '@reduxjs/toolkit/query/react'
import { CourseData, UserData } from '../types'
import customFetchBase from './customFetchBase'


type TokenArg = {
  idToken?: string
}

type UserArg = {
  uid: string
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
      query: ({idToken, uid }) => ({
        url: `${uid}.json?auth=${idToken}`,
        method: 'PUT',
        body: { uid },
      }),
      invalidatesTags: ['User'],
    }),
    getUsersWithCourses: build.query<UserData[], string>({
      query: (idToken: string) => `.json?auth=${idToken}`,
      providesTags: ['User']
    }),
    getUserCourses: build.query<CourseData[], UserArg>({
      query: ({ idToken, uid }) => `/${uid}/courses.json?auth=${idToken}`,
      providesTags: [{ type: 'UserCourse', id: 'LIST' }]
    }),
    getUserCourse: build.query<CourseData, CourseArg>({
      query: ({ idToken, uid, courseId }) => `/${uid}/courses/${courseId}.json?auth=${idToken}`,
      providesTags: (result, error, arg) => 
        [
          { type: 'UserCourse', id: arg.courseId },
          { type: 'UserCourse', id: 'LIST' },
        ]
    }),
    getUserExercises: build.query<UserData, WorkoutArg>({
      query: ({ idToken, uid, courseId, workoutId }) =>
        `/${uid}/courses/${courseId}/workouts/${workoutId}/exercises.json?auth=${idToken}`,
      providesTags: (result, error, arg) => 
        [
          { type: 'UserCourse', id: arg.courseId },
          { type: 'UserCourse', id: 'LIST' },
        ]
      }),
    updateUserExerciseProgress: build.mutation<void, ExercisePayload>({
      query: ({ arg, body }) => ({
        url: `/${arg.uid}/courses/${arg.courseId}/workouts/${arg.workoutId}/exercises/${arg.exerciseId}.json?auth=${arg.idToken}`,
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
      query: ({ idToken, uid, courseId, workoutId, done }) => ({
        url: `/${uid}/courses/${courseId}/workouts/${workoutId}.json?auth=${idToken}`,
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
      query: ({ idToken, uid, courseId }) => ({
        url: `/${uid}/courses/${courseId}.json?auth=${idToken}`,
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
      query: ({ idToken, uid, courseId }) => ({
        url: `/${uid}/courses/${courseId}.json?auth=${idToken}`,
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

