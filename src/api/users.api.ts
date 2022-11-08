import { createApi } from '@reduxjs/toolkit/query/react'
import { getValidKeys } from '../hooks/utils'
import { setPrefetchSpinner } from '../slices/spinnerSlice'

import { CourseData, UserData } from '../types'
import { coursesApi } from './courses.api'
import customFetchBase from './customFetchBase'

type UserArg = {
  uid?: string
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
      // optimistic update
      async onQueryStarted({ arg, body }, { dispatch, queryFulfilled }) {
        dispatch(setPrefetchSpinner())
        dispatch(
          usersApi.util.updateQueryData(
            'getUserCourse',
            { uid: arg.uid, courseId: arg.courseId },
            (draftCourse: CourseData) => {
              if (draftCourse.workouts && draftCourse.workouts[arg.workoutId]) {
                // если нет блока упражнений
                if (!draftCourse.workouts[arg.workoutId].exercises) {
                  draftCourse.workouts[arg.workoutId].exercises = []
                }                
                
                // если нет конкретного упражнения
                if (
                  draftCourse.workouts[arg.workoutId].exercises && 
                  !draftCourse.workouts[arg.workoutId].exercises![arg.exerciseId]
                ) {
                  draftCourse.workouts[arg.workoutId].exercises![arg.exerciseId] = {
                    name: '',
                    id: arg.exerciseId,
                    retriesCount: 0,
                    userProgress: body.userProgress
                  }
                // если всё есть
                } else {
                  draftCourse.workouts![arg.workoutId].exercises![arg.exerciseId].userProgress! = body.userProgress    
                }
              }
              return draftCourse
        }))
        try {
          await queryFulfilled
        } catch {
          dispatch(usersApi.util.invalidateTags([
            { type: 'UserCourse', id: arg.courseId },
            { type: 'UserCourse', id: 'LIST' },
            'User',
          ]))
        }
      },
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
      invalidatesTags: [
        { type: 'UserCourse', id: 'LIST' },
        'User'
      ],
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
            if (data) {
              for (let i = 0; i < data.length; i++ )
                dispatch(usersApi.endpoints.addUserWorkout.initiate({ uid, courseId, workoutId: i }))  
            }
          } catch {
            console.error('No workouts in this course')
          }
        } catch {
        } finally {
          dispatch(usersApi.util.invalidateTags([{ type: 'UserCourse', id: 'LIST' }]))
        }
      },
      invalidatesTags: [
        'User'
      ],
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
