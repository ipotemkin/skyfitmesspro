import { createApi } from '@reduxjs/toolkit/query/react'

import { getValidKeys } from '../hooks/utils'
import { setPrefetchSpinner } from '../slices/spinnerSlice'
import { CourseData, UserData, Workout } from '../types'
import { coursesApi } from './courses.api'
import customFetchBase from './customFetchBase'

type UserArg = {
  uid?: string
}

type CourseArg = {
  uid: string
  courseId: number
}

export type WorkoutsArg = {
  workouts: Workout[]
} & CourseArg

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

type CourseDataOrNull = CourseData | null

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
      providesTags: ['User'],
    }),
    getUserCourses: build.query<CourseData[], UserArg>({
      query: ({ uid }) => `/${uid}/courses.json`,
      providesTags: [{ type: 'UserCourse', id: 'LIST' }],
    }),
    getUserCourse: build.query<CourseData, CourseArg>({
      query: ({ uid, courseId }) => `/${uid}/courses/${courseId}.json`,
      providesTags: (result, error, arg) => [
        { type: 'UserCourse', id: arg.courseId },
        { type: 'UserCourse', id: 'LIST' },
      ],
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
      ],
    }),
    setWorkoutStatus: build.mutation<void, WorkoutStatusArg>({
      query: ({ uid, courseId, workoutId, done }) => ({
        url: `/${uid}/courses/${courseId}/workouts/${workoutId}.json`,
        method: 'PATCH',
        body: { done },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'UserCourse', id: 'LIST' },
        { type: 'UserCourse', id: arg.courseId },
        'User',
      ],
    }),
    addUserWorkout: build.mutation<void, WorkoutArg>({
      query: ({ uid, courseId, workoutId }) => ({
        url: `/${uid}/courses/${courseId}/workouts/${workoutId}.json`,
        method: 'PUT',
        body: { id: workoutId + 1 },
      }),
    }),
    addUserWorkouts: build.mutation<void, WorkoutsArg>({
      query: ({ uid, courseId, workouts }) => ({
        url: `/${uid}/courses/${courseId}/workouts.json`,
        method: 'PUT',
        body: workouts,
      }),
    }),
    addUserCourse: build.mutation<void, CourseArg>({
      query: ({ uid, courseId }) => ({
        url: `/${uid}/courses/${courseId}.json`,
        method: 'PUT',
        body: { id: courseId },
      }),
      // optimistic update
      async onQueryStarted({ uid, courseId }, { dispatch, queryFulfilled }) {
        dispatch(setPrefetchSpinner())
        dispatch(
          usersApi.util.updateQueryData(
            'getUserCourses',
            { uid },
            (draftCourses: CourseData[]) => {
              if (draftCourses) {
                draftCourses[courseId] = { id: courseId }
                return draftCourses
              }
              const newCourseData: CourseDataOrNull[] = []
              for (let i = 0; i < courseId; i++) newCourseData.push(null)
              newCourseData.push({ id: courseId })
              return newCourseData as CourseData[]
        }))
        try {
          await queryFulfilled
          try {
            const { data } = await dispatch(coursesApi.endpoints.getWorkouts.initiate(courseId))
            // добавяем тренировки в новый курс пользователя
            if (data) {
              const newWorkouts: Workout[] = []
              for (let i = 0; i < data.length; i++ ) newWorkouts.push({ id: i + 1 })
              await dispatch(usersApi.endpoints.addUserWorkouts.initiate({
                uid,
                courseId,
                workouts: newWorkouts,
              }))
            }
          } catch {
            console.error('No workouts in this course')
          }
        } catch {
          // dispatch(usersApi.util.invalidateTags([{ type: 'UserCourse', id: 'LIST' }]))
        } finally {
          dispatch(usersApi.util.invalidateTags([{ type: 'UserCourse', id: 'LIST' }]))
        }
      },
      invalidatesTags: ['User'],
    }),
    delUserCourse: build.mutation<void, CourseArg>({
      query: ({ uid, courseId }) => ({
        url: `/${uid}/courses/${courseId}.json`,
        method: 'DELETE',
        body: { id: courseId },
      }),
      // optimistic update
      async onQueryStarted({ uid, courseId }, { dispatch, queryFulfilled }) {
        let needInvalidates = false
        dispatch(setPrefetchSpinner())
        dispatch(
          usersApi.util.updateQueryData(
            'getUserCourses',
            { uid },
            (draftCourses: CourseData[]) => {
              if (getValidKeys(draftCourses).length < 2) needInvalidates = true
              const courses = draftCourses as CourseDataOrNull[]
              courses[courseId] = null
              return courses as CourseData[]
        }))
        try {
          await queryFulfilled
          if (needInvalidates)
            dispatch(usersApi.util.invalidateTags([
              { type: 'UserCourse', id: 'LIST' },
              { type: 'UserCourse', id: courseId },
            ]))
        } catch {
          dispatch(usersApi.util.invalidateTags([
            { type: 'UserCourse', id: 'LIST' },
            { type: 'UserCourse', id: courseId },
        ]))}
      },
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useAddUserMutation,
  useGetUserCoursesQuery,
  useGetUsersWithCoursesQuery,
  useGetUserCourseQuery,
  useUpdateUserExerciseProgressMutation,
  useSetWorkoutStatusMutation,
  useAddUserCourseMutation,
  useDelUserCourseMutation,
  usePrefetch,
} = usersApi
