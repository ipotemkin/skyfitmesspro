// USER COURSES HOOKS

import { skipToken } from '@reduxjs/toolkit/dist/query'
import { merge } from 'lodash'
import { useEffect, useState } from 'react'

import { useGetCourseQuery, useGetCoursesQuery } from '../api/courses.api'
import { useGetUserCourseQuery, useGetUserCoursesQuery, usePrefetch } from '../api/users.api'
import { selectCurrentUser } from '../slices/currentUserSlice'
import { setPrefetchSpinner } from '../slices/spinnerSlice'
import { CourseData } from '../types'
import { useAppDispatch, useAppSelector } from './appHooks'

// возвращает список ключей, не равных null
// это необходимо для очистки сырой информации из БД
const getValidKeys = (obj: object) => {
  const validKeys = []
  for (let [curKey, curValue] of Object.entries(obj)) {
    if (curValue) validKeys.push(curKey)
  }
  return validKeys
}

// возвращает курсы заданного пользователя (без данных из /users)
export const useUserCourses = (uid?: string) => {
  const { data: courses, isLoading: isCoursesLoading } = useGetCoursesQuery()

  const { data: userCoursesData, isLoading: isUserCoursesLoading } =
    useGetUserCoursesQuery({ uid } ?? skipToken)

  const [userCourses, setUserCourses] = useState<CourseData[]>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (userCoursesData && courses) {
      const res = []
      const validKeys: string[] = getValidKeys(userCoursesData)
      for (let i in validKeys) res.push(courses[+validKeys[i]])
      setUserCourses(res)
    }
  }, [userCoursesData, courses])

  useEffect(() => {
    if (!isCoursesLoading && !isUserCoursesLoading) {
      setIsLoading(false)
    }
  }, [isCoursesLoading, isUserCoursesLoading])

  return { data: userCourses, isLoading }
}

// возвращает курсы с доп полем subscription чтобы добавлять/удалять курсы для пользователя
export const useCoursesWithSubscription = (uid?: string) => {
  const { data: courses, isLoading: isCoursesLoading } = useGetCoursesQuery()

  const { data: userCoursesData, isLoading: isUserCoursesLoading } =
    useGetUserCoursesQuery({ uid } ?? skipToken)

  const [isLoading, setIsLoading] = useState(true)
  const [coursesWithSubscription, setCoursesWithSubscription] = useState<
    CourseData[]
  >([])

  useEffect(() => {
    const res: CourseData[] = []

    if (!isUserCoursesLoading && courses) {
      const coursesTemp: CourseData[] = []

      // добавляем свойство 'subscription'
      if (userCoursesData) {
        // если userCoursesData – это список
        if (userCoursesData.length > 0) {
          userCoursesData.forEach((course: CourseData) => {
            coursesTemp.push({
              ...course,
              subscription: course ? true : false,
            })
          })
          merge(res, courses, coursesTemp)
        // если userCoursesData – это объект
        } else {
          const validKeys = getValidKeys(userCoursesData)
          courses.forEach((course: CourseData) => {
            res.push({
              ...course,
              subscription: validKeys.includes(String(course.id))
                ? true
                : false,
            })
          })
        }
        setCoursesWithSubscription(res)
        return
      }
      setCoursesWithSubscription(courses)
    }
  }, [userCoursesData, courses, isUserCoursesLoading])

  useEffect(() => {
    if (!isCoursesLoading && !isUserCoursesLoading) {
      setIsLoading(false)
    }
  }, [isCoursesLoading, isUserCoursesLoading])

  return { data: coursesWithSubscription, isLoading }
}

// полные данные по заданному курсу пользователя
export const useUserCourse = (courseId?: number) => {
  const user = useAppSelector(selectCurrentUser)
  const { data: course } = useGetCourseQuery(courseId ?? skipToken)

  const queryArgs =
    user.localId && courseId !== undefined
      ? { uid: user.localId, courseId }
      : undefined

  const {
    data: userCourseData,
    error,
    isLoading: isUserCourseLoading,
    isError: isErrorQuery,
  } = useGetUserCourseQuery(queryArgs ?? skipToken)

  const [userCourse, setUserCourse] = useState<CourseData>()
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (isErrorQuery) setIsError(true)
    else setIsError(false)
  }, [isErrorQuery])

  useEffect(() => {
    if (userCourseData && course && user?.localId) {
      const res = {}
      merge(res, course, userCourseData)
      setUserCourse(res)
    }
  }, [userCourseData, course, user?.localId])

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
