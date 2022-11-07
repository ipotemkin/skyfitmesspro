// USER COURSES HOOKS

import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useEffect, useState } from 'react'

import { useGetCourseQuery, useGetCoursesQuery } from '../api/courses.api'
import { ExercisePayload, useGetUserCourseQuery, useGetUserCoursesQuery, usePrefetch, useSetWorkoutStatusMutation, useUpdateUserExerciseProgressMutation, WorkoutArg, WorkoutStatusArg } from '../api/users.api'
import { selectCurrentUser } from '../slices/currentUserSlice'
import { setPrefetchSpinner } from '../slices/spinnerSlice'
import { CourseData, Exercise } from '../types'
import { useAppDispatch, useAppSelector } from './appHooks'
import { addSubscription, getValidKeys, mergeCourseData } from './utils'

// возвращает курсы заданного пользователя (без данных из /users)
export const useUserCourses = (uid?: string) => {
  const [userCourses, setUserCourses] = useState<CourseData[]>()
  const [isLoading, setIsLoading] = useState(true)
  const { data: courses, isLoading: isCoursesLoading } = useGetCoursesQuery()
  const { data: userCoursesData, isLoading: isUserCoursesLoading } =
    useGetUserCoursesQuery({ uid } ?? skipToken)

  useEffect(() => {
    if (userCoursesData && courses) {
      const res = []
      const validKeys: string[] = getValidKeys(userCoursesData)
      for (let key of validKeys) res.push(courses[+key])
      setUserCourses(res)
    }
  }, [userCoursesData, courses])

  useEffect(() => {
    if (!isCoursesLoading && !isUserCoursesLoading) setIsLoading(false)
  }, [isCoursesLoading, isUserCoursesLoading])

  return { data: userCourses, isLoading }
}

// возвращает курсы с доп полем subscription чтобы добавлять/удалять курсы для пользователя
export const useCoursesWithSubscription = (uid?: string) => {
  const { data: courses, isLoading: isCoursesLoading } = useGetCoursesQuery()
  const [isLoading, setIsLoading] = useState(true)
  const { data: userCoursesData, isLoading: isUserCoursesLoading } =
    useGetUserCoursesQuery({ uid } ?? skipToken)
  
  const [coursesWithSubscription, setCoursesWithSubscription] = 
    useState<CourseData[]>([])

  useEffect(() => {
    if (!isUserCoursesLoading && courses) {

      // добавляем свойство 'subscription'
      if (userCoursesData) {
        const res = addSubscription(userCoursesData, courses)
        setCoursesWithSubscription(res)
      } else setCoursesWithSubscription(courses)
    }
  }, [userCoursesData, courses, isUserCoursesLoading])

  useEffect(() => {
    if (!isCoursesLoading && !isUserCoursesLoading) setIsLoading(false)
  }, [isCoursesLoading, isUserCoursesLoading])

  return { data: coursesWithSubscription, isLoading }
}

// полные данные по заданному курсу пользователя
export const useUserCourse = (courseId?: number) => {
  const { localId: uid } = useAppSelector(selectCurrentUser)
  const { data: course, isError: isCourseError } = useGetCourseQuery(courseId ?? skipToken)
  const [userCourse, setUserCourse] = useState<CourseData>()
  const [isError, setIsError] = useState(false)

  const queryArgs =
    uid && courseId !== undefined ? { uid, courseId } : undefined

  const {
    data: userCourseData,
    error,
    isLoading: isUserCourseLoading,
    isError: isErrorQuery,
  } = useGetUserCourseQuery(queryArgs ?? skipToken)

  useEffect(() => {
    if (isErrorQuery || isCourseError) setIsError(true)
    else setIsError(false)
    // isErrorQuery ? setIsError(true) : setIsError(false)
  }, [isErrorQuery, isCourseError])

  useEffect(() => {
    if (userCourseData && course && uid)
      setUserCourse(mergeCourseData(course, userCourseData))
  }, [userCourseData, course, uid])

  return { data: userCourse, isLoading: isUserCourseLoading, error, isError }
}

// hook для получения функции для prefetch запросов
export const usePrefetchUserCourse = (endpoint: any) => {
  const dispatch = useAppDispatch()
  const prefetchFunc = usePrefetch(endpoint)

  const newPrefetchFunc = (args: any) => {
    dispatch(setPrefetchSpinner())
    prefetchFunc({ ...args })
  }

  return newPrefetchFunc
}

export const useUpdateProgressAndWorkoutStatus = () => {
  const [updateProgress] = useUpdateUserExerciseProgressMutation()
  const [setWorkoutStatus] = useSetWorkoutStatusMutation()

  const updateProgressAndWorkoutStatus = async (
    exercises: Exercise[],
    workoutArg: WorkoutArg,
  ) => { 
    let workoutStatus = true
    if (exercises) {
      exercises.forEach((item: Exercise, index: number) => {
        // проверяем, выполнены ли упражнения
        workoutStatus &&= item.userProgress === item.retriesCount

        const updateData: ExercisePayload = {
          arg: {
            ...workoutArg,
            exerciseId: index,
          },
          body: {
            userProgress: item.userProgress || 0,
          },
        }
        updateProgress({ ...updateData }).unwrap()
      })
      const workoutStatusArg: WorkoutStatusArg = {
        ...workoutArg,
        done: workoutStatus,
      }
      await setWorkoutStatus({ ...workoutStatusArg }).unwrap()
    }
  }

  return updateProgressAndWorkoutStatus
}
