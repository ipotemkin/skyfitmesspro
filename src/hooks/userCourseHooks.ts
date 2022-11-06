// USER COURSES HOOKS

import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useEffect, useState } from 'react'

import { useGetCourseQuery, useGetCoursesQuery } from '../api/courses.api'
import { useGetUserCourseQuery, useGetUserCoursesQuery, usePrefetch } from '../api/users.api'
import { selectCurrentUser } from '../slices/currentUserSlice'
import { setPrefetchSpinner } from '../slices/spinnerSlice'
import { CourseData } from '../types'
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
  const user = useAppSelector(selectCurrentUser)
  const { data: course } = useGetCourseQuery(courseId ?? skipToken)
  const [userCourse, setUserCourse] = useState<CourseData>()
  const [isError, setIsError] = useState(false)

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

  useEffect(() => {
    isErrorQuery ? setIsError(true) : setIsError(false)
  }, [isErrorQuery])

  useEffect(() => {
    if (userCourseData && course && user.localId)
      setUserCourse(mergeCourseData(course, userCourseData))
  }, [userCourseData, course, user.localId])

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
