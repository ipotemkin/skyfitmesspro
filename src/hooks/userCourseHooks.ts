// USER COURSES HOOKS

import { skipToken } from '@reduxjs/toolkit/dist/query'
import { merge } from 'lodash'
import { useEffect, useState } from 'react'

import { useGetCourseQuery, useGetCoursesQuery } from '../api/courses.api'
import { useGetUserCourseQuery, useGetUserCoursesQuery } from '../api/users.api'
import { selectCurrentUser } from '../slices/currentUserSlice'
import { CourseData } from '../types'
import { useAppSelector } from './appHooks'

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

  const {
    data: userCoursesData, isLoading: isUserCoursesLoading
  } = useGetUserCoursesQuery({ uid } ?? skipToken)

  const [userCourses, setUserCourses] = useState<CourseData[]>()
  const [isLoading, setIsloading] = useState(true)
  
  useEffect(() => {
    if (userCoursesData && courses) {
      const res = []
      const validKeys: string[] = getValidKeys(userCoursesData)
      for(let i in validKeys) res.push(courses[+validKeys[i]])
      setUserCourses(res)
    }
  }, [userCoursesData, courses])

  useEffect(() => {
    if (!isCoursesLoading && !isUserCoursesLoading) {
      setIsloading(false)
    }
  }, [isCoursesLoading, isUserCoursesLoading])

  return { data: userCourses, isLoading }
}

// возвращает курсы с доп полем subscription чтобы добавлять/удалять курсы для пользователяя
export const useCoursesWithSubscription = (uid?: string) => {
  const { data: courses, isLoading: isCoursesLoading } = useGetCoursesQuery()

  const {
    data: userCoursesData, isLoading: isUserCoursesLoading
  } = useGetUserCoursesQuery({ uid } ?? skipToken)
  
  const [isLoading, setIsloading] = useState(true)
  const [coursesWithSubscription, setCoursesWithSubscription] = useState<CourseData[]>([])

  useEffect(() => {

    if (!isUserCoursesLoading && courses) {    
      const coursesTemp: CourseData[] = []
      // добавляем свойство 'subscription'
      if (userCoursesData && userCoursesData.length > 0) {
        userCoursesData.forEach((course: CourseData) => {
          coursesTemp.push({
            ...course,
            subscription: (course ? true : false)
          })
        })  
      }
      const res: CourseData[] = []
      merge(res, courses, coursesTemp)
      setCoursesWithSubscription(res)
    }
  }, [userCoursesData, courses, isUserCoursesLoading])

  useEffect(() => {
    if (!isCoursesLoading && !isUserCoursesLoading) {
      setIsloading(false)
    }
  }, [isCoursesLoading, isUserCoursesLoading])

  return { data: coursesWithSubscription, isLoading }
}

// полные даннные по заданному курсу пользователя
export const useUserCourse = (courseId?: number) => {
  const user = useAppSelector(selectCurrentUser)
  const { data: course } = useGetCourseQuery(courseId ?? skipToken)

  const queryArgs = user.localId && courseId
    ? { uid: user.localId, courseId}
    : undefined
  
  const { 
    data: userCourseData, error, isLoading: isUserCourseLoading, isError: isErrorQuery
  } = useGetUserCourseQuery(queryArgs ?? skipToken)

  const [userCourse, setUserCourse] = useState<CourseData>()
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (isErrorQuery) setIsError(true)
    else setIsError(false)
  }, [isErrorQuery])

  useEffect(() => {
    
    // если загрузка завершена но нет данных или пользователя
    if (!isUserCourseLoading && (!userCourseData || !user?.localId)) setIsError(true)
    
    // если есть все данные, то ставим загрузку в false
    else if (userCourseData && course && user?.localId) {
      const res = {}
      merge(res, course, userCourseData)
      setUserCourse(res)
    }

  }, [userCourseData, course, isUserCourseLoading, user?.localId])
  
  return { data: userCourse, isLoading: isUserCourseLoading, error, isError }
}
